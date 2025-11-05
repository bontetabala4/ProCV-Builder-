import React from 'react';
import type { CVData } from '../../../types/cv.types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar } from 'lucide-react';

interface ModernTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, isPreview = false }) => {
  const { personalInfo, summary, experiences, education, skills, languages, certifications } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getDuration = (startDate: string, endDate?: string, current?: boolean) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : current ? new Date() : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    const totalMonths = years * 12 + months;
    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    if (totalYears === 0) {
      return `${remainingMonths} mois`;
    } else if (remainingMonths === 0) {
      return `${totalYears} an${totalYears > 1 ? 's' : ''}`;
    } else {
      return `${totalYears} an${totalYears > 1 ? 's' : ''} ${remainingMonths} mois`;
    }
  };

  return (
    <div className={`bg-white text-gray-800 ${isPreview ? 'p-4 lg:p-8' : 'p-6 lg:p-12'} max-w-4xl mx-auto font-sans`}>
      {/* En-tête */}
      <header className="border-b-2 border-blue-500 pb-4 lg:pb-6 mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {summary && (
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{summary}</p>
            )}
          </div>
          {personalInfo.email && (
            <div className="lg:text-right">
              <div className="bg-blue-500 text-white px-3 lg:px-4 py-2 rounded-lg inline-block">
                <div className="text-sm font-medium">Disponible</div>
                <div className="text-xs">Recherche active</div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className={`grid gap-6 lg:gap-8 ${isPreview ? 'lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Colonne de gauche - Informations de contact et compétences */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 lg:mb-4 pb-2 border-b border-gray-200">
              Contact
            </h2>
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm wrap-break-words">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm">{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm">LinkedIn</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-3">
                  <Github size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm">GitHub</span>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm">Portfolio</span>
                </div>
              )}
            </div>
          </section>

          {/* Compétences */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 lg:mb-4 pb-2 border-b border-gray-200">
                Compétences
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="wrap-break-words">{skill.name}</span>
                      <span className="text-gray-500 text-xs capitalize shrink-0 ml-2">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          skill.level === 'expert' ? 'bg-green-500' :
                          skill.level === 'advanced' ? 'bg-blue-500' :
                          skill.level === 'intermediate' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}
                        style={{
                          width: skill.level === 'expert' ? '100%' :
                                 skill.level === 'advanced' ? '80%' :
                                 skill.level === 'intermediate' ? '60%' : '40%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 lg:mb-4 pb-2 border-b border-gray-200">
                Langues
              </h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{language}</span>
                    <span className="text-gray-500">Courant</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Colonne de droite - Expérience et éducation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expérience professionnelle */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-4 pb-2 border-b border-gray-200">
                Expérience Professionnelle
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-500 pl-3 lg:pl-4">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2 gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-500 lg:text-right">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate!)}
                        </div>
                        <div className="text-xs">
                          {getDuration(exp.startDate, exp.endDate, exp.current)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-4 pb-2 border-b border-gray-200">
                Formation
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-green-500 pl-3 lg:pl-4">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-1 gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-green-600 font-medium">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-gray-500 lg:text-right">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(edu.startDate)} - {edu.current ? 'Présent' : formatDate(edu.endDate!)}
                        </div>
                      </div>
                    </div>
                    {edu.field && (
                      <p className="text-gray-600 text-sm mb-1">{edu.field}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-500 text-xs">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-4 pb-2 border-b border-gray-200">
                Certifications
              </h2>
              <div className="space-y-2">
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