import React from 'react';
import { Card } from '../../ui/Card';
import { Textarea } from '../../ui/Textarea';
import { User } from 'lucide-react';
import { useCVStore } from '../../../stores/cvStore';

export const SummarySection: React.FC = () => {
  const { cvData, updateSummary } = useCVStore();

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <User className="text-orange-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Résumé Professionnel</h2>
          <p className="text-gray-600 text-sm">Décrivez votre profil en quelques phrases</p>
        </div>
      </div>

      <Textarea
        label="Résumé"
        value={cvData.summary}
        onChange={updateSummary}
        placeholder="Développeur passionné avec 5 ans d'expérience en React et Node.js. Spécialisé dans la création d'applications web performantes et évolutives. Toujours à la recherche de nouveaux défis techniques..."
      />

      <div className="mt-3 text-sm text-gray-500">
        {cvData.summary.length}/500 caractères
      </div>

      {/* Conseils */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 text-sm mb-2">💡 Conseils pour un bon résumé :</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Commencez par votre titre ou domaine principal</li>
          <li>• Mentionnez vos années d'expérience</li>
          <li>• Citez 2-3 compétences clés</li>
          <li>• Terminez par votre objectif professionnel</li>
        </ul>
      </div>
    </Card>
  );
};