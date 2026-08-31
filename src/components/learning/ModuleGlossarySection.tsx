import React, { useState } from 'react';
import { BookMarked, Search } from 'lucide-react';

interface GlossaryItem {
  term: string;
  definition: string;
}

interface ModuleGlossarySectionProps {
  moduleId: string;
  terms: GlossaryItem[];
  className?: string;
}

export const ModuleGlossarySection: React.FC<ModuleGlossarySectionProps> = ({
  moduleId,
  terms,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      id={`module-glossary-${moduleId}`}
      className={`my-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
              Module Glossary
            </h3>
            <p className="text-xs text-slate-500">Key terminology used in this module</p>
          </div>
        </div>

        {terms.length > 4 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter terms..."
              className="w-full text-xs pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
          >
            <h4 className="text-sm font-semibold text-indigo-950 mb-1">
              {item.term}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
