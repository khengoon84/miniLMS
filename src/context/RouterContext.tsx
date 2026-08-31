import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

export interface RouteMatch {
  path: string;
  name: 'home' | 'modules' | 'module-detail' | 'section-reading' | 'quiz' | 'resources' | 'glossary' | 'search' | 'pathway' | 'not-found';
  params: Record<string, string>;
  searchParams: URLSearchParams;
}

interface RouterContextType {
  currentPath: string;
  route: RouteMatch;
  navigate: (path: string, options?: { replace?: boolean; preserveScroll?: boolean }) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

function parsePathToRoute(fullPathWithSearch: string): RouteMatch {
  const [pathOnly, searchString] = fullPathWithSearch.split('?');
  const searchParams = new URLSearchParams(searchString || '');
  const cleanPath = pathOnly.replace(/\/+$/, '') || '/';

  // 1. Home
  if (cleanPath === '/' || cleanPath === '') {
    return { path: cleanPath, name: 'home', params: {}, searchParams };
  }

  // 2. Search
  if (cleanPath === '/search') {
    return { path: cleanPath, name: 'search', params: {}, searchParams };
  }

  // 3. Resources
  if (cleanPath === '/resources' || cleanPath === '/library') {
    return { path: cleanPath, name: 'resources', params: {}, searchParams };
  }

  // 4. Glossary
  if (cleanPath === '/glossary') {
    return { path: cleanPath, name: 'glossary', params: {}, searchParams };
  }

  // 5. Learning Pathway & Summary
  if (cleanPath === '/pathway' || cleanPath === '/learning-pathway' || cleanPath === '/summary') {
    return { path: cleanPath, name: 'pathway', params: {}, searchParams };
  }

  // 6. Modules index
  if (cleanPath === '/modules' || cleanPath === '/courses') {
    return { path: cleanPath, name: 'modules', params: {}, searchParams };
  }

  // 6. Module Quiz: /modules/:moduleId/quiz/:quizId or /modules/:moduleId/knowledge-check
  const quizMatch = cleanPath.match(/^\/modules\/([^/]+)\/(?:quiz|knowledge-check)(?:\/([^/]+))?$/);
  if (quizMatch) {
    return {
      path: cleanPath,
      name: 'quiz',
      params: { moduleId: quizMatch[1], quizId: quizMatch[2] || '' },
      searchParams,
    };
  }

  // 7. Section Reading: /modules/:moduleId/:sectionId or /modules/:moduleId/sections/:sectionId
  const sectionMatch = cleanPath.match(/^\/modules\/([^/]+)\/(?:sections\/)?([^/]+)$/);
  if (sectionMatch) {
    return {
      path: cleanPath,
      name: 'section-reading',
      params: { moduleId: sectionMatch[1], sectionId: sectionMatch[2] },
      searchParams,
    };
  }

  // 8. Module Detail: /modules/:moduleId
  const moduleMatch = cleanPath.match(/^\/modules\/([^/]+)$/);
  if (moduleMatch) {
    return {
      path: cleanPath,
      name: 'module-detail',
      params: { moduleId: moduleMatch[1] },
      searchParams,
    };
  }

  return { path: cleanPath, name: 'not-found', params: {}, searchParams };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.pathname + window.location.search;
      return url || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string, options?: { replace?: boolean; preserveScroll?: boolean }) => {
    if (typeof window === 'undefined') return;

    if (options?.replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentUrl(path);

    if (!options?.preserveScroll) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  const goBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  const route = useMemo(() => parsePathToRoute(currentUrl), [currentUrl]);

  const contextValue = useMemo<RouterContextType>(() => ({
    currentPath: currentUrl,
    route,
    navigate,
    goBack,
  }), [currentUrl, route, navigate, goBack]);

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
