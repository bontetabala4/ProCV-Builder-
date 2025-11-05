import React from 'react';
import { Card } from '../components/ui/Card';
import { DataManagement } from '../components/settings/DataManagement';
import { Moon, Download } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Paramètres
          </h1>
          <p className="text-gray-600">
            Personnalisez votre expérience ProCV Builder
          </p>
        </header>

        <div className="space-y-6">
          
          {/* Data Management */}
          <DataManagement />

          {/* Export Preferences */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="text-green-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Préférences d'export
                </h2>
                <p className="text-gray-600 text-sm">
                  Configurez le comportement des exports
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Qualité par défaut
                  </h3>
                  <p className="text-sm text-gray-600">
                    Qualité d'export PDF/PNG
                  </p>
                </div>
                <select className="input-field w-40">
                  <option value="standard">Standard</option>
                  <option value="high">Haute qualité</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Nom de fichier automatique
                  </h3>
                  <p className="text-sm text-gray-600">
                    Générer le nom de fichier automatiquement
                  </p>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  defaultChecked 
                />
              </div>
            </div>
          </Card>

          {/* Interface Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Moon className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Interface
                </h2>
                <p className="text-gray-600 text-sm">
                  Personnalisez l'apparence
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Mode sombre
                  </h3>
                  <p className="text-sm text-gray-600">
                    Basculer vers le thème sombre
                  </p>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Animations
                  </h3>
                  <p className="text-sm text-gray-600">
                    Activer les animations de l'interface
                  </p>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  defaultChecked 
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};