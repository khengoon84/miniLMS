import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { resourcesData } from '../../data/workshopData';
import { ResourceItem } from '../../types';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  FileSpreadsheet, 
  BookMarked, 
  ShieldCheck, 
  Eye, 
  X, 
  Search,
  Check
} from 'lucide-react';

export const ResourceLibraryView: React.FC = () => {
  const { route, navigate } = useRouter();
  const [selectedAbstractItem, setSelectedAbstractItem] = useState<ResourceItem | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<string | null>(null);

  const coreMaterials = resourcesData.filter((r) => r.category === 'core');
  const literatureItems = resourcesData.filter((r) => r.category === 'literature');
  const sopProtocols = resourcesData.filter((r) => r.category === 'sop');

  const handleDownload = (item: ResourceItem) => {
    if (item.downloadUrl) {
      const link = document.createElement('a');
      link.href = item.downloadUrl;
      link.setAttribute('download', item.downloadUrl.split('/').pop() || `${item.id}.pdf`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedIds((prev) => ({ ...prev, [item.id]: true }));
      setNotification(`Initiating download for "${item.title}".`);
      setTimeout(() => {
        setDownloadedIds((prev) => ({ ...prev, [item.id]: false }));
        setNotification(null);
      }, 4000);
    } else if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full bg-[#fbf8fa] min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header (Matching Image 1.png) */}
        <div className="border-b border-gray-200 pb-6 mb-10">
          <div className="text-xs font-sans font-bold tracking-widest text-gray-500 uppercase mb-1">
            WORKSHOP REPOSITORY
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-[#182232] tracking-tight mb-2">
            Resource Library
          </h1>
          <p className="font-serif text-lg text-gray-600 max-w-3xl">
            Access official workshop documentation, prerequisite reading materials, standard operating procedures, and curated scientific literature.
          </p>
        </div>

        {/* 1. Core Materials Section (Matching Image 1.png) */}
        <section aria-labelledby="core-materials-heading" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BookMarked className="w-5 h-5 text-[#182232]" />
            <h2 id="core-materials-heading" className="font-sans text-xl font-bold text-[#182232] tracking-tight">
              Core Materials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreMaterials.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 p-6 flex flex-col justify-between shadow-2xs hover:border-gray-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center text-[#182232]">
                        {item.type === 'pdf' ? (
                          <FileText className="w-5 h-5 text-red-700" />
                        ) : (
                          <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-sans text-lg font-bold text-[#182232]">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs text-gray-500 font-medium">
                          {item.sizeOrDoi}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="font-serif text-sm text-gray-700 leading-relaxed mt-3 mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-sans font-semibold text-gray-400 uppercase tracking-wider">
                    Official Workshop Material
                  </span>
                  <button
                    onClick={() => handleDownload(item)}
                    className="px-4 py-2 bg-[#182232] text-white hover:bg-slate-800 text-xs font-sans font-semibold flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    {downloadedIds[item.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ready</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Scientific Literature Section (Matching Image 1.png) */}
        <section aria-labelledby="literature-heading" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#182232]" />
            <h2 id="literature-heading" className="font-sans text-xl font-bold text-[#182232] tracking-tight">
              Scientific Literature
            </h2>
          </div>

          <div className="space-y-4">
            {literatureItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs hover:border-gray-300 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-sans font-medium text-gray-500">
                      {item.authorInfo}
                    </span>
                    {item.sizeOrDoi && (
                      <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5">
                        {item.sizeOrDoi}
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans text-lg font-bold text-[#182232] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-serif text-sm text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                  {item.abstract && (
                    <button
                      onClick={() => setSelectedAbstractItem(item)}
                      className="px-3.5 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-sans font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      <span>Abstract</span>
                    </button>
                  )}

                  {item.type === 'doi' && item.externalUrl ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#182232] text-white hover:bg-slate-800 text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleDownload(item)}
                      className="px-4 py-2 bg-[#182232] text-white hover:bg-slate-800 text-xs font-sans font-semibold flex items-center gap-2 transition-colors"
                    >
                      {downloadedIds[item.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Protocols & SOPs Table (Matching Image 1.png) */}
        <section aria-labelledby="protocols-heading" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#182232]" />
            <h2 id="protocols-heading" className="font-sans text-xl font-bold text-[#182232] tracking-tight">
              Protocols & SOPs
            </h2>
          </div>

          <div className="bg-white border border-gray-200 overflow-x-auto shadow-2xs">
            <table className="w-full text-left border-collapse text-sm font-sans">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="py-3.5 px-5 font-semibold text-xs text-gray-700 uppercase tracking-wider">
                    Document ID
                  </th>
                  <th className="py-3.5 px-5 font-semibold text-xs text-gray-700 uppercase tracking-wider">
                    Title & Scope
                  </th>
                  <th className="py-3.5 px-5 font-semibold text-xs text-gray-700 uppercase tracking-wider text-right sm:text-left">
                    Last Updated
                  </th>
                  <th className="py-3.5 px-5 font-semibold text-xs text-gray-700 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sopProtocols.map((sop) => (
                  <tr key={sop.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-5 font-mono text-xs font-bold text-[#182232]">
                      {sop.documentId}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-gray-900 text-sm">{sop.title}</div>
                      <div className="font-serif text-xs text-gray-600 mt-0.5">{sop.description}</div>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-gray-600 whitespace-nowrap text-right sm:text-left">
                      {sop.lastUpdated}
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDownload(sop)}
                        className="px-3.5 py-1.5 border border-gray-300 bg-white hover:bg-gray-50 text-[#182232] font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
                      >
                        {downloadedIds[sop.id] ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3 text-gray-500" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scientific Paper Abstract Modal */}
        {selectedAbstractItem && (
          <div
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-2xl bg-white border border-gray-400 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4 mb-4">
                <div>
                  <span className="font-mono text-xs text-gray-500 block mb-1">
                    {selectedAbstractItem.sizeOrDoi} · {selectedAbstractItem.authorInfo}
                  </span>
                  <h3 className="font-sans text-xl font-bold text-[#182232]">
                    {selectedAbstractItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAbstractItem(null)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Paper Abstract
                </h4>
                <p className="font-serif text-[1.0625rem] leading-relaxed text-gray-800">
                  {selectedAbstractItem.abstract || selectedAbstractItem.description}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 font-sans text-xs font-semibold">
                <button
                  onClick={() => setSelectedAbstractItem(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedAbstractItem.externalUrl ? (
                  <a
                    href={selectedAbstractItem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#182232] text-white hover:bg-slate-800 flex items-center gap-1"
                  >
                    <span>Visit External Publication</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      handleDownload(selectedAbstractItem);
                      setSelectedAbstractItem(null);
                    }}
                    className="px-4 py-2 bg-[#182232] text-white hover:bg-slate-800 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Full Paper</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Status Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#182232] text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 text-xs font-sans flex items-center gap-3 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

      </div>
    </div>
  );
};
