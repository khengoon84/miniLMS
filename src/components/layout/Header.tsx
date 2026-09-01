import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAccess } from '../../context/AccessContext';
import { Search, LogOut, X, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, route, navigate } = useRouter();
  const { clearAccess } = useAccess();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Modules', path: '/modules' },
    { label: 'Pathway', path: '/pathway' },
    { label: 'Resources', path: '/resources' },
    { label: 'Glossary', path: '/glossary' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return route.name === 'home';
    if (path === '/modules') return route.name === 'modules' || route.name === 'module-detail' || route.name === 'section-reading' || route.name === 'quiz';
    if (path === '/pathway') return route.name === 'pathway';
    if (path === '/resources') return route.name === 'resources';
    if (path === '/glossary') return route.name === 'glossary';
    return currentPath.startsWith(path);
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickSearchQuery.trim())}`);
      setIsSearchOpen(false);
      setQuickSearchQuery('');
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-3.5 px-4 sm:px-8 lg:px-12 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand & Desktop Nav */}
        <div className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800"
            aria-label="ScienceLink Workshop Home"
          >
            <div className="w-8 h-8 bg-[#182232] text-white flex items-center justify-center font-bold text-sm tracking-tighter">
              SL
            </div>
            <div>
              <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#182232] block leading-none">
                ScienceLink
              </span>
              <span className="text-[10px] font-sans tracking-widest text-gray-500 uppercase block font-semibold mt-0.5">
                Workshop Portal
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2 border-l border-gray-200 pl-6 h-7">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-3 py-1.5 text-sm font-medium font-sans transition-colors relative ${
                    active
                      ? 'text-[#182232] font-semibold'
                      : 'text-gray-600 hover:text-[#182232]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-[-14px] left-3 right-3 h-[2px] bg-[#182232]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search trigger */}
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleQuickSearchSubmit} className="flex items-center">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search modules, terms, SOPs..."
                    value={quickSearchQuery}
                    onChange={(e) => setQuickSearchQuery(e.target.value)}
                    className="w-56 sm:w-72 pl-9 pr-8 py-1.5 text-sm bg-gray-50 border border-gray-300 focus:bg-white focus:outline-none focus:border-[#182232] font-sans transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close search input"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => {
                  if (route.name === 'search') {
                    // already on search page
                  } else {
                    setIsSearchOpen(true);
                  }
                }}
                className="flex items-center gap-2 text-sm font-sans text-gray-600 hover:text-[#182232] px-2.5 py-1.5 hover:bg-gray-100 transition-colors"
                title="Search (Click or press /)"
                aria-label="Open search"
              >
                <Search className="w-4 h-4 text-gray-600" />
                <span className="hidden sm:inline text-xs text-gray-500 font-medium">Search</span>
              </button>
            )}
          </div>

          {/* Exit Workshop / Clear Access */}
          <button
            onClick={() => clearAccess()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans text-gray-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded transition-colors border border-transparent hover:border-rose-200"
            title="Exit workshop and lock pre-reading portal"
            aria-label="Exit workshop"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="font-medium">Exit Workshop</span>
          </button>

          {/* Direct Search Page Link */}
          <button
            onClick={() => navigate('/search')}
            className={`p-2 transition-colors md:hidden ${
              route.name === 'search' ? 'text-[#182232]' : 'text-gray-600 hover:text-[#182232]'
            }`}
            aria-label="Go to search page"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-[#182232] md:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 mt-3 pt-3 pb-2 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-base font-sans font-medium flex items-center justify-between ${
                  active
                    ? 'bg-gray-100 text-[#182232] font-semibold border-l-4 border-[#182232]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
          
          <div className="pt-2 mt-2 border-t border-gray-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                clearAccess();
              }}
              className="w-full text-left px-3 py-2 text-sm font-sans font-medium text-rose-700 hover:bg-rose-50 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Workshop / Clear Access</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
