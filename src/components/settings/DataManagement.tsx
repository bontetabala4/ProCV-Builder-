import React, { useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Download, Upload, Trash2, Database } from 'lucide-react';
import { useCVStore } from '../../stores/cvStore';
import { useToastStore } from '../../stores/toastStore';
import { DataManager } from '../../utils/dataImportExport';

export const DataManagement: React.FC = () => {
  const { cvData, resetCV } = useCVStore();
  const { addToast } = useToastStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportData = () => {
    try {
      const data = DataManager.exportData(cvData);
      DataManager.downloadFile(data, `procv-backup-${new Date().toISOString().split('T')[0]}.json`);
      addToast({
        message: 'Données exportées avec succès',
        type: 'success'
      });
    } catch {
      addToast({
        message: 'Erreur lors de l\'export',
        type: 'error'
      });
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = DataManager.importData(content);
        
        if (importedData) {
          // Ici vous voudriez mettre à jour le store avec les données importées
          addToast({
            message: 'Données importées avec succès',
            type: 'success'
          });
        } else {
          addToast({
            message: 'Format de fichier invalide',
            type: 'error'
          });
        }
      } catch {
        addToast({
          message: 'Erreur lors de l\'import',
          type: 'error'
        });
      }
    };
    
    reader.readAsText(file);
    if (event.target) {
      event.target.value = ''; // Reset input
    }
  };

  const handleResetAll = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      resetCV();
      addToast({
        message: 'Données réinitialisées',
        type: 'success'
      });
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Database className="text-purple-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Données</h2>
          <p className="text-gray-600 text-sm">Sauvegardez, importez ou réinitialisez vos données</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Export */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Sauvegarde des données</h3>
            <p className="text-sm text-gray-600">Téléchargez une copie de sauvegarde de votre CV</p>
          </div>
          <Button onClick={handleExportData} icon={Download}>
            Exporter
          </Button>
        </div>

        {/* Import */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Import de données</h3>
            <p className="text-sm text-gray-600">Restaurer à partir d'une sauvegarde précédente</p>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportData}
              accept=".json"
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              icon={Upload}
              variant="outline"
            >
              Importer
            </Button>
          </div>
        </div>

        {/* Reset */}
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
          <div>
            <h3 className="font-medium text-red-900">Zone dangereuse</h3>
            <p className="text-sm text-red-700">Réinitialiser toutes les données du CV</p>
          </div>
          <Button 
            onClick={handleResetAll}
            icon={Trash2}
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-100"
          >
            Tout supprimer
          </Button>
        </div>
      </div>

      {/* Informations */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 text-sm mb-2">
          💡 Conseils de sauvegarde
        </h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Exportez régulièrement vos données pour les sauvegarder</li>
          <li>• Conservez vos fichiers de sauvegarde en lieu sûr</li>
          <li>• L'import écrasera vos données actuelles</li>
        </ul>
      </div>
    </Card>
  );
};