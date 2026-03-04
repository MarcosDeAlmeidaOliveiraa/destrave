# move-react

## Servidor de e-mail

1. Copie `.env.example` para `.env` e preencha com `GMAIL_USER`, `GMAIL_APP_PASSWORD` e, se desejar, `GMAIL_DESTINATION`.
2. Rode o servidor localmente:

	```bash
	npm run mail-server
	```

3. No front-end, configure `VITE_CONTACT_ENDPOINT` (em `.env`) para apontar para o servidor (`http://localhost:4000/contact` por padrão).

O formulário de contato envia os dados para esse endpoint usando `fetch`. Ajuste as variáveis de ambiente ao publicar o servidor em produção.