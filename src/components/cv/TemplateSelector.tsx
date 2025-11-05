import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Eye, Check, Star } from 'lucide-react';
import { cvTemplates } from '../../lib/templates/cvTemplates';
import { useCVStore } from '../../stores/cvStore';

export const TemplateSelector: React.FC = () => {
  const { currentTemplate, setTemplate, cvData } = useCVStore();

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      pink: 'bg-pink-100 text-pink-600 border-pink-200'
    };
    return colors[color] || colors.blue;
  };

  const handleTemplateSelect = (templateId: string) => {
    setTemplate(templateId);
  };

  const isRecommended = (templateId: string) => {
    // Logique de recommandation basée sur le contenu du CV
    const hasTechnicalSkills = cvData.skills.some(skill => 
      ['frontend', 'backend', 'devops', 'tools'].includes(skill.category)
    );
    const hasManagementExp = cvData.experiences.some(exp => 
      exp.position.toLowerCase().includes('manager') || 
      exp.position.toLowerCase().includes('lead') ||
      exp.position.toLowerCase().includes('director')
    );

    if (hasTechnicalSkills && templateId === 'technical') return true;
    if (hasManagementExp && templateId === 'executive') return true;
    if (templateId === 'modern') return true; // Toujours recommander moderne
    
    return false;
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Star className="text-purple-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Choisir un Template</h2>
          <p className="text-gray-600 text-sm">Sélectionnez le design qui correspond à votre profil</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cvTemplates.map((template) => {
          const isSelected = currentTemplate === template.id;
          const recommended = isRecommended(template.id);

          return (
            <div
              key={template.id}
              className={`relative border-2 rounded-xl transition-all cursor-pointer hover:shadow-md ${
                isSelected 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Badge Recommandé */}
              {recommended && (
                <div className="absolute -top-2 -right-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Recommandé
                  </span>
                </div>
              )}

              {/* Preview */}
              <div className="h-32 bg-linear-to-br from-gray-50 to-gray-100 rounded-t-lg relative overflow-hidden">
                {/* Simulation de contenu CV selon le template */}
                <div className="absolute inset-0 p-3">
                  {template.id === 'modern' && (
                    <div className="space-y-1">
                      <div className="h-3 bg-blue-500 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3 mt-2"></div>
                    </div>
                  )}
                  {template.id === 'executive' && (
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-700 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-400 rounded w-1/3"></div>
                      <div className="h-1 bg-gray-300 rounded w-full mt-2"></div>
                    </div>
                  )}
                  {template.id === 'technical' && (
                    <div className="space-y-1">
                      <div className="h-3 bg-green-500 rounded w-3/4"></div>
                      <div className="flex gap-1 mt-1">
                        <div className="h-2 bg-green-300 rounded flex-1"></div>
                        <div className="h-2 bg-green-300 rounded flex-1"></div>
                      </div>
                    </div>
                  )}
                  {template.id === 'creative' && (
                    <div className="space-y-1">
                      <div className="h-3 bg-purple-500 rounded w-2/3"></div>
                      <div className="h-2 bg-purple-300 rounded w-1/2" style={{ transform: 'skewX(-10deg)' }}></div>
                    </div>
                  )}
                  {template.id === 'minimal' && (
                    <div className="space-y-1">
                      <div className="h-3 bg-orange-500 rounded w-4/5"></div>
                      <div className="h-1 bg-gray-300 rounded w-full"></div>
                      <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Template */}
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  {isSelected && (
                    <Check size={16} className="text-blue-500 shrink-0 mt-1" />
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{template.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorClasses(template.color)}`}>
                    {template.category}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Ouvrir preview modal
                    }}
                  >
                    <Eye size={14} />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info sélection */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm text-blue-800">
              <strong>Template sélectionné :</strong>{' '}
              {cvTemplates.find(t => t.id === currentTemplate)?.name}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Votre CV sera généré avec ce design. Vous pouvez changer à tout moment.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};