import React from 'react';
import type { CVData } from '../../../types/cv.types';
import { Calendar } from 'lucide-react';

interface TechnicalTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export const TechnicalTemplate: React.FC<TechnicalTemplateProps> = ({ data, isPreview = false }) => {
  const { personalInfo, summary, experiences, education, skills, languages, certifications } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Grouper les compétences par catégorie
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className={`bg-white text-gray-800 ${isPreview ? 'p-6' : 'p-10'} max-w-5xl mx-auto font-mono`}>
      {/* En-tête technique */}
      <header className="border-b border-gray-400 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="text-sm text-gray-600 font-mono">
              {personalInfo.email} | {personalInfo.phone}
            </div>
          </div>
          <div className="text-right text-sm">
            {personalInfo.linkedin && <div>📱 {personalInfo.linkedin}</div>}
            {personalInfo.github && <div>⚡ {personalInfo.github}</div>}
          </div>
        </div>
        {summary && (
          <div className="mt-3 p-3 bg-gray-100 rounded border-l-4 border-green-500">
            <p className="text-sm text-gray-700">{summary}</p>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne compétences */}
        <div className="lg:col-span-1">
          {/* Compétences par catégorie */}
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <section key={category} className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
                {category}
              </h2>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-gray-500 text-xs">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-green-600"
                        style={{
                          width: skill.level === 'expert' ? '100%' :
                                 skill.level === 'advanced' ? '85%' :
                                 skill.level === 'intermediate' ? '70%' : '55%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Langues */}
          {languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
                Langues
              </h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="text-sm flex justify-between">
                    <span>{language}</span>
                    <span className="text-gray-500">● ● ● ○</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Colonne expérience et formation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expérience professionnelle */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
                EXPÉRIENCE
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-500 pl-3">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 text-sm">{exp.company}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(exp.startDate)} - {exp.current ? 'Maintenant' : formatDate(exp.endDate!)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Formation */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
                FORMATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-green-500 pl-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                        <p className="text-green-600 text-sm">{edu.institution}</p>
                        {edu.field && (
                          <p className="text-gray-500 text-xs">{edu.field}</p>
                        )}
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        {formatDate(edu.startDate)} - {edu.current ? 'Maintenant' : formatDate(edu.endDate!)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
                CERTIFICATIONS
              </h2>
              <div className="space-y-1">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-sm">
                    → {cert}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};