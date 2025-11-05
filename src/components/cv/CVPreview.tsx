import React, { useRef, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Download, Settings } from 'lucide-react';
import { useCVStore } from '../../stores/cvStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechnicalTemplate } from './templates/TechnicalTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ExportModal } from '../export/ExportModal';
import { PDFExporter } from '../../utils/export/pdfGenerator';
import { useExportStore } from '../../stores/exportStore';

// Définir l'interface pour les options d'export
interface ExportOptions {
  fileName?: string;
  quality?: 'standard' | 'high';
  includeMargins?: boolean;
}

export const CVPreview: React.FC = () => {
  const { cvData, currentTemplate } = useCVStore();
  const { startExport, finishExport } = useExportStore();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'modern':
        return <ModernTemplate data={cvData} isPreview />;
      case 'executive':
        return <ExecutiveTemplate data={cvData} isPreview />;
      case 'technical':
        return <TechnicalTemplate data={cvData} isPreview />;
      case 'creative':
        return <CreativeTemplate data={cvData} isPreview />;
      case 'minimal':
        return <MinimalTemplate data={cvData} isPreview />;
      default:
        return <ModernTemplate data={cvData} isPreview />;
    }
  };

  const handleExport = async (format: string, options: ExportOptions) => {
    if (!previewRef.current) return;

    try {
      startExport();

      if (format === 'pdf') {
        await PDFExporter.exportToPDF(
          previewRef.current,
          `${options.fileName || 'cv'}.pdf`,
          {
            quality: options.quality === 'high' ? 2 : 1,
            margin: options.includeMargins ? 10 : 0
          }
        );
      } else if (format === 'png') {
        // Implémenter l'export PNG
        console.log('Export PNG à implémenter');
      } else if (format === 'html') {
        // Implémenter l'export HTML
        console.log('Export HTML à implémenter');
      }

      finishExport();
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      finishExport();
      alert('Erreur lors de l\'export. Veuillez réessayer.');
    }
  };

  const handleQuickPDFExport = async () => {
    if (!previewRef.current) return;

    try {
      startExport();
      await PDFExporter.exportToPDF(
        previewRef.current,
        `cv-${cvData.personalInfo.firstName}-${cvData.personalInfo.lastName || 'profil'}.pdf`
      );
      finishExport();
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      finishExport();
      alert('Erreur lors de l\'export PDF. Veuillez réessayer.');
    }
  };

  return (
    <>
      <Card className="sticky top-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Aperçu du CV</h2>
            <p className="text-gray-600 text-sm">
              Template: {currentTemplate.charAt(0).toUpperCase() + currentTemplate.slice(1)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsExportModalOpen(true)}
            >
              <Settings size={16} />
              Options
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              icon={Download}
              onClick={handleQuickPDFExport}
            >
              PDF
            </Button>
          </div>
        </div>
        
        {/* Zone d'aperçu avec scroll */}
        <div 
          ref={previewRef}
          className="border border-gray-200 rounded-lg bg-white"
          data-export="true"
        >
          <div className="h-[800px] overflow-y-auto">
            {renderTemplate()}
          </div>
        </div>

        {/* Indicateur de template */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Template actuel:</span>
            <span className="font-medium text-gray-900 capitalize">{currentTemplate}</span>
          </div>
        </div>
      </Card>

      {/* Modal d'export */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </>
  );
};