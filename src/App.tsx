import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ProgressProvider } from './context/ProgressContext';
import { AccessProvider, useAccess } from './context/AccessContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WorkshopAccessView } from './components/access/WorkshopAccessView';
import { HomeView } from './components/home/HomeView';
import { ModuleListView } from './components/modules/ModuleListView';
import { ModuleOverviewView } from './components/modules/ModuleOverviewView';
import { ReadingSectionView } from './components/reading/ReadingSectionView';
import { KnowledgeCheckView } from './components/quiz/KnowledgeCheckCard';
import { ResourceLibraryView } from './components/resources/ResourceLibraryView';
import { GlossaryView } from './components/glossary/GlossaryView';
import { SearchView } from './components/search/SearchView';
import { OverallPathwayView } from './components/pathway/OverallPathwayView';

const AppContent: React.FC = () => {
  const { hasAccess } = useAccess();
  const { route, navigate } = useRouter();

  if (!hasAccess) {
    return <WorkshopAccessView />;
  }

  const renderCurrentView = () => {
    switch (route.name) {
      case 'home':
        return <HomeView />;

      case 'modules':
        return <ModuleListView />;

      case 'module-detail':
        return <ModuleOverviewView moduleId={route.params.moduleId} />;

      case 'section-reading':
        return (
          <ReadingSectionView
            moduleId={route.params.moduleId}
            sectionId={route.params.sectionId}
          />
        );

      case 'quiz':
        return (
          <KnowledgeCheckView
            moduleId={route.params.moduleId}
            quizId={route.params.quizId}
          />
        );

      case 'resources':
        return <ResourceLibraryView />;

      case 'glossary':
        return <GlossaryView />;

      case 'search':
        return <SearchView />;

      case 'pathway':
        return <OverallPathwayView />;

      default:
        return (
          <div className="w-full bg-[#fbf8fa] min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
            <h1 className="font-sans text-3xl font-bold text-[#182232] mb-2">Page Not Found</h1>
            <p className="font-serif text-gray-600 mb-6">The requested workshop section does not exist or has moved.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-[#182232] text-white font-sans font-semibold text-sm hover:bg-slate-800"
            >
              Return to Portal Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fa] text-[#1b1b1d]">
      <Header />
      <div className="flex-1 flex flex-col">
        {renderCurrentView()}
      </div>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AccessProvider>
      <RouterProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </RouterProvider>
    </AccessProvider>
  );
}

export default App;

