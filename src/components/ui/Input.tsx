import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  id,
  name,
  label,
  disabled = false,
  icon: Icon,
}) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';
  const disabledClasses = disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : '';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange?.(e.target.value);
    }
  };

  const inputElement = (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${baseClasses} ${disabledClasses} ${Icon ? 'pl-10' : ''} ${className}`}
      />
    </div>
  );

  if (label) {
    return (
      <div>
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium mb-2 ${
            disabled ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
        {inputElement}
      </div>
    );
  }

  return inputElement;
};