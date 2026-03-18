import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste para saber se o backend está vivo
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// 1. CAMINHO ABSOLUTO: Garante que a pasta dist seja encontrada no Linux/Render
const distPath = resolve(__dirname, 'dist');
app.use(express.static(distPath));

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(client);

// ... (resto do código de pagamento permanece igual)

app.post('/api/create_payment', async (req, res) => {
  try {
    const { formData, paymentMethod, token } = req.body;
    const rawCpf = formData.cpf.replace(/\D/g, '');
    const email = formData.email || 'cliente@dominio.com';

    const YOUR_DOMAIN = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3001';

    const paymentData = {
      transaction_amount: 47.90,
      description: 'Método Destrave Completo',
      payment_method_id: paymentMethod === 'pix' ? 'pix' : 'master',
      payer: {
        email: email,
        first_name: formData.name.split(' ')[0],
        last_name: formData.name.split(' ').slice(1).join(' '),
        identification: { type: 'CPF', number: rawCpf }
      },
      notification_url: `${YOUR_DOMAIN}/api/webhook`
    };

    if (paymentMethod === 'credit_card') {
      paymentData.token = token;
      paymentData.installments = Number(formData.installments);
    }

    const result = await payment.create({ body: paymentData });
    res.json({
      status: result.status,
      id: result.id,
      point_of_interaction: result.point_of_interaction
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// WEBHOOK e PAYMENT_STATUS aqui...

// 2. FALLBACK PARA SPA: Qualquer rota que não for API ou arquivo estático recebe o index.html
// Esta forma evita o erro de 'path-to-regexp' no Express 5
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(join(distPath, 'index.html'));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${distPath}`);
});
