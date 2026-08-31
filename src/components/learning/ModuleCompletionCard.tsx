import React from 'react';
import { Award, ArrowRight, BookOpen, CheckCircle, RefreshCw } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ModuleCompletionCardProps {
  moduleId: string;
  moduleNumber: string;
  nextModuleId?: string;
  nextModuleTitle?: string;
  className?: string;
}

export const ModuleCompletionCard: React.FC<ModuleCompletionCardProps> = ({
  moduleId,
  moduleNumber,
  nextModuleId,
  nextModuleTitle,
  className = '',
}) => {
  const { navigate } = useRouter();

  const isLastModule = !nextModuleId || moduleId === 'module-04';

  return (
    <div
      id={`module-completion-${moduleId}`}
      className={`my-10 p-8 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white shadow-lg border border-indigo-700/40 text-center ${className}`}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 mb-4">
        <Award className="w-7 h-7" />
      </div>

      <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
        Module {moduleNumber} Complete
      </h3>
      <p className="text-slate-300 text-base max-w-md mx-auto mb-6">
        You have reached the end of this module.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {isLastModule ? (
          <button
            type="button"
            onClick={() => navigate('/pathway')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span>Complete Pre-Workshop Reading</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate(`/modules/${nextModuleId}`)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <span>Continue to Module {parseInt(moduleNumber, 10) + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => navigate(`/modules/${moduleId}`)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Module Overview</span>
        </button>
      </div>

      {nextModuleTitle && !isLastModule && (
        <p className="text-xs text-slate-400 mt-4">
          Next up: <span className="text-slate-300 font-medium">{nextModuleTitle}</span>
        </p>
      )}
    </div>
  );
};
