import React, { useState } from 'react';
import { Sparkles, Edit3 } from 'lucide-react';
import { PauseAndReflectItem } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface PauseAndReflectCardProps {
  item: PauseAndReflectItem;
  className?: string;
}

export const PauseAndReflectCard: React.FC<PauseAndReflectCardProps> = ({
  item,
  className = '',
}) => {
  const { progress, setNote } = useProgress();
  const noteKey = `note-pr-${item.id}`;
  const currentNote = progress.notes?.[noteKey] || '';
  const [showNotes, setShowNotes] = useState(() => Boolean(currentNote));

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(noteKey, e.target.value);
  };

  return (
    <div
      id={`pause-and-reflect-${item.id}`}
      className={`my-8 rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50/70 via-slate-50 to-white p-6 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 border border-teal-200 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-teal-950 uppercase tracking-wide">
            Pause and Reflect
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-100/70 hover:bg-teal-200/70 rounded-md border border-teal-300 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{showNotes ? 'Hide Reflection' : currentNote ? 'Edit Reflection' : 'My Reflection'}</span>
        </button>
      </div>

      <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
        {item.context.map((line, idx) => (
          <p key={idx} className="whitespace-pre-line font-medium text-slate-800">
            {line}
          </p>
        ))}
      </div>

      <div className="p-4 bg-white/90 border-l-4 border-teal-500 rounded-r-lg shadow-2xs mb-3">
        <p className="text-base font-medium text-slate-900 leading-relaxed">
          {item.question}
        </p>
      </div>

      {item.subnote && (
        <p className="text-xs text-slate-500 italic">
          {item.subnote}
        </p>
      )}

      {showNotes && (
        <div className="mt-4 pt-4 border-t border-teal-100">
          <label htmlFor={`pr-input-${item.id}`} className="block text-xs font-medium text-slate-600 mb-1">
            My Reflection (stored locally):
          </label>
          <textarea
            id={`pr-input-${item.id}`}
            rows={3}
            value={currentNote}
            onChange={handleNoteChange}
            placeholder="Type your reflection here..."
            className="w-full text-sm p-3 border border-teal-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>
      )}
    </div>
  );
};
