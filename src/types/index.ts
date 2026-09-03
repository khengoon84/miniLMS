/**
 * Core Data Models for NIBM Workshop Portal
 * Strictly client-side, typed, and content-driven.
 */

export interface Workshop {
  id: string;
  title: string;
  code: string; // e.g. "WS-101"
  program: string; // e.g. "NIBM Workshop Series"
  description: string;
  longDescription?: string;
  bannerTag?: string;
  objectives: string[];
  learningOutcomes: string[];
  moduleIds: string[];
  metadata: {
    year: string;
    publisher: string;
    totalEstimatedHours: string;
    level: string;
  };
}

export interface Module {
  id: string;
  number: string; // e.g. "01", "02"
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  estimatedReadingTime: string;
  iconName?: string;
  overview: {
    summary: string;
    prerequisites?: string[];
    coreCompetencies: string[];
  };
  sections: SectionMeta[];
  keyTakeaways?: string[];
  knowledgeCheckIds?: string[];
  references?: ReferenceItem[];
  resourceIds?: string[];
}

export interface ReferenceItem {
  id: string;
  citation: string;
  authors?: string;
  title?: string;
  journal?: string;
  year?: number | string;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
}

export interface SectionMeta {
  id: string;
  slug: string;
  number: number;
  title: string;
  icon?: string;
  estimatedReadingTime: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string; lead?: boolean; glossaryTerms?: string[] }
  | { type: 'heading'; level: 1 | 2 | 3 | 4; text: string; id?: string; subtitle?: string }
  | { 
      type: 'callout'; 
      variant: 'key-concept' | 'important' | 'takeaway' | 'methodology' | 'practical-note' | 'definition' | 'note'; 
      title: string; 
      content: string; 
    }
  | { 
      type: 'figure'; 
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
  | { 
      type: 'table'; 
      title?: string;
      caption?: string; 
      headers: string[]; 
      rows: string[][];
      columnAlign?: ('left' | 'center' | 'right')[];
      footerNote?: string;
      source?: string;
    }
  | {
      type: 'list';
      ordered?: boolean;
      items: string[];
      title?: string;
    }
  | {
      type: 'definition';
      term: string;
      definition: string;
      source?: string;
    }
  | {
      type: 'quote';
      text: string;
      attribution?: string;
    }
  | {
      type: 'key-takeaways';
      title?: string;
      items: string[];
    }
  | {
      type: 'references';
      title?: string;
      items: ReferenceItem[];
    }
  | {
      type: 'think-about-it';
      item: ThinkAboutItItem;
    }
  | {
      type: 'pause-reflect';
      item: PauseAndReflectItem;
    };

export interface ReadingSection {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  subtitle?: string;
  estimatedReadingTime: string;
  contentBlocks: ContentBlock[];
  keyConcepts?: string[];
  previousSectionId?: string | null;
  nextSectionId?: string | null;
  nextLabel?: string;
  references?: ReferenceItem[];
}

export interface KnowledgeCheckOption {
  id: string;
  text: string;
  label?: string; // A, B, C, D
}

export interface KnowledgeCheck {
  id: string;
  moduleId: string;
  sectionId?: string;
  moduleEyebrow: string;
  topicTitle: string;
  question: string;
  options: KnowledgeCheckOption[];
  correctAnswerId: string;
  generalExplanation: string;
  optionExplanations?: Record<string, string>;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  letter: string; // e.g. "A", "B", "C"
  definition: string;
  category?: string;
  relatedModuleBadges?: { label: string; moduleId?: string; sectionId?: string; type?: 'module' | 'appendix' }[];
  relatedConcepts?: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'literature' | 'sop' | 'recommended';
  type: 'pdf' | 'xlsx' | 'doi' | 'protocol' | 'doc' | 'link';
  sizeOrDoi?: string;
  downloadUrl?: string;
  externalUrl?: string;
  authorInfo?: string;
  publishedJournal?: string;
  publishedDate?: string;
  documentId?: string;
  lastUpdated?: string;
  abstract?: string;
  isPlaceholder?: boolean;
}

export interface SearchResultItem {
  id: string;
  type: 'module' | 'section' | 'glossary' | 'resource';
  title: string;
  contextBreadcrumb: string;
  snippet: string;
  link: string;
  badgeLabel: string;
  matchedField?: string;
  metadata?: string;
}

export interface UserProgressState {
  completedSectionIds: string[];
  completedQuizResults: Record<string, { selectedOptionId: string; isCorrect: boolean; timestamp: number }>;
  lastVisitedPath?: string;
  notes?: Record<string, string>;
  objectivesChecked?: Record<string, boolean>;
}

export interface ThinkAboutItItem {
  id: string;
  number: number;
  title: string;
  prompt: string[];
  suggestedSectionId?: string;
}

export interface PauseAndReflectItem {
  id: string;
  context: string[];
  question: string;
  subnote?: string;
}

export interface ModuleLearningSupport {
  moduleId: string;
  moduleTitle: string;
  learningObjectives: string[];
  whyThisMatters: string[];
  thinkAboutItPrompts: ThinkAboutItItem[];
  keyTakeaways: string[];
  knowledgeChecks: KnowledgeCheck[];
  pauseAndReflect: PauseAndReflectItem;
  glossaryTerms: {
    term: string;
    definition: string;
  }[];
}

export interface PathwayStepItem {
  stepNumber: number;
  phase: string;
  description: string;
}

export interface OverallPathwayData {
  title: string;
  tagline: string;
  journeySteps: PathwayStepItem[];
  finalReflection: {
    preamble: string;
    heading: string;
    questions: string[];
    footerNote: string;
  };
  overallKnowledgeChecks: KnowledgeCheck[];
  finalTakeaway: {
    heading: string;
    lead: string;
    bulletPoints: string[];
    conclusion: string;
    closingNote: string;
  };
}


