import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Plus, Trash2, Star, Code, Server, Wrench, Users } from 'lucide-react'; // Remplacer Tool par Wrench
import { useCVStore } from '../../../stores/cvStore';
import type { Skill } from '../../../types/cv.types';

export const SkillsSection: React.FC = () => {
  const { cvData, addSkill, removeSkill } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);

  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'intermediate',
    category: 'frontend'
  });

  const skillCategories = [
    { id: 'frontend', name: 'Frontend', icon: Code, color: 'blue' },
    { id: 'backend', name: 'Backend', icon: Server, color: 'green' },
    { id: 'devops', name: 'DevOps', icon: Wrench, color: 'purple' }, // Utiliser Wrench
    { id: 'tools', name: 'Outils', icon: Wrench, color: 'orange' }, // Utiliser Wrench
    { id: 'soft', name: 'Soft Skills', icon: Users, color: 'pink' }
  ];

  const getLevelStars = (level: Skill['level']) => {
    const stars = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4
    };
    return stars[level];
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      return;
    }

    const skill: Skill = {
      ...newSkill,
      id: `skill-${Date.now()}`
    };

    addSkill(skill);
    setNewSkill({
      name: '',
      level: 'intermediate',
      category: 'frontend'
    });
    setIsAdding(false);
  };

  const skillsByCategory = skillCategories.map(category => ({
    ...category,
    skills: cvData.skills.filter(skill => skill.category === category.id)
  }));

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Star className="text-purple-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Compétences</h2>
          <p className="text-gray-600 text-sm">Ajoutez vos compétences techniques et professionnelles</p>
        </div>
      </div>

      {/* Compétences groupées par catégorie */}
      <div className="space-y-6 mb-6">
        {skillsByCategory.map((category) => (
          category.skills.length > 0 && (
            <div key={category.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <category.icon size={18} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <span className="text-sm text-gray-500 ml-2">
                  ({category.skills.length})
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, index) => (
                          <Star
                            key={index}
                            size={12}
                            className={
                              index < getLevelStars(skill.level)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Formulaire d'ajout */}
      {isAdding ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Nouvelle compétence</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Nom de la compétence"
              value={newSkill.name}
              onChange={(value) => setNewSkill(prev => ({ ...prev, name: value }))}
              placeholder="React, Node.js, Python..."
              required
            />
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                className="input-field"
              >
                {skillCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Niveau
              </label>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill(prev => ({ 
                  ...prev, 
                  level: e.target.value as Skill['level'] 
                }))}
                className="input-field"
              >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddSkill}>
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
          Ajouter une compétence
        </Button>
      )}

      {/* Indicateur */}
      {cvData.skills.length === 0 && !isAdding && (
        <div className="text-center py-6 text-gray-500">
          <Star className="mx-auto mb-2 text-gray-400" size={32} />
          <p>Aucune compétence ajoutée</p>
        </div>
      )}
    </Card>
  );
};