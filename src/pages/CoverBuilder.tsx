import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, Download, Save } from 'lucide-react';

export const CoverBuilder: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créateur de lettres
          </h1>
          <p className="text-gray-600">
            Rédigez votre lettre de motivation personnalisée
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Editor Column */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="text-green-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Éditeur de lettre
                </h2>
                <p className="text-gray-600 text-sm">
                  Rédigez votre contenu
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Mail className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Éditeur en développement
                </h3>
                <p className="text-gray-500">
                  L'éditeur de lettres de motivation sera disponible prochainement
                </p>
              </div>
            </div>
          </Card>

          {/* Preview Column */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Aperçu de la lettre
              </h2>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50/50 min-h-[400px] flex items-center justify-center">
              <div>
                <Mail className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-500">
                  L'aperçu de votre lettre apparaîtra ici
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <Button 
                variant="primary" 
                icon={Download} 
                className="flex-1"
              >
                Télécharger PDF
              </Button>
              <Button 
                variant="outline" 
                icon={Save} 
                className="flex-1"
              >
                Sauvegarder
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};