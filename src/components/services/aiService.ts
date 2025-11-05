export interface AISuggestion {
  type: 'summary' | 'skill' | 'experience' | 'cover_letter';
  content: string;
  confidence: number;
  alternatives?: string[];
}

export class AIService {
  static async getSummarySuggestion(experiences: string[] = [], skills: string[] = []): Promise<AISuggestion> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const expText = experiences.length > 0 ? experiences.join(', ') : 'développement web';
    const skillsText = skills.length > 0 ? skills.join(', ') : 'technologies modernes';
    
    return {
      type: 'summary',
      content: `Développeur full-stack passionné avec une expérience solide en ${expText}. Expertise en ${skillsText}. A mené avec succès des projets techniques et recherche un poste challengeant pour mettre à profit mes compétences.`,
      confidence: 0.85,
      alternatives: [
        `Expert en ${expText} avec une maîtrise approfondie de ${skillsText}. Forte expérience en conception de solutions innovantes et gestion de projets.`,
        `Professionnel du développement spécialisé en ${expText}. Compétences avancées en ${skillsText} et passion pour les défis techniques complexes.`
      ]
    };
  }

  // CORRECTION : Accepter 2 arguments comme dans l'appel
  static async getSkillSuggestions(industry: string = 'Technologie', experienceLevel: string = 'intermédiaire'): Promise<AISuggestion> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const skillsMap: Record<string, string> = {
      'débutant': 'React (Intermédiaire), JavaScript (Intermédiaire), HTML/CSS (Avancé), Git (Intermédiaire), Résolution de problèmes (Intermédiaire)',
      'intermédiaire': 'React (Avancé), Node.js (Intermédiaire), TypeScript (Intermédiaire), MongoDB (Intermédiaire), Git (Avancé), Agile (Intermédiaire)',
      'senior': 'React (Expert), Node.js (Avancé), TypeScript (Avancé), AWS (Intermédiaire), Docker (Intermédiaire), Architecture (Avancé), Leadership (Intermédiaire)',
      'expert': 'React (Expert), Node.js (Expert), TypeScript (Expert), AWS (Avancé), Docker (Avancé), Architecture (Expert), Leadership (Avancé), Management (Intermédiaire)'
    };
    
    const industrySkills: Record<string, string> = {
      'Technologie': 'Cloud Computing, DevOps, CI/CD, Microservices',
      'Finance': 'Blockchain, FinTech, Sécurité, Réglementation',
      'Santé': 'Systèmes médicaux, Données de santé, RGPD, Interopérabilité',
      'E-commerce': 'Paiements en ligne, Logistique, Analytics, UX/UI'
    };
    
    const baseSkills = skillsMap[experienceLevel] || skillsMap['intermédiaire'];
    const industrySpecific = industrySkills[industry] || '';
    
    return {
      type: 'skill',
      content: industrySpecific ? `${baseSkills}, ${industrySpecific}` : baseSkills,
      confidence: 0.90
    };
  }

  static async getExperienceEnhancement(currentDescription: string = ''): Promise<AISuggestion> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseDescription = currentDescription || 'Développement et maintenance d applications web';
    
    return {
      type: 'experience',
      content: `${baseDescription}. Résultats : amélioration des performances et optimisation des processus.`,
      confidence: 0.75
    };
  }

  static async generateCoverLetter(
    cvContent: string = '',
    jobDescription: string = 'développement',
    company: string = 'votre entreprise'
  ): Promise<AISuggestion> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const cvPreview = cvContent.substring(0, 200) || 'Expérience en développement et compétences techniques solides';
    const jobPreview = jobDescription.substring(0, 100) || 'vos projets innovants';
    
    return {
      type: 'cover_letter',
      content: `Madame, Monsieur,

Je me permets de vous adresser ma candidature pour un poste au sein de ${company}. 

${cvPreview}...

Je suis intéressé par ${jobPreview} et serais ravi de contribuer à vos projets.

Cordialement,
[Votre Nom]`,
      confidence: 0.80
    };
  }
}