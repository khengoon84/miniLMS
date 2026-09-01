import React, { useEffect, useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useProgress } from '../../context/ProgressContext';
import { modulesData, readingSectionsData, glossaryTermsData } from '../../data/workshopData';
import { learningSupportByModule } from '../../data/learningSupportData';
import { ModuleSidebar } from './ModuleSidebar';
import { Callout } from './Callout';
import { Figure } from './Figure';
import { ScientificTable } from './ScientificTable';
import { ThinkAboutItCard } from '../learning/ThinkAboutItCard';
import { PauseAndReflectCard } from '../learning/PauseAndReflectCard';
import { KeyTakeawaysCard } from '../learning/KeyTakeawaysCard';
import { InteractiveModuleKnowledgeCheck } from '../learning/InteractiveModuleKnowledgeCheck';
import { ModuleCompletionCard } from '../learning/ModuleCompletionCard';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  ExternalLink,
  CheckCircle,
  X
} from 'lucide-react';
import { GlossaryTerm } from '../../types';

interface ReadingSectionViewProps {
  moduleId: string;
  sectionId: string;
}

export const ReadingSectionView: React.FC<ReadingSectionViewProps> = ({ moduleId, sectionId }) => {
  const { navigate } = useRouter();
  const { isSectionCompleted, toggleSectionCompletion, markSectionCompleted, setLastVisited } = useProgress();

  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<GlossaryTerm | null>(null);

  const currentModule = modulesData.find((m) => m.id === moduleId) || modulesData[0];
  const currentSection = readingSectionsData[sectionId] || Object.values(readingSectionsData)[0];
  const supportData = learningSupportByModule[moduleId] || learningSupportByModule['module-01'];

  const isCompleted = currentSection ? isSectionCompleted(currentSection.id) : false;
  const isLastSectionInModule = !currentSection?.nextSectionId;

  // Next module details for completion card
  const moduleIndex = modulesData.findIndex((m) => m.id === currentModule.id);
  const nextModule = moduleIndex >= 0 && moduleIndex < modulesData.length - 1 ? modulesData[moduleIndex + 1] : null;

  // Filter any Think About It items relevant to this section
  const sectionThinkAboutIt = supportData?.thinkAboutItPrompts?.filter(
    (tai) => tai.suggestedSectionId === currentSection?.id
  ) || [];

  // Update last visited section in progress tracking
  useEffect(() => {
    if (currentModule && currentSection) {
      setLastVisited(`/modules/${currentModule.id}/${currentSection.id}`);
    }
  }, [currentModule?.id, currentSection?.id, setLastVisited]);

  if (!currentSection) {
    return (
      <div className="w-full min-h-screen py-16 px-4 max-w-3xl mx-auto text-center font-sans">
        <h2 className="text-2xl font-bold text-[#182232] mb-3">Section Not Found</h2>
        <p className="text-gray-600 mb-6 font-serif">The requested reading section does not exist in the workshop manifest.</p>
        <button
          onClick={() => navigate('/modules')}
          className="px-5 py-2.5 bg-[#182232] text-white text-sm font-semibold hover:bg-slate-800"
        >
          Return to Modules
        </button>
      </div>
    );
  }

  const handleNextAction = () => {
    // Automatically mark current section completed when advancing
    markSectionCompleted(currentSection.id);

    if (currentSection.nextSectionId) {
      navigate(`/modules/${currentModule.id}/${currentSection.nextSectionId}`);
    } else if (nextModule) {
      navigate(`/modules/${nextModule.id}`);
    } else {
      navigate('/pathway');
    }
  };

  const handlePrevAction = () => {
    if (currentSection.previousSectionId) {
      navigate(`/modules/${currentModule.id}/${currentSection.previousSectionId}`);
    } else {
      navigate(`/modules/${currentModule.id}`);
    }
  };

  const handleGlossaryClick = (termText: string) => {
    const found = glossaryTermsData.find(
      (g) => g.term.toLowerCase() === termText.toLowerCase() || termText.toLowerCase().includes(g.term.toLowerCase())
    );
    if (found) {
      setActiveGlossaryTerm(found);
    } else {
      navigate(`/glossary?q=${encodeURIComponent(termText)}`);
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-8 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-sans text-slate-500">
          <button 
            onClick={() => navigate('/')} 
            className="hover:text-indigo-600 transition-colors"
          >
            Portal
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('/modules')} 
            className="hover:text-indigo-600 transition-colors"
          >
            Modules
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate(`/modules/${currentModule.id}`)} 
            className="hover:text-indigo-600 transition-colors"
          >
            Module {currentModule.number}
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">
            Section {currentSection.number}
          </span>
        </nav>

        {/* Two-Column Layout: Sidebar + Long-Form Reader */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Module Sidebar Navigation */}
          <ModuleSidebar module={currentModule} currentSectionId={currentSection.id} />

          {/* Main Reading Article Canvas */}
          <main className="flex-1 w-full max-w-reading mx-auto lg:mx-0 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs">
            
            {/* Section Header Metadata */}
            <header className="border-b border-slate-200 pb-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  MODULE {currentModule.number} · SECTION 0{currentSection.number}
                </span>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {currentSection.estimatedReadingTime}
                  </span>
                  
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-slate-900 leading-tight tracking-tight mb-4">
                {currentSection.title}
              </h1>

              {currentSection.subtitle && (
                <p className="text-lg text-slate-600 leading-relaxed italic">
                  {currentSection.subtitle}
                </p>
              )}
            </header>

            {/* Scientific Long-Form Content Block Renderer */}
            <article className="scientific-reading-content space-y-6">
              {currentSection.contentBlocks.map((block, idx) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p 
                        key={idx} 
                        className={block.lead ? 'text-lg leading-relaxed text-slate-900 font-normal' : 'text-base leading-relaxed text-slate-800'}
                      >
                        {block.text}
                      </p>
                    );

                  case 'heading':
                    if (block.level === 1) {
                      return (
                        <h1 key={idx} id={block.id || `heading-${idx}`} className="text-2xl sm:text-3xl font-bold text-slate-900 mt-10 mb-4 tracking-tight">
                          {block.text}
                        </h1>
                      );
                    }
                    if (block.level === 2) {
                      return (
                        <div key={idx} className="mt-8 mb-3">
                          <h2 id={block.id || `heading-${idx}`} className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                            {block.text}
                          </h2>
                          {block.subtitle && (
                            <p className="text-sm text-slate-600 mt-1 italic">{block.subtitle}</p>
                          )}
                        </div>
                      );
                    }
                    if (block.level === 3) {
                      return (
                        <h3 key={idx} id={block.id || `heading-${idx}`} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2 tracking-tight">
                          {block.text}
                        </h3>
                      );
                    }
                    return (
                      <h4 key={idx} id={block.id || `heading-${idx}`} className="text-base font-bold text-slate-900 mt-5 mb-2 tracking-tight">
                        {block.text}
                      </h4>
                    );

                  case 'callout':
                    return (
                      <Callout
                        key={idx}
                        variant={block.variant}
                        title={block.title}
                        content={block.content}
                      />
                    );

                  case 'figure':
                    return (
                      <Figure
                        key={idx}
                        figureNumber={block.figureNumber}
                        title={block.title}
                        caption={block.caption}
                        imageUrl={block.imageUrl}
                        svgMarkup={block.svgMarkup}
                        alt={block.alt}
                        source={block.source}
                        attribution={block.attribution}
                        expandable={block.expandable}
                        isPlaceholder={block.isPlaceholder}
                      />
                    );

                  case 'table':
                    return (
                      <ScientificTable
                        key={idx}
                        title={block.title}
                        caption={block.caption}
                        headers={block.headers}
                        rows={block.rows}
                        columnAlign={block.columnAlign}
                        footerNote={block.footerNote}
                      />
                    );

                  case 'list':
                    if (block.ordered) {
                      return (
                        <div key={idx} className="my-6">
                          {block.title && (
                            <h4 className="font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">
                              {block.title}
                            </h4>
                          )}
                          <ol className="list-decimal pl-6 space-y-2 text-base leading-relaxed text-slate-800">
                            {block.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="pl-1">{item}</li>
                            ))}
                          </ol>
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className="my-6">
                        {block.title && (
                          <h4 className="font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider">
                            {block.title}
                          </h4>
                        )}
                        <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-slate-800">
                          {block.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="pl-1">{item}</li>
                          ))}
                        </ul>
                      </div>
                    );

                  case 'definition':
                    return (
                      <div key={idx} className="my-6 p-5 bg-slate-50 border-l-4 border-slate-700 rounded-r-lg">
                        <div className="font-bold text-sm text-slate-900 mb-1">
                          {block.term}
                        </div>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                          {block.definition}
                        </p>
                        {block.source && (
                          <span className="block text-xs text-slate-500 mt-2 italic">
                            Source: {block.source}
                          </span>
                        )}
                      </div>
                    );

                  case 'quote':
                    return (
                      <blockquote key={idx} className="my-6 pl-6 border-l-2 border-slate-300 italic text-lg text-slate-700">
                        <p className="mb-2">&ldquo;{block.text}&rdquo;</p>
                        {block.attribution && (
                          <cite className="block not-italic text-xs text-slate-500 uppercase tracking-wider">
                            — {block.attribution}
                          </cite>
                        )}
                      </blockquote>
                    );

                  case 'think-about-it':
                    return <ThinkAboutItCard key={idx} item={block.item} />;

                  case 'pause-reflect':
                    return <PauseAndReflectCard key={idx} item={block.item} />;

                  case 'key-takeaways':
                    return (
                      <div key={idx} className="my-8 bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-6 sm:p-7 shadow-2xs">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300/60 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <h4 className="text-base font-bold text-emerald-950 uppercase tracking-wider">
                            {block.title || 'Key Takeaways'}
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          {block.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-200/60 text-emerald-800 border border-emerald-300 flex items-center justify-center mt-0.5 text-xs font-bold">
                                ✓
                              </span>
                              <span className="text-sm sm:text-base text-slate-800 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );

                  case 'references':
                    return (
                      <div key={idx} className="mt-10 pt-6 border-t border-slate-200">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-4">
                          {block.title || 'References & Citations'}
                        </h4>
                        <ol className="list-decimal pl-5 space-y-3 text-xs text-slate-700">
                          {block.items.map((ref, refIdx) => (
                            <li key={ref.id || refIdx} className="pl-1">
                              <span>{ref.citation}</span>
                              {ref.doi && (
                                <a
                                  href={`https://doi.org/${ref.doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 font-mono text-[11px] text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                                >
                                  <span>doi:{ref.doi}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </article>

            {/* Section Think About It Prompts (if linked to this section) */}
            {sectionThinkAboutIt.map((tai) => (
              <ThinkAboutItCard key={tai.id} item={tai} />
            ))}

            {/* Section References if passed via section property */}
            {currentSection.references && currentSection.references.length > 0 && (
              <div className="mt-12 pt-6 border-t border-slate-200">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Section References</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-3 text-xs text-slate-700">
                  {currentSection.references.map((ref, refIdx) => (
                    <li key={ref.id || refIdx} className="pl-1">
                      <span>{ref.citation}</span>
                      {ref.doi && (
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 font-mono text-[11px] text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>doi:{ref.doi}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* End of Module Specialized Learning Layer (on the last section of each module) */}
            {isLastSectionInModule && (
              <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200 space-y-8">
                
                {/* Pause and Reflect */}
                {supportData?.pauseAndReflect && (
                  <PauseAndReflectCard item={supportData.pauseAndReflect} />
                )}

                {/* Module Key Takeaways */}
                {supportData?.keyTakeaways && (
                  <KeyTakeawaysCard
                    moduleId={currentModule.id}
                    takeaways={supportData.keyTakeaways}
                  />
                )}

                {/* Module Interactive Knowledge Checks */}
                {supportData?.knowledgeChecks && supportData.knowledgeChecks.length > 0 && (
                  <InteractiveModuleKnowledgeCheck
                    moduleId={currentModule.id}
                    questions={supportData.knowledgeChecks}
                    title={`Module ${currentModule.number} Knowledge Check`}
                    subtitle={`Verify your mastery of key concepts from Module ${currentModule.number}`}
                  />
                )}

                {/* Module Completion Summary Card */}
                <ModuleCompletionCard
                  moduleId={currentModule.id}
                  moduleNumber={currentModule.number}
                  nextModuleId={nextModule?.id}
                  nextModuleTitle={nextModule?.title}
                />
              </div>
            )}

            {/* Reading Section Completion & Navigation Footer */}
            <div className="border-t border-slate-200 mt-12 pt-8">
              
              {/* Mark as Complete Toggle */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="mark-completed-checkbox"
                    checked={isCompleted}
                    onChange={() => toggleSectionCompletion(currentSection.id)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="mark-completed-checkbox" className="text-sm font-medium text-slate-800 cursor-pointer select-none">
                    {isCompleted ? 'Marked as completed' : 'Mark section as completed'}
                  </label>
                </div>

                <span className="text-xs text-slate-500">
                  {isCompleted ? 'Stored in browser progress' : 'Saves progress automatically'}
                </span>
              </div>

              {/* Previous / Next Section Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Previous Button */}
                <button
                  onClick={handlePrevAction}
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>
                    {currentSection.previousSectionId ? 'Previous Section' : 'Module Overview'}
                  </span>
                </button>

                {/* Next Section Action */}
                <button
                  onClick={handleNextAction}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>
                    {currentSection.nextSectionId
                      ? 'Next Section'
                      : nextModule
                      ? `Continue to Module ${nextModule.number}`
                      : 'View Learning Pathway'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </main>

        </div>

      </div>

      {/* Interactive Glossary Popover / Modal */}
      {activeGlossaryTerm && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-slate-300 rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  GLOSSARY ENTRY
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeGlossaryTerm.term}
                </h3>
              </div>
              <button
                onClick={() => setActiveGlossaryTerm(null)}
                className="p-1 hover:bg-slate-100 text-slate-500 rounded-lg"
                aria-label="Close glossary modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed mb-4">
              {activeGlossaryTerm.definition}
            </p>

            {activeGlossaryTerm.category && (
              <div className="text-xs text-slate-500 mb-4">
                <span className="font-semibold text-slate-600">Category: </span>
                <span>{activeGlossaryTerm.category}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <button
                onClick={() => {
                  const termId = activeGlossaryTerm.id;
                  setActiveGlossaryTerm(null);
                  navigate(`/glossary#${termId}`);
                }}
                className="text-indigo-600 hover:underline font-medium"
              >
                View in Full Glossary →
              </button>
              <button
                onClick={() => setActiveGlossaryTerm(null)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

