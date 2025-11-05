import React from 'react';
import type { CVData } from '../../../types/cv.types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, isPreview = false }) => {
  const { personalInfo, summary, experiences, education, skills, languages, certifications } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`bg-white text-gray-800 ${isPreview ? 'p-8' : 'p-12'} max-w-4xl mx-auto font-serif`}>
      {/* En-tête élégant */}
      <header className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} <span className="text-blue-800">{personalInfo.lastName}</span>
        </h1>
        {summary && (
          <p className="text-lg text-gray-600 italic max-w-2xl mx-auto">{summary}</p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Colonne de gauche - Contact */}
        <div className="lg:col-span-1">
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Contact
            </h2>
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500 shrink-0" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500 shrink-0" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-500 shrink-0" />
                  <span className="text-sm">{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={14} className="text-gray-500 shrink-0" />
                  <span className="text-sm">LinkedIn</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github size={14} className="text-gray-500 shrink-0" />
                  <span className="text-sm">GitHub</span>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-gray-500 shrink-0" />
                  <span className="text-sm">Portfolio</span>
                </div>
              )}
            </div>
          </section>

          {/* Compétences */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Compétences
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    • {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Langues
              </h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="text-sm">
                    • {language}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Colonne de droite - Contenu principal */}
        <div className="lg:col-span-3 space-y-8">
          {/* Expérience professionnelle */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-300 pb-2">
                Expérience Professionnelle
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                        <p className="text-blue-800 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate!)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                    {exp.technologies.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Technologies: </span>
                        <span className="text-xs text-gray-600">{exp.technologies.join(', ')}</span>
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
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-300 pb-2">
                Formation
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-green-700">{edu.institution}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {edu.current ? 'Présent' : formatDate(edu.endDate!)}
                      </div>
                    </div>
                    {edu.field && (
                      <p className="text-gray-600 text-sm">{edu.field}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-300 pb-2">
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-sm">
                    • {cert}
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