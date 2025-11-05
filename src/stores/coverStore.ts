import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CoverLetter {
  id: string;
  title: string;
  company: string;
  position: string;
  content: string;
  template: string;
  lastUpdated: Date;
}

interface CoverStore {
  // Données lettre actuelle
  currentLetter: CoverLetter;
  savedLetters: CoverLetter[];
  
  // Actions
  updateLetter: (updates: Partial<CoverLetter>) => void;
  saveLetter: (title?: string) => void;
  loadLetter: (id: string) => void;
  deleteLetter: (id: string) => void;
  resetLetter: () => void;
}

const initialLetter: CoverLetter = {
  id: 'default',
  title: 'Nouvelle lettre',
  company: '',
  position: '',
  content: '',
  template: 'formal',
  lastUpdated: new Date()
};

export const useCoverStore = create<CoverStore>()(
  persist(
    (set, get) => ({
      currentLetter: initialLetter,
      savedLetters: [],

      updateLetter: (updates) =>
        set((state) => ({
          currentLetter: {
            ...state.currentLetter,
            ...updates,
            lastUpdated: new Date()
          }
        })),

      saveLetter: (title) => {
        const { currentLetter, savedLetters } = get();
        const now = new Date();
        
        const letterToSave: CoverLetter = {
          ...currentLetter,
          title: title || currentLetter.title,
          lastUpdated: now
        };

        if (!savedLetters.find(letter => letter.id === currentLetter.id)) {
          letterToSave.id = `letter-${Date.now()}`;
        }

        const updatedLetters = savedLetters.filter(letter => letter.id !== letterToSave.id);
        updatedLetters.push(letterToSave);

        set({
          currentLetter: letterToSave,
          savedLetters: updatedLetters
        });

        return letterToSave.id;
      },

      loadLetter: (id) => {
        const { savedLetters } = get();
        const letterToLoad = savedLetters.find(letter => letter.id === id);
        
        if (letterToLoad) {
          set({ 
            currentLetter: { ...letterToLoad, lastUpdated: new Date() }
          });
        }
      },

      deleteLetter: (id) => {
        const { savedLetters, currentLetter } = get();
        const updatedLetters = savedLetters.filter(letter => letter.id !== id);
        
        set({ 
          savedLetters: updatedLetters,
          currentLetter: currentLetter.id === id ? initialLetter : currentLetter
        });
      },

      resetLetter: () => set({ 
        currentLetter: { ...initialLetter, id: `letter-${Date.now()}` }
      }),
    }),
    {
      name: 'cover-storage',
      partialize: (state) => ({ 
        savedLetters: state.savedLetters 
      }),
    }
  )
);