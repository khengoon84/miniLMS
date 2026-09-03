import React, { useState } from 'react';
import { overallWorkshopPathwayData } from '../../data/learningSupportData';
import { useRouter } from '../../context/RouterContext';
import { useProgress } from '../../context/ProgressContext';
import {
  Route,
  ArrowRight,
  CheckCircle,
  Circle,
  Sparkles,
  BookOpen,
  CheckSquare,
  Award,
  Layers,
  Dna,
  FlaskConical,
  Filter,
  ShieldCheck,
  Zap,
  Activity,
} from 'lucide-react';
import { InteractiveModuleKnowledgeCheck } from '../learning/InteractiveModuleKnowledgeCheck';

export const OverallPathwayView: React.FC = () => {
  const { navigate } = useRouter();
  const { progress, updateProgress } = useProgress();
  const data = overallWorkshopPathwayData;

  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nibm_pathway_reflection');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleReflectionItem = (idx: number) => {
    const updated = { ...checkedQuestions, [idx]: !checkedQuestions[idx] };
    setCheckedQuestions(updated);
    try {
      localStorage.setItem('nibm_pathway_reflection', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const stepIcons = [
    <Dna key="1" className="w-5 h-5" />,
    <FlaskConical key="2" className="w-5 h-5" />,
    <Filter key="3" className="w-5 h-5" />,
    <ShieldCheck key="4" className="w-5 h-5" />,
    <Zap key="5" className="w-5 h-5" />,
    <Activity key="6" className="w-5 h-5" />,
  ];

  const totalReflections = data.finalReflection.questions.length;
  const completedReflections = data.finalReflection.questions.filter((_, idx) => !!checkedQuestions[idx]).length;

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition-colors">
            Workshop Portal
          </button>
          <span>/</span>
          <button onClick={() => navigate('/modules')} className="hover:text-indigo-600 transition-colors">
            Modules
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Learning Pathway & Summary</span>
        </nav>

        {/* Hero Section */}
        <header className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg border border-indigo-900/50">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Route className="w-3.5 h-3.5" />
            {data.title}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {data.tagline}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Connect the four workshop modules into one integrated, end-to-end scientific workflow from sequence design to biological immune activation.
          </p>
        </header>

        {/* 6-Step Pathway Flow */}
        <section aria-labelledby="pathway-steps-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 id="pathway-steps-heading" className="text-xl font-bold text-slate-900 tracking-tight">
                The mRNA Vaccine Journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">The 6 interconnected stages of the platform</p>
            </div>
          </div>

          <div className="space-y-4 relative before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-indigo-100">
            {data.journeySteps.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="relative flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                  {stepIcons[idx] || step.stepNumber}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                      Stage {step.stepNumber}
                    </span>
                    <span className="text-slate-300">•</span>
                    <h3 className="text-base font-bold text-slate-900">
                      {step.phase}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Reflection Checklist */}
        <section aria-labelledby="final-reflection-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 id="final-reflection-heading" className="text-xl font-bold text-slate-900 tracking-tight">
                  Final Reflection
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">Self-assess your conceptual grasp</p>
              </div>
            </div>

            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 self-start sm:self-auto">
              {completedReflections} of {totalReflections} verified
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 mb-6 leading-relaxed whitespace-pre-line">
            {data.finalReflection.preamble}
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-600" />
            <span>{data.finalReflection.heading}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {data.finalReflection.questions.map((q, idx) => {
              const isChecked = !!checkedQuestions[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleReflectionItem(idx)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    isChecked
                      ? 'bg-teal-50/80 border-teal-300 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <button
                    type="button"
                    aria-label={isChecked ? 'Mark reflection unchecked' : 'Mark reflection checked'}
                    className="mt-0.5 text-teal-700 flex-shrink-0"
                  >
                    {isChecked ? (
                      <CheckCircle className="w-5 h-5 text-teal-600 fill-teal-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                  <span className={`text-sm leading-relaxed ${isChecked ? 'font-medium text-slate-900' : 'text-slate-700'}`}>
                    {q}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-teal-50/60 border-l-4 border-teal-600 text-sm font-medium text-teal-950">
            {data.finalReflection.footerNote}
          </div>
        </section>

        {/* Overall Knowledge Check */}
        <section aria-labelledby="overall-qc-heading">
          <InteractiveModuleKnowledgeCheck
            moduleId="overall"
            questions={data.overallKnowledgeChecks}
            title="Overall Knowledge Check"
            subtitle="Synthesizing concepts across all four modules"
          />
        </section>

        {/* Final Takeaway & Completion */}
        <section aria-labelledby="final-takeaway-heading" className="bg-slate-50 border border-slate-200/90 rounded-2xl p-8 sm:p-10 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h2 id="final-takeaway-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
              {data.finalTakeaway.heading}
            </h2>
          </div>

          <p className="text-lg font-semibold text-indigo-900 mb-4">
            {data.finalTakeaway.lead}
          </p>

          <ul className="space-y-3 mb-6">
            {data.finalTakeaway.bulletPoints.map((bp, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                <span>{bp}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-slate-200 space-y-2 text-slate-700 text-base leading-relaxed">
            <p>{data.finalTakeaway.conclusion}</p>
            <p className="text-lg font-bold text-slate-900 tracking-tight">{data.finalTakeaway.closingNote}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Pre-Workshop Reading Course Completed</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/modules')}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
              >
                Review Modules
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
              >
                <span>Back to Portal Home</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
