import React from 'react';

interface ScientificTableProps {
  title?: string;
  caption?: string;
  headers: string[];
  rows: string[][];
  columnAlign?: ('left' | 'center' | 'right')[];
  footerNote?: string;
}

export const ScientificTable: React.FC<ScientificTableProps> = ({
  title,
  caption,
  headers,
  rows,
  columnAlign = ['left', 'center', 'left'],
  footerNote,
}) => {
  return (
    <div className="my-8 border border-gray-200 bg-white">
      {title && (
        <div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50/70">
          <h4 className="font-sans font-semibold text-sm text-[#182232] tracking-tight">
            {title}
          </h4>
        </div>
      )}

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-sm">
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}
          <thead>
            <tr className="bg-gray-100/90 border-b border-gray-200">
              {headers.map((header, idx) => {
                const align = columnAlign[idx] || 'left';
                return (
                  <th
                    key={idx}
                    scope="col"
                    className={`py-3 px-4 font-sans font-semibold text-xs text-gray-700 uppercase tracking-wider ${
                      align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className={rowIdx % 2 === 0 ? 'bg-white hover:bg-gray-50/50' : 'bg-gray-50/40 hover:bg-gray-50'}
              >
                {row.map((cell, cellIdx) => {
                  const align = columnAlign[cellIdx] || 'left';
                  const isSymbol = cellIdx === 1 && cell.length <= 4;
                  return (
                    <td
                      key={cellIdx}
                      className={`py-3 px-4 text-sm text-gray-800 ${
                        isSymbol ? 'font-mono text-xs font-semibold text-slate-900' : 'font-sans'
                      } ${
                        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(caption || footerNote) && (
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 text-xs font-sans text-gray-500">
          {footerNote ? (
            <span>{footerNote}</span>
          ) : (
            <span className="italic">{caption}</span>
          )}
        </div>
      )}
    </div>
  );
};
