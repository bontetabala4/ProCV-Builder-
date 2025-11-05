import React, { memo } from 'react';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { useCVStore } from '../../../stores/cvStore';

export const PersonalInfoSection: React.FC = memo(() => {
  const { cvData, updatePersonalInfo } = useCVStore();

  const handleChange = (field: keyof typeof cvData.personalInfo, value: string) => {
    updatePersonalInfo({
      ...cvData.personalInfo,
      [field]: value
    });
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <User className="text-purple-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Informations Personnelles</h2>
          <p className="text-gray-600 text-sm">Vos coordonnées et liens professionnels</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Prénom"
          value={cvData.personalInfo.firstName}
          onChange={(value) => handleChange('firstName', value)}
          placeholder="Votre prénom"
          required
          icon={User}
        />
        
        <Input
          label="Nom"
          value={cvData.personalInfo.lastName}
          onChange={(value) => handleChange('lastName', value)}
          placeholder="Votre nom"
          required
        />
        
        <Input
          label="Email"
          type="email"
          value={cvData.personalInfo.email}
          onChange={(value) => handleChange('email', value)}
          placeholder="email@exemple.com"
          required
          icon={Mail}
        />
        
        <Input
          label="Téléphone"
          type="tel"
          value={cvData.personalInfo.phone}
          onChange={(value) => handleChange('phone', value)}
          placeholder="+33 1 23 45 67 89"
          icon={Phone}
        />
        
        <Input
          label="Adresse"
          value={cvData.personalInfo.address}
          onChange={(value) => handleChange('address', value)}
          placeholder="Ville, Pays"
          icon={MapPin}
        />
        
        <Input
          label="LinkedIn"
          type="url"
          value={cvData.personalInfo.linkedin || ''}
          onChange={(value) => handleChange('linkedin', value)}
          placeholder="https://linkedin.com/in/..."
          icon={Linkedin}
        />
        
        <Input
          label="GitHub"
          type="url"
          value={cvData.personalInfo.github || ''}
          onChange={(value) => handleChange('github', value)}
          placeholder="https://github.com/..."
          icon={Github}
        />
        
        <Input
          label="Portfolio"
          type="url"
          value={cvData.personalInfo.portfolio || ''}
          onChange={(value) => handleChange('portfolio', value)}
          placeholder="https://votre-portfolio.com"
          icon={Globe}
        />
      </div>
    </Card>
  );
});