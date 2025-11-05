import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Lock, Eye, EyeOff, FileText } from 'lucide-react';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ Utiliser le callback de valeur directement
  const handleEmailChange = (value: string) => {
    setFormData(prev => ({ ...prev, email: value }));
  };

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, password: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { ...formData, rememberMe });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">ProCV Builder</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Connexion à votre compte</h2>
          <p className="text-gray-600 mt-2">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Card de connexion */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Input
                label="Adresse email"
                type="email"
                value={formData.email}
                onChange={handleEmailChange} // ✅ Utilise le callback de valeur
                placeholder="votre@email.com"
                required
                icon={Mail}
              />
            </div>

            {/* Mot de passe */}
            <div>
              <div className="relative">
                <Input
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handlePasswordChange} // ✅ Utilise le callback de valeur
                  placeholder="Votre mot de passe"
                  required
                  icon={Lock}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de connexion */}
            <Button type="submit" variant="primary" className="w-full">
              Se connecter
            </Button>

            {/* Inscription */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};