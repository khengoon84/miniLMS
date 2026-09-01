import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ACCESS_CONFIG } from '../config/accessConfig';

interface AccessContextType {
  hasAccess: boolean;
  grantAccess: (inputCode: string) => boolean;
  clearAccess: () => void;
}

const AccessContext = createContext<AccessContextType | null>(null);

export const AccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasAccess, setHasAccess] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(ACCESS_CONFIG.STORAGE_KEY);
      return stored === 'granted';
    } catch {
      return false;
    }
  });

  // Verify access state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ACCESS_CONFIG.STORAGE_KEY);
      if (stored === 'granted') {
        setHasAccess(true);
      }
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  const grantAccess = useCallback((inputCode: string): boolean => {
    const cleanInput = inputCode.trim().toUpperCase();
    const cleanTarget = (ACCESS_CONFIG.DEFAULT_ACCESS_CODE || '').trim().toUpperCase();

    if (cleanInput.length > 0 && cleanInput === cleanTarget) {
      try {
        localStorage.setItem(ACCESS_CONFIG.STORAGE_KEY, 'granted');
      } catch {
        // Storage failed, but set session state
      }
      setHasAccess(true);
      return true;
    }
    return false;
  }, []);

  const clearAccess = useCallback(() => {
    try {
      localStorage.removeItem(ACCESS_CONFIG.STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    setHasAccess(false);
  }, []);

  const contextValue = useMemo<AccessContextType>(() => ({
    hasAccess,
    grantAccess,
    clearAccess,
  }), [hasAccess, grantAccess, clearAccess]);

  return (
    <AccessContext.Provider value={contextValue}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = (): AccessContextType => {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error('useAccess must be used within an AccessProvider');
  }
  return context;
};
