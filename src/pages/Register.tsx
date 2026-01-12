import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { BookOpen, AlertCircle, Mail, CheckCircle2 } from 'lucide-react';
import { emailService } from '../services/emailService';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Obtém configurações globais do localStorage (fallback se não houver contexto)
  const getGlobalSettings = () => {
    try {
      const saved = localStorage.getItem('studyflow-global-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Se emailNotifications não existir ou for undefined, considera como true (habilitado)
        const emailEnabled = parsed.emailNotifications === undefined ? true : parsed.emailNotifications !== false;
        return { 
          emailNotifications: emailEnabled, 
          registrationEnabled: parsed.registrationEnabled !== false 
        };
      }
      // Por padrão, emails estão habilitados
      return { emailNotifications: true, registrationEnabled: true };
    } catch (error) {
      console.warn('Erro ao ler configurações globais:', error);
      // Em caso de erro, assume que está habilitado
      return { emailNotifications: true, registrationEnabled: true };
    }
  };

  const globalSettings = getGlobalSettings();
  
  // Log para debug
  console.log('📧 [Register] Configurações de email:', globalSettings.emailNotifications);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    setEmailSent(false);

    try {
      // Simula obtenção de IP (em produção viria do servidor)
      const simulatedIP = `192.168.1.${Math.floor(Math.random() * 255)}`;
      const successResult = await register(name, email, password, simulatedIP);
      
      if (successResult) {
        setSuccess(true);
        
        // SEMPRE tenta enviar email (a menos que explicitamente desabilitado)
        // Aguarda um pouco para garantir que tudo está salvo
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verifica se emails estão habilitados (por padrão estão)
        const shouldSendEmail = globalSettings.emailNotifications !== false;
        console.log('📧 [Register] Deve enviar email?', shouldSendEmail);
        
        if (shouldSendEmail) {
          try {
            console.log('📧 [Register] ===== INICIANDO ENVIO DE EMAIL =====');
            console.log('📧 [Register] Para:', email);
            console.log('📧 [Register] Nome:', name);
            
            // Envia o email
            const sent = await emailService.sendConfirmationEmail(email, name);
            
            console.log('📧 [Register] ===== RESULTADO DO ENVIO =====');
            console.log('📧 [Register] Email enviado?', sent);
            
            if (sent) {
              setEmailSent(true);
              setLoading(false);
              
              // Verifica se o email foi realmente salvo
              const emails = emailService.getSentEmails();
              console.log('📧 [Register] Total de emails no sistema:', emails.length);
              if (emails.length > 0) {
                console.log('📧 [Register] Último email salvo:', emails[emails.length - 1]);
              }
              
              // Adiciona log do envio de email
              const addLog = (window as any).__addActivityLog;
              if (addLog) {
                setTimeout(() => {
                  const currentUser = JSON.parse(localStorage.getItem('studyflow-user') || '{}');
                  if (currentUser.id) {
                    addLog(
                      currentUser.id,
                      email,
                      'Envio de email de confirmação',
                      `Email de confirmação enviado para ${email}`,
                      `192.168.1.${Math.floor(Math.random() * 255)}`
                    );
                  }
                }, 300);
              }
              
              // Redireciona após 6 segundos para dar tempo de ver a mensagem
              setTimeout(() => {
                navigate('/dashboard');
              }, 6000);
            } else {
              setLoading(false);
              console.error('❌ [Register] Email retornou false');
              setError('Conta criada, mas houve um problema ao enviar o email. Você pode fazer login normalmente.');
              setTimeout(() => {
                navigate('/dashboard');
              }, 4000);
            }
          } catch (emailError) {
            console.error('❌ [Register] ERRO ao enviar email:', emailError);
            setLoading(false);
            setError('Conta criada, mas houve um erro ao enviar o email. Você pode fazer login normalmente.');
            setTimeout(() => {
              navigate('/dashboard');
            }, 4000);
          }
        } else {
          // Se notificações por email estiverem desabilitadas
          setLoading(false);
          console.log('ℹ️ [Register] Emails desabilitados nas configurações globais');
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } else {
        setError('Email já está em uso');
        setLoading(false);
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#4A90E2] rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-[#333333] dark:text-white">StudyFlow</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
            Criar conta
          </h1>
          <p className="text-[#AAAAAA] dark:text-gray-400">
            Comece a organizar seus estudos hoje
          </p>
        </div>

        <Card>
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
              <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
              <span className="text-sm text-red-600 dark:text-red-400 flex-1">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={20} className="text-green-600 dark:text-green-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                    Conta criada com sucesso! ✅
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Você será redirecionado para o dashboard em instantes...
                  </p>
                </div>
              </div>
              {emailSent && (
                <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-300 dark:border-green-600 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                      <Mail size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-800 dark:text-green-300 mb-2">
                        📧 Email de confirmação enviado com sucesso!
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mt-2">
                        <p className="text-sm text-[#333333] dark:text-white mb-1">
                          <strong>Destinatário:</strong> {email}
                        </p>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border-2 border-red-300 dark:border-red-600 mt-2 mb-3">
                          <p className="text-sm text-red-800 dark:text-red-300 font-bold mb-2">
                            ⚠️ IMPORTANTE: EMAIL NÃO ENVIADO REALMENTE
                          </p>
                          <p className="text-xs text-red-700 dark:text-red-400 mb-2">
                            Este é um sistema de <strong>DEMONSTRAÇÃO</strong>. O email foi <strong>SIMULADO</strong> e <strong>NÃO foi enviado para sua caixa de entrada real</strong>.
                          </p>
                          <p className="text-xs text-red-600 dark:text-red-500">
                            O email foi apenas salvo no navegador (localStorage) para fins de teste e demonstração.
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                          <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold mb-2">
                            📋 Como ver o email simulado:
                          </p>
                          <ol className="text-xs text-blue-700 dark:text-blue-400 list-decimal list-inside space-y-1">
                            <li>Abra o Console do navegador (pressione <strong>F12</strong>)</li>
                            <li>Vá na aba "Console"</li>
                            <li>Digite: <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded text-xs font-mono">JSON.parse(localStorage.getItem('studyflow-sent-emails'))</code></li>
                            <li>Ou faça login como admin e vá para "Logs" para ver todas as atividades</li>
                          </ol>
                        </div>
                      </div>
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-2">
                          ℹ️ IMPORTANTE: Sistema de Demonstração
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mb-2">
                          Este é um sistema de <strong>demonstração</strong>. O email foi <strong>simulado</strong> e salvo no sistema, mas <strong>NÃO foi enviado para sua caixa de entrada real</strong>.
                        </p>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded mt-2 border border-blue-200 dark:border-blue-600">
                          <p className="text-xs text-[#333333] dark:text-white font-medium mb-1">
                            📋 Como verificar o email:
                          </p>
                          <ol className="text-xs text-[#AAAAAA] dark:text-gray-400 list-decimal list-inside space-y-1 ml-2">
                            <li>Abra o Console do navegador (F12)</li>
                            <li>Digite: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">JSON.parse(localStorage.getItem('studyflow-sent-emails'))</code></li>
                            <li>Ou acesse os logs administrativos como admin</li>
                          </ol>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-500 mt-2">
                          Em produção, este email seria enviado através de um serviço real (SendGrid, AWS SES, etc.)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!emailSent && success && globalSettings.emailNotifications && (
                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    ⚠️ Conta criada com sucesso, mas houve um problema ao enviar o email. Você pode fazer login normalmente.
                  </p>
                </div>
              )}
              {!globalSettings.emailNotifications && success && (
                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    ℹ️ Notificações por email estão desabilitadas nas configurações globais do sistema.
                  </p>
                </div>
              )}
            </div>
          )}

          {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="João Silva"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="text-xs text-[#AAAAAA] dark:text-gray-400 mt-1">
                Mínimo de 6 caracteres
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            {globalSettings.emailNotifications && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-start space-x-2">
                  <Mail size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                      ⚠️ Sistema de Demonstração
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-2">
                      O email será <strong>SIMULADO</strong> (não enviado realmente). Este é um sistema de demonstração para fins de teste.
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500">
                      O email será salvo no navegador e poderá ser visualizado no Console (F12) ou nos logs administrativos.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Criando conta e enviando email...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={18} className="mr-2" />
                  Conta Criada!
                </>
              ) : (
                <>
                  <Mail size={18} className="mr-2" />
                  Criar conta e enviar email
                </>
              )}
            </Button>
          </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-[#4A90E2] hover:underline font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-[#AAAAAA] dark:text-gray-400 hover:text-[#4A90E2] transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

