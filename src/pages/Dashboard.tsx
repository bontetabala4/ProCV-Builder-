import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Mail, Settings, Download, Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../stores/cvStore';
import { useCoverStore } from '../stores/coverStore';

export const Dashboard: React.FC = () => {
  const { savedCVs, loadCV, deleteCV } = useCVStore();
  const { savedLetters, loadLetter, deleteLetter } = useCoverStore();

  const formatDate = (date: Date | string | number | null | undefined): string => {
    if (!date) return 'Date inconnue';
    try {
      if (date instanceof Date) return date.toLocaleDateString();
      if (typeof date === 'string') return new Date(date).toLocaleDateString();
      if (typeof date === 'number') return new Date(date).toLocaleDateString();
      return 'Date invalide';
    } catch {
      return 'Date invalide';
    }
  };

  const handleLoadCV = (id: string) => loadCV(id);

  const handleDeleteCV = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer ce CV ?')) deleteCV(id);
  };

  const handleDeleteLetter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer cette lettre ?')) deleteLetter(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4 lg:px-6 py-4">
      <div className="w-full">
        
        {/* Header avec MOINS d'espace en bas */}
        <header className="mb-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {savedCVs.length > 0 || savedLetters.length > 0 
              ? 'Gérez vos CV et lettres de motivation' 
              : 'Commencez par créer votre premier CV ou lettre de motivation'
            }
          </p>
        </header>

        {/* Quick Actions - MOINS d'espace en bas */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
            
            {/* Nouveau CV Card */}
            <Card className="text-center p-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link to="/cv-builder" className="block">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Nouveau CV
                </h3>
                <p className="text-gray-600 text-sm">
                  Créer un CV professionnel
                </p>
              </Link>
            </Card>

            {/* Nouvelle lettre Card */}
            <Card className="text-center p-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link to="/cover-builder" className="block">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Nouvelle lettre
                </h3>
                <p className="text-gray-600 text-sm">
                  Rédiger une lettre de motivation
                </p>
              </Link>
            </Card>

            {/* Templates Card */}
            <Card className="text-center p-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link to="/templates" className="block">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Templates
                </h3>
                <p className="text-gray-600 text-sm">
                  Explorer nos modèles
                </p>
              </Link>
            </Card>
          </div>
        </div>

        {/* Main Content Grid - REMONTÉ et avec plus d'espace entre les textes */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
          
          {/* CV Section - REMONTÉE */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Mes CVs ({savedCVs.length})
              </h2>
              <Link to="/cv-builder">
                <Button variant="outline" size="sm" icon={Plus} className="w-full sm:w-auto">
                  Nouveau CV
                </Button>
              </Link>
            </div>

            {savedCVs.length > 0 ? (
              <div className="space-y-3">
                {savedCVs.map((cv) => (
                  <div 
                    key={cv.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer gap-3"
                    onClick={() => handleLoadCV(cv.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-2"> {/* PLUS d'espace ici */}
                        {cv.title || 'CV sans titre'}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed"> {/* leading-relaxed pour espacement ligne */}
                        Modifié le {formatDate(cv.lastUpdated)} • {cv.template || 'Modèle par défaut'}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" icon={Download}>
                        PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={Trash2}
                        onClick={(e) => handleDeleteCV(cv.id, e)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <FileText className="mx-auto mb-3 text-gray-400" size={40} />
                <p className="text-base mb-2">
                  Aucun CV créé pour le moment
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Commencez par créer votre premier CV professionnel
                </p>
                <Link to="/cv-builder">
                  <Button variant="primary" icon={Plus}>
                    Créer mon premier CV
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Letters Section - REMONTÉE */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Mes Lettres ({savedLetters.length})
              </h2>
              <Link to="/cover-builder">
                <Button variant="outline" size="sm" icon={Plus} className="w-full sm:w-auto">
                  Nouvelle lettre
                </Button>
              </Link>
            </div>

            {savedLetters.length > 0 ? (
              <div className="space-y-3">
                {savedLetters.map((letter) => (
                  <div 
                    key={letter.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer gap-3"
                    onClick={() => loadLetter(letter.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-2"> {/* PLUS d'espace ici */}
                        {letter.title || 'Lettre sans titre'}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed"> {/* leading-relaxed pour espacement ligne */}
                        {letter.company || 'Entreprise non spécifiée'} • {letter.position || 'Poste non spécifié'} • Modifié le {formatDate(letter.lastUpdated)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" icon={Download}>
                        PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={Trash2}
                        onClick={(e) => handleDeleteLetter(letter.id, e)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Mail className="mx-auto mb-3 text-gray-400" size={40} />
                <p className="text-base mb-2">
                  Aucune lettre créée pour le moment
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Créez votre première lettre de motivation
                </p>
                <Link to="/cover-builder">
                  <Button variant="primary" icon={Plus}>
                    Créer ma première lettre
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};