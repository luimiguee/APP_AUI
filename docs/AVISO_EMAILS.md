# ⚠️ AVISO IMPORTANTE: Sistema de Emails Simulado

## 📧 Como Funciona o Sistema de Emails

Este é um **sistema de demonstração/protótipo**. Os emails **NÃO são enviados realmente** para sua caixa de entrada.

### O que acontece:
1. ✅ Quando você cria uma conta, o sistema **simula** o envio de um email
2. ✅ O email é **salvo no navegador** (localStorage) para demonstração
3. ✅ Você vê uma mensagem de sucesso na tela
4. ❌ **NÃO recebe email real** na sua caixa de entrada (Gmail, Outlook, etc.)

---

## 🔍 Como Ver os Emails "Enviados"

### Opção 1: Via Console do Navegador
1. Abra o Console (pressione **F12** ou **Cmd+Option+I** no Mac)
2. Vá na aba **"Console"**
3. Digite este comando:
   ```javascript
   JSON.parse(localStorage.getItem('studyflow-sent-emails'))
   ```
4. Você verá todos os emails simulados salvos

### Opção 2: Via Interface Web
- Acesse: `http://localhost:5173/emails`
- Você verá uma página com todos os emails "enviados"

### Opção 3: Via Logs Administrativos
1. Faça login como **admin** (`admin@studyflow.com` / `admin123`)
2. Vá para **"Logs"**
3. Procure por ações do tipo "Envio de email de confirmação"

---

## 🚀 Como Fazer Funcionar com Emails Reais

Para enviar emails **de verdade**, você precisaria:

### 1. Integrar com um Serviço de Email

**Opções populares:**
- **SendGrid** (recomendado para iniciantes)
- **AWS SES** (Amazon)
- **Mailgun**
- **Nodemailer** com SMTP próprio

### 2. Modificar o `emailService.ts`

Substituir a função `sendEmail` por uma chamada real à API:

```typescript
sendEmail: async (data: EmailData): Promise<boolean> => {
  try {
    // Exemplo com SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.to }] }],
        from: { email: 'noreply@studyflow.com' },
        subject: data.subject,
        content: [{ type: 'text/html', value: data.body }],
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
}
```

### 3. Configurar Variáveis de Ambiente

Criar um arquivo `.env`:
```
SENDGRID_API_KEY=sua_chave_aqui
EMAIL_FROM=noreply@seu-dominio.com
```

---

## ✅ O Que Funciona Agora

- ✅ Simulação de envio de email
- ✅ Salvamento no localStorage
- ✅ Logs de atividade
- ✅ Interface visual mostrando que o email foi "enviado"
- ✅ Visualização dos emails via Console ou página `/emails`

## ❌ O Que NÃO Funciona

- ❌ Envio real de email para caixa de entrada
- ❌ Recebimento de email no Gmail, Outlook, etc.
- ❌ Notificações por email real

---

## 💡 Resumo

**Este é um sistema de demonstração.** Os emails são simulados apenas para fins de teste e demonstração da funcionalidade. Para produção, seria necessário integrar com um serviço real de envio de emails.

Se você quiser testar o envio real, posso ajudar a configurar uma integração com SendGrid ou outro serviço!


