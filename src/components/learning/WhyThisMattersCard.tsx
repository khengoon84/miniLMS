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
      className={`relative overflow-hidden bg-indigo-50/60 border border-indigo-200/80 rounded-xl p-6 sm:p-7 shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center flex-shrink-0">
          <Compass className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-950">
          Why This Matters
        </h3>
      </div>

      <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};
