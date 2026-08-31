import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { KnowledgeCheck } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface InteractiveModuleKnowledgeCheckProps {
  moduleId: string;
  questions: KnowledgeCheck[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const InteractiveModuleKnowledgeCheck: React.FC<InteractiveModuleKnowledgeCheckProps> = ({
  moduleId,
  questions,
  title = 'Knowledge Check',
  subtitle = 'Check your understanding before moving forward',
  className = '',
}) => {
  const { recordQuizResult, getQuizResult } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentQuestion = questions[currentIndex] || questions[0];
  const existingResult = getQuizResult(currentQuestion.id);

  const [selectedOption, setSelectedOption] = useState<string | null>(
    existingResult ? existingResult.selectedOptionId : null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!existingResult);

  // Sync state when currentIndex changes
  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
    const q = questions[index];
    const prevRes = getQuizResult(q.id);
    setSelectedOption(prevRes ? prevRes.selectedOptionId : null);
    setIsSubmitted(!!prevRes);
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswerId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;

    const correct = selectedOption === currentQuestion.correctAnswerId;
    setIsSubmitted(true);
    recordQuizResult(currentQuestion.id, selectedOption, correct);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const totalQuestions = questions.length;
  const answeredCount = questions.filter((q) => !!getQuizResult(q.id)).length;
  const correctCount = questions.filter((q) => getQuizResult(q.id)?.isCorrect).length;

  return (
    <div
      id={`module-knowledge-check-${moduleId}`}
      className={`my-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-medium">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          {answeredCount > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {correctCount}/{totalQuestions} Correct
            </span>
          )}
        </div>
      </div>

      {/* Question Selector Tabs for Multi-Question Sets */}
      {totalQuestions > 1 && (
        <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
          {questions.map((q, idx) => {
            const res = getQuizResult(q.id);
            const isCurrent = idx === currentIndex;
            let badgeBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
            if (res) {
              badgeBg = res.isCorrect
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300';
            }
            if (isCurrent) {
              badgeBg += ' ring-2 ring-indigo-600 font-bold';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSelectQuestion(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${badgeBg}`}
              >
                Q{idx + 1}
              </button>
            );
          })}
        </div>
      )}

      {/* Topic Eyebrow */}
      <div className="mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
          {currentQuestion.topicTitle || `Question ${currentIndex + 1}`}
        </span>
      </div>

      {/* Question Text */}
      <h4 className="text-base sm:text-lg font-medium text-slate-900 mb-6 leading-snug whitespace-pre-line">
        {currentQuestion.question}
      </h4>

      {/* Options Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 mb-6" role="radiogroup" aria-label="Question options">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isAnswer = opt.id === currentQuestion.correctAnswerId;

            let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

            if (isSubmitted) {
              if (isAnswer) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-amber-400 bg-amber-50 text-amber-950';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium ring-1 ring-indigo-600';
            }

            return (
              <label
                key={opt.id}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none text-sm sm:text-base ${optionStyle}`}
              >
                <input
                  type="radio"
                  name={`quiz-option-${currentQuestion.id}`}
                  value={opt.id}
                  checked={isSelected}
                  disabled={isSubmitted}
                  onChange={() => setSelectedOption(opt.id)}
                  className="sr-only"
                />

                <span
                  className={`w-6 h-6 rounded-md shrink-0 flex items-center justify-center font-bold text-xs border mt-0.5 ${
                    isSubmitted && isAnswer
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : isSubmitted && isSelected && !isCorrect
                      ? 'bg-amber-600 text-white border-amber-600'
                      : isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {isSubmitted && isAnswer ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isSubmitted && isSelected && !isCorrect ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    opt.label || opt.id
                  )}
                </span>

                <span className="flex-1 leading-relaxed">{opt.text}</span>
              </label>
            );
          })}
        </div>

        {/* Buttons / Actions */}
        {!isSubmitted ? (
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={() => handleSelectQuestion(currentIndex - 1)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!selectedOption}
              className="px-5 py-2 bg-indigo-700 text-white font-medium text-sm rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              Check Answer
            </button>
          </div>
        ) : (
          <div>
            {/* Feedback Message */}
            <div
              className={`p-5 rounded-xl border mb-6 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600" />
                    <span>Not quite — let&apos;s review:</span>
                  </>
                )}
              </div>

              <p className="text-sm leading-relaxed text-slate-800">
                {currentQuestion.generalExplanation}
              </p>
            </div>

            {/* Post-submission Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => handleSelectQuestion(currentIndex - 1)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Previous
                  </button>
                )}

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => handleSelectQuestion(currentIndex + 1)}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                    ✓ All questions completed
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
