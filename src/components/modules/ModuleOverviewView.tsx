import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useProgress } from '../../context/ProgressContext';
import { modulesData } from '../../data/workshopData';
import { learningSupportByModule } from '../../data/learningSupportData';
import { 
  Clock, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  HelpCircle, 
  ChevronRight,
} from 'lucide-react';
import { LearningObjectivesCard } from '../learning/LearningObjectivesCard';
import { WhyThisMattersCard } from '../learning/WhyThisMattersCard';
import { KeyTakeawaysCard } from '../learning/KeyTakeawaysCard';
import { ModuleGlossarySection } from '../learning/ModuleGlossarySection';

interface ModuleOverviewViewProps {
  moduleId: string;
}

export const ModuleOverviewView: React.FC<ModuleOverviewViewProps> = ({ moduleId }) => {
  const { navigate } = useRouter();
  const { isSectionCompleted, getModuleProgressPercentage } = useProgress();

  const currentModule = modulesData.find((m) => m.id === moduleId) || modulesData[0];
  const supportData = learningSupportByModule[moduleId] || learningSupportByModule['module-01'];
  const secIds = currentModule.sections.map((s) => s.id);
  const progressPct = getModuleProgressPercentage(secIds);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600">Portal</button>
          <span>/</span>
          <button onClick={() => navigate('/modules')} className="hover:text-indigo-600">Modules</button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Module {currentModule.number}</span>
        </nav>

        {/* Module Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold tracking-widest text-white bg-slate-900 px-3 py-1 rounded-full">
              MODULE {currentModule.number}
            </span>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {currentModule.estimatedReadingTime} Estimated
              </span>
              <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full">
                {progressPct}% Completed
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            {currentModule.title}
          </h1>

          {currentModule.subtitle && (
            <p className="text-base sm:text-lg text-slate-600 mb-6 italic">
              {currentModule.subtitle}
            </p>
          )}

          <p className="text-base text-slate-700 leading-relaxed max-w-3xl mb-8">
            {currentModule.overview.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                const firstSec = currentModule.sections[0];
                navigate(`/modules/${currentModule.id}/${firstSec.id}`);
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              <span>{progressPct > 0 ? 'Resume Reading' : 'Begin Reading Module'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {currentModule.knowledgeCheckIds && currentModule.knowledgeCheckIds.length > 0 && (
              <button
                onClick={() => navigate(`/modules/${currentModule.id}/quiz/${currentModule.knowledgeCheckIds[0]}`)}
                className="px-5 py-3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl flex items-center gap-2 transition-colors shadow-xs"
              >
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Take Knowledge Check</span>
              </button>
            )}
          </div>
        </div>

        {/* Why This Matters */}
        {supportData?.whyThisMatters && (
          <WhyThisMattersCard
            moduleId={currentModule.id}
            paragraphs={supportData.whyThisMatters}
          />
        )}

        {/* Learning Objectives */}
        {supportData?.learningObjectives && (
          <LearningObjectivesCard
            moduleId={currentModule.id}
            objectives={supportData.learningObjectives}
          />
        )}

        {/* Reading Sections Table of Contents */}
        <section aria-labelledby="reading-sections-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 id="reading-sections-heading" className="text-xl font-bold text-slate-900 tracking-tight">
                Reading Sections
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500">
              {currentModule.sections.length} Sections
            </span>
          </div>

          <div className="space-y-3">
            {currentModule.sections.map((sec) => {
              const completed = isSectionCompleted(sec.id);
              return (
                <div
                  key={sec.id}
                  onClick={() => navigate(`/modules/${currentModule.id}/${sec.id}`)}
                  className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 shrink-0">
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        sec.number
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                        {sec.title}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {sec.estimatedReadingTime} read
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {completed && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Completed
                      </span>
                    )}
                    <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Read Section</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Key Takeaways */}
        {supportData?.keyTakeaways && (
          <KeyTakeawaysCard
            moduleId={currentModule.id}
            takeaways={supportData.keyTakeaways}
          />
        )}

        {/* Module Glossary */}
        {supportData?.glossaryTerms && (
          <ModuleGlossarySection
            moduleId={currentModule.id}
            terms={supportData.glossaryTerms}
          />
        )}

      </div>
    </div>
  );
};

