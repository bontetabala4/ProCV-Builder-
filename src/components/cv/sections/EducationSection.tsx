import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { useCVStore } from '../../../stores/cvStore';
import type { Education } from '../../../types/cv.types';

export const EducationSection: React.FC = () => {
  const { cvData, addEducation, removeEducation } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);

  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleAddEducation = () => {
    if (!newEducation.institution || !newEducation.degree || !newEducation.startDate) {
      return;
    }

    const education: Education = {
      ...newEducation,
      id: `edu-${Date.now()}`
    };

    addEducation(education);
    setNewEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setIsAdding(false);
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <GraduationCap className="text-green-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Formation</h2>
          <p className="text-gray-600 text-sm">Ajoutez votre parcours académique</p>
        </div>
      </div>

      {/* Liste des formations */}
      <div className="space-y-4 mb-6">
        {cvData.education.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-green-600">{edu.institution}</p>
                {edu.field && (
                  <p className="text-gray-600 text-sm">{edu.field}</p>
                )}
                <p className="text-sm text-gray-500">
                  {new Date(edu.startDate).toLocaleDateString('fr-FR')} -{' '}
                  {edu.current ? 'Présent' : new Date(edu.endDate!).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            {edu.description && (
              <p className="text-gray-600 text-sm">{edu.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Formulaire d'ajout */}
      {isAdding ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Nouvelle formation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Diplôme"
              value={newEducation.degree}
              onChange={(value) => setNewEducation(prev => ({ ...prev, degree: value }))}
              placeholder="Master en Informatique"
              required
            />
            
            <Input
              label="Établissement"
              value={newEducation.institution}
              onChange={(value) => setNewEducation(prev => ({ ...prev, institution: value }))}
              placeholder="Nom de l'université"
              required
            />
            
            <Input
              label="Domaine d'étude"
              value={newEducation.field}
              onChange={(value) => setNewEducation(prev => ({ ...prev, field: value }))}
              placeholder="Informatique, Génie Logiciel..."
            />
            
            <Input
              label="Date de début"
              type="date"
              value={newEducation.startDate}
              onChange={(value) => setNewEducation(prev => ({ ...prev, startDate: value }))}
              required
            />
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Input
                  label="Date de fin"
                  type="date"
                  value={newEducation.endDate}
                  onChange={(value) => setNewEducation(prev => ({ 
                    ...prev, 
                    endDate: value,
                    current: false 
                  }))}
                  disabled={newEducation.current}
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newEducation.current}
                    onChange={(e) => setNewEducation(prev => ({ 
                      ...prev, 
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : prev.endDate
                    }))}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  En cours
                </label>
              </div>
            </div>
          </div>

          <Textarea
            label="Description"
            value={newEducation.description}
            onChange={(value) => setNewEducation(prev => ({ ...prev, description: value }))}
            placeholder="Détails sur la formation, projets réalisés..."
          />

          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddEducation}>
              <Plus size={16} />
              Ajouter
            </Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setIsAdding(true)}>
          <Plus size={16} />
          Ajouter une formation
        </Button>
      )}

      {/* Indicateur */}
      {cvData.education.length === 0 && !isAdding && (
        <div className="text-center py-6 text-gray-500">
          <GraduationCap className="mx-auto mb-2 text-gray-400" size={32} />
          <p>Aucune formation ajoutée</p>
        </div>
      )}
    </Card>
  );
};