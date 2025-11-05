import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { History, Clock, Trash2, RotateCcw, Tag } from 'lucide-react';
import { useVersionStore } from '../../stores/versionStore';
import { useCVStore } from '../../stores/cvStore';
import type { CVVersion } from '../../stores/versionStore';

export const VersionHistory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { versions, restoreVersion, deleteVersion, clearOldVersions } = useVersionStore();
  const { resetCV } = useCVStore();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVersionLabel = (version: CVVersion) => {
    if (version.label) return version.label;
    return version.isAutoSave ? 'Sauvegarde automatique' : 'Sauvegarde manuelle';
  };

  const handleRestore = (versionId: string) => {
    const versionData = restoreVersion(versionId);
    if (versionData) {
      resetCV();
      setIsOpen(false);
    }
  };

  const handleDeleteAll = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique ?')) {
      clearOldVersions();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        icon={History}
      >
        Historique
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Historique des versions"
        size="xl"
      >
        <div className="space-y-4">
          {/* En-tête */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {versions.length} version{versions.length > 1 ? 's' : ''} sauvegardée{versions.length > 1 ? 's' : ''}
            </p>
            {versions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAll}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={14} />
                Tout supprimer
              </Button>
            )}
          </div>

          {/* Liste des versions */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {versions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History className="mx-auto mb-3 text-gray-400" size={48} />
                <p>Aucune version sauvegardée</p>
                <p className="text-sm">Les sauvegardes automatiques apparaîtront ici</p>
              </div>
            ) : (
              versions.map((version) => (
                <Card key={version.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {version.isAutoSave ? (
                          <Clock size={16} className="text-gray-400" />
                        ) : (
                          <Tag size={16} className="text-blue-400" />
                        )}
                        <h3 className="font-medium text-gray-900">
                          {getVersionLabel(version)}
                        </h3>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>CV: {version.cvData.title}</p>
                        <p>Modifié le: {formatDate(version.timestamp)}</p>
                        <p className="text-xs">
                          {version.cvData.experiences.length} expérience{version.cvData.experiences.length > 1 ? 's' : ''} • 
                          {' '}{version.cvData.education.length} formation{version.cvData.education.length > 1 ? 's' : ''} • 
                          {' '}{version.cvData.skills.length} compétence{version.cvData.skills.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestore(version.id)}
                        icon={RotateCcw}
                      >
                        Restaurer
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteVersion(version.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Informations */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 text-sm mb-2">
              💡 Comment fonctionne l'historique ?
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Sauvegarde automatique toutes les 2 secondes lors des modifications</li>
              <li>• Maximum 50 versions conservées</li>
              <li>• Les versions les plus anciennes sont automatiquement supprimées</li>
              <li>• Protection contre la perte de données en cas de fermeture accidentelle</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};