import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle2, FlaskConical, Info, BookOpen, Bookmark } from 'lucide-react';

interface CalloutProps {
  variant: 'key-concept' | 'important' | 'takeaway' | 'methodology' | 'practical-note' | 'definition' | 'note';
  title: string;
  content: string;
}

export const Callout: React.FC<CalloutProps> = ({ variant, title, content }) => {
  switch (variant) {
    case 'key-concept':
      return (
        <aside 
          aria-label={title}
          className="my-8 p-5 sm:p-6 bg-[#f7faf8] border-l-4 border-[#2e7d32] text-[#1a1a1a]"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <Lightbulb className="w-5 h-5 text-[#2e7d32] shrink-0" />
            <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-[#1a3a22]">
              {title}
            </h4>
          </div>
          <p className="font-serif text-[1.0625rem] leading-[1.68] text-gray-800">
            {content}
          </p>
        </aside>
      );

    case 'important':
      return (
        <aside 
          aria-label={title}
          className="my-8 p-5 sm:p-6 bg-[#fffdfa] border-l-4 border-[#b45309] text-[#1a1a1a]"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <AlertTriangle className="w-5 h-5 text-[#b45309] shrink-0" />
            <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-[#78350f]">
              {title}
            </h4>
          </div>
          <p className="font-serif text-[1.0625rem] leading-[1.68] text-gray-800">
            {content}
          </p>
        </aside>
      );

    case 'practical-note':
      return (
        <aside 
          aria-label={title}
          className="my-8 p-5 sm:p-6 bg-[#fafafa] border-l-4 border-slate-600 text-[#1a1a1a]"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <Bookmark className="w-5 h-5 text-slate-700 shrink-0" />
            <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-slate-900">
              {title}
            </h4>
          </div>
          <p className="font-serif text-[1.0625rem] leading-[1.68] text-gray-800">
            {content}
          </p>
        </aside>
      );

    case 'definition':
      return (
        <aside 
          aria-label={title}
          className="my-8 p-5 sm:p-6 bg-[#f8fafc] border-l-4 border-indigo-600 text-[#1a1a1a]"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <BookOpen className="w-5 h-5 text-indigo-700 shrink-0" />
            <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-indigo-950">
              {title}
            </h4>
          </div>
          <p className="font-serif text-[1.0625rem] leading-[1.68] text-gray-800">
            {content}
          </p>
        </aside>
      );

    case 'takeaway':
      return (
        <aside 
          aria-label={title}
          className="my-8 p-5 sm:p-6 bg-[#182232] text-white"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-white uppercase tracking-wider text-xs sm:text-sm">
              {title}
            </h4>
          </div>
          <p className="font-serif text-[1.0625rem] leading-[1.68] text-gray-200">
            {content}
          </p>
        </aside>
      );

    case 'methodology':
      return (
        <aside 
          aria-label={title}
          className="my-8 p-5 sm:p-6 bg-[#f0f4f8] border-l-4 border-[#1e40af] text-[#1a1a1a]"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <FlaskConical className="w-5 h-5 text-[#1e40af] shrink-0" />
            <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-[#1e3a8a]">
              {title}
            </h4>
          </div>
          <p className="font-serif text-[1.0625rem] leading-[1.68] text-gray-800">
            {content}
          </p>
        </aside>
      );

    default:
      return (
        <aside 
          aria-label={title}
          className="my-8 p-5 sm:p-6 bg-gray-50 border-l-4 border-gray-400 text-gray-800"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <Info className="w-5 h-5 text-gray-600 shrink-0" />
            <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-gray-900">
              {title}
            </h4>
          </div>
          <p className="font-serif text-[1.0625rem] leading-[1.68] text-gray-700">
            {content}
          </p>
        </aside>
      );
  }
};
