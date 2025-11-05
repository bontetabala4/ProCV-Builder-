export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface CVData {
  id: string;
  title: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: string[];
  certifications: string[];
  template: string;
  lastUpdated: Date;
}

// Ajouter à la fin du fichier existant
export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  preview: string;
}

export interface AppSettings {
  autoSave: boolean;
  exportQuality: 'standard' | 'high';
  language: 'fr' | 'en';
}