
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { ToastProvider } from './components/providers/ToastProvider';
import { Dashboard } from './pages/Dashboard';
import { CVBuilder } from './pages/CVBuilder';
import { CoverBuilder } from './pages/CoverBuilder';
import { Templates } from './pages/Templates';
import { Settings } from './pages/Settings';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

import './App.css';

function App() {
  return (
    <div className="app">
      <ToastProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cv-builder" element={<CVBuilder />} />
            <Route path="/cover-builder" element={<CoverBuilder />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </ToastProvider>
    </div>
  );
}

export default App;