import React, { useState } from 'react';
import { useAccess } from '../../context/AccessContext';
import { ACCESS_CONFIG } from '../../config/accessConfig';
import { Lock, ArrowRight, AlertCircle, KeyRound, ShieldCheck } from 'lucide-react';

export const WorkshopAccessView: React.FC = () => {
  const { grantAccess } = useAccess();
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setErrorMessage('Please enter the workshop access code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Validate code
    const success = grantAccess(accessCode);
    if (!success) {
      setErrorMessage(ACCESS_CONFIG.errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8fa] flex flex-col justify-between selection:bg-[#182232] selection:text-white">
      {/* Top Brand Bar */}
      <header className="w-full bg-white border-b border-gray-200 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#182232] text-white flex items-center justify-center font-bold text-sm tracking-tighter">
              SL
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-tight text-[#182232] block leading-none">
                {ACCESS_CONFIG.portalBrand}
              </span>
              <span className="text-[10px] font-sans tracking-widest text-gray-500 uppercase block font-semibold mt-0.5">
                {ACCESS_CONFIG.portalSubtitle}
              </span>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-sans font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            {ACCESS_CONFIG.courseCode}
          </span>
        </div>
      </header>

      {/* Main Center Access Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg">
          {/* Main Card */}
          <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10">
            {/* Header / Intro */}
            <div className="mb-8 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-sans font-medium border border-slate-200 mb-4">
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>Pre-Workshop Access Gate</span>
              </div>
              <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#182232] mb-2">
                {ACCESS_CONFIG.heading}
              </h1>
              <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-indigo-900 mb-3">
                {ACCESS_CONFIG.workshopTitle}
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                {ACCESS_CONFIG.description}
              </p>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900 text-sm font-sans flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                  {errorMessage}
                </div>
              </div>
            )}

            {/* Access Code Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="workshop-access-code"
                  className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
                >
                  {ACCESS_CONFIG.inputLabel}
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 pointer-events-none text-gray-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="workshop-access-code"
                    type="text"
                    autoFocus
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck="false"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={ACCESS_CONFIG.inputPlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/60 border border-gray-300 rounded-xl text-sm sm:text-base font-mono text-[#182232] placeholder:text-gray-400 placeholder:font-sans focus:bg-white focus:outline-none focus:border-[#182232] focus:ring-2 focus:ring-slate-800/10 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !accessCode.trim()}
                className="w-full py-3.5 px-6 rounded-xl bg-[#182232] hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-sans font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
              >
                <span>{ACCESS_CONFIG.submitButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Context Note */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                Access codes are provided by ScienceLink coordinators to registered participants prior to workshop commencement.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 px-4 sm:px-8 text-center text-xs text-gray-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ScienceLink Pre-Workshop Reading Series · {ACCESS_CONFIG.courseCode}</span>
          <span>© 2026 ScienceLink Scientific Program</span>
        </div>
      </footer>
    </div>
  );
};
