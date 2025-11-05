import React, { useState, useEffect } from 'react';
import { PersonalInfoSection } from '../components/cv/sections/PersonalInfoSection';
import { SummarySection } from '../components/cv/sections/SummarySection';
import { ExperienceSection } from '../components/cv/sections/ExperienceSection';
import { EducationSection } from '../components/cv/sections/EducationSection';
import { SkillsSection } from '../components/cv/sections/SkillsSection';
import { TemplateSelector } from '../components/cv/TemplateSelector';
import { CVPreview } from '../components/cv/CVPreview';
import { VersionHistory } from '../components/cv/VersionHistory';
import { AISuggestions } from '../components/ai/AISuggestions';
import { SaveIndicator } from '../components/ui/SaveIndicator';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Save, Download } from 'lucide-react';
import { useCVStore } from '../stores/cvStore';
import { useVersionStore } from '../stores/versionStore';
import { useAutoSave } from '../hooks/useAutoSave';
import { useMobile } from '../hooks/useMobile';

export const CVBuilder: React.FC = () => {
  // Store Hooks
  const { cvData, saveCV } = useCVStore();
  const { createVersion } = useVersionStore();

  
  // State Management
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | 'unsaved'>('saved');
  const [lastSaveTime, setLastSaveTime] = useState<Date>(new Date());
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  
  // Custom Hooks
  const isMobile = useMobile();

  // Auto-save Configuration
  const { hasUnsavedChanges } = useAutoSave({
    enabled: autoSaveEnabled,
    delay: 2000,
    onSave: () => {
      setSaveStatus('saved');
      setLastSaveTime(new Date());
      createVersion(cvData, undefined, true);
    },
    onError: () => {
      setSaveStatus('error');
    }
  });

  // Save Status Effect
  useEffect(() => {
    if (hasUnsavedChanges && saveStatus === 'saved') {
      setSaveStatus('unsaved');
    }
  }, [hasUnsavedChanges, saveStatus]);

  // Event Handlers
  const handleManualSave = async () => {
    setSaveStatus('saving');
    
    try {
      await saveCV();
      createVersion(cvData, 'Sauvegarde manuelle', false);
      setSaveStatus('saved');
      setLastSaveTime(new Date());
    } catch {
      setSaveStatus('error');
    }
  };

  const handleExport = () => {
    console.log('Export via CVPreview');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Créateur de CV
              </h1>
              <p className="text-gray-600">
                {cvData.title} • Modifié le {cvData.lastUpdated.toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex gap-3">
              <VersionHistory />
              <Button 
                variant="outline" 
                icon={Save} 
                onClick={handleManualSave}
              >
                Sauvegarder
              </Button>
              <Button 
                variant="primary" 
                icon={Download} 
                onClick={handleExport}
              >
                Télécharger PDF
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <Card padding="sm">
            <div className="flex items-center justify-between">
              <SaveIndicator 
                status={saveStatus}
                lastSaved={lastSaveTime}
                autoSaveEnabled={autoSaveEnabled}
              />
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={autoSaveEnabled}
                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Sauvegarde automatique
                </label>
                
                <div className="text-sm text-gray-500">
                  {cvData.experiences.length} exp • {cvData.education.length} formation • {cvData.skills.length} comp
                </div>
              </div>
            </div>
          </Card>
        </header>

        {/* Main Grid Layout */}
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-3'}`}>
          
          {/* Editor Column */}
          <div className={`${isMobile ? '' : 'xl:col-span-2'} space-y-6`}>
            <PersonalInfoSection />
            <SummarySection />
            <AISuggestions type="summary" />
            
            {/* Mobile Preview */}
            {isMobile && (
              <div className="mb-6">
                <CVPreview />
              </div>
            )}
            
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            
            {/* Mobile AI Suggestions */}
            {isMobile && (
              <AISuggestions type="summary" />
            )}
            
            <TemplateSelector />
          </div>

          {/* Preview Column - Hidden on Mobile */}
          {!isMobile && (
            <div className="xl:col-span-1">
              <CVPreview />
              
              {/* Desktop AI Suggestions */}
              <div className="mt-6">
                <AISuggestions type="summary" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};