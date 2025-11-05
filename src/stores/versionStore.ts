import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CVData } from '../types/cv.types';

export interface CVVersion {
  id: string;
  cvData: CVData;
  timestamp: Date;
  label?: string;
  isAutoSave?: boolean;
}

interface VersionStore {
  versions: CVVersion[];
  currentVersionId: string | null;
  maxVersions: number;
  
  // Actions
  createVersion: (cvData: CVData, label?: string, isAutoSave?: boolean) => string;
  restoreVersion: (versionId: string) => CVData | null;
  deleteVersion: (versionId: string) => void;
  clearOldVersions: () => void;
  getVersionHistory: () => CVVersion[];
  getLastVersion: () => CVVersion | null;
}

export const useVersionStore = create<VersionStore>()(
  persist(
    (set, get) => ({
      versions: [],
      currentVersionId: null,
      maxVersions: 50, // Limite pour éviter l'accumulation

      createVersion: (cvData, label, isAutoSave = false) => {
        const { versions, maxVersions } = get();
        const versionId = `v${Date.now()}`;
        
        const newVersion: CVVersion = {
          id: versionId,
          cvData: JSON.parse(JSON.stringify(cvData)), // Deep clone
          timestamp: new Date(),
          label,
          isAutoSave
        };

        let updatedVersions = [...versions, newVersion];

        // Trier par timestamp (plus récent en premier)
        updatedVersions.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        // Limiter le nombre de versions
        if (updatedVersions.length > maxVersions) {
          updatedVersions = updatedVersions.slice(0, maxVersions);
        }

        set({
          versions: updatedVersions,
          currentVersionId: versionId
        });

        return versionId;
      },

      restoreVersion: (versionId) => {
        const { versions } = get();
        const version = versions.find(v => v.id === versionId);
        
        if (version) {
          set({ currentVersionId: versionId });
          return JSON.parse(JSON.stringify(version.cvData)); // Deep clone
        }
        
        return null;
      },

      deleteVersion: (versionId) => {
        const { versions } = get();
        const updatedVersions = versions.filter(v => v.id !== versionId);
        
        set({ versions: updatedVersions });
      },

      clearOldVersions: () => {
        const { versions, maxVersions } = get();
        const updatedVersions = versions.slice(0, maxVersions);
        
        set({ versions: updatedVersions });
      },

      getVersionHistory: () => {
        const { versions } = get();
        return [...versions].sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      },

      getLastVersion: () => {
        const { versions } = get();
        return versions.length > 0 ? versions[0] : null;
      }
    }),
    {
      name: 'version-storage',
      partialize: (state) => ({ 
        versions: state.versions,
        currentVersionId: state.currentVersionId
      }),
    }
  )
);