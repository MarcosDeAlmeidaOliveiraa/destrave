import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
const port = process.env.PORT || 4000
const origin = process.env.CORS_ORIGIN || '*'

app.use(cors({ origin }))
app.use(express.json())

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.warn('[mail] Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'missing_fields' })
  }

  try {
    await transporter.sendMail({
      from: `${name} <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.GMAIL_DESTINATION || process.env.GMAIL_USER,
      subject: `Mensagem do site Mundo-Online-World - ${name}`,
      text: message,
      html: `<p><strong>Nome:</strong> ${name}</p><p><strong>E-mail:</strong> ${email}</p><p>${message}</p>`
    })

    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('[mail] Failed to send message', error)
    res.status(500).json({ ok: false, error: 'send_failed' })
  }
})

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'not_found' })
})

app.listen(port, () => {
  console.log(`Mail server listening on port ${port}`)
})
