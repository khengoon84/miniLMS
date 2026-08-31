import React from 'react';
import { BookmarkCheck, Check } from 'lucide-react';

interface KeyTakeawaysCardProps {
  moduleId: string;
  takeaways: string[];
  className?: string;
}

export const KeyTakeawaysCard: React.FC<KeyTakeawaysCardProps> = ({
  moduleId,
  takeaways,
  className = '',
}) => {
  return (
    <div
      id={`key-takeaways-${moduleId}`}
      className={`my-8 bg-slate-900 text-white rounded-xl p-6 sm:p-7 shadow-md border border-slate-800 ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
          <BookmarkCheck className="w-4 h-4" />
        </div>
        <h3 className="text-base font-semibold text-white uppercase tracking-wider">
          Key Takeaways
        </h3>
      </div>

      <ul className="space-y-3">
        {takeaways.map((takeaway, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {takeaway}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
