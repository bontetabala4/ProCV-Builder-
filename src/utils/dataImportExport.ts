import type { CVData } from '../types/cv.types';

export class DataManager {
  static exportData(cvData: CVData): string {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      data: cvData
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  static importData(jsonString: string): CVData | null {
    try {
      const data = JSON.parse(jsonString);
      
      // Validation basique
      if (!data.data || !data.data.personalInfo) {
        throw new Error('Format de données invalide');
      }
      
      return data.data as CVData;
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      return null;
    }
  }

  static downloadFile(content: string, filename: string, type: string = 'application/json') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}