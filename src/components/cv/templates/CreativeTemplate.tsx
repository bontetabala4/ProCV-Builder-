import React from 'react';
import type { CVData } from '../../../types/cv.types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, isPreview = false }) => {
  const { personalInfo, summary, experiences, education, skills, languages } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`bg-white text-gray-800 ${isPreview ? 'p-6' : 'p-10'} max-w-4xl mx-auto`}>
      {/* En-tête créatif avec gradient */}
      <header className="bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {summary && (
            <p className="text-lg opacity-90">{summary}</p>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne de gauche */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact */}
          <section className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Contact
            </h2>
            <div className="space-y-2">
              {personalInfo.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-purple-500 shrink-0" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-purple-500 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-purple-500 shrink-0" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin size={14} className="text-purple-500 shrink-0" />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2 text-sm">
                  <Github size={14} className="text-purple-500 shrink-0" />
                  <span>GitHub</span>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe size={14} className="text-purple-500 shrink-0" />
                  <span>Portfolio</span>
                </div>
              )}
            </div>
          </section>

          {/* Compétences */}
          {skills.length > 0 && (
            <section className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Compétences
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="bg-white border border-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {languages.length > 0 && (
            <section className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Langues
              </h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{language}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div 
                          key={star}
                          className={`w-2 h-2 rounded-full ${
                            star <= 4 ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Colonne de droite */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expérience professionnelle */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-purple-500 pl-3">
                Expérience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-4 top-0 w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="ml-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 bg-purple-50 px-2 py-1 rounded">
                          {formatDate(exp.startDate)} - {exp.current ? 'Maintenant' : formatDate(exp.endDate!)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{exp.description}</p>
                      {exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="bg-linear-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Formation */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-pink-500 pl-3">
                Formation
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    <div className="absolute -left-4 top-0 w-3 h-3 bg-pink-500 rounded-full"></div>
                    <div className="ml-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-pink-600">{edu.institution}</p>
                          {edu.field && (
                            <p className="text-gray-500 text-sm">{edu.field}</p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          {formatDate(edu.startDate)} - {edu.current ? 'Maintenant' : formatDate(edu.endDate!)}
                        </div>
                      </div>
                    </div>
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