import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CVData, PersonalInfo, Experience, Education, Skill } from '../types/cv.types';

interface CVStore {
  // Données CV
  cvData: CVData;
  currentTemplate: string;
  isEditing: boolean;
  
  // Liste des CVs sauvegardés
  savedCVs: CVData[];
  
  // Actions
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateSummary: (summary: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setTemplate: (template: string) => void;
  saveCV: (title?: string) => void;
  loadCV: (id: string) => void;
  deleteCV: (id: string) => void;
  resetCV: () => void;
  exportCV: () => string;
}

// Données initiales
const initialCVData: CVData = {
  id: 'default',
  title: 'Nouveau CV',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: ''
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  template: 'modern',
  lastUpdated: new Date()
};

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      // État initial
      cvData: initialCVData,
      currentTemplate: 'modern',
      isEditing: false,
      savedCVs: [],

      // Actions
      updatePersonalInfo: (info) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            personalInfo: info,
            lastUpdated: new Date()
          }
        })),

      updateSummary: (summary) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            summary,
            lastUpdated: new Date()
          }
        })),

      addExperience: (experience) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: [...state.cvData.experiences, experience],
            lastUpdated: new Date()
          }
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: state.cvData.experiences.map(exp =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
            lastUpdated: new Date()
          }
        })),

      removeExperience: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: state.cvData.experiences.filter(exp => exp.id !== id),
            lastUpdated: new Date()
          }
        })),

      addEducation: (education) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: [...state.cvData.education, education],
            lastUpdated: new Date()
          }
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.map(edu =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
            lastUpdated: new Date()
          }
        })),

      removeEducation: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.filter(edu => edu.id !== id),
            lastUpdated: new Date()
          }
        })),

      addSkill: (skill) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: [...state.cvData.skills, skill],
            lastUpdated: new Date()
          }
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.map(s =>
              s.id === id ? { ...s, ...skill } : s
            ),
            lastUpdated: new Date()
          }
        })),

      removeSkill: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.filter(s => s.id !== id),
            lastUpdated: new Date()
          }
        })),

      setTemplate: (template) =>
        set({ currentTemplate: template }),

      saveCV: (title) => {
        const { cvData, savedCVs } = get();
        const now = new Date();
        
        const cvToSave: CVData = {
          ...cvData,
          title: title || cvData.title,
          lastUpdated: now
        };

        // Si c'est un nouveau CV (pas dans la liste sauvegardée)
        if (!savedCVs.find(cv => cv.id === cvData.id)) {
          cvToSave.id = `cv-${Date.now()}`;
        }

        const updatedCVs = savedCVs.filter(cv => cv.id !== cvToSave.id);
        updatedCVs.push(cvToSave);

        set({
          cvData: cvToSave,
          savedCVs: updatedCVs
        });

        return cvToSave.id;
      },

      loadCV: (id) => {
        const { savedCVs } = get();
        const cvToLoad = savedCVs.find(cv => cv.id === id);
        
        if (cvToLoad) {
          set({ 
            cvData: { ...cvToLoad, lastUpdated: new Date() }
          });
        }
      },

      deleteCV: (id) => {
        const { savedCVs, cvData } = get();
        const updatedCVs = savedCVs.filter(cv => cv.id !== id);
        
        set({ 
          savedCVs: updatedCVs,
          // Si on supprime le CV actuel, on reset
          cvData: cvData.id === id ? initialCVData : cvData
        });
      },

      resetCV: () => set({ 
        cvData: { ...initialCVData, id: `cv-${Date.now()}` }
      }),

      exportCV: () => {
        const { cvData } = get();
        return JSON.stringify(cvData, null, 2);
      }
    }),
    {
      name: 'cv-storage',
      partialize: (state) => ({ 
        savedCVs: state.savedCVs,
        currentTemplate: state.currentTemplate
      }),
    }
  )
);


// Ajouter à la fin du store existant
export const usePersonalInfo = () => useCVStore(state => state.cvData.personalInfo);
export const useExperiences = () => useCVStore(state => state.cvData.experiences);
export const useEducation = () => useCVStore(state => state.cvData.education);
export const useSkills = () => useCVStore(state => state.cvData.skills);