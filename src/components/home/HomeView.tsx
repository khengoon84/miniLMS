import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useProgress } from '../../context/ProgressContext';
import { workshopInfo, modulesData, resourcesData, glossaryTermsData } from '../../data/workshopData';
import { overallWorkshopPathwayData } from '../../data/learningSupportData';
import { 
  BookOpen, 
  Layers, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  Search,
  BookMarked,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Route,
  Check,
  Circle,
  HelpCircle,
  Dna,
  FlaskConical,
  Filter,
  Zap,
  Activity
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigate } = useRouter();
  const { progress, isSectionCompleted, getModuleProgressPercentage } = useProgress();

  const totalSectionsCount = modulesData.reduce((acc, m) => acc + m.sections.length, 0);
  const completedSectionsCount = progress.completedSectionIds.length;
  const overallPercentage = Math.round((completedSectionsCount / totalSectionsCount) * 100);

  // Check module completion statuses
  const moduleStatuses = modulesData.map((module) => {
    const secIds = module.sections.map((s) => s.id);
    const completedCount = secIds.filter((id) => isSectionCompleted(id)).length;
    const isComplete = completedCount === secIds.length && secIds.length > 0;
    const isStarted = completedCount > 0;
    const percentage = getModuleProgressPercentage(secIds);
    return {
      module,
      completedCount,
      totalCount: secIds.length,
      isComplete,
      isStarted,
      percentage,
    };
  });

  const allModulesComplete = moduleStatuses.every((m) => m.isComplete);
  const completedModulesCount = moduleStatuses.filter((m) => m.isComplete).length;

  // Determine smart "Continue" destination
  const getContinueAction = () => {
    if (allModulesComplete) {
      return {
        label: 'Review Learning Pathway & Summary',
        subtitle: 'All 4 modules completed',
        action: () => navigate('/pathway'),
        buttonText: 'View Pathway & Final Check',
      };
    }

    // Find first incomplete module
    const firstIncompleteModule = moduleStatuses.find((m) => !m.isComplete);
    if (firstIncompleteModule) {
      const firstIncompleteSec = firstIncompleteModule.module.sections.find(
        (s) => !isSectionCompleted(s.id)
      ) || firstIncompleteModule.module.sections[0];

      if (firstIncompleteModule.isStarted) {
        return {
          label: `Resume Module ${firstIncompleteModule.module.number}`,
          subtitle: `Continue with ${firstIncompleteSec.title}`,
          action: () => navigate(`/modules/${firstIncompleteModule.module.id}/${firstIncompleteSec.id}`),
          buttonText: `Resume Module ${firstIncompleteModule.module.number}`,
        };
      } else {
        return {
          label: `Start Module ${firstIncompleteModule.module.number}`,
          subtitle: firstIncompleteModule.module.title,
          action: () => navigate(`/modules/${firstIncompleteModule.module.id}/${firstIncompleteSec.id}`),
          buttonText: `Start Module ${firstIncompleteModule.module.number}`,
        };
      }
    }

    // Fallback to last visited or Module 1
    return {
      label: 'Begin Pre-Workshop Reading',
      subtitle: 'Start with Module 1: Why mRNA?',
      action: () => navigate('/modules/module-01/m1-s1'),
      buttonText: 'Start Module 1',
    };
  };

  const continueInfo = getContinueAction();

  const workflowSteps = [
    { phase: 'DESIGN', desc: 'Sequence, Cap, UTRs, ORF, Tail', mod: 'Mod 2' },
    { phase: 'MANUFACTURE', desc: 'DNA Template & IVT Reaction', mod: 'Mod 3' },
    { phase: 'PURIFY & TEST', desc: 'dsRNA Removal & QC Attributes', mod: 'Mod 3' },
    { phase: 'FORMULATE', desc: 'LNP Encapsulation & Microfluidics', mod: 'Mod 4' },
    { phase: 'DELIVER & EXPRESS', desc: 'Endosomal Escape & Ribosome', mod: 'Mod 4' },
    { phase: 'IMMUNE RESPONSE', desc: 'Antigen Presentation & Activation', mod: 'Mod 1 & 4' },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* All Modules Complete Banner (if finished) */}
        {allModulesComplete && (
          <section aria-label="Completion status" className="bg-emerald-50/90 border border-emerald-300/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Workshop Preparation Completed
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 tracking-tight">
                    Pre-Workshop Reading Complete
                  </h2>
                  <p className="text-sm text-slate-700 mt-1 max-w-xl">
                    You have completed the four-module pre-workshop reading. Proceed to the Learning Pathway and Overall Knowledge Check to verify your preparation for the hands-on laboratory.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/pathway')}
                className="self-start sm:self-center px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 shrink-0"
              >
                <span>View Final Reflection & Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* Institutional Hero Banner */}
        <section aria-labelledby="hero-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            
            {/* Header Badge Strip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="bg-slate-900 text-white font-sans text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-md">
                {workshopInfo.code}
              </span>
              <span className="text-indigo-700 bg-indigo-50 border border-indigo-200 text-xs tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md">
                {workshopInfo.bannerTag}
              </span>
              <span className="text-slate-500 text-xs tracking-wider uppercase font-semibold">
                {workshopInfo.program}
              </span>
            </div>

            {/* Main Title */}
            <div className="mb-4">
              <span className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                ScienceLink Workshop
              </span>
              <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                {workshopInfo.title}
              </h1>
            </div>

            {/* Workshop Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              {workshopInfo.description}
            </p>

            {/* Core Instruction Callout (Approved Text) */}
            <div className="bg-indigo-50/80 border-l-4 border-indigo-600 rounded-r-xl p-4 sm:p-5 mb-8">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
                    How to Use This Pre-Workshop Reading
                  </h2>
                  <p className="text-sm sm:text-base text-indigo-950 font-medium leading-relaxed">
                    &ldquo;{workshopInfo.longDescription}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={continueInfo.action}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span>{continueInfo.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/pathway')}
                className="px-5 py-3.5 border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 font-semibold text-sm rounded-xl flex items-center gap-2 transition-all shadow-xs"
              >
                <Route className="w-4 h-4 text-indigo-600" />
                <span>Learning Pathway</span>
              </button>

              <button
                onClick={() => navigate('/modules')}
                className="px-5 py-3.5 border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 font-semibold text-sm rounded-xl flex items-center gap-2 transition-all shadow-xs"
              >
                <span>Curriculum Directory</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics & Overall Preparation Status Bar */}
          <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Estimated Reading</span>
              <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{workshopInfo.metadata.totalEstimatedHours}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Curriculum Structure</span>
              <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{modulesData.length} Core Modules</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Pre-Workshop Progress</span>
              <span className="font-semibold text-slate-900 text-sm mt-0.5 block">
                {completedModulesCount} of 4 Modules ({completedSectionsCount}/{totalSectionsCount} Sections)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Target Cohort</span>
              <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{workshopInfo.metadata.level}</span>
            </div>
          </div>
        </section>

        {/* Visual representation of the Central Scientific Workflow */}
        <section aria-labelledby="workflow-overview-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 id="workflow-overview-heading" className="text-xl font-bold text-slate-900 tracking-tight">
                  Bringing the Four Modules Together
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  The central scientific workflow connecting sequence design, manufacturing, purification, and biology
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/pathway')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore Complete Pathway</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Workflow Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                      Stage 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded">
                      {step.mod}
                    </span>
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 mb-1 leading-snug">
                    {step.phase}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4-Module Learning Journey Section */}
        <section aria-labelledby="pathway-track-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-bold tracking-widest text-indigo-700 uppercase mb-1">
                LEARNING PATHWAY
              </div>
              <h2 id="pathway-track-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
                Four-Module Pre-Workshop Track
              </h2>
              <p className="text-sm text-slate-600">
                Follow the four-stage sequential pathway from platform fundamentals to delivery systems.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>Overall Progress: <strong>{overallPercentage}%</strong></span>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className={`bg-white border rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all shadow-xs ${
                    isComplete
                      ? 'border-emerald-200 bg-emerald-50/10'
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div>
                    {/* Card Top Metadata */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                          MODULE {module.number}
                        </span>
                        {isComplete ? (
                          <span className="flex items-center gap-1 text-emerald-700 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <Check className="w-3 h-3" />
                            Completed
                          </span>
                        ) : isStarted ? (
                          <span className="text-indigo-700 font-semibold text-xs bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                            {completedCount}/{secIds.length} Complete
                          </span>
                        ) : (
                          <span className="text-slate-500 font-medium text-xs bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                            Not Started
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{module.estimatedReadingTime}</span>
                      </div>
                    </div>

                    {/* Module Title */}
                    <h3 className="text-xl font-bold text-slate-900 hover:text-indigo-900 transition-colors leading-snug mb-2">
                      <button
                        onClick={() => navigate(`/modules/${module.id}`)}
                        className="text-left hover:underline focus:outline-none"
                      >
                        {module.title}
                      </button>
                    </h3>

                    {/* Module Description (from approved content) */}
                    <p className="text-sm text-slate-700 leading-relaxed mb-6">
                      {module.description}
                    </p>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5">
                        <span>{module.sections.length} Reading Sections</span>
                        <span className="font-mono font-semibold text-slate-800">{progressPct}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isComplete ? 'bg-emerald-600' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                      <button
                        onClick={() => navigate(`/modules/${module.id}`)}
                        className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                      >
                        Module Overview
                      </button>

                      <button
                        onClick={() => {
                          // If started, resume next incomplete section
                          const nextSec = module.sections.find((s) => !isSectionCompleted(s.id)) || firstSec;
                          navigate(`/modules/${module.id}/${nextSec.id}`);
                        }}
                        className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                          isComplete
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                        }`}
                      >
                        <span>
                          {isComplete ? 'Review Module' : isStarted ? 'Resume Reading' : 'Start Module'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Learning Objectives & Expected Competencies */}
        <section aria-labelledby="workshop-objectives-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 id="workshop-objectives-heading" className="text-xl font-bold text-slate-900 tracking-tight">
                  Workshop Learning Objectives
                </h2>
              </div>
              <ul className="space-y-3.5 text-sm sm:text-base text-slate-700">
                {workshopInfo.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono font-bold text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:border-l lg:border-slate-200 lg:pl-10">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Expected Competencies
                </h2>
              </div>
              <ul className="space-y-3.5 text-sm sm:text-base text-slate-700">
                {workshopInfo.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                    <span className="leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Portal Navigation Grid */}
        <section aria-labelledby="quick-nav-heading" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/pathway')}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <Route className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors mb-1">
              Learning Pathway
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Integrated summary, final reflection checklist, and the overall workshop knowledge check.
            </p>
            <div className="text-xs font-semibold text-indigo-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Pathway & Summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/resources')}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors mb-1">
              Resource Library
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Access workshop reference materials, laboratory SOP protocols, and peer-reviewed journals.
            </p>
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Browse {resourcesData.length} Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/glossary')}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors mb-1">
              Scientific Glossary
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Index of terms, mathematical definitions, constants, and module cross-references.
            </p>
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View {glossaryTermsData.length} Indexed Terms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
