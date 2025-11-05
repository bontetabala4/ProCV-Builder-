import React from 'react';
import type { CVData } from '../../../types/cv.types';

interface ProfessionalTemplateProps {
  data: CVData;
  isPreview?: boolean;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, isPreview = false }) => {
  const { personalInfo, summary, experiences, education, skills, languages } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`bg-white text-gray-800 ${isPreview ? 'p-6' : 'p-10'} max-w-4xl mx-auto`}>
      {/* Header avec bande colorée */}
      <div className="bg-blue-800 text-white p-6 rounded-t-lg mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {summary && (
            <p className="text-blue-100 text-lg">{summary}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-800 pb-2">Contact</h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && <div><strong>Email:</strong><br/>{personalInfo.email}</div>}
              {personalInfo.phone && <div><strong>Téléphone:</strong><br/>{personalInfo.phone}</div>}
              {personalInfo.address && <div><strong>Adresse:</strong><br/>{personalInfo.address}</div>}
              {personalInfo.linkedin && <div><strong>LinkedIn:</strong><br/>{personalInfo.linkedin}</div>}
            </div>
          </section>

          {/* Compétences */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-800 pb-2">Compétences</h2>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-800 pb-2">Langues</h2>
              <div className="space-y-1">
                {languages.map((language, index) => (
                  <div key={index} className="text-sm">
                    • {language}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Expérience */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Expérience Professionnelle</h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-blue-800 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                        <p className="text-blue-800 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate!)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{exp.description}</p>
                    {exp.technologies.length > 0 && (
                      <div className="text-xs text-gray-500">
                        <strong>Technologies:</strong> {exp.technologies.join(', ')}
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
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Formation</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-green-600 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-green-700">{edu.institution}</p>
                        {edu.field && (
                          <p className="text-gray-600 text-sm">{edu.field}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {formatDate(edu.startDate)} - {edu.current ? 'Présent' : formatDate(edu.endDate!)}
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