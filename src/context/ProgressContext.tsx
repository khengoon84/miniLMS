import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { UserProgressState } from '../types';

const STORAGE_KEY = 'sciencelink_user_progress_v1';

interface ProgressContextType {
  progress: UserProgressState;
  isSectionCompleted: (sectionId: string) => boolean;
  toggleSectionCompletion: (sectionId: string) => void;
  markSectionCompleted: (sectionId: string) => void;
  recordQuizResult: (quizId: string, selectedOptionId: string, isCorrect: boolean) => void;
  getQuizResult: (quizId: string) => { selectedOptionId: string; isCorrect: boolean; timestamp: number } | undefined;
  setLastVisited: (path: string) => void;
  getModuleProgressPercentage: (sectionIds: string[]) => number;
  updateProgress: (updates: Partial<UserProgressState>) => void;
  setNote: (key: string, note: string) => void;
}

const defaultProgress: UserProgressState = {
  completedSectionIds: ['m4-s1', 'm4-s2'], // initial representative state for preview realism
  completedQuizResults: {},
  lastVisitedPath: '/modules/module-04/m4-s3',
  notes: {},
  objectivesChecked: {},
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    if (typeof window === 'undefined') return defaultProgress;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback to default
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Unable to persist to localStorage', e);
    }
  }, [progress]);

  const isSectionCompleted = useCallback((sectionId: string) => {
    return progress.completedSectionIds.includes(sectionId);
  }, [progress.completedSectionIds]);

  const toggleSectionCompletion = useCallback((sectionId: string) => {
    setProgress((prev) => {
      const exists = prev.completedSectionIds.includes(sectionId);
      return {
        ...prev,
        completedSectionIds: exists
          ? prev.completedSectionIds.filter((id) => id !== sectionId)
          : [...prev.completedSectionIds, sectionId],
      };
    });
  }, []);

  const markSectionCompleted = useCallback((sectionId: string) => {
    setProgress((prev) => {
      if (prev.completedSectionIds.includes(sectionId)) return prev;
      return {
        ...prev,
        completedSectionIds: [...prev.completedSectionIds, sectionId],
      };
    });
  }, []);

  const recordQuizResult = useCallback((quizId: string, selectedOptionId: string, isCorrect: boolean) => {
    setProgress((prev) => ({
      ...prev,
      completedQuizResults: {
        ...prev.completedQuizResults,
        [quizId]: {
          selectedOptionId,
          isCorrect,
          timestamp: Date.now(),
        },
      },
    }));
  }, []);

  const getQuizResult = useCallback((quizId: string) => {
    return progress.completedQuizResults[quizId];
  }, [progress.completedQuizResults]);

  const setLastVisited = useCallback((path: string) => {
    setProgress((prev) => {
      if (prev.lastVisitedPath === path) return prev;
      return {
        ...prev,
        lastVisitedPath: path,
      };
    });
  }, []);

  const getModuleProgressPercentage = useCallback((sectionIds: string[]) => {
    if (!sectionIds.length) return 0;
    const completedCount = sectionIds.filter((id) => progress.completedSectionIds.includes(id)).length;
    return Math.round((completedCount / sectionIds.length) * 100);
  }, [progress.completedSectionIds]);

  const updateProgress = useCallback((updates: Partial<UserProgressState>) => {
    setProgress((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const setNote = useCallback((key: string, note: string) => {
    setProgress((prev) => ({
      ...prev,
      notes: {
        ...(prev.notes || {}),
        [key]: note,
      },
    }));
  }, []);

  const contextValue = useMemo<ProgressContextType>(() => ({
    progress,
    isSectionCompleted,
    toggleSectionCompletion,
    markSectionCompleted,
    recordQuizResult,
    getQuizResult,
    setLastVisited,
    getModuleProgressPercentage,
    updateProgress,
    setNote,
  }), [
    progress,
    isSectionCompleted,
    toggleSectionCompletion,
    markSectionCompleted,
    recordQuizResult,
    getQuizResult,
    setLastVisited,
    getModuleProgressPercentage,
    updateProgress,
    setNote,
  ]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
