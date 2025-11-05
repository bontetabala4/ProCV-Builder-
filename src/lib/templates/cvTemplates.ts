import type { CVTemplate } from '../../types/cv.types';

export const cvTemplates: CVTemplate[] = [
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Design épuré avec accent sur les compétences techniques',
    category: 'Développement',
    color: 'blue',
    preview: 'modern-preview'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Style classique pour postes de direction et management',
    category: 'Management',
    color: 'gray',
    preview: 'executive-preview'
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Parfait pour les métiers du design, marketing et création',
    category: 'Créatif',
    color: 'purple',
    preview: 'creative-preview'
  },
  {
    id: 'technical',
    name: 'Technique',
    description: 'Optimisé pour les postes techniques et ingénierie',
    category: 'Technique',
    color: 'green',
    preview: 'technical-preview'
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    description: 'Design simple et efficace, facile à lire pour les recruteurs',
    category: 'Général',
    color: 'orange',
    preview: 'minimal-preview'
  }
];

export const coverTemplates = [
  {
    id: 'formal',
    name: 'Formel',
    description: 'Lettre traditionnelle et professionnelle',
    category: 'Classique',
    color: 'blue'
  },
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Style contemporain avec mise en page aérée',
    category: 'Moderne',
    color: 'purple'
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Design original pour les métiers créatifs',
    category: 'Créatif',
    color: 'pink'
  }
];