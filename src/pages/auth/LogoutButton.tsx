import React from 'react';
import { Button } from '../../components/ui/Button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogout,
  variant = 'outline',
  size = 'md',
  className = '',
}) => {
  const handleLogout = () => {
    // Logique de déconnexion
    if (onLogout) {
      onLogout();
    } else {
      // Déconnexion par défaut
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      sessionStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      icon={LogOut}
      className={className}
    >
      Déconnexion
    </Button>
  );
};