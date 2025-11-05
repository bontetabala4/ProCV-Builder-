import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // État de l'application
  currentView: 'dashboard' | 'cv-builder' | 'cover-builder' | 'templates';
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  
  // Actions
  setCurrentView: (view: AppState['currentView']) => void;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // État initial
      currentView: 'dashboard',
      theme: 'light',
      sidebarOpen: false,

      // Actions
      setCurrentView: (view) => set({ currentView: view }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ theme: state.theme }), // Seul le thème est persisté
    }
  )
);