import { SearchResultItem } from '../types';
import { modulesData, readingSectionsData, glossaryTermsData, resourcesData } from '../data/workshopData';

export function executeClientSearch(query: string): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResultItem[] = [];

  // 1. Search Modules
  modulesData.forEach((mod) => {
    const textToSearch = `${mod.number} ${mod.title} ${mod.subtitle || ''} ${mod.description} ${mod.overview.summary} ${mod.overview.coreCompetencies.join(' ')}`.toLowerCase();
    if (textToSearch.includes(cleanQuery)) {
      results.push({
        id: `mod-${mod.id}`,
        type: 'module',
        title: `Module ${mod.number}: ${mod.title}`,
        contextBreadcrumb: 'Workshop Module Overview',
        snippet: mod.description,
        link: `/modules/${mod.id}`,
        badgeLabel: 'MODULE OVERVIEW',
        metadata: `${mod.estimatedReadingTime} · ${mod.sections.length} Sections`,
      });
    }
  });

  // 2. Search Reading Sections
  Object.values(readingSectionsData).forEach((sec) => {
    const parentModule = modulesData.find((m) => m.id === sec.moduleId);
    const modTitle = parentModule ? `Module ${parentModule.number}: ${parentModule.title}` : 'Reading Module';
    
    // Extract text from all content block types
    let combinedText = `${sec.title} ${sec.subtitle || ''} `;
    sec.contentBlocks.forEach((block) => {
      if (block.type === 'paragraph') combinedText += block.text + ' ';
      if (block.type === 'heading') combinedText += block.text + ' ';
      if (block.type === 'callout') combinedText += `${block.title} ${block.content} `;
      if (block.type === 'figure') combinedText += `${block.title} ${block.caption} ${block.source || ''} `;
      if (block.type === 'table') {
        combinedText += `${block.title || ''} ${block.caption || ''} ${block.headers.join(' ')} ${block.rows.flat().join(' ')} ${block.footerNote || ''} `;
      }
      if (block.type === 'list') combinedText += `${block.title || ''} ${block.items.join(' ')} `;
      if (block.type === 'definition') combinedText += `${block.term} ${block.definition} `;
      if (block.type === 'quote') combinedText += `${block.text} ${block.attribution || ''} `;
      if (block.type === 'key-takeaways') combinedText += `${block.title || ''} ${block.items.join(' ')} `;
      if (block.type === 'references') combinedText += block.items.map(r => r.citation).join(' ') + ' ';
    });

    if (combinedText.toLowerCase().includes(cleanQuery)) {
      // Find a contextual snippet around the matched query
      const lower = combinedText.toLowerCase();
      const matchIndex = lower.indexOf(cleanQuery);
      const start = Math.max(0, matchIndex - 60);
      const end = Math.min(combinedText.length, matchIndex + cleanQuery.length + 100);
      let snippet = combinedText.substring(start, end).trim();
      if (start > 0) snippet = '...' + snippet;
      if (end < combinedText.length) snippet = snippet + '...';

      results.push({
        id: `sec-${sec.id}`,
        type: 'section',
        title: modTitle,
        contextBreadcrumb: `Section ${sec.number}: ${sec.title}`,
        snippet: snippet || sec.subtitle || 'Relevant scientific reading section content.',
        link: `/modules/${sec.moduleId}/${sec.id}`,
        badgeLabel: 'MODULE CONTENT',
        metadata: `Section ${sec.number} · ${sec.estimatedReadingTime}`,
      });
    }
  });

  // 3. Search Glossary Terms
  glossaryTermsData.forEach((term) => {
    const termSearch = `${term.term} ${term.definition} ${term.category || ''} ${(term.relatedConcepts || []).join(' ')}`.toLowerCase();
    if (termSearch.includes(cleanQuery)) {
      results.push({
        id: `glossary-${term.id}`,
        type: 'glossary',
        title: term.term,
        contextBreadcrumb: term.category || 'Scientific Glossary Term',
        snippet: term.definition,
        link: `/glossary?search=${encodeURIComponent(term.term)}`,
        badgeLabel: 'GLOSSARY TERM',
      });
    }
  });

  // 4. Search Resources
  resourcesData.forEach((res) => {
    const resSearch = `${res.title} ${res.description} ${res.authorInfo || ''} ${res.documentId || ''} ${res.abstract || ''}`.toLowerCase();
    if (resSearch.includes(cleanQuery)) {
      results.push({
        id: `res-${res.id}`,
        type: 'resource',
        title: res.title,
        contextBreadcrumb: res.authorInfo || (res.documentId ? `Protocol / SOP: ${res.documentId}` : 'Resource Library'),
        snippet: res.description,
        link: `/resources?id=${res.id}`,
        badgeLabel: res.type === 'pdf' ? 'RESOURCE / PAPER' : res.type === 'protocol' ? 'PROTOCOL / SOP' : 'CORE MATERIAL',
        metadata: res.sizeOrDoi,
      });
    }
  });

  return results;
}
