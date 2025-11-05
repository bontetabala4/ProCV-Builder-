import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Lock, User, Eye, EyeOff, FileText } from 'lucide-react';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Utiliser les callbacks de valeur directement
  const handleFieldChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">ProCV Builder</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Créez votre compte</h2>
          <p className="text-gray-600 mt-2">
            Commencez à créer des CV professionnels
          </p>
        </div>

        {/* Card d'inscription */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Prénom"
                value={formData.firstName}
                onChange={handleFieldChange('firstName')} // ✅ Utilise le callback de valeur
                placeholder="Votre prénom"
                required
                icon={User}
              />
              
              <Input
                label="Nom"
                value={formData.lastName}
                onChange={handleFieldChange('lastName')} // ✅ Utilise le callback de valeur
                placeholder="Votre nom"
                required
              />
            </div>

            {/* Email */}
            <Input
              label="Adresse email"
              type="email"
              value={formData.email}
              onChange={handleFieldChange('email')} // ✅ Utilise le callback de valeur
              placeholder="votre@email.com"
              required
              icon={Mail}
            />

            {/* Mot de passe */}
            <div className="relative">
              <Input
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleFieldChange('password')} // ✅ Utilise le callback de valeur
                placeholder="Créez un mot de passe"
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

            {/* Confirmation mot de passe */}
            <div className="relative">
              <Input
                label="Confirmer le mot de passe"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleFieldChange('confirmPassword')} // ✅ Utilise le callback de valeur
                placeholder="Confirmez votre mot de passe"
                required
                icon={Lock}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                J'accepte les{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            {/* Bouton d'inscription */}
            <Button type="submit" variant="primary" className="w-full">
              Créer mon compte
            </Button>

            {/* Connexion */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};