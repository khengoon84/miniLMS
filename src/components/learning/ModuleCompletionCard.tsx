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
      className={`my-10 p-8 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-2xs text-center ${className}`}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
        <Award className="w-7 h-7" />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
        Module {moduleNumber} Complete
      </h3>
      <p className="text-slate-600 text-base max-w-md mx-auto mb-6">
        You have reached the end of this module.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {isLastModule ? (
          <button
            type="button"
            onClick={() => navigate('/pathway')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span>Complete Pre-Workshop Reading</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate(`/modules/${nextModuleId}`)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-semibold text-sm transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <span>Continue to Module {parseInt(moduleNumber, 10) + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => navigate(`/modules/${moduleId}`)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm border border-slate-200 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Module Overview</span>
        </button>
      </div>

      {nextModuleTitle && !isLastModule && (
        <p className="text-xs text-slate-500 mt-4">
          Next up: <span className="text-slate-800 font-medium">{nextModuleTitle}</span>
        </p>
      )}
    </div>
  );
};
