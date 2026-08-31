import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';
import { ThinkAboutItItem } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface ThinkAboutItCardProps {
  item: ThinkAboutItItem;
  className?: string;
}

export const ThinkAboutItCard: React.FC<ThinkAboutItCardProps> = ({
  item,
  className = '',
}) => {
  const { progress, updateProgress } = useProgress();
  const [showNotes, setShowNotes] = useState(false);
  const noteKey = `note-tai-${item.id}`;
  const currentNote = progress.notes?.[noteKey] || '';

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNotes = { ...(progress.notes || {}), [noteKey]: e.target.value };
    updateProgress({ notes: updatedNotes });
  };

  return (
    <aside
      id={`think-about-it-${item.id}`}
      aria-label={`Think About It ${item.number} — ${item.title}`}
      className={`my-6 rounded-xl border border-amber-200/80 bg-amber-50/50 p-5 sm:p-6 shadow-sm transition-all ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 border border-amber-300/50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 block mb-0.5">
              Think About It {item.number}
            </span>
            <h4 className="text-base font-semibold text-slate-900">
              {item.title}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 rounded-md border border-amber-300/60 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{showNotes ? 'Hide Notes' : currentNote ? 'Edit Notes' : 'Add Note'}</span>
          {showNotes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      <div className="mt-3.5 space-y-2 text-sm sm:text-base text-slate-800 leading-relaxed pl-11">
        {item.prompt.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {p}
          </p>
        ))}
      </div>

      {showNotes && (
        <div className="mt-4 pl-11">
          <label htmlFor={`note-input-${item.id}`} className="block text-xs font-medium text-slate-600 mb-1">
            My Thinking Space (saved locally in your browser):
          </label>
          <textarea
            id={`note-input-${item.id}`}
            rows={3}
            value={currentNote}
            onChange={handleNoteChange}
            placeholder="Jot down your thoughts or answer here..."
            className="w-full text-sm p-3 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>
      )}
    </aside>
  );
};
