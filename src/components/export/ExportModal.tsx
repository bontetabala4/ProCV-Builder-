import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Download, FileText, Image, Code, Settings } from 'lucide-react';

// Interfaces pour les types
interface ExportOptions {
  quality: 'standard' | 'high';
  includeMargins: boolean;
  fileName: string;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, options: ExportOptions) => void;
}

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    quality: 'high',
    includeMargins: true,
    fileName: 'mon-cv'
  });

  const exportFormats: ExportFormat[] = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Format standard pour impression et envoi',
      icon: FileText,
      color: 'red'
    },
    {
      id: 'png',
      name: 'Image PNG',
      description: 'Image haute qualité pour partage en ligne',
      icon: Image,
      color: 'green'
    },
    {
      id: 'html',
      name: 'HTML',
      description: 'Code source pour intégration web',
      icon: Code,
      color: 'blue'
    }
  ];

  const handleExport = (): void => {
    onExport(selectedFormat, exportOptions);
    onClose();
  };

  const updateFileName = (name: string): void => {
    // Nettoyer le nom de fichier
    const cleanName = name
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    setExportOptions(prev => ({ ...prev, fileName: cleanName }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Exporter le CV"
      size="lg"
    >
      <div className="space-y-6">
        {/* Sélection du format */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Format d'export
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              const isSelected = selectedFormat === format.id;
              
              return (
                <Card
                  key={format.id}
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon 
                        size={20} 
                        className={isSelected ? 'text-blue-600' : 'text-gray-600'} 
                      />
                    </div>
                    <span className="font-semibold text-gray-900">
                      {format.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {format.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Options d'export */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings size={20} />
            Options d'export
          </h3>
          
          <div className="space-y-4">
            {/* Nom du fichier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du fichier
              </label>
              <input
                type="text"
                value={exportOptions.fileName}
                onChange={(e) => updateFileName(e.target.value)}
                className="input-field w-full"
                placeholder="mon-cv-professionnel"
              />
            </div>

            {/* Qualité (pour PDF/PNG) */}
            {(selectedFormat === 'pdf' || selectedFormat === 'png') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualité
                </label>
                <select
                  value={exportOptions.quality}
                  onChange={(e) => setExportOptions(prev => ({
                    ...prev,
                    quality: e.target.value as 'standard' | 'high'
                  }))}
                  className="input-field w-full"
                >
                  <option value="standard">Standard</option>
                  <option value="high">Haute qualité</option>
                </select>
              </div>
            )}

            {/* Marges (pour PDF) */}
            {selectedFormat === 'pdf' && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="includeMargins"
                  checked={exportOptions.includeMargins}
                  onChange={(e) => setExportOptions(prev => ({
                    ...prev,
                    includeMargins: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="includeMargins" className="text-sm text-gray-700">
                  Inclure les marges pour l'impression
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            onClick={handleExport}
            className="flex-1"
            icon={Download}
          >
            Exporter
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
};