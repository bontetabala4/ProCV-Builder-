import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Plus, Trash2, Building } from 'lucide-react';
import { useCVStore } from '../../../stores/cvStore';
import type { Experience } from '../../../types/cv.types';

export const ExperienceSection: React.FC = () => {
  const { cvData, addExperience, updateExperience, removeExperience } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);

  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: []
  });

  const handleAddExperience = () => {
    if (!newExperience.company || !newExperience.position || !newExperience.startDate) {
      return;
    }

    const experience: Experience = {
      ...newExperience,
      id: `exp-${Date.now()}`
    };

    addExperience(experience);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      technologies: []
    });
    setIsAdding(false);
  };

  const handleAddTechnology = (expId: string, tech: string) => {
    const experience = cvData.experiences.find(exp => exp.id === expId);
    if (experience && tech.trim()) {
      const updatedTech = [...experience.technologies, tech.trim()];
      updateExperience(expId, { technologies: updatedTech });
    }
  };

  const handleRemoveTechnology = (expId: string, techIndex: number) => {
    const experience = cvData.experiences.find(exp => exp.id === expId);
    if (experience) {
      const updatedTech = experience.technologies.filter((_, index) => index !== techIndex);
      updateExperience(expId, { technologies: updatedTech });
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Building className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Expérience Professionnelle</h2>
          <p className="text-gray-600 text-sm">Ajoutez votre parcours professionnel</p>
        </div>
      </div>

      {/* Liste des expériences */}
      <div className="space-y-4 mb-6">
        {cvData.experiences.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-blue-600">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {new Date(exp.startDate).toLocaleDateString('fr-FR')} -{' '}
                  {exp.current ? 'Présent' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('fr-FR') : 'Non spécifié'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            {exp.description && (
              <p className="text-gray-600 text-sm mb-3">{exp.description}</p>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-3">
              {exp.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  {tech}
                  <button
                    onClick={() => handleRemoveTechnology(exp.id, index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Édition des technologies */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ajouter une technologie..."
                className="flex-1 text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement;
                    handleAddTechnology(exp.id, target.value);
                    target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Formulaire d'ajout */}
      {isAdding ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Nouvelle expérience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Poste"
              value={newExperience.position}
              onChange={(value) => setNewExperience(prev => ({ ...prev, position: value }))}
              placeholder="Développeur Frontend"
              required
            />
            
            <Input
              label="Entreprise"
              value={newExperience.company}
              onChange={(value) => setNewExperience(prev => ({ ...prev, company: value }))}
              placeholder="Nom de l'entreprise"
              required
            />
            
            <Input
              label="Date de début"
              type="date"
              value={newExperience.startDate}
              onChange={(value) => setNewExperience(prev => ({ ...prev, startDate: value }))}
              required
            />
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Input
                  label="Date de fin"
                  type="date"
                  value={newExperience.endDate}
                  onChange={(value) => setNewExperience(prev => ({ 
                    ...prev, 
                    endDate: value,
                    current: false 
                  }))}
                  disabled={newExperience.current}
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newExperience.current}
                    onChange={(e) => setNewExperience(prev => ({ 
                      ...prev, 
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : prev.endDate
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Poste actuel
                </label>
              </div>
            </div>
          </div>

          <Textarea
            label="Description"
            value={newExperience.description}
            onChange={(value) => setNewExperience(prev => ({ ...prev, description: value }))}
            placeholder="Décrivez vos responsabilités et réalisations..."
          />

          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddExperience}>
              <Plus size={16} />
              Ajouter l'expérience
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsAdding(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} />
          Ajouter une expérience
        </Button>
      )}

      {/* Indicateur */}
      {cvData.experiences.length === 0 && !isAdding && (
        <div className="text-center py-6 text-gray-500">
          <Building className="mx-auto mb-2 text-gray-400" size={32} />
          <p>Aucune expérience professionnelle ajoutée</p>
        </div>
      )}
    </Card>
  );
};