import React from 'react';
import { Compass } from 'lucide-react';

interface WhyThisMattersCardProps {
  moduleId: string;
  paragraphs: string[];
  className?: string;
}

export const WhyThisMattersCard: React.FC<WhyThisMattersCardProps> = ({
  moduleId,
  paragraphs,
  className = '',
}) => {
  return (
    <div
      id={`why-this-matters-${moduleId}`}
      className={`relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white rounded-xl p-6 sm:p-7 shadow-md border border-indigo-800/40 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center flex-shrink-0">
          <Compass className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
          Why This Matters
        </h3>
      </div>

      <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};
