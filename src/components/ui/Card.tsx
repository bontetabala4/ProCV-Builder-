import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void; // Ajouter onClick
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  onClick,
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseStyles = 'card rounded-xl shadow-soft border border-gray-100';
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : '';

  return (
    <div 
      className={`${baseStyles} ${paddings[padding]} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};