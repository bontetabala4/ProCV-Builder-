import React from 'react';
import { Check, Clock, AlertCircle, Cloud, CloudOff } from 'lucide-react';

interface SaveIndicatorProps {
  status: 'saved' | 'saving' | 'error' | 'unsaved';
  lastSaved?: Date;
  autoSaveEnabled?: boolean;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ 
  status, 
  lastSaved,
  autoSaveEnabled = true
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'saved':
        return {
          icon: Check,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          text: 'Sauvegardé',
          subText: lastSaved ? `Dernière sauvegarde: ${lastSaved.toLocaleTimeString()}` : undefined
        };
      case 'saving':
        return {
          icon: Clock,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          text: 'Sauvegarde...'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          text: 'Erreur de sauvegarde'
        };
      case 'unsaved':
        return {
          icon: CloudOff,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          text: 'Modifications non sauvegardées'
        };
      default:
        return {
          icon: Cloud,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          text: 'Prêt'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-2">
        <div className={`p-1 rounded-full ${config.bgColor}`}>
          <Icon size={14} className={config.color} />
        </div>
        <span className={config.color}>{config.text}</span>
        
        {!autoSaveEnabled && (
          <span className="text-xs text-gray-500">(Sauvegarde manuelle)</span>
        )}
      </div>
      
      {config.subText && (
        <span className="text-gray-500 text-xs hidden sm:block">
          {config.subText}
        </span>
      )}
    </div>
  );
};