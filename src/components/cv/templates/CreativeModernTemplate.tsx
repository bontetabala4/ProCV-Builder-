import React from 'react';
import type { CVData } from '../../../types/cv.types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface CreativeModernTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export const CreativeModernTemplate: React.FC<CreativeModernTemplateProps> = ({ data, isPreview = false }) => {
  const { personalInfo, summary, experiences, education, skills, languages } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`bg-white text-gray-800 ${isPreview ? 'p-6' : 'p-10'} max-w-4xl mx-auto font-sans`}>
      {/* Header avec design asymétrique */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {personalInfo.firstName} <span className="text-blue-600">{personalInfo.lastName}</span>
          </h1>
          {summary && (
            <p className="text-lg text-gray-600 leading-relaxed">{summary}</p>
          )}
        </div>
        <div className="lg:col-span-1 flex justify-center lg:justify-end">
          <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">Contact</h2>
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm">{personalInfo.email}</span>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">Compétences</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-500 capitalize">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">Langues</h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{language}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div 
                          key={star}
                          className={`w-2 h-2 rounded-full ${
                            star <= 4 ? 'bg-purple-500' : 'bg-gray-300'
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

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Expérience */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-3 h-8 bg-blue-500 rounded"></div>
                Expérience Professionnelle
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                          {formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate!)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{exp.description}</p>
                      {exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-3 h-8 bg-green-500 rounded"></div>
                Formation
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2 border-green-200">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-green-600">{edu.institution}</p>
                          {edu.field && (
                            <p className="text-gray-500 text-sm">{edu.field}</p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          {formatDate(edu.startDate)} - {edu.current ? 'Présent' : formatDate(edu.endDate!)}
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