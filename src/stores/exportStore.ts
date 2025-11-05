import { create } from 'zustand';

interface ExportState {
  isExporting: boolean;
  exportProgress: number;
  lastExportFormat: string;
  
  // Actions
  startExport: () => void;
  finishExport: () => void;
  setExportProgress: (progress: number) => void;
  setLastExportFormat: (format: string) => void;
}

export const useExportStore = create<ExportState>((set) => ({
  isExporting: false,
  exportProgress: 0,
  lastExportFormat: 'pdf',

  startExport: () => set({ isExporting: true, exportProgress: 0 }),
  
  finishExport: () => set({ isExporting: false, exportProgress: 100 }),
  
  setExportProgress: (progress) => set({ exportProgress: progress }),
  
  setLastExportFormat: (format) => set({ lastExportFormat: format }),
}));