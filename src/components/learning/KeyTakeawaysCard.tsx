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
      className={`my-8 bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-6 sm:p-7 shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300/60 flex items-center justify-center">
          <BookmarkCheck className="w-4 h-4" />
        </div>
        <h3 className="text-base font-bold text-emerald-950 uppercase tracking-wider">
          Key Takeaways
        </h3>
      </div>

      <ul className="space-y-3">
        {takeaways.map((takeaway, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-200/60 text-emerald-800 border border-emerald-300 flex items-center justify-center mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm sm:text-base text-slate-800 leading-relaxed">
              {takeaway}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
