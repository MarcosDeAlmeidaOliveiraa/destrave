import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';

// Setup env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Configure Mercado Pago
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN, options: { timeout: 5000 } });
const payment = new Payment(client);

// Configuração do E-mail (Exemplo com SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/create_payment', async (req, res) => {
  try {
    const { formData, paymentMethod, token } = req.body;

    // Remove any special characters from CPF
    const rawCpf = formData.cpf.replace(/\D/g, '');

    // Mercado Pago strictly requires a valid email format
    const email = formData.email && formData.email.includes('@') ? formData.email : 'cliente@dominio.com';

    const paymentData = {
      transaction_amount: 47.90,
      description: 'Método Destrave Completo',
      payment_method_id: paymentMethod === 'pix' ? 'pix' : 'master',
      payer: {
        email: email,
        first_name: formData.name.split(' ')[0] || 'Cliente',
        last_name: formData.name.split(' ').slice(1).join(' ') || 'Destrave',
        identification: {
          type: 'CPF',
          number: rawCpf
        }
      },
      notification_url: "https://SEU-LINK-AQUI.com/api/webhook" // IMPORTANTE: O Mercado Pago vai avisar aqui
    };

    if (paymentMethod === 'credit_card') {
      paymentData.token = token;
      paymentData.installments = Number(formData.installments);
    }

    const result = await payment.create({ body: paymentData });
    
    res.json({
      status: result.status,
      id: result.id,
      point_of_interaction: result.point_of_interaction,
      status_detail: result.status_detail
    });

  } catch (error) {
    console.error('Mercado Pago Error:', error.message || error);
    res.status(400).json({ status: 'error', error: 'Verifique se o CPF e o E-mail digitados são válidos.' });
  }
});

// WEBHOOK: Recebe as notificações de pagamento aprovado
app.post('/api/webhook', async (req, res) => {
  const { action, data, type } = req.body;
  
  // O Mercado Pago envia o ID do pagamento para nós consultarmos
  if (type === 'payment' || action === 'payment.updated') {
    const paymentId = data?.id || req.query?.['data.id'];
    
    try {
      const paymentInfo = await payment.get({ id: paymentId });
      
      if (paymentInfo.status === 'approved') {
        const userEmail = paymentInfo.payer.email;
        const userName = paymentInfo.payer.first_name || 'Cliente';

        console.log(`PAGAMENTO APROVADO: Enviando eBook para ${userEmail}...`);

        // ENVIO DO E-MAIL
        await transporter.sendMail({
          from: '"Destrave Sucesso" <seu-email@gmail.com>',
          to: userEmail,
          subject: 'Seu eBook Destrave Chegou! 🚀',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h1 style="color: #6B21A8;">Parabéns ${userName}!</h1>
              <p>Seu pagamento foi confirmado e seu acesso está liberado.</p>
              <p>Clique no botão abaixo para baixar seu eBook:</p>
              <a href="LINK_DO_SEU_EBOOK_NO_DRIVE_OU_HOTMART" 
                 style="display: inline-block; background: #6B21A8; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
                BAIXAR MEU EBOOK AGORA
              </a>
              <p style="font-size: 12px; color: #999;">Se tiver qualquer dúvida, responda a este e-mail.</p>
            </div>
          `
        });

        console.log('E-mail enviado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao processar Webhook:', error.message);
    }
  }

  // Sempre responda 200/201 para o Mercado Pago não reenviar a notificação
  res.sendStatus(201);
});

// Rota para o frontend consultar o status do pagamento
app.get('/api/payment_status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentInfo = await payment.get({ id });
    
    res.json({
      status: paymentInfo.status,
      status_detail: paymentInfo.status_detail
    });
  } catch (error) {
    console.error('Erro ao consultar status:', error.message);
    res.status(500).json({ error: 'Erro ao consultar status' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mercado Pago server running on port ${PORT}`);
});
