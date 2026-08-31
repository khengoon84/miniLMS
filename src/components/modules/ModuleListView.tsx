import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useProgress } from '../../context/ProgressContext';
import { modulesData } from '../../data/workshopData';
import { 
  Clock, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Check,
  Layers,
  Route,
  HelpCircle
} from 'lucide-react';

export const ModuleListView: React.FC = () => {
  const { navigate } = useRouter();
  const { isSectionCompleted, getModuleProgressPercentage } = useProgress();

  const totalSections = modulesData.reduce((acc, m) => acc + m.sections.length, 0);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition-colors">
            Portal
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Workshop Modules</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="text-xs font-bold tracking-widest text-indigo-700 uppercase">
              CURRICULUM DIRECTORY
            </span>
            <span className="text-xs font-medium text-slate-500">
              4 Core Modules · {totalSections} Reading Sections
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Workshop Modules
          </h1>

          <p className="text-base text-slate-700 max-w-3xl leading-relaxed mb-6">
            Follow the four-module pre-workshop reading track to build a thorough understanding of the mRNA vaccine design and manufacturing workflow.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/pathway')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-semibold border border-indigo-200 transition-colors"
            >
              <Route className="w-3.5 h-3.5" />
              <span>View Learning Pathway & Summary</span>
            </button>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          {modulesData.map((module) => {
            const secIds = module.sections.map((s) => s.id);
            const completedCount = secIds.filter((id) => isSectionCompleted(id)).length;
            const isComplete = completedCount === secIds.length && secIds.length > 0;
            const isStarted = completedCount > 0;
            const progressPct = getModuleProgressPercentage(secIds);
            const firstSec = module.sections[0];

            return (
              <div
                key={module.id}
                className={`bg-white border rounded-2xl p-6 sm:p-8 transition-all shadow-xs ${
                  isComplete
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-slate-100 text-slate-900 font-mono text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200">
                        MODULE {module.number}
                      </span>
                      {isComplete ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold text-xs bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                          <Check className="w-3 h-3" />
                          Completed
                        </span>
                      ) : isStarted ? (
                        <span className="text-indigo-700 font-semibold text-xs bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                          {completedCount} of {secIds.length} Sections Completed
                        </span>
                      ) : (
                        <span className="text-slate-500 font-medium text-xs bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                          Not Started
                        </span>
                      )}
                      <span className="text-xs text-slate-500 flex items-center gap-1 hidden sm:flex">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {module.estimatedReadingTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      <button
                        onClick={() => navigate(`/modules/${module.id}`)}
                        className="text-left hover:text-indigo-600 transition-colors focus:outline-none"
                      >
                        {module.title}
                      </button>
                    </h2>
                    {module.subtitle && (
                      <div className="text-sm text-slate-600 mt-1 italic">
                        {module.subtitle}
                      </div>
                    )}
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
                      {progressPct}% Completed
                    </span>
                  </div>
                </div>

                <p className="text-base text-slate-700 leading-relaxed mb-6">
                  {module.description}
                </p>

                {/* Section Table of Contents Preview */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 mb-6">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    SECTIONS IN THIS MODULE
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {module.sections.map((sec) => {
                      const completed = isSectionCompleted(sec.id);
                      return (
                        <button
                          key={sec.id}
                          onClick={() => navigate(`/modules/${module.id}/${sec.id}`)}
                          className="text-left p-2.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 rounded-lg flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            {completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <span className="font-mono text-slate-400 font-semibold">{sec.number}.</span>
                            )}
                            <span className="text-slate-800 group-hover:text-indigo-900 font-medium truncate">
                              {sec.title}
                            </span>
                          </div>
                          <span className="text-slate-400 font-mono text-[10px] shrink-0 ml-2">
                            {sec.estimatedReadingTime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => navigate(`/modules/${module.id}`)}
                    className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                  >
                    View Module Syllabus & Objectives →
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/modules/${module.id}`)}
                      className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold transition-colors"
                    >
                      Open Module
                    </button>

                    <button
                      onClick={() => {
                        const nextSec = module.sections.find((s) => !isSectionCompleted(s.id)) || firstSec;
                        navigate(`/modules/${module.id}/${nextSec.id}`);
                      }}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>{isComplete ? 'Review Reading' : isStarted ? 'Resume Reading' : 'Start Reading'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
