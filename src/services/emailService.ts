// Serviço simulado de envio de emails
// Em produção, isso seria uma integração com um serviço real como SendGrid, AWS SES, etc.

interface EmailData {
  to: string;
  subject: string;
  body: string;
  type: 'confirmation' | 'notification' | 'reset';
}

export const emailService = {
  // Simula envio de email
  sendEmail: async (data: EmailData): Promise<boolean> => {
    try {
      console.log('📧 [EmailService] ===== INICIANDO sendEmail =====');
      console.log('📧 [EmailService] Dados do email:', data);
      
      // Simula delay de rede
      console.log('📧 [EmailService] Simulando delay de envio...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Em produção, faria uma chamada à API
      console.log('📧 [EmailService] ✅ Email processado com sucesso');
      console.log('📧 [EmailService] Destinatário:', data.to);
      console.log('📧 [EmailService] Assunto:', data.subject);
      console.log('📧 [EmailService] Tipo:', data.type);
      console.log('📧 [EmailService] Timestamp:', new Date().toISOString());

      // Salva o email no localStorage para visualização (apenas para demonstração)
      console.log('📧 [EmailService] Salvando email no localStorage...');
      const existingEmails = localStorage.getItem('studyflow-sent-emails');
      const sentEmails = existingEmails ? JSON.parse(existingEmails) : [];
      
      const emailRecord = {
        ...data,
        sentAt: new Date().toISOString(),
        status: 'sent',
      };
      
      sentEmails.push(emailRecord);
      localStorage.setItem('studyflow-sent-emails', JSON.stringify(sentEmails));

      console.log('📧 [EmailService] ✅ Email salvo no localStorage!');
      console.log('📧 [EmailService] Total de emails salvos:', sentEmails.length);
      console.log('📧 [EmailService] Email recém-adicionado:', emailRecord);
      
      // Verifica se realmente foi salvo
      const verify = JSON.parse(localStorage.getItem('studyflow-sent-emails') || '[]');
      console.log('📧 [EmailService] Verificação: Total após salvar =', verify.length);
      
      console.log('📧 [EmailService] ===== EMAIL ENVIADO COM SUCESSO =====');
      return true;
    } catch (error) {
      console.error('❌ [EmailService] ERRO ao enviar email:', error);
      console.error('❌ [EmailService] Stack:', (error as Error).stack);
      return false;
    }
  },

  // Envia email de confirmação de registro
  sendConfirmationEmail: async (email: string, name: string): Promise<boolean> => {
    return emailService.sendEmail({
      to: email,
      subject: 'Bem-vindo ao StudyFlow! Confirme sua conta',
      body: `
        <h2>Olá, ${name}!</h2>
        <p>Obrigado por se registrar no StudyFlow.</p>
        <p>Sua conta foi criada com sucesso!</p>
        <p>Agora você pode começar a organizar seus estudos de forma eficiente.</p>
        <br>
        <p>Atenciosamente,<br>Equipe StudyFlow</p>
      `,
      type: 'confirmation',
    });
  },

  // Envia email de notificação
  sendNotificationEmail: async (email: string, subject: string, message: string): Promise<boolean> => {
    return emailService.sendEmail({
      to: email,
      subject,
      body: message,
      type: 'notification',
    });
  },

  // Obtém emails enviados (apenas para demonstração/admin)
  getSentEmails: (): Array<EmailData & { sentAt: string; status: string }> => {
    return JSON.parse(localStorage.getItem('studyflow-sent-emails') || '[]');
  },
};

