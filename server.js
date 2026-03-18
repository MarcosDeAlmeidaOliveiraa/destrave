import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. SERVIR FRONTEND: Configura o Express para entregar os arquivos da pasta 'dist'
app.use(express.static(join(__dirname, 'dist')));

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(client);

// ... (configuração do nodemailer permanece igual)

app.post('/api/create_payment', async (req, res) => {
  try {
    const { formData, paymentMethod, token } = req.body;
    const rawCpf = formData.cpf.replace(/\D/g, '');
    const email = formData.email || 'cliente@dominio.com';

    // 2. URL DINÂMICA: Usa o domínio do Render automaticamente para o Webhook
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

// ... (rota de webhook e payment_status permanecem iguais)

// 3. ROTA CORINGA: Garante que o React controle as rotas
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
