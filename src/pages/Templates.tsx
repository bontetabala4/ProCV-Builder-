import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Eye, Check, Mail } from 'lucide-react';

export const Templates: React.FC = () => {
  // Template Data
  const cvTemplates = [
    {
      id: 'modern',
      name: 'Moderne',
      description: 'Design épuré avec accent sur les compétences techniques',
      category: 'Développement',
      color: 'blue'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Style classique pour postes de direction',
      category: 'Management',
      color: 'gray'
    },
    {
      id: 'creative',
      name: 'Créatif',
      description: 'Parfait pour les métiers du design et marketing',
      category: 'Créatif',
      color: 'purple'
    },
    {
      id: 'technical',
      name: 'Technique',
      description: 'Optimisé pour les postes techniques et ingénierie',
      category: 'Technique',
      color: 'green'
    }
  ];

  // Helper Functions
  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      gray: 'bg-gray-100 text-gray-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Templates
          </h1>
          <p className="text-gray-600">
            Choisissez le design qui correspond à votre profil
          </p>
        </header>

        {/* CV Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cvTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              
              {/* Template Preview */}
              <div className="h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-t-xl relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-20 bg-white shadow-sm rounded border"></div>
                </div>
                
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(template.color)}`}>
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Template Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link to="/cv-builder" className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      <Check size={16} />
                      Utiliser
                    </Button>
                  </Link>
                  
                  <Button variant="outline" size="sm">
                    <Eye size={16} />
                    Aperçu
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Letter Templates Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Templates de lettres
          </h2>
          
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <Mail className="mx-auto mb-4 text-gray-400" size={48} />
            
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Templates de lettres à venir
            </h3>
            
            <p className="text-gray-500 mb-4">
              Nous travaillons sur une sélection de templates de lettres de motivation
            </p>
            
            <Link to="/cover-builder">
              <Button variant="outline">
                Créer une lettre personnalisée
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};