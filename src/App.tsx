import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ActivityLogProvider } from './context/ActivityLogContext';
import { SettingsProvider } from './context/SettingsContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardRedirect } from './components/DashboardRedirect';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogs } from './pages/AdminLogs';
import { AdminUsers } from './pages/AdminUsers';
import { AdminSettings } from './pages/AdminSettings';
import { Settings } from './pages/Settings';
import { Tarefas } from './pages/Tarefas';
import { Calendario } from './pages/Calendario';
import { Perfil } from './pages/Perfil';
import { EditProfile } from './pages/EditProfile';
import { ViewEmails } from './pages/ViewEmails';

function App() {
  // Para GitHub Pages, o base path será o nome do repositório
  // Exemplo: /APP_AUI/ ou /studyflow/
  // Se o repositório for username.github.io, deixe basename vazio
  const basename = '/APP_AUI'; // Ajuste conforme o nome do seu repositório

  return (
    <ThemeProvider>
      <AuthProvider>
        <ActivityLogProvider>
          <SettingsProvider>
            <TaskProvider>
              <Router basename={basename}>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/emails" element={<ViewEmails />} />
              
              {/* Rotas protegidas - Estudante */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['estudante']}>
                    <Navbar />
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tarefas"
                element={
                  <ProtectedRoute allowedRoles={['estudante', 'admin']}>
                    <Navbar />
                    <Tarefas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendario"
                element={
                  <ProtectedRoute allowedRoles={['estudante', 'admin']}>
                    <Navbar />
                    <Calendario />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute allowedRoles={['estudante', 'admin']}>
                    <Navbar />
                    <Perfil />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/perfil/editar"
                element={
                  <ProtectedRoute allowedRoles={['estudante', 'admin']}>
                    <Navbar />
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/configuracoes"
                element={
                  <ProtectedRoute allowedRoles={['estudante', 'admin']}>
                    <Navbar />
                    <Settings />
                  </ProtectedRoute>
                }
              />
              
              {/* Rotas protegidas - Admin */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Navbar />
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/logs"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Navbar />
                    <AdminLogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/usuarios"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Navbar />
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/configuracoes"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Navbar />
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              
              {/* Redirecionamento padrão */}
              <Route
                path="/dashboard-redirect"
                element={
                  <ProtectedRoute>
                    <DashboardRedirect />
                  </ProtectedRoute>
                }
              />
            </Routes>
              </Router>
            </TaskProvider>
          </SettingsProvider>
        </ActivityLogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

