import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAccess } from '../../context/AccessContext';
import { workshopInfo } from '../../data/workshopData';
import { NIBMLogo } from '../common/NIBMLogo';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { clearAccess } = useAccess();

  return (
    <footer className="w-full bg-white border-t border-slate-200 py-8 px-4 sm:px-8 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <NIBMLogo variant="compact" className="h-7 w-auto" />
          <span className="hidden sm:inline-block text-slate-300">|</span>
          <span className="font-medium text-slate-700">{workshopInfo.title}</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-slate-600">
          <button 
            onClick={() => navigate('/pathway')}
            className="hover:text-indigo-600 transition-colors"
          >
            Learning Pathway
          </button>
          <span className="text-slate-300">•</span>
          <button 
            onClick={() => navigate('/resources')}
            className="hover:text-indigo-600 transition-colors"
          >
            Resources
          </button>
          <span className="text-slate-300">•</span>
          <button 
            onClick={() => navigate('/glossary')}
            className="hover:text-indigo-600 transition-colors"
          >
            Glossary
          </button>
          <span className="text-slate-300">•</span>
          <button 
            onClick={() => clearAccess()}
            className="hover:text-rose-600 text-slate-500 transition-colors"
            title="Exit workshop session"
          >
            Exit Workshop
          </button>
        </div>
      </div>
    </footer>
  );
};
