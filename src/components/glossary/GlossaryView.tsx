import React, { useState, useMemo } from 'react';
import { useRouter } from '../../context/RouterContext';
import { glossaryTermsData } from '../../data/workshopData';
import { Search, BookOpen, ExternalLink, Filter, ChevronRight } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const { route, navigate } = useRouter();
  
  // Read initial search or letter filter from URL query if present
  const initialSearch = route.searchParams.get('search') || route.searchParams.get('q') || '';
  const initialLetter = route.searchParams.get('letter') || 'ALL';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLetter, setSelectedLetter] = useState(initialLetter);

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  // Letters that actually have terms
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    glossaryTermsData.forEach((t) => letters.add(t.letter.toUpperCase()));
    return letters;
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return glossaryTermsData.filter((item) => {
      const matchesLetter =
        selectedLetter === 'ALL' || item.letter.toUpperCase() === selectedLetter.toUpperCase();

      const matchesSearch =
        !searchQuery.trim() ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesLetter && matchesSearch;
    });
  }, [searchQuery, selectedLetter]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    filteredTerms.forEach((item) => {
      const letter = item.letter.toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(item);
    });
    return groups;
  }, [filteredTerms]);

  const sortedGroupKeys = Object.keys(groupedTerms).sort();

  return (
    <div className="w-full bg-[#fbf8fa] min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header (Matching Image 3.png) */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <div className="text-xs font-sans font-bold tracking-widest text-gray-500 uppercase mb-1">
            REFERENCE & TERMINOLOGY
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-[#182232] tracking-tight mb-2">
            Glossary of Terms
          </h1>
          <p className="font-serif text-lg text-gray-600">
            Standardized scientific nomenclature, mathematical definitions, and cross-references across workshop modules.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-white border border-gray-200 p-4 mb-6 shadow-xs">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search terminology, physical constants, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-300 focus:bg-white focus:outline-none focus:border-[#182232] text-sm font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs font-sans text-gray-500 hover:text-gray-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Alphabet Filter Bar (Matching Image 3.png) */}
        <div className="bg-white border border-gray-200 p-2 mb-10 overflow-x-auto custom-scrollbar shadow-xs">
          <div className="flex items-center gap-1 min-w-[620px]">
            {alphabet.map((letter) => {
              const isSelected = selectedLetter === letter;
              const hasItems = letter === 'ALL' || availableLetters.has(letter);

              return (
                <button
                  key={letter}
                  disabled={!hasItems}
                  onClick={() => setSelectedLetter(letter)}
                  className={`flex-1 py-1.5 text-xs font-sans font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#182232] text-white'
                      : hasItems
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-[#182232]'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Glossary Terms List */}
        {sortedGroupKeys.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-sans text-lg font-bold text-gray-800 mb-1">No matching terms found</h3>
            <p className="font-serif text-sm text-gray-600 mb-4">
              Try adjusting your search query or selecting &quot;ALL&quot; in the alphabet index.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLetter('ALL');
              }}
              className="px-4 py-2 bg-[#182232] text-white text-xs font-sans font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedGroupKeys.map((letter) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                
                {/* Letter Section Header */}
                <div className="flex items-center gap-3 border-b-2 border-[#182232] pb-2 mb-6">
                  <span className="font-sans text-2xl font-bold text-[#182232]">{letter}</span>
                  <div className="h-px bg-gray-200 flex-1" />
                  <span className="text-xs font-sans text-gray-400 font-medium">
                    {groupedTerms[letter].length} {groupedTerms[letter].length === 1 ? 'term' : 'terms'}
                  </span>
                </div>

                {/* Term Cards Grid / Stack */}
                <div className="space-y-4">
                  {groupedTerms[letter].map((term) => (
                    <article
                      key={term.id}
                      className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-gray-300 transition-all shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2.5">
                        <h2 className="font-sans text-lg sm:text-xl font-bold text-[#182232] tracking-tight">
                          {term.term}
                        </h2>

                        {term.category && (
                          <span className="text-[11px] font-sans font-medium text-gray-500 bg-gray-100 px-2 py-0.5 self-start">
                            {term.category}
                          </span>
                        )}
                      </div>

                      <p className="font-serif text-[1.0625rem] leading-relaxed text-gray-800 mb-4">
                        {term.definition}
                      </p>

                      {/* Related Modules / Cross-Reference Badges */}
                      {term.relatedModuleBadges && term.relatedModuleBadges.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                          <span className="text-[11px] font-sans font-semibold text-gray-400 uppercase tracking-wider">
                            Referenced in:
                          </span>
                          {term.relatedModuleBadges.map((badge, bIdx) => {
                            if (badge.moduleId) {
                              return (
                                <button
                                  key={bIdx}
                                  onClick={() => navigate(`/modules/${badge.moduleId}`)}
                                  className="text-xs font-sans font-medium text-slate-800 bg-slate-100 hover:bg-[#182232] hover:text-white px-2.5 py-1 transition-colors flex items-center gap-1"
                                >
                                  <span>{badge.label}</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              );
                            }
                            return (
                              <span
                                key={bIdx}
                                className="text-xs font-sans text-gray-600 bg-gray-100 px-2.5 py-1"
                              >
                                {badge.label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </article>
                  ))}
                </div>

              </section>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
