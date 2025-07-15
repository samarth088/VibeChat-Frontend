import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import Toast from './components/Toast';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/login" element={<LoginPage showToast={showToast} />} />
              <Route path="/register" element={<RegisterPage showToast={showToast} />} />
              <Route path="/" element={
                <PrivateRoute><HomePage /></PrivateRoute>
              } />
              <Route path="/chat/:username" element={
                <PrivateRoute><ChatPage /></PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute><ProfilePage showToast={showToast} /></PrivateRoute>
              } />
            </Routes>
          </div>
          {toast.show && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast({ show: false, message: '', type: '' })} 
            />
          )}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
