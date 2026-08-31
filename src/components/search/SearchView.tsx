import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { executeClientSearch } from '../../utils/searchIndex';
import { SearchResultItem } from '../../types';
import { Search, ChevronRight, BookOpen, Layers, FileText, ArrowRight, X } from 'lucide-react';

export const SearchView: React.FC = () => {
  const { route, navigate } = useRouter();
  const urlQuery = route.searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQuery);
  const [results, setResults] = useState<SearchResultItem[]>(() => executeClientSearch(urlQuery));

  useEffect(() => {
    setQuery(urlQuery);
    setResults(executeClientSearch(urlQuery));
  }, [urlQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`, { preserveScroll: true });
    setResults(executeClientSearch(query.trim()));
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setResults(executeClientSearch(val));
  };

  // Helper to highlight matching keyword in snippet
  const renderHighlightedSnippet = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-amber-200 text-amber-950 font-medium px-0.5 rounded-none">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="w-full bg-[#fbf8fa] min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <div className="text-xs font-sans font-bold tracking-widest text-gray-500 uppercase mb-1">
            EXPLORE & DISCOVERY
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-[#182232] tracking-tight mb-2">
            Search Portal
          </h1>
          <p className="font-serif text-lg text-gray-600">
            Query across workshop modules, reading sections, figures, glossary definitions, and technical standard operating procedures.
          </p>
        </div>

        {/* Search Input Box (Matching Image 9.jpeg) */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="bg-white border-2 border-gray-300 focus-within:border-[#182232] p-2 flex items-center shadow-xs">
            <Search className="w-5 h-5 text-gray-400 ml-2.5 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search concepts (e.g., 'HPLC', 'retention time', 'quantum', 'dsRNA', 'SOP')..."
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full py-2.5 px-2 text-base font-sans bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="p-2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#182232] text-white font-sans font-semibold text-sm hover:bg-slate-800 shrink-0 transition-colors shadow-2xs"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results Metadata Bar */}
        {query.trim() && (
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6 font-sans text-xs text-gray-500">
            <span>
              Showing <strong className="text-gray-900 font-semibold">{results.length}</strong> {results.length === 1 ? 'result' : 'results'} for &quot;<span className="text-[#182232] font-semibold">{query}</span>&quot;
            </span>
          </div>
        )}

        {/* Search Results List (Matching Image 9.jpeg) */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item) => (
              <article
                key={item.id}
                onClick={() => navigate(item.link)}
                className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-gray-400 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#182232] group-hover:text-blue-900 transition-colors">
                      {item.title}
                    </h3>
                    <div className="font-sans text-xs font-semibold text-gray-500 mt-0.5">
                      {item.contextBreadcrumb}
                    </div>
                  </div>

                  <span className="font-sans text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 tracking-wider uppercase self-start">
                    {item.badgeLabel}
                  </span>
                </div>

                <p className="font-serif text-[1.0625rem] leading-relaxed text-gray-700 mt-3 mb-4">
                  {renderHighlightedSnippet(item.snippet, query)}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 font-sans text-xs">
                  <span className="text-gray-400 font-medium">
                    {item.metadata || 'Click to view full content'}
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-[#182232] group-hover:translate-x-0.5 transition-transform">
                    <span>Open Section</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="bg-white border border-gray-200 p-12 text-center shadow-2xs">
            <Search className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-sans text-lg font-bold text-gray-800 mb-1">No matching entries found</h3>
            <p className="font-serif text-sm text-gray-600 max-w-md mx-auto mb-6">
              We couldn&apos;t find any workshop content matching &quot;{query}&quot;. Try using broader scientific terms or check your spelling.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-sans">
              <span className="text-gray-400">Try searching:</span>
              {['HPLC', 'Retention Time', 'Quantum', 'dsRNA', 'SOP', 'Lipid Nanoparticle'].map((s) => (
                <button
                  key={s}
                  onClick={() => handleQueryChange(s)}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Default initial state with quick search suggestions */
          <div className="bg-white border border-gray-200 p-8 shadow-2xs">
            <h3 className="font-sans text-base font-bold text-[#182232] mb-3">
              Popular Workshop Topics & Keywords
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-sans text-xs">
              {[
                { label: 'High-Performance Liquid Chromatography', query: 'HPLC' },
                { label: 'Retention Time & Plate Count', query: 'Retention Time' },
                { label: 'Lipid Nanoparticle Delivery', query: 'Lipid Nanoparticle' },
                { label: 'Quantum State Tomography', query: 'Tomography' },
                { label: 'In Vitro Transcription (IVT)', query: 'IVT' },
                { label: 'Cryostat Cool-down SOP', query: 'Cryostat' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleQueryChange(item.query)}
                  className="p-3 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-left transition-all flex flex-col justify-between"
                >
                  <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                  <span className="text-gray-400 font-mono text-[11px] mt-1">Search: &quot;{item.query}&quot;</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
