import React from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Card } from '../components/Card';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { emailService } from '../services/emailService';

export const ViewEmails: React.FC = () => {
  const sentEmails = emailService.getSentEmails();

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
              Emails Enviados
            </h1>
            <p className="text-[#AAAAAA] dark:text-gray-400">
              Visualize todos os emails enviados pelo sistema (Demonstração)
            </p>
          </div>
        </div>

        {sentEmails.length > 0 ? (
          <div className="space-y-4">
            {sentEmails.map((email, index) => (
              <Card key={index}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Mail size={24} className="text-[#4A90E2]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#333333] dark:text-white">
                        {email.subject}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                        {email.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-2">
                      <strong>Para:</strong> {email.to}
                    </p>
                    <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-3">
                      <strong>Enviado em:</strong>{' '}
                      {format(new Date(email.sentAt), "dd 'de' MMM 'de' yyyy 'às' HH:mm:ss", { locale: ptBR })}
                    </p>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-xs font-medium text-[#333333] dark:text-white mb-2">
                        Conteúdo do Email:
                      </p>
                      <div
                        className="text-sm text-[#AAAAAA] dark:text-gray-400"
                        dangerouslySetInnerHTML={{ __html: email.body }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <Mail size={48} className="mx-auto text-[#AAAAAA] dark:text-gray-400 mb-4" />
              <p className="text-[#AAAAAA] dark:text-gray-400">
                Nenhum email foi enviado ainda.
              </p>
              <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mt-2">
                Crie uma conta para ver o primeiro email de confirmação aqui.
              </p>
            </div>
          </Card>
        )}

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>ℹ️ Nota:</strong> Este é um sistema de demonstração. Os emails são simulados e salvos apenas no navegador.
            Em produção, os emails seriam enviados através de um serviço real de email (SendGrid, AWS SES, etc.).
          </p>
        </div>
      </div>
    </div>
  );
};


