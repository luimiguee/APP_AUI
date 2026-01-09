# 🔍 Guia de Debug - Sistema de Emails

## Como Verificar se o Email foi Enviado

### 1. **Abra o Console do Navegador**
   - Pressione `F12` (Windows/Linux) ou `Cmd+Option+I` (Mac)
   - Vá na aba "Console"

### 2. **Crie uma Nova Conta**
   - Acesse `/register`
   - Preencha o formulário e clique em "Criar conta"

### 3. **Verifique as Mensagens no Console**
   Você deve ver uma sequência de mensagens como:
   ```
   📧 [Register] Configurações de email: true
   📧 [Register] Deve enviar email? true
   📧 [Register] ===== INICIANDO ENVIO DE EMAIL =====
   📧 [EmailService] ===== INICIANDO sendEmail =====
   📧 [EmailService] ✅ Email salvo no localStorage!
   📧 [EmailService] ===== EMAIL ENVIADO COM SUCESSO =====
   ```

### 4. **Verificar Email Salvo**
   No Console, digite:
   ```javascript
   JSON.parse(localStorage.getItem('studyflow-sent-emails'))
   ```
   
   Você deve ver um array com os emails enviados.

### 5. **Se Não Aparecer Nada no Console**
   - Verifique se há erros em vermelho
   - Limpe o localStorage: `localStorage.clear()`
   - Recarregue a página e tente novamente

## Problemas Comuns

### ❌ "Email não foi enviado (retornou false)"
**Solução:**
- Verifique se há erros no Console
- Tente limpar o localStorage e criar nova conta

### ❌ "Emails desabilitados nas configurações globais"
**Solução:**
- Como admin, vá para `/admin/configuracoes`
- Habilite "Notificações por Email"
- Ou limpe as configurações globais:
  ```javascript
  localStorage.removeItem('studyflow-global-settings')
  location.reload()
  ```

### ❌ Nenhuma mensagem aparece no Console
**Solução:**
- Verifique se o JavaScript está habilitado
- Verifique se há erros que estão bloqueando o código
- Recarregue a página (Cmd+R ou F5)

## Comandos Úteis para Debug

### Ver todos os emails enviados
```javascript
JSON.parse(localStorage.getItem('studyflow-sent-emails'))
```

### Limpar todos os emails
```javascript
localStorage.removeItem('studyflow-sent-emails')
```

### Ver configurações globais
```javascript
JSON.parse(localStorage.getItem('studyflow-global-settings'))
```

### Habilitar emails (se estiverem desabilitados)
```javascript
const settings = JSON.parse(localStorage.getItem('studyflow-global-settings') || '{}');
settings.emailNotifications = true;
localStorage.setItem('studyflow-global-settings', JSON.stringify(settings));
location.reload();
```

### Limpar tudo e começar do zero
```javascript
localStorage.clear();
location.reload();
```

## Checklist de Verificação

- [ ] Console está aberto (F12)
- [ ] Não há erros em vermelho no Console
- [ ] Mensagens com 📧 aparecem ao criar conta
- [ ] Email aparece na lista quando executa `JSON.parse(localStorage.getItem('studyflow-sent-emails'))`
- [ ] Mensagem verde de sucesso aparece na tela após criar conta
- [ ] Card de confirmação de email aparece

## Nota Importante

⚠️ **Este é um sistema de demonstração!**

Os emails são **simulados** e salvos apenas no `localStorage` do navegador. 
- Não são enviados realmente por email
- Não chegam na caixa de entrada
- São apenas salvos para demonstração

Em produção, você precisaria integrar com um serviço real como:
- SendGrid
- AWS SES
- Mailgun
- Nodemailer com SMTP


