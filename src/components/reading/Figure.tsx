import React, { useState, useEffect } from 'react';
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface FigureProps {
  figureNumber: string;
  title: string;
  caption: string;
  imageUrl?: string;
  svgMarkup?: string;
  alt?: string;
  source?: string;
  attribution?: string;
  expandable?: boolean;
  isPlaceholder?: boolean;
}

export const Figure: React.FC<FigureProps> = ({
  figureNumber,
  title,
  caption,
  imageUrl,
  svgMarkup,
  alt = title,
  source,
  attribution,
  expandable = true,
  isPlaceholder = false,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const hasRealImage = Boolean(imageUrl && !isPlaceholder);
  const hasSvgMarkup = Boolean(svgMarkup && !isPlaceholder);

  const renderFigureVisual = (isEnlarged: boolean = false) => {
    if (hasRealImage) {
      return (
        <img
          src={imageUrl}
          alt={alt}
          className={`w-full object-contain mx-auto transition-transform ${
            isEnlarged ? 'max-h-[75vh]' : 'max-h-[420px]'
          }`}
          style={{ transform: isEnlarged ? `scale(${zoomLevel})` : undefined }}
        />
      );
    }

    if (hasSvgMarkup) {
      return (
        <div
          className={`w-full flex items-center justify-center overflow-x-auto ${
            isEnlarged ? 'p-6' : 'p-4'
          }`}
          dangerouslySetInnerHTML={{ __html: svgMarkup || '' }}
        />
      );
    }

    // Clean, academic placeholder for figures to be inserted
    return (
      <div className={`w-full bg-[#f8fafc] border border-dashed border-gray-300 p-8 sm:p-12 text-center select-none ${isEnlarged ? 'p-16' : ''}`}>
        <div className="w-12 h-12 rounded-full bg-slate-100 border border-gray-200 flex items-center justify-center mx-auto mb-3 text-[#182232]">
          <ImageIcon className="w-6 h-6 text-gray-500" />
        </div>
        <div className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
          {figureNumber || 'FIGURE ASSET'}
        </div>
        <div className="font-sans font-bold text-base sm:text-lg text-[#182232] mb-1">
          [Figure to be inserted: {title}]
        </div>
        <p className="font-serif text-xs sm:text-sm text-gray-500 max-w-md mx-auto italic">
          High-resolution scientific schematic or photographic asset will render here upon content integration.
        </p>
      </div>
    );
  };

  const isInteractiveVisual = hasRealImage || hasSvgMarkup;

  return (
    <figure className="my-10 border border-gray-200 bg-white shadow-2xs overflow-hidden">
      {/* Figure Top Bar */}
      <div className="px-5 py-3 border-b border-gray-200 bg-gray-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#182232] shrink-0">
            {figureNumber}
          </span>
          <span className="text-gray-300">|</span>
          <h4 className="font-sans font-semibold text-xs sm:text-sm text-gray-800 tracking-tight truncate">
            {title}
          </h4>
        </div>

        {expandable && isInteractiveVisual && (
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="text-xs font-sans text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 hover:border-gray-400 transition-colors shadow-2xs shrink-0 ml-2"
            title="Expand figure view"
            aria-label="Enlarge figure"
          >
            <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Enlarge</span>
          </button>
        )}
      </div>

      {/* Main Figure Display Area */}
      <div className="p-4 sm:p-6 bg-white overflow-hidden flex items-center justify-center">
        {renderFigureVisual(false)}
      </div>

      {/* Caption & Source Footer */}
      <figcaption className="px-5 py-4 border-t border-gray-200 bg-[#fdfdfd] text-xs font-serif leading-relaxed text-gray-700">
        <div className="mb-1">
          <span className="font-sans font-bold text-gray-900 mr-2">{figureNumber}:</span>
          <span>{caption}</span>
        </div>
        {(source || attribution) && (
          <div className="font-sans text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100 flex items-center gap-1">
            <span className="font-semibold uppercase tracking-wider text-gray-400">Source:</span>
            <span>{source || attribution}</span>
          </div>
        )}
      </figcaption>

      {/* Lightbox / Zoom Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-xs flex flex-col p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-700 text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold bg-slate-800 px-2.5 py-1 border border-slate-600">
                {figureNumber}
              </span>
              <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight truncate max-w-xl">
                {title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 transition-colors"
                title="Zoom in"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 transition-colors"
                title="Zoom out"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 transition-colors"
                title="Reset zoom"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="p-2 bg-slate-800 hover:bg-red-900 text-gray-200 border border-slate-600 ml-2 transition-colors"
                title="Close viewer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            {renderFigureVisual(true)}
          </div>

          <div className="pt-3 border-t border-slate-700 text-xs font-serif text-slate-300 max-w-3xl mx-auto text-center">
            {caption}
          </div>
        </div>
      )}
    </figure>
  );
};
