import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, Wand2, ThumbsUp, ThumbsDown, Copy, RotateCcw } from 'lucide-react';
import { AIService } from '../services/aiService';
import type { AISuggestion } from '../services/aiService';
import { useCVStore } from '../../stores/cvStore';
import { useToastStore } from '../../stores/toastStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AISuggestionsProps {
  type: 'summary' | 'skill' | 'experience' | 'cover_letter';
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ type }) => {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<'none' | 'positive' | 'negative'>('none');
  
  const { cvData, updateSummary } = useCVStore();
  const { addToast } = useToastStore();

  const generateSuggestions = async () => {
    setIsLoading(true);
    setFeedback('none');
    
    try {
      let suggestion: AISuggestion;

      switch (type) {
        case 'summary': {
          // S'assurer que les données existent avec des valeurs par défaut
          const experiences = cvData.experiences?.map(exp => exp.position) || [];
          const skills = cvData.skills?.map(skill => skill.name) || [];
          suggestion = await AIService.getSummarySuggestion(experiences, skills);
          break;
        }

        case 'skill': {
          const experienceLevel = cvData.experiences?.length > 3 ? 'senior' : 
                                cvData.experiences?.length > 1 ? 'intermédiaire' : 'débutant';
          suggestion = await AIService.getSkillSuggestions('Technologie', experienceLevel);
          break;
        }

        case 'experience': {
          // Pour l'instant, utiliser une description par défaut
          suggestion = await AIService.getExperienceEnhancement('Description d\'expérience professionnelle');
          break;
        }

        case 'cover_letter': {
          const cvContent = `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName} - ${cvData.summary}`;
          suggestion = await AIService.generateCoverLetter(cvContent, 'Poste de développeur', 'Entreprise');
          break;
        }

        default: {
          suggestion = {
            type,
            content: 'Fonctionnalité en développement',
            confidence: 0.0
          };
        }
      }

      setSuggestions([suggestion]);
    } catch (error) {
      console.error('Erreur IA:', error);
      addToast({
        message: 'Erreur lors de la génération des suggestions',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestion = () => {
    const suggestion = suggestions[0];
    if (!suggestion) return;

    switch (type) {
      case 'summary': {
        updateSummary(suggestion.content);
        addToast({
          message: 'Résumé appliqué avec succès',
          type: 'success'
        });
        break;
      }
      case 'skill': {
        addToast({
          message: 'Fonctionnalité compétences à venir',
          type: 'info'
        });
        break;
      }
      case 'experience': {
        addToast({
          message: 'Fonctionnalité expérience à venir',
          type: 'info'
        });
        break;
      }
      case 'cover_letter': {
        addToast({
          message: 'Fonctionnalité lettre de motivation à venir',
          type: 'info'
        });
        break;
      }
      default: {
        addToast({
          message: 'Suggestion appliquée',
          type: 'success'
        });
      }
    }

    setFeedback('positive');
  };

  const copyToClipboard = () => {
    const suggestion = suggestions[0];
    if (suggestion) {
      navigator.clipboard.writeText(suggestion.content);
      addToast({
        message: 'Texte copié dans le presse-papier',
        type: 'success'
      });
    }
  };

  const getTitle = () => {
    const titles = {
      summary: 'Résumé IA',
      skill: 'Compétences suggérées',
      experience: 'Amélioration de description',
      cover_letter: 'Génération de lettre'
    };
    return titles[type];
  };

  const getDescription = () => {
    const descriptions = {
      summary: 'Générez un résumé professionnel optimisé avec IA',
      skill: 'Découvrez les compétences les plus demandées',
      experience: 'Améliorez vos descriptions avec des verbes d\'action',
      cover_letter: 'Créez une lettre de motivation personnalisée'
    };
    return descriptions[type];
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Sparkles className="text-purple-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{getTitle()}</h3>
          <p className="text-gray-600 text-sm">{getDescription()}</p>
        </div>
      </div>

      {/* Suggestions générées */}
      {suggestions.length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Suggestion IA</h4>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                icon={Copy}
              >
                Copier
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={applySuggestion}
                icon={Wand2}
              >
                Appliquer
              </Button>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {suggestions[0]?.content}
          </p>

          {/* Feedback */}
          {feedback === 'none' && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
              <span className="text-sm text-gray-600">Cette suggestion est-elle utile?</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFeedback('positive')}
                className="text-green-600 hover:text-green-700"
              >
                <ThumbsUp size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFeedback('negative')}
                className="text-red-600 hover:text-red-700"
              >
                <ThumbsDown size={14} />
              </Button>
            </div>
          )}

          {feedback !== 'none' && (
            <div className={`mt-3 p-2 rounded text-sm ${
              feedback === 'positive' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              Merci pour votre feedback ! {feedback === 'positive' ? '🎉' : '📝'}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={generateSuggestions}
          disabled={isLoading}
          icon={isLoading ? undefined : Sparkles}
          className="flex-1"
        >
          {isLoading ? <LoadingSpinner size="sm" text="Génération..." /> : 'Générer des suggestions'}
        </Button>
        
        {suggestions.length > 0 && (
          <Button
            variant="outline"
            onClick={generateSuggestions}
            icon={RotateCcw}
          >
            Regénérer
          </Button>
        )}
      </div>

      {/* Note sur l'IA */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-700 text-xs">
          <strong>ℹ️ Powered by AI:</strong> Les suggestions sont générées par intelligence artificielle. 
          Pensez à personnaliser le contenu selon votre profil.
        </p>
      </div>
    </Card>
  );
};