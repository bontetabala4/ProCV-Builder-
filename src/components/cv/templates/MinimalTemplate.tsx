import React from 'react';
import type { CVData } from '../../../types/cv.types';

interface MinimalTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, isPreview = false }) => {
  const { personalInfo, summary, experiences, education, skills, languages, certifications } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`bg-white text-gray-800 ${isPreview ? 'p-6' : 'p-10'} max-w-3xl mx-auto font-sans`}>
      {/* En-tête minimaliste */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm text-gray-500 space-x-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>• LinkedIn</span>}
        </div>
        {summary && (
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">{summary}</p>
        )}
      </header>

      <div className="space-y-8">
        {/* Expérience professionnelle */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Expérience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l border-gray-300 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-normal text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)} – {exp.current ? 'Présent' : formatDate(exp.endDate!)}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Formation
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border-l border-gray-300 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-normal text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm">{edu.institution}</p>
                      {edu.field && (
                        <p className="text-gray-500 text-xs">{edu.field}</p>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {formatDate(edu.startDate)} – {edu.current ? 'Présent' : formatDate(edu.endDate!)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Langues & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {languages.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Langues
              </h2>
              <div className="space-y-1">
                {languages.map((language, index) => (
                  <div key={index} className="text-sm">
                    {language}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-sm">
                    {cert}
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