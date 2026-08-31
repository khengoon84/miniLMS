import React from 'react';
import { Target, CheckCircle2, Circle } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface LearningObjectivesCardProps {
  moduleId: string;
  objectives: string[];
  className?: string;
  defaultExpanded?: boolean;
}

export const LearningObjectivesCard: React.FC<LearningObjectivesCardProps> = ({
  moduleId,
  objectives,
  className = '',
}) => {
  const { progress, updateProgress } = useProgress();
  const objectivesChecked = progress.objectivesChecked || {};

  const toggleObjective = (index: number) => {
    const key = `${moduleId}-obj-${index}`;
    const updated = { ...objectivesChecked, [key]: !objectivesChecked[key] };
    updateProgress({ objectivesChecked: updated });
  };

  const completedCount = objectives.filter((_, idx) => !!objectivesChecked[`${moduleId}-obj-${idx}`]).length;

  return (
    <div
      id={`learning-objectives-${moduleId}`}
      className={`bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-medium">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Learning Objectives</h3>
            <p className="text-sm text-slate-600">By the end of this module, I should be able to:</p>
          </div>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 whitespace-nowrap">
          {completedCount} of {objectives.length} checked
        </span>
      </div>

      <ul className="space-y-2.5">
        {objectives.map((objective, idx) => {
          const isChecked = !!objectivesChecked[`${moduleId}-obj-${idx}`];
          return (
            <li
              key={idx}
              onClick={() => toggleObjective(idx)}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <button
                type="button"
                aria-label={isChecked ? 'Mark objective uncompleted' : 'Mark objective completed'}
                className="mt-0.5 text-indigo-700 focus:outline-none flex-shrink-0"
              >
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                )}
              </button>
              <span className={`text-sm leading-relaxed ${isChecked ? 'text-slate-900 font-medium' : 'text-slate-700'}`}>
                {objective}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
