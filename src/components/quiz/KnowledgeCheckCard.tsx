import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useProgress } from '../../context/ProgressContext';
import { modulesData, knowledgeChecksData } from '../../data/workshopData';
import { KnowledgeCheck } from '../../types';
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface KnowledgeCheckViewProps {
  moduleId: string;
  quizId?: string;
}

export const KnowledgeCheckView: React.FC<KnowledgeCheckViewProps> = ({ moduleId, quizId }) => {
  const { navigate } = useRouter();
  const { recordQuizResult, getQuizResult } = useProgress();

  const currentModule = modulesData.find((m) => m.id === moduleId) || modulesData[0];
  
  // Find quiz by ID or pick the first quiz belonging to this module
  const targetQuiz: KnowledgeCheck = 
    knowledgeChecksData.find((q) => q.id === quizId) ||
    knowledgeChecksData.find((q) => q.moduleId === moduleId) ||
    knowledgeChecksData[0];

  const existingResult = getQuizResult(targetQuiz.id);

  const [selectedOption, setSelectedOption] = useState<string | null>(
    existingResult ? existingResult.selectedOptionId : null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!existingResult);

  const isCorrect = selectedOption === targetQuiz.correctAnswerId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;

    const correct = selectedOption === targetQuiz.correctAnswerId;
    setIsSubmitted(true);
    recordQuizResult(targetQuiz.id, selectedOption, correct);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="w-full bg-[#fbf8fa] min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-sans text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-[#182232] transition-colors">
            Portal
          </button>
          <span>/</span>
          <button onClick={() => navigate('/modules')} className="hover:text-[#182232] transition-colors">
            Modules
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/modules/${currentModule.id}`)} className="hover:text-[#182232] transition-colors">
            Module {currentModule.number}
          </button>
          <span>/</span>
          <span className="text-[#182232] font-semibold">Knowledge Check</span>
        </nav>

        {/* Quiz Container Box */}
        <div className="bg-white border border-gray-200 p-6 sm:p-10 shadow-xs">
          
          {/* Header Eyebrow */}
          <div className="border-b border-gray-200 pb-5 mb-8">
            <span className="font-sans text-xs font-bold tracking-widest text-gray-500 uppercase block mb-1">
              {targetQuiz.moduleEyebrow || `MODULE ${currentModule.number} · KNOWLEDGE CHECK`}
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#182232] tracking-tight">
              {targetQuiz.topicTitle}
            </h1>
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h2 className="font-serif text-xl sm:text-2xl text-gray-900 leading-snug font-normal">
              {targetQuiz.question}
            </h2>
          </div>

          {/* Options Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-3 mb-8" role="radiogroup" aria-labelledby="question-text">
              {targetQuiz.options.map((opt, idx) => {
                const letter = optionLetters[idx] || `${idx + 1}`;
                const isSelected = selectedOption === opt.id;
                const isAnswer = opt.id === targetQuiz.correctAnswerId;

                let optionClasses = 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800';

                if (isSubmitted) {
                  if (isAnswer) {
                    optionClasses = 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium';
                  } else if (isSelected && !isCorrect) {
                    optionClasses = 'border-red-500 bg-red-50/60 text-red-950';
                  } else {
                    optionClasses = 'border-gray-200 bg-gray-50/40 text-gray-400 opacity-70';
                  }
                } else if (isSelected) {
                  optionClasses = 'border-[#182232] bg-slate-50 text-[#182232] font-medium ring-1 ring-[#182232]';
                }

                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 border transition-all cursor-pointer select-none font-sans text-base ${optionClasses}`}
                  >
                    <input
                      type="radio"
                      name="knowledge-check-option"
                      value={opt.id}
                      checked={isSelected}
                      disabled={isSubmitted}
                      onChange={() => setSelectedOption(opt.id)}
                      className="sr-only"
                    />

                    {/* Letter badge / Indicator */}
                    <div
                      className={`w-7 h-7 shrink-0 flex items-center justify-center font-sans font-bold text-xs border ${
                        isSubmitted && isAnswer
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : isSubmitted && isSelected && !isCorrect
                          ? 'bg-red-600 text-white border-red-600'
                          : isSelected
                          ? 'bg-[#182232] text-white border-[#182232]'
                          : 'bg-gray-100 text-gray-600 border-gray-300'
                      }`}
                    >
                      {isSubmitted && isAnswer ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isSubmitted && isSelected && !isCorrect ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        letter
                      )}
                    </div>

                    <span className="flex-1 font-serif text-[1.0625rem] text-inherit">
                      {opt.text}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Submission / Retry Controls */}
            {!isSubmitted ? (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(`/modules/${currentModule.id}`)}
                  className="px-4 py-2 text-sm font-sans text-gray-600 hover:text-[#182232] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Module</span>
                </button>

                <button
                  type="submit"
                  disabled={!selectedOption}
                  className="px-6 py-2.5 bg-[#182232] text-white font-sans font-semibold text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              /* Feedback Banner (Matching Image 13 & html mockup) */
              <div className="pt-2">
                <div
                  className={`p-6 border-l-4 mb-8 ${
                    isCorrect
                      ? 'bg-[#f1f8f3] border-emerald-600 text-emerald-950'
                      : 'bg-[#fff5f5] border-red-600 text-red-950'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <h3 className="font-sans font-bold text-base sm:text-lg">
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>
                  </div>

                  <p className="font-serif text-[1.0625rem] leading-relaxed text-gray-800">
                    {targetQuiz.generalExplanation}
                  </p>

                  {/* Option Specific explanation if available */}
                  {!isCorrect && selectedOption && targetQuiz.optionExplanations?.[selectedOption] && (
                    <div className="mt-3 pt-3 border-t border-red-200/80 font-sans text-xs sm:text-sm text-red-900">
                      <span className="font-bold">Why your choice was incorrect: </span>
                      <span>{targetQuiz.optionExplanations[selectedOption]}</span>
                    </div>
                  )}
                </div>

                {/* Post-Answer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 font-sans">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => navigate(`/modules/${currentModule.id}`)}
                      className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium text-center"
                    >
                      Module Overview
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/modules')}
                      className="w-full sm:w-auto px-6 py-2 bg-[#182232] text-white hover:bg-slate-800 text-sm font-semibold flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Next Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            )}
          </form>

        </div>

      </div>
    </div>
  );
};
