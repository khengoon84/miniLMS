import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useProgress } from '../../context/ProgressContext';
import { Module } from '../../types';
import { CheckCircle2, Circle, HelpCircle, FileText, ChevronRight } from 'lucide-react';

interface ModuleSidebarProps {
  module: Module;
  currentSectionId: string;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({ module, currentSectionId }) => {
  const { navigate } = useRouter();
  const { isSectionCompleted, getModuleProgressPercentage } = useProgress();

  const sectionIds = module.sections.map((s) => s.id);
  const progressPercent = getModuleProgressPercentage(sectionIds);

  return (
    <aside aria-label="Module Navigation" className="w-full lg:w-72 shrink-0">
      <div className="bg-white border border-gray-200 sticky top-20 p-5 shadow-2xs">
        {/* Module Header */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <button
            onClick={() => navigate(`/modules/${module.id}`)}
            className="text-left group w-full"
          >
            <div className="text-[11px] font-sans font-bold tracking-widest text-gray-500 uppercase mb-1 flex items-center gap-1.5">
              <span>MODULE {module.number}</span>
            </div>
            <h3 className="font-sans text-base font-bold text-[#182232] group-hover:text-blue-900 transition-colors leading-snug">
              {module.title}
            </h3>
          </button>

          {/* Progress Bar */}
          <div className="mt-3.5">
            <div className="flex justify-between items-center text-xs font-sans text-gray-500 mb-1.5 font-medium">
              <span>Progress</span>
              <span className="font-mono font-semibold text-[#182232]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-[#182232] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section List */}
        <nav className="space-y-1">
          <span className="text-[11px] font-sans font-bold tracking-wider text-gray-400 uppercase block mb-2 px-2">
            TABLE OF CONTENTS
          </span>

          {module.sections.map((sec) => {
            const isActive = sec.id === currentSectionId;
            const completed = isSectionCompleted(sec.id);

            return (
              <button
                key={sec.id}
                onClick={() => navigate(`/modules/${module.id}/${sec.id}`)}
                className={`w-full text-left px-2.5 py-2.5 flex items-start gap-2.5 transition-all text-xs font-sans border-l-2 ${
                  isActive
                    ? 'bg-gray-50/80 border-[#182232] text-[#182232] font-semibold'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isActive ? (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#182232] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#182232] rounded-full" />
                    </div>
                  ) : (
                    <span className="font-mono text-[11px] text-gray-400 font-medium">
                      {sec.number}.
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block leading-snug line-clamp-2">{sec.title}</span>
                  <span className="text-[10px] text-gray-400 font-normal mt-0.5 block">
                    {sec.estimatedReadingTime}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Knowledge Checks & Resources shortcuts */}
        <div className="border-t border-gray-200 mt-5 pt-4 space-y-1.5">
          {module.knowledgeCheckIds && module.knowledgeCheckIds.length > 0 && (
            <button
              onClick={() => navigate(`/modules/${module.id}/quiz/${module.knowledgeCheckIds[0]}`)}
              className="w-full text-left px-2.5 py-2 flex items-center justify-between text-xs font-sans text-[#182232] hover:bg-gray-50 font-medium group transition-colors"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                <span>Knowledge Check</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          <button
            onClick={() => navigate('/resources')}
            className="w-full text-left px-2.5 py-2 flex items-center justify-between text-xs font-sans text-gray-600 hover:text-[#182232] hover:bg-gray-50 group transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              <span>Module References</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  );
};
