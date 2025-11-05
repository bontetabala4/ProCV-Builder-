import { useEffect, useRef } from 'react';
import { useCVStore } from '../stores/cvStore';
interface UseAutoSaveOptions {
  enabled?: boolean;
  delay?: number;
  onSave?: () => void;
  onError?: (error: Error) => void;
}

export const useAutoSave = (options: UseAutoSaveOptions = {}) => {
  const {
    enabled = true,
    delay = 2000, // 2 secondes
    onSave,
    onError
  } = options;

  const { cvData, saveCV } = useCVStore();
  const lastSaveRef = useRef<number>(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousDataRef = useRef(JSON.stringify(cvData));

  useEffect(() => {
    if (!enabled) return;

    const currentData = JSON.stringify(cvData);
    
    // Vérifier si les données ont changé
    if (currentData === previousDataRef.current) {
      return;
    }

    // Débouncer la sauvegarde
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await saveCV();
        lastSaveRef.current = Date.now();
        previousDataRef.current = currentData;
        onSave?.();
      } catch (error) {
        console.error('Erreur de sauvegarde automatique:', error);
        onError?.(error as Error);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [cvData, enabled, delay, saveCV, onSave, onError]);

  // Sauvegarde avant déchargement de la page
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const currentData = JSON.stringify(cvData);
      if (currentData !== previousDataRef.current) {
        event.preventDefault();
        event.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cvData]);

  return {
    lastSave: lastSaveRef.current,
    hasUnsavedChanges: JSON.stringify(cvData) !== previousDataRef.current
  };
};