/**
 * NIBM Workshop Portal — Master Content Data Store
 *
 * AUTHORITATIVE SOURCE OF TRUTH: Master Modules 1–4
 * "Pre-Workshop Reading Materials: mRNA Vaccine Design and Manufacturing"
 *
 * Preserves verbatim scientific text, terminology, sequence, and structure
 * with diagram/figure placeholders.
 */

import { Workshop, Module, ReadingSection, KnowledgeCheck, GlossaryTerm, ResourceItem } from '../types';

export const workshopInfo: Workshop = {
  id: 'nibm-mrna-workshop',
  title: 'mRNA Vaccine Design and Manufacturing',
  code: '',
  program: 'NIBM Pre-Workshop Reading Series',
  description: 'Pre-workshop reading materials covering the journey of an mRNA vaccine from sequence design to DNA template, IVT, purification, LNP formulation, and host-cell antigen expression.',
  longDescription: 'This reading material is designed to give you a common foundation before we begin the hands-on workshop. You do not need to memorize every detail. Instead, understand the logic of the mRNA vaccine workflow.',
  bannerTag: 'PRE-WORKSHOP READING MATERIALS',
  objectives: [
    'Understand the logic and workflow of the mRNA vaccine platform.',
    'Follow the journey of an mRNA vaccine from sequence design, to DNA template, to IVT, to purification, to LNP formulation, and finally to antigen expression and immune activation.',
    'Examine the architecture of synthetic mRNA constructs including 5′ Cap, UTRs, Kozak sequence, ORF, nucleoside modifications (m1Ψ), and Poly(A) tail.',
    'Learn cell-free manufacturing principles, purification strategies, critical quality attributes, and analytical testing methods.',
    'Understand the four core LNP lipid components, microfluidic encapsulation, N/P ratio, stability, and endosomal escape.',
  ],
  learningOutcomes: [
    'Explain the fundamental difference between conventional vaccine technologies and host-cell antigen expression.',
    'Describe the purpose of each structural element in a synthetic mRNA construct.',
    'Follow the cell-free manufacturing workflow and identify critical quality attributes and key impurities (e.g. dsRNA).',
    'Explain the function of each LNP lipid component and how formulation parameters affect particle quality.',
    'Describe the biological journey from LNP uptake and endosomal escape to ribosome translation and adaptive immune activation.',
    'Understand mRNA vaccine development as an integrated platform where sequence design, manufacturing, analytical characterization, formulation, and biology influence one another.',
  ],
  moduleIds: ['module-01', 'module-02', 'module-03', 'module-04'],
  metadata: {
    year: '2026',
    publisher: 'NIBM Scientific Program',
    totalEstimatedHours: '2–3 Hours',
    level: 'Graduate / Professional Pre-Workshop Reading',
  },
};

export const modulesData: Module[] = [
  {
    id: 'module-01',
    number: '01',
    slug: 'module-01-why-mrna',
    title: 'Module 1 — Why mRNA?',
    subtitle: 'From traditional vaccines to host-cell antigen expression and key safety characteristics.',
    description: 'Understand why the mRNA platform is different from conventional vaccine technologies, the advantage of host-cell antigen expression, and key safety characteristics.',
    estimatedReadingTime: '20 min',
    iconName: 'BookOpen',
    overview: {
      summary: 'Before designing and manufacturing mRNA, this module explains why this platform is different from conventional vaccine technologies. Instead of delivering the antigen itself, mRNA delivers the genetic instructions for the cell to make the antigen.',
      prerequisites: [
        'Introductory biology and molecular biology fundamentals',
        'Basic familiarity with immune response concepts and protein synthesis',
      ],
      coreCompetencies: [
        'Distinguish mRNA from live-attenuated, inactivated, protein subunit, viral vector, and DNA vaccines',
        'Understand the principle of host-cell antigen expression and post-translational processing',
        'Compare conventional biological manufacturing with sequence-based mRNA manufacturing',
        'Explain key safety features including cell-free synthesis, cytoplasmic translation, and transient expression',
      ],
    },
    sections: [
      {
        id: 'm1-s1',
        slug: 'section-1-traditional-vaccines-to-mrna',
        number: 1,
        title: '1.1 From Traditional Vaccines to mRNA',
        estimatedReadingTime: '7 min',
      },
      {
        id: 'm1-s2',
        slug: 'section-2-host-cell-antigen-expression',
        number: 2,
        title: '1.2 The Advantage of Host-Cell Antigen Expression',
        estimatedReadingTime: '7 min',
      },
      {
        id: 'm1-s3',
        slug: 'section-3-key-safety-characteristics',
        number: 3,
        title: '1.3 Key Safety Characteristics',
        estimatedReadingTime: '6 min',
      },
    ],
    keyTakeaways: [
      'mRNA vaccines deliver genetic instructions, rather than the finished antigen.',
      'mRNA can be translated directly in the cytoplasm.',
      'Host cells therefore become the site of antigen production.',
      'mRNA is transient and is eventually degraded by cellular processes.',
      'mRNA can interact with innate immune sensors, so excessive innate immune activation can reduce productive translation.',
      'Sequence design, manufacturing, purification and delivery are interconnected parts of mRNA vaccine development.',
    ],
    knowledgeCheckIds: ['kc-m1-01', 'kc-m1-02', 'kc-m1-03', 'kc-m1-04'],

    references: [
      {
        id: 'ref-m1-01',
        citation: 'Pardi, N., Hogan, M. J., Porter, F. W., & Weissman, D. (2018). mRNA vaccines — a new era in vaccinology. Nature Reviews Drug Discovery, 17(4), 261–279.',
        doi: '10.1038/nrd.2017.243',
      },
    ],
    resourceIds: ['res-core-01'],
  },
  {
    id: 'module-02',
    number: '02',
    slug: 'module-02-design-mrna',
    title: 'Module 2 — How Do I Design an mRNA Molecule?',
    subtitle: 'Structural architecture: 5′ Cap, UTRs, Kozak sequence, ORF, nucleoside modifications, and Poly(A) tail.',
    description: 'A functional synthetic mRNA is much more than a protein-coding sequence. Learn how to design a complete transcript that survives, translates efficiently, and balances stability with immune activation.',
    estimatedReadingTime: '30 min',
    iconName: 'Dna',
    overview: {
      summary: 'Explore the full structural anatomy of a synthetic mRNA transcript: 5′ Cap → 5′ UTR → Kozak sequence → ORF → 3′ UTR → Poly(A) tail. Understand how sequence optimization and modified nucleosides balance translation, stability, and innate immune recognition.',
      prerequisites: [
        'Completion of Module 1 — Why mRNA?',
        'Understanding of transcription, codon-amino acid mapping, and eukaryotic translation initiation',
      ],
      coreCompetencies: [
        'Describe the simplified mRNA architecture and the purpose of each structural component',
        'Compare Cap 0 and Cap 1 structures and co-transcriptional vs. post-transcriptional capping',
        'Explain why UTRs and the Kozak sequence are regulatory regions influencing translation and stability',
        'Apply codon optimization principles while balancing nucleotide composition and RNA secondary structure',
        'Understand the role of N1-methylpseudouridine (m1Ψ) in reducing innate immune activation and boosting translation',
      ],
    },
    sections: [
      {
        id: 'm2-s1',
        slug: 'section-1-the-5-prime-cap',
        number: 1,
        title: '2.1 The 5′ Cap',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm2-s2',
        slug: 'section-2-utrs-and-kozak',
        number: 2,
        title: '2.2 The 5′ UTR, Kozak Sequence and 3′ UTR',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm2-s3',
        slug: 'section-3-open-reading-frame',
        number: 3,
        title: '2.3 The Open Reading Frame',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm2-s4',
        slug: 'section-4-nucleoside-modifications',
        number: 4,
        title: '2.4 Nucleoside Modifications',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm2-s5',
        slug: 'section-5-polya-tail',
        number: 5,
        title: '2.5 Poly(A) Tail',
        estimatedReadingTime: '6 min',
      },
    ],
    keyTakeaways: [
      'A functional synthetic mRNA contains multiple components with different roles.',
      'The 5′ cap supports stability, cellular recognition and translation initiation.',
      'The 5′ UTR, Kozak sequence and 3′ UTR influence how the transcript is translated and maintained.',
      'The ORF determines the protein sequence but can be optimised at the nucleotide level.',
      'Nucleoside modification can help reduce unwanted innate immune recognition and support productive expression.',
      'The poly(A) tail contributes to mRNA stability and translation.',
      'mRNA design is a system-level optimisation problem, not simply an exercise in maximising one sequence parameter.',
    ],
    knowledgeCheckIds: ['kc-m2-01', 'kc-m2-02', 'kc-m2-03', 'kc-m2-04', 'kc-m2-05'],

    references: [
      {
        id: 'ref-m2-01',
        citation: 'Karikó, K., Muramatsu, H., Welsh, F. A., et al. (2008). Incorporation of pseudouridine in mRNA enhances translation by diminishing PKR activation. Molecular Therapy, 16(11), 1833–1840.',
        doi: '10.1038/mt.2008.200',
      },
    ],
    resourceIds: ['res-core-01'],
  },
  {
    id: 'module-03',
    number: '03',
    slug: 'module-03-manufacture-test',
    title: 'Module 3 — How Do I Manufacture and Test mRNA?',
    subtitle: 'Cell-free enzymatic transcription, DNA template generation, purification, and critical quality attributes.',
    description: 'Turn digital sequences into physical RNA products via cell-free in vitro transcription (IVT), template linearization, purification, and analytical quality testing.',
    estimatedReadingTime: '30 min',
    iconName: 'FlaskConical',
    overview: {
      summary: 'Follow the core manufacturing pipeline: DNA template → IVT → DNase treatment → mRNA purification → QC. Learn the components of the IVT reaction, purification techniques (silica-based and LiCl), critical quality attributes, and the significance of impurities such as dsRNA.',
      prerequisites: [
        'Completion of Module 2 — How Do I Design an mRNA Molecule?',
        'Familiarity with standard in vitro enzymatic reactions and nucleic acid assays',
      ],
      coreCompetencies: [
        'Understand the cell-free manufacturing workflow from linearized DNA template to purified mRNA',
        'Identify all components of the IVT reaction mixture and the function of T7 RNA polymerase',
        'Compare laboratory-scale purification approaches (silica-based vs. LiCl precipitation)',
        'Evaluate critical quality attributes (concentration, integrity, purity, dsRNA, residual DNA, endotoxin)',
        'Explain why dsRNA is a critical impurity and how analytical testing ensures product quality',
      ],
    },
    sections: [
      {
        id: 'm3-s1',
        slug: 'section-1-dna-template-production',
        number: 1,
        title: '3.1 DNA Template Production',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm3-s2',
        slug: 'section-2-in-vitro-transcription',
        number: 2,
        title: '3.2 In Vitro Transcription',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm3-s3',
        slug: 'section-3-mrna-purification',
        number: 3,
        title: '3.3 mRNA Purification',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm3-s4',
        slug: 'section-4-critical-quality-attributes',
        number: 4,
        title: '3.4 Critical Quality Attributes',
        estimatedReadingTime: '6 min',
      },
      {
        id: 'm3-s5',
        slug: 'section-5-important-impurities',
        number: 5,
        title: '3.5 Important Impurities',
        estimatedReadingTime: '6 min',
      },
    ],
    keyTakeaways: [
      'mRNA manufacturing begins with a suitable DNA template.',
      'IVT is the central cell-free RNA synthesis step.',
      'The IVT reaction contains the desired mRNA together with unwanted reaction components.',
      'Purification is therefore required after transcription.',
      'RNA concentration, size/integrity and purity are important quality attributes.',
      'dsRNA, residual DNA, proteins, nucleotides and other components can affect product quality.',
      'No single analytical method can answer every quality question.',
    ],
    knowledgeCheckIds: ['kc-m3-01', 'kc-m3-02', 'kc-m3-03', 'kc-m3-04', 'kc-m3-05'],
    references: [
      {
        id: 'ref-m3-01',
        citation: 'Whitley, J., Zwolinski, C., Denis, C., et al. (2022). Development of mRNA manufacturing processes. Translational Research, 242, 38–55.',
        doi: '10.1016/j.trsl.2021.11.009',
      },
    ],
    resourceIds: ['res-core-01'],
  },
  {
    id: 'module-04',
    number: '04',
    slug: 'module-04-deliver-mrna',
    title: 'Module 4 — How Do I Deliver mRNA?',
    subtitle: 'The four core lipid components, microfluidic encapsulation, LNP quality attributes, stability, and antigen expression.',
    description: 'Naked mRNA is vulnerable to degradation. Learn how lipid nanoparticles (LNPs) encapsulate mRNA, protect it during delivery, facilitate endosomal escape, and enable host-cell antigen expression and immune activation.',
    estimatedReadingTime: '35 min',
    iconName: 'ShieldCheck',
    overview: {
      summary: 'Explore the lipid nanoparticle delivery system: the four core lipid components (ionizable lipid, helper phospholipid, cholesterol, PEG-lipid), microfluidic rapid mixing, N/P ratio, LNP characterization (DLS, RiboGreen), stability handling, endosomal escape, and the unified 6-step mRNA platform workflow.',
      prerequisites: [
        'Completion of Modules 1, 2, and 3',
        'Basic understanding of lipid self-assembly, colloidal properties, and endocytosis pathways',
      ],
      coreCompetencies: [
        'Identify the four core LNP lipids and explain their distinct physical and biological roles',
        'Understand the microfluidic encapsulation process and key formulation parameters including N/P ratio',
        'Interpret critical LNP quality attributes (particle size, PDI, zeta potential, encapsulation efficiency)',
        'Understand handling and stability factors (temperature, freeze-thaw, physical stress, RNase)',
        'Trace the biological path from cellular uptake and endosomal escape to ribosome translation and immune activation',
        'Synthesize all four modules into an integrated platform workflow: Design → Manufacture → Purify & Test → Formulate → Deliver & Express → Immune Response',
      ],
    },
    sections: [
      {
        id: 'm4-s1',
        slug: 'section-1-four-core-lipid-components',
        number: 1,
        title: '4.1 The Four Core Lipid Components',
        estimatedReadingTime: '7 min',
      },
      {
        id: 'm4-s2',
        slug: 'section-2-microfluidic-encapsulation',
        number: 2,
        title: '4.2 Microfluidic Encapsulation',
        estimatedReadingTime: '7 min',
      },
      {
        id: 'm4-s3',
        slug: 'section-3-key-lnp-quality-attributes',
        number: 3,
        title: '4.3 Key LNP Quality Attributes',
        estimatedReadingTime: '7 min',
      },
      {
        id: 'm4-s4',
        slug: 'section-4-stability-and-handling',
        number: 4,
        title: '4.4 Stability and Handling',
        estimatedReadingTime: '7 min',
      },
      {
        id: 'm4-s5',
        slug: 'section-5-injection-to-antigen-expression',
        number: 5,
        title: '4.5 From Injection to Antigen Expression',
        estimatedReadingTime: '7 min',
      },
    ],
    keyTakeaways: [
      'Delivery is essential because naked mRNA is vulnerable to degradation and does not readily cross cellular membranes.',
      'A typical mRNA-LNP contains four major lipid components with different functions.',
      'The ionizable lipid is central to RNA interaction, encapsulation and endosomal escape.',
      'Microfluidic formulation uses rapid mixing to promote nanoparticle self-assembly.',
      'Important LNP quality attributes include particle size, PDI, zeta potential and encapsulation efficiency.',
      'LNP stability can be affected by temperature, physical stress, freeze-thaw exposure and handling.',
      'Successful delivery ultimately needs to result in cytoplasmic mRNA availability and antigen expression.',
    ],
    knowledgeCheckIds: ['kc-m4-01', 'kc-m4-02', 'kc-m4-03', 'kc-m4-04', 'kc-m4-05', 'kc-m4-06'],

    references: [
      {
        id: 'ref-m4-01',
        citation: 'Hou, X., Zaks, T., Langer, R., & Dong, Y. (2021). Lipid nanoparticles for mRNA delivery. Nature Reviews Materials, 6(12), 1078–1094.',
        doi: '10.1038/s41578-021-00358-0',
      },
      {
        id: 'ref-m4-02',
        citation: 'Cullis, P. R., & Hope, M. J. (2017). Lipid nanoparticle systems for enabling gene therapies. Molecular Therapy, 25(7), 1467–1475.',
        doi: '10.1016/j.ymthe.2017.03.013',
      },
    ],
    resourceIds: ['res-core-01'],
  },
];

export const readingSectionsData: Record<string, ReadingSection> = {
  // =========================================================================
  // MODULE 1 SECTIONS
  // =========================================================================
  'm1-s1': {
    id: 'm1-s1',
    moduleId: 'module-01',
    number: 1,
    title: '1.1 From Traditional Vaccines to mRNA',
    subtitle: 'Comparing conventional vaccine platforms with cytoplasmic mRNA delivery.',
    estimatedReadingTime: '7 min',
    previousSectionId: null,
    nextSectionId: 'm1-s2',
    nextLabel: 'NEXT: HOST-CELL EXPRESSION',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'Before we start designing and manufacturing mRNA, I want to first understand why this platform is different from conventional vaccine technologies.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Traditional vaccines may use an attenuated pathogen, an inactivated pathogen, a purified protein, or a viral vector. mRNA vaccines take a different approach. Instead of delivering the antigen itself, I deliver the genetic instructions for the cell to make the antigen.',
      },
      {
        type: 'paragraph',
        text: 'This simple change has important consequences for both biology and manufacturing.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1.1 From Traditional Vaccines to mRNA',
      },
      {
        type: 'paragraph',
        text: 'Traditional vaccine platforms have different strengths and limitations.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Live-attenuated vaccines use weakened forms of a pathogen. They can generate strong immune responses, but the use of a replicating organism introduces additional safety and manufacturing considerations.',
          'Inactivated vaccines use pathogens that have been chemically or physically inactivated. They are non-replicating, but manufacturing requires production and handling of large quantities of the pathogen before inactivation.',
          'Protein subunit vaccines avoid the use of whole pathogens by delivering selected antigens. However, producing complex proteins outside the body can be challenging. Some viral proteins are difficult to maintain in the correct three-dimensional structure.',
          'Viral vector vaccines deliver genetic information using a modified virus. They can efficiently introduce genes into cells, but immune responses against the vector itself can become a consideration, particularly when repeat dosing is required.',
          'DNA vaccines also deliver genetic information. However, DNA must reach the nucleus before it can be transcribed.',
        ],
      },
      {
        type: 'paragraph',
        text: 'mRNA changes this workflow.',
      },
      {
        type: 'paragraph',
        text: 'With an mRNA vaccine, I deliver a transient RNA molecule that can be translated directly in the cell cytoplasm. The cell itself becomes the site where the antigen is produced.',
      },
      {
        type: 'figure',
        figureNumber: 'Diagram 1.1',
        title: 'Comparison of Vaccine Platforms to mRNA Delivery',
        caption: 'Schematic comparison showing the shift from delivering whole pathogens or external recombinant proteins to delivering cytoplasmic mRNA instructions.',
        alt: 'Diagram comparing live-attenuated, inactivated, subunit, viral vector, DNA, and mRNA vaccine platforms',
        isPlaceholder: true,
        source: 'NIBM Pre-Workshop Master Reading Materials',
      },
    ],
  },

  'm1-s2': {
    id: 'm1-s2',
    moduleId: 'module-01',
    number: 2,
    title: '1.2 The Advantage of Host-Cell Antigen Expression',
    subtitle: 'Why host synthesis simplifies manufacturing and supports complex protein folding.',
    estimatedReadingTime: '7 min',
    previousSectionId: 'm1-s1',
    nextSectionId: 'm1-s3',
    nextLabel: 'NEXT: KEY SAFETY CHARACTERISTICS',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'One of the key ideas I want you to remember is:',
        lead: true,
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'Key Idea',
        content: 'mRNA does not deliver the finished protein. It delivers the instructions for making the protein.',
      },
      {
        type: 'paragraph',
        text: 'Once the mRNA reaches the cytoplasm, cellular ribosomes translate the sequence into protein.',
      },
      {
        type: 'paragraph',
        text: 'This can be particularly useful for complex antigens. Instead of producing and purifying the protein externally, I allow the recipient cell to synthesize the antigen using its own cellular machinery.',
      },
      {
        type: 'paragraph',
        text: 'For membrane-associated or structurally complex proteins, this may help the antigen acquire cellular processing and post-translational modifications that are difficult to reproduce in some recombinant production systems.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'A Fundamentally Different Manufacturing Concept',
      },
      {
        type: 'paragraph',
        text: 'The result is a fundamentally different manufacturing concept:',
      },
      {
        type: 'callout',
        variant: 'methodology',
        title: 'Conventional Approach',
        content: 'Pathogen or recombinant protein → biological production → purification → formulation',
      },
      {
        type: 'callout',
        variant: 'methodology',
        title: 'mRNA Approach',
        content: 'DNA template → IVT → mRNA purification → LNP formulation → host-cell protein expression',
      },
      {
        type: 'paragraph',
        text: 'This is one reason mRNA is often described as a sequence-based or information-based platform.',
      },
    ],
  },

  'm1-s3': {
    id: 'm1-s3',
    moduleId: 'module-01',
    number: 3,
    title: '1.3 Key Safety Characteristics',
    subtitle: 'Cell-free transcription, absence of nuclear integration, and transient expression.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm1-s2',
    nextSectionId: null,
    nextLabel: 'START MODULE 1 KNOWLEDGE CHECK',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'I also want to understand what mRNA does not do.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Synthetic mRNA is not a live virus and does not contain a complete replicating pathogen. Manufacturing can therefore be performed using cell-free enzymatic transcription rather than large-scale cultivation of the infectious pathogen.',
      },
      {
        type: 'paragraph',
        text: 'mRNA also functions primarily in the cytoplasm and does not need to enter the nucleus to be translated. It therefore does not have the same genomic-integration mechanism associated with DNA-based approaches.',
      },
      {
        type: 'paragraph',
        text: 'Another important characteristic is its transient nature. mRNA is eventually degraded by cellular processes, so antigen production is temporary rather than permanent.',
      },
      {
        type: 'paragraph',
        text: 'However, this does not mean that mRNA is biologically invisible. RNA can be detected by innate immune sensors. Excessive innate immune activation can reduce translation and increase reactogenicity.',
      },
      {
        type: 'callout',
        variant: 'important',
        title: 'Critical Design Consideration',
        content: 'This is why mRNA design, nucleoside modification, purification and delivery are all important.',
      },
      {
        type: 'key-takeaways',
        title: 'Module 1 Key Takeaways',
        items: [
          'mRNA delivers genetic instructions, enabling the recipient cell to produce the target antigen natively.',
          'Host-cell synthesis facilitates proper folding and post-translational processing of membrane-associated proteins.',
          'The platform is sequence-based and cell-free, eliminating the need to handle live infectious agents during manufacturing.',
          'mRNA operates transiently in the cytoplasm without genomic integration, and is degraded naturally by the cell.',
          'Balancing innate immune activation against efficient translation is the central engineering objective.',
        ],
      },
    ],
  },

  // =========================================================================
  // MODULE 2 SECTIONS
  // =========================================================================
  'm2-s1': {
    id: 'm2-s1',
    moduleId: 'module-02',
    number: 1,
    title: '2.1 The 5′ Cap',
    subtitle: 'Protective structure, translation initiation signal, and Cap 0 vs. Cap 1 structures.',
    estimatedReadingTime: '6 min',
    previousSectionId: null,
    nextSectionId: 'm2-s2',
    nextLabel: 'NEXT: UTRs & KOZAK SEQUENCE',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'Now that I understand why mRNA is useful, I can look at the molecule itself.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'A functional synthetic mRNA is much more than a protein-coding sequence. I need to design a complete transcript that can survive long enough in the cell, be recognized by the translation machinery and produce the desired protein efficiently.',
      },
      {
        type: 'callout',
        variant: 'definition',
        title: 'Simplified mRNA Architecture',
        content: '5′ Cap → 5′ UTR → Kozak sequence → ORF → 3′ UTR → Poly(A) tail',
      },
      {
        type: 'paragraph',
        text: 'Each component has a purpose.',
      },
      {
        type: 'figure',
        figureNumber: 'Diagram 2.1',
        title: 'Simplified Synthetic mRNA Transcript Architecture',
        caption: 'Schematic representation of the complete synthetic mRNA construct showing the 5′ Cap, 5′ UTR, Kozak sequence, Open Reading Frame (ORF), 3′ UTR, and Poly(A) tail.',
        alt: 'Diagram showing structural anatomy of a synthetic mRNA transcript from 5 prime cap to poly A tail',
        isPlaceholder: true,
        source: 'NIBM Pre-Workshop Master Reading Materials',
      },
      {
        type: 'heading',
        level: 2,
        text: '2.1 The 5′ Cap',
      },
      {
        type: 'paragraph',
        text: 'The 5′ cap is located at the beginning of the mRNA molecule.',
      },
      {
        type: 'paragraph',
        text: 'I think of the cap as both a protective structure and a translation signal.',
      },
      {
        type: 'paragraph',
        text: 'The cap helps protect the 5′ end of the RNA and provides a recognition site for translation initiation factors such as eIF4E.',
      },
      {
        type: 'paragraph',
        text: 'For synthetic mRNA, cap structure also matters for how the cell distinguishes the transcript from foreign RNA.',
      },
      {
        type: 'paragraph',
        text: 'Two important structures are Cap 0 and Cap 1.',
      },
      {
        type: 'paragraph',
        text: 'Cap 1 contains an additional 2′-O-methylation on the first nucleotide and is more closely associated with the molecular features of mature eukaryotic mRNA.',
      },
      {
        type: 'paragraph',
        text: 'During manufacturing, the cap can be introduced either during transcription or after transcription.',
      },
      {
        type: 'paragraph',
        text: 'Co-transcriptional capping methods, including modern Cap 1 approaches, can simplify manufacturing by incorporating the cap during the IVT reaction.',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'Key Point',
        content: 'A properly capped mRNA is much better prepared for efficient translation and cellular recognition.',
      },
    ],
  },

  'm2-s2': {
    id: 'm2-s2',
    moduleId: 'module-02',
    number: 2,
    title: '2.2 The 5′ UTR, Kozak Sequence and 3′ UTR',
    subtitle: 'Regulatory regions that control ribosome scanning, initiation context, and transcript stability.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm2-s1',
    nextSectionId: 'm2-s3',
    nextLabel: 'NEXT: OPEN READING FRAME',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'The untranslated regions do not encode the antigen, but they strongly influence how the mRNA behaves.',
        lead: true,
      },
      {
        type: 'heading',
        level: 3,
        text: '5′ UTR',
      },
      {
        type: 'paragraph',
        text: 'The 5′ UTR lies between the cap and the coding sequence.',
      },
      {
        type: 'paragraph',
        text: 'After recognizing the 5′ cap, the ribosome scans the mRNA until it reaches an appropriate start site.',
      },
      {
        type: 'paragraph',
        text: 'This is why the sequence surrounding the start codon matters.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Kozak Sequence',
      },
      {
        type: 'paragraph',
        text: 'The Kozak sequence provides an important sequence context around the AUG start codon and can influence translation initiation.',
      },
      {
        type: 'paragraph',
        text: 'When I design an mRNA construct, I therefore pay attention not only to the protein-coding sequence but also to the sequence surrounding the translation start site.',
      },
      {
        type: 'heading',
        level: 3,
        text: '3′ UTR',
      },
      {
        type: 'paragraph',
        text: 'The 3′ UTR lies after the stop codon.',
      },
      {
        type: 'paragraph',
        text: 'It can influence mRNA stability, degradation and interactions with cellular RNA-binding proteins.',
      },
      {
        type: 'paragraph',
        text: 'The choice of UTR can therefore affect how long the transcript remains available for translation.',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'Important Concept',
        content: 'UTRs are regulatory regions, not empty space.',
      },
    ],
  },

  'm2-s3': {
    id: 'm2-s3',
    moduleId: 'module-02',
    number: 3,
    title: '2.3 The Open Reading Frame',
    subtitle: 'Codon optimization, nucleotide composition, and secondary structure considerations.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm2-s2',
    nextSectionId: 'm2-s4',
    nextLabel: 'NEXT: NUCLEOSIDE MODIFICATIONS',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'The ORF contains the information required to produce the target protein.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'A natural viral sequence is not necessarily the best sequence for a synthetic mRNA construct. I may therefore optimize the ORF while preserving the desired amino-acid sequence.',
      },
      {
        type: 'paragraph',
        text: 'One common strategy is codon optimization.',
      },
      {
        type: 'paragraph',
        text: 'Because several codons can encode the same amino acid, synonymous codons can be selected to better suit the intended host-cell expression system.',
      },
      {
        type: 'paragraph',
        text: 'I also need to consider the overall nucleotide composition and RNA structure. Excessive secondary structure, particularly around important translation regions, can interfere with efficient translation.',
      },
      {
        type: 'callout',
        variant: 'practical-note',
        title: 'Sequence Optimization Balance',
        content: 'Sequence optimization is therefore a balancing exercise. I am not simply trying to maximize one parameter such as GC content. I want a sequence that supports efficient translation, appropriate stability and acceptable innate immune recognition.',
      },
    ],
  },

  'm2-s4': {
    id: 'm2-s4',
    moduleId: 'module-02',
    number: 4,
    title: '2.4 Nucleoside Modifications',
    subtitle: 'N1-methylpseudouridine (m1Ψ) and balancing stability, translation, and immune activation.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm2-s3',
    nextSectionId: 'm2-s5',
    nextLabel: 'NEXT: POLY(A) TAIL',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'Another major feature of many modern mRNA vaccine platforms is the use of modified nucleosides.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'One important example is N1-methylpseudouridine (m1Ψ).',
      },
      {
        type: 'paragraph',
        text: 'Unmodified RNA can activate innate immune sensors. If this response becomes too strong, cellular signaling can reduce translation and accelerate RNA degradation.',
      },
      {
        type: 'paragraph',
        text: 'Replacing uridine with an appropriate modified nucleoside can reduce unwanted innate immune recognition and improve productive protein expression.',
      },
      {
        type: 'paragraph',
        text: 'I therefore think of nucleoside modification as part of the overall balance between:',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'The Engineering Triad',
        content: 'RNA stability + translation + immune activation',
      },
      {
        type: 'paragraph',
        text: 'The goal is not to eliminate innate immunity completely. Some innate immune activation can contribute to the immune response. The objective is to achieve an appropriate level of activation without excessive inflammation or translation shutdown.',
      },
    ],
  },

  'm2-s5': {
    id: 'm2-s5',
    moduleId: 'module-02',
    number: 5,
    title: '2.5 Poly(A) Tail',
    subtitle: 'Synergistic interactions with poly(A)-binding proteins and whole-molecule system performance.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm2-s4',
    nextSectionId: null,
    nextLabel: 'START MODULE 2 KNOWLEDGE CHECK',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'At the 3′ end of the mRNA is the poly(A) tail.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'The poly(A) tail contributes to mRNA stability and translation by interacting with poly(A)-binding proteins and other components of the translation machinery.',
      },
      {
        type: 'paragraph',
        text: 'For synthetic mRNA, the tail can be encoded directly in the DNA template or introduced using other manufacturing strategies.',
      },
      {
        type: 'paragraph',
        text: 'The overall architecture therefore works as a system:',
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'Integrated Architecture System',
        content: 'Cap → UTR → ORF → UTR → Poly(A)',
      },
      {
        type: 'paragraph',
        text: 'Changing one component can influence the performance of the whole molecule.',
      },
      {
        type: 'key-takeaways',
        title: 'Module 2 Key Takeaways',
        items: [
          'Synthetic mRNA functions as an integrated molecular circuit: 5′ Cap, 5′ UTR, Kozak sequence, ORF, 3′ UTR, and Poly(A) tail.',
          'Cap 1 structures (with 2′-O-methylation) support translation initiation via eIF4E and evade foreign-RNA detection.',
          'UTRs are active regulatory elements that modulate ribosome scanning efficiency and transcript half-life.',
          'Codon optimization balances synonymous codon selection, RNA secondary structure, and translation kinetics.',
          'N1-methylpseudouridine (m1Ψ) suppresses excessive innate immune sensing, preventing premature translation arrest.',
        ],
      },
    ],
  },

  // =========================================================================
  // MODULE 3 SECTIONS
  // =========================================================================
  'm3-s1': {
    id: 'm3-s1',
    moduleId: 'module-03',
    number: 1,
    title: '3.1 DNA Template Production',
    subtitle: 'Template design, plasmid linearization, PCR amplicons, and starting material quality.',
    estimatedReadingTime: '6 min',
    previousSectionId: null,
    nextSectionId: 'm3-s2',
    nextLabel: 'NEXT: IN VITRO TRANSCRIPTION',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'Once the sequence is designed, I need to turn that digital sequence into a physical RNA product.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'The manufacturing workflow can be simplified into:',
      },
      {
        type: 'callout',
        variant: 'definition',
        title: 'Manufacturing Workflow',
        content: 'DNA template → IVT → DNase treatment → mRNA purification → QC',
      },
      {
        type: 'paragraph',
        text: 'The important point is that the core RNA synthesis step is cell-free.',
      },
      {
        type: 'heading',
        level: 2,
        text: '3.1 DNA Template Production',
      },
      {
        type: 'paragraph',
        text: 'Before I can make RNA, I need a DNA template.',
      },
      {
        type: 'paragraph',
        text: 'The template contains the elements required for transcription, including the promoter, UTRs, ORF and the sequence encoding the poly(A) region when the tail is template-encoded.',
      },
      {
        type: 'paragraph',
        text: 'For laboratory-scale work, the template may be prepared from a plasmid or generated as a linear DNA product such as a PCR amplicon.',
      },
      {
        type: 'list',
        title: 'The DNA template must be:',
        ordered: false,
        items: [
          'Correct in sequence',
          'The expected length',
          'Structurally intact',
          'Sufficiently pure',
          'Free from problematic contaminants',
        ],
      },
      {
        type: 'paragraph',
        text: 'If I use a plasmid, it must be properly linearized before IVT.',
      },
      {
        type: 'callout',
        variant: 'important',
        title: 'Template Quality Propagation',
        content: 'The quality of this starting material matters because problems in the DNA template can propagate into the RNA manufacturing process.',
      },
    ],
  },

  'm3-s2': {
    id: 'm3-s2',
    moduleId: 'module-03',
    number: 2,
    title: '3.2 In Vitro Transcription',
    subtitle: 'The central enzymatic reaction: T7 polymerase, nucleoside triphosphates, and DNase digestion.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm3-s1',
    nextSectionId: 'm3-s3',
    nextLabel: 'NEXT: mRNA PURIFICATION',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'IVT is the central manufacturing step.',
        lead: true,
      },
      {
        type: 'list',
        title: 'In a typical reaction, I combine:',
        ordered: false,
        items: [
          'DNA template',
          'T7 RNA polymerase',
          'ATP, CTP, GTP and UTP or the selected modified UTP',
          'Appropriate reaction buffer',
          'Magnesium ions',
          'Other required reaction components',
          'Capping components when using a co-transcriptional capping strategy',
        ],
      },
      {
        type: 'paragraph',
        text: 'T7 RNA polymerase recognizes the promoter on the DNA template and synthesizes the RNA transcript.',
      },
      {
        type: 'paragraph',
        text: 'If modified nucleosides are being used, the appropriate modified nucleotide is incorporated during transcription.',
      },
      {
        type: 'paragraph',
        text: 'After transcription, the DNA template is removed using DNase treatment.',
      },
      {
        type: 'paragraph',
        text: 'The reaction mixture now contains the desired mRNA together with enzymes, nucleotides, DNA fragments and other reaction components.',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'Key Lesson',
        content: 'That means the IVT reaction is not the final product.',
      },
    ],
  },

  'm3-s3': {
    id: 'm3-s3',
    moduleId: 'module-03',
    number: 3,
    title: '3.3 mRNA Purification',
    subtitle: 'Silica-based spin columns, LiCl precipitation, and the purpose of purification.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm3-s2',
    nextSectionId: 'm3-s4',
    nextLabel: 'NEXT: CRITICAL QUALITY ATTRIBUTES',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'Purification removes unwanted components from the IVT reaction.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'At laboratory scale, two approaches that I may encounter are silica-based purification and lithium chloride (LiCl) precipitation.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Silica-Based Purification',
      },
      {
        type: 'paragraph',
        text: 'Under appropriate conditions, RNA binds to a silica matrix while many unwanted components are removed during washing.',
      },
      {
        type: 'paragraph',
        text: 'The purified mRNA is then recovered by elution.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'LiCl Precipitation',
      },
      {
        type: 'paragraph',
        text: 'LiCl precipitation can be used as a relatively simple and economical RNA purification approach. Under suitable conditions, high-molecular-weight RNA precipitates while many smaller components remain in solution.',
      },
      {
        type: 'paragraph',
        text: 'Both approaches can be useful for laboratory-scale work, but neither should automatically be considered sufficient for every application.',
      },
      {
        type: 'paragraph',
        text: 'For higher-purity applications, additional purification strategies may be required.',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'The Important Lesson',
        content: 'Purification is not simply about recovering RNA. It is about recovering the right RNA while removing the impurities that can affect quality, safety and biological performance.',
      },
    ],
  },

  'm3-s4': {
    id: 'm3-s4',
    moduleId: 'module-03',
    number: 4,
    title: '3.4 Critical Quality Attributes',
    subtitle: 'Analytical approaches for measuring concentration, size, integrity, purity, and residuals.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm3-s3',
    nextSectionId: 'm3-s5',
    nextLabel: 'NEXT: IMPORTANT IMPURITIES',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'After purification, I need to determine whether the mRNA is actually suitable for the next stage.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Some basic attributes include:',
      },
      {
        type: 'table',
        title: 'Basic mRNA Critical Quality Attributes & Analytical Methods',
        headers: ['Attribute', 'Example analytical approach'],
        rows: [
          ['RNA concentration', 'UV spectrophotometry or fluorescence-based assay'],
          ['RNA size/integrity', 'Capillary electrophoresis'],
          ['Purity', 'UV absorbance ratios'],
          ['dsRNA contamination', 'dsRNA-specific assay'],
          ['Residual DNA', 'DNA-specific assay'],
          ['Endotoxin', 'LAL or recombinant Factor C assay'],
        ],
        footerNote: 'Source: NIBM Master Pre-Workshop Reading Materials (Module 3).',
      },
      {
        type: 'paragraph',
        text: 'For RNA integrity, an automated capillary electrophoresis system can provide a useful profile of the product.',
      },
      {
        type: 'paragraph',
        text: 'A predominantly intact product should show a strong peak around the expected size. Broad peaks, multiple products or abundant smaller fragments can indicate degradation or incomplete transcription.',
      },
      {
        type: 'callout',
        variant: 'practical-note',
        title: 'Analytical Limitation Reminder',
        content: 'I should remember, however, that one analytical method cannot answer every quality question. A sample can look good in an electropherogram and still contain impurities that require separate testing.',
      },
    ],
  },

  'm3-s5': {
    id: 'm3-s5',
    moduleId: 'module-03',
    number: 5,
    title: '3.5 Important Impurities',
    subtitle: 'Double-stranded RNA (dsRNA), residual DNA, enzyme residues, and endotoxin.',
    estimatedReadingTime: '6 min',
    previousSectionId: 'm3-s4',
    nextSectionId: null,
    nextLabel: 'START MODULE 3 KNOWLEDGE CHECK',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'One of the most important impurities associated with IVT is double-stranded RNA (dsRNA).',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'dsRNA can activate innate immune sensors and interfere with productive translation.',
      },
      {
        type: 'list',
        title: 'Other impurities can include:',
        ordered: false,
        items: [
          'Residual DNA template',
          'Protein or enzyme residues',
          'Unincorporated nucleotides',
          'Buffer components',
          'Endotoxin, particularly when bacterial plasmid-derived materials are involved',
        ],
      },
      {
        type: 'paragraph',
        text: 'These impurities are not simply manufacturing inconveniences. They can influence the biological behavior of the final product.',
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'Manufacturing & QC Integration',
        content: 'This is why purification and analytical testing are integral parts of mRNA manufacturing.',
      },
      {
        type: 'key-takeaways',
        title: 'Module 3 Key Takeaways',
        items: [
          'The core enzymatic transcription reaction (IVT) is cell-free, requiring a linearized, high-purity DNA template.',
          'DNase treatment degrades the DNA template, followed by purification (e.g. silica columns or LiCl precipitation).',
          'Purification aims to recover full-length intact RNA while stripping away abortive transcripts, enzymes, and residual template.',
          'Critical quality attributes (CQAs) span RNA concentration, integrity, purity, residual DNA, endotoxin, and dsRNA.',
          'Double-stranded RNA (dsRNA) byproduct is a potent trigger of innate immune sensors that can shut down translation.',
        ],
      },
    ],
  },

  // =========================================================================
  // MODULE 4 SECTIONS
  // =========================================================================
  'm4-s1': {
    id: 'm4-s1',
    moduleId: 'module-04',
    number: 1,
    title: '4.1 The Four Core Lipid Components',
    subtitle: 'Ionizable lipid, helper phospholipid, cholesterol, and PEG-lipid functions.',
    estimatedReadingTime: '7 min',
    previousSectionId: null,
    nextSectionId: 'm4-s2',
    nextLabel: 'NEXT: MICROFLUIDIC ENCAPSULATION',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'I now have a purified mRNA molecule. But there is still one major problem.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'How do I get the RNA into the right cells?',
      },
      {
        type: 'paragraph',
        text: 'Naked mRNA is vulnerable to degradation and does not readily cross cellular membranes. For many current mRNA applications, lipid nanoparticles provide the delivery system.',
      },
      {
        type: 'paragraph',
        text: 'An LNP can be thought of as a protective vehicle that helps the mRNA reach the cytoplasm.',
      },
      {
        type: 'heading',
        level: 2,
        text: '4.1 The Four Core Lipid Components',
      },
      {
        type: 'paragraph',
        text: 'A typical mRNA-LNP formulation contains four major lipid components.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Ionizable Lipid',
      },
      {
        type: 'paragraph',
        text: 'The ionizable lipid is central to mRNA encapsulation and intracellular delivery.',
      },
      {
        type: 'paragraph',
        text: 'Its charge behavior changes with pH. During formulation under acidic conditions, it can interact strongly with the negatively charged RNA.',
      },
      {
        type: 'paragraph',
        text: 'After cellular uptake and exposure to the acidic endosomal environment, its protonation behavior contributes to membrane disruption and endosomal escape.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Helper Phospholipid',
      },
      {
        type: 'paragraph',
        text: 'Phospholipids contribute to the structural organization of the nanoparticle and influence its physical properties.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Cholesterol',
      },
      {
        type: 'paragraph',
        text: 'Cholesterol contributes to particle structure and membrane properties. It helps maintain the physical organization of the LNP.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'PEG-Lipid',
      },
      {
        type: 'paragraph',
        text: 'PEG-lipids influence particle formation, size and colloidal stability. They help limit uncontrolled aggregation during formulation and storage.',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'Dynamic Formulation Principle',
        content: 'I therefore do not think of an LNP as simply "fat surrounding RNA." Each lipid performs a different function.',
      },
    ],
  },

  'm4-s2': {
    id: 'm4-s2',
    moduleId: 'module-04',
    number: 2,
    title: '4.2 Microfluidic Encapsulation',
    subtitle: 'Rapid mixing of organic and aqueous phases, formulation parameters, and N/P ratio.',
    estimatedReadingTime: '7 min',
    previousSectionId: 'm4-s1',
    nextSectionId: 'm4-s3',
    nextLabel: 'NEXT: KEY LNP QUALITY ATTRIBUTES',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'A common laboratory approach is to combine an organic lipid phase with an aqueous RNA phase using rapid mixing.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Under acidic conditions, the ionizable lipid interacts with the negatively charged RNA. The lipids then self-assemble around the RNA to form nanoparticles.',
      },
      {
        type: 'list',
        title: 'Important formulation parameters include:',
        ordered: false,
        items: [
          'Lipid composition',
          'RNA concentration',
          'pH',
          'Flow conditions',
          'Mixing conditions',
          'N/P ratio',
        ],
      },
      {
        type: 'paragraph',
        text: 'The N/P ratio describes the relationship between ionizable lipid amine groups and RNA phosphate groups.',
      },
      {
        type: 'paragraph',
        text: 'After particle formation, the formulation must undergo downstream processing such as buffer exchange to remove ethanol and adjust the formulation to an appropriate physiological environment.',
      },
      {
        type: 'figure',
        figureNumber: 'Diagram 4.1',
        title: 'Microfluidic Rapid-Mixing Encapsulation Workflow',
        caption: 'Schematic illustrating the rapid mixing of ethanolic lipid phase with acidic aqueous RNA phase, self-assembly into LNPs, and subsequent buffer exchange.',
        alt: 'Microfluidic mixing schematic showing lipid phase and aqueous RNA phase converging to form LNPs',
        isPlaceholder: true,
        source: 'NIBM Pre-Workshop Master Reading Materials',
      },
    ],
  },

  'm4-s3': {
    id: 'm4-s3',
    moduleId: 'module-04',
    number: 3,
    title: '4.3 Key LNP Quality Attributes',
    subtitle: 'Particle size, PDI, zeta potential, and encapsulation efficiency measurements.',
    estimatedReadingTime: '7 min',
    previousSectionId: 'm4-s2',
    nextSectionId: 'm4-s4',
    nextLabel: 'NEXT: STABILITY AND HANDLING',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'After formulation, I need to determine whether the particles are suitable.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Important measurements include:',
      },
      {
        type: 'table',
        title: 'Key LNP Quality Attributes & Analytical Methodologies',
        headers: ['Quality attribute', 'Typical analytical approach', 'What it tells me'],
        rows: [
          ['Particle size', 'DLS', 'Overall particle population'],
          ['PDI', 'DLS', 'Particle-size uniformity'],
          ['Zeta potential', 'Electrophoretic light scattering', 'Surface-charge characteristics'],
          ['Encapsulation efficiency', 'Fluorescence-based assay', 'Fraction of RNA associated with particles'],
        ],
        footerNote: 'Source: NIBM Master Pre-Workshop Reading Materials (Module 4).',
      },
      {
        type: 'paragraph',
        text: 'For encapsulation efficiency, a RiboGreen-type assay can distinguish accessible RNA from total RNA after disruption of the LNP.',
      },
      {
        type: 'paragraph',
        text: 'A high encapsulation efficiency is desirable because the RNA needs to be protected during delivery.',
      },
      {
        type: 'callout',
        variant: 'practical-note',
        title: 'Specification Targets',
        content: 'The exact target specifications, however, depend on the formulation and intended application. I should therefore treat numerical values as development targets rather than universal acceptance criteria.',
      },
    ],
  },

  'm4-s4': {
    id: 'm4-s4',
    moduleId: 'module-04',
    number: 4,
    title: '4.4 Stability and Handling',
    subtitle: 'Sensitivity to physical stress, temperature, freeze-thaw cycles, and RNase controls.',
    estimatedReadingTime: '7 min',
    previousSectionId: 'm4-s3',
    nextSectionId: 'm4-s5',
    nextLabel: 'NEXT: INJECTION TO ANTIGEN EXPRESSION',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'An mRNA-LNP formulation can be sensitive to temperature, physical stress and repeated freeze-thaw cycles.',
        lead: true,
      },
      {
        type: 'list',
        title: 'I therefore need to control:',
        ordered: false,
        items: [
          'Storage temperature',
          'Freeze-thaw exposure',
          'Mechanical stress',
          'RNase contamination',
          'Container handling',
          'Formulation concentration and buffer conditions',
        ],
      },
      {
        type: 'paragraph',
        text: 'Gentle handling is important because physical stress can influence particle size, aggregation and RNA leakage.',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'Dynamic Formulation',
        content: 'Most importantly, I should remember that an LNP is a dynamic formulation, not simply a container. Changes in its physical structure can affect biological performance.',
      },
    ],
  },

  'm4-s5': {
    id: 'm4-s5',
    moduleId: 'module-04',
    number: 5,
    title: '4.5 From Injection to Antigen Expression',
    subtitle: 'Endocytosis, endosomal escape, ribosome translation, and bringing the four modules together.',
    estimatedReadingTime: '7 min',
    previousSectionId: 'm4-s4',
    nextSectionId: null,
    nextLabel: 'START MODULE 4 KNOWLEDGE CHECK',
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'The final step is to understand what happens biologically.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Following administration, LNPs are taken up by cells through endocytic pathways.',
      },
      {
        type: 'paragraph',
        text: 'The key challenge is endosomal escape.',
      },
      {
        type: 'paragraph',
        text: 'After uptake, the LNP encounters the acidic endosomal environment. Changes in the ionizable lipid\'s protonation state contribute to interactions with the endosomal membrane, helping release mRNA into the cytoplasm.',
      },
      {
        type: 'paragraph',
        text: 'Once the mRNA reaches the cytoplasm:',
      },
      {
        type: 'callout',
        variant: 'definition',
        title: 'Cytoplasmic Expression Pathway',
        content: 'mRNA → ribosome → antigen protein',
      },
      {
        type: 'paragraph',
        text: 'The antigen can then enter cellular processing and antigen-presentation pathways.',
      },
      {
        type: 'list',
        title: 'This can stimulate both arms of adaptive immunity, including:',
        ordered: false,
        items: [
          'Antibody responses',
          'CD4+ T-cell responses',
          'CD8+ T-cell responses',
          'Memory B- and T-cell responses',
        ],
      },
      {
        type: 'paragraph',
        text: 'At the same time, RNA and components of the formulation can interact with innate immune pathways.',
      },
      {
        type: 'paragraph',
        text: 'This brings us back to a central theme from Module 2:',
      },
      {
        type: 'callout',
        variant: 'key-concept',
        title: 'Central Engineering Theme',
        content: 'The goal is not simply to maximize RNA expression or immune activation. The goal is to balance delivery, expression and immune stimulation.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Bringing the Four Modules Together',
      },
      {
        type: 'paragraph',
        text: 'I can now connect the entire workflow:',
      },
      {
        type: 'list',
        title: 'The Complete mRNA Vaccine Platform Workflow:',
        ordered: true,
        items: [
          'DESIGN: I design the mRNA sequence and optimize its cap, UTRs, ORF, poly(A) tail and nucleoside composition.',
          'MANUFACTURE: I generate a suitable DNA template and use IVT to synthesize the mRNA.',
          'PURIFY & TEST: I remove unwanted components and evaluate RNA concentration, integrity, purity and key impurities.',
          'FORMULATE: I encapsulate the mRNA into LNPs and evaluate particle size, PDI, zeta potential and encapsulation efficiency.',
          'DELIVER & EXPRESS: The LNP enters cells, facilitates endosomal escape and releases mRNA into the cytoplasm.',
          'IMMUNE RESPONSE: The cell produces antigen, which engages antigen-presentation pathways and contributes to adaptive immune activation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This is the central workflow I want you to carry into the hands-on workshop.',
      },
      {
        type: 'paragraph',
        text: 'The individual steps may look technically different, but they are connected. A well-designed sequence cannot compensate for poor manufacturing. A high-quality mRNA cannot work effectively without appropriate delivery. And a good LNP cannot rescue a poorly characterized RNA product.',
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'The Integrated Platform Concept',
        content: 'mRNA vaccine development is therefore best understood as an integrated platform, where sequence design, manufacturing, analytical characterization, formulation and biology all influence one another.',
      },
      {
        type: 'key-takeaways',
        title: 'Module 4 Key Takeaways',
        items: [
          'Four lipid classes assemble dynamically: Ionizable lipid (encapsulation & endosomal escape), Helper phospholipid (structure), Cholesterol (rigidity & membrane properties), and PEG-lipid (colloidal stability & size control).',
          'Rapid microfluidic mixing under acidic conditions drives electrostatic self-assembly of ionizable amine groups and RNA phosphate backbones (N/P ratio).',
          'Downstream processing (buffer exchange/tangential flow filtration) removes ethanol and neutralizes pH.',
          'Endosomal acidification triggers protonation of the ionizable lipid, driving membrane disruption to release mRNA into the cytoplasm.',
          'Cytoplasmic translation produces antigens that enter MHC-I and MHC-II pathways to elicit humoral (antibodies) and cellular (CD4+/CD8+ T cells) immunity.',
          'All four modules form a tightly linked chain: Sequence Design → IVT Manufacture → Purification & QC → LNP Formulation → Delivery & Translation → Adaptive Immunity.',
        ],
      },
    ],
  },
};

import { learningSupportByModule, overallWorkshopPathwayData } from './learningSupportData';

export const knowledgeChecksData: KnowledgeCheck[] = [
  ...learningSupportByModule['module-01'].knowledgeChecks,
  ...learningSupportByModule['module-02'].knowledgeChecks,
  ...learningSupportByModule['module-03'].knowledgeChecks,
  ...learningSupportByModule['module-04'].knowledgeChecks,
  ...overallWorkshopPathwayData.overallKnowledgeChecks,
];


export const glossaryTermsData: GlossaryTerm[] = [
  {
    id: 'term-5-cap',
    term: '5′ Cap (Cap 0 / Cap 1)',
    letter: '5',
    definition: 'A modified guanine nucleotide structure added to the 5′ end of eukaryotic mRNA. Cap 1 includes an additional 2′-O-methylation on the first nucleotide, which is critical for eIF4E translation initiation factor binding and evading intracellular foreign-RNA immune sensors.',
    category: 'mRNA Architecture',
    relatedModuleBadges: [{ label: 'MODULE 02', moduleId: 'module-02', sectionId: 'm2-s1', type: 'module' }],
    relatedConcepts: ['eIF4E', 'Co-transcriptional Capping', 'Cap 1'],
  },
  {
    id: 'term-capillary-electrophoresis',
    term: 'Capillary Electrophoresis (CE)',
    letter: 'C',
    definition: 'An automated analytical separation technique used to evaluate RNA size distribution, integrity, and the presence of degradation products or abortive transcripts.',
    category: 'Analytical Testing',
    relatedModuleBadges: [{ label: 'MODULE 03', moduleId: 'module-03', sectionId: 'm3-s4', type: 'module' }],
    relatedConcepts: ['RNA Integrity', 'Critical Quality Attributes'],
  },
  {
    id: 'term-cholesterol',
    term: 'Cholesterol (in LNPs)',
    letter: 'C',
    definition: 'A naturally occurring sterol lipid incorporated into LNPs to modulate particle structure, bilayer fluidity, and membrane stability.',
    category: 'LNP Formulation',
    relatedModuleBadges: [{ label: 'MODULE 04', moduleId: 'module-04', sectionId: 'm4-s1', type: 'module' }],
    relatedConcepts: ['Lipid Nanoparticles', 'Membrane Properties'],
  },
  {
    id: 'term-codon-optimization',
    term: 'Codon Optimization',
    letter: 'C',
    definition: 'The engineering strategy of selecting synonymous codons that match host cell tRNA abundance and optimize mRNA secondary structure and GC content without altering the target amino-acid sequence.',
    category: 'mRNA Architecture',
    relatedModuleBadges: [{ label: 'MODULE 02', moduleId: 'module-02', sectionId: 'm2-s3', type: 'module' }],
    relatedConcepts: ['Open Reading Frame', 'Translation Kinetics'],
  },
  {
    id: 'term-dsrna',
    term: 'Double-Stranded RNA (dsRNA)',
    letter: 'D',
    definition: 'A byproduct formed during in vitro transcription (often via RNA-dependent RNA polymerase activity of T7 polymerase) that acts as a potent trigger of innate immune sensors, leading to translational shutdown.',
    category: 'Manufacturing Impurities',
    relatedModuleBadges: [{ label: 'MODULE 03', moduleId: 'module-03', sectionId: 'm3-s5', type: 'module' }],
    relatedConcepts: ['In Vitro Transcription', 'Innate Immune Sensors'],
  },
  {
    id: 'term-endosomal-escape',
    term: 'Endosomal Escape',
    letter: 'E',
    definition: 'The process by which encapsulated mRNA translocates from the acidic lumen of an endosome into the cytoplasm following cellular uptake, mediated by the protonation of ionizable lipids.',
    category: 'Biological Delivery',
    relatedModuleBadges: [{ label: 'MODULE 04', moduleId: 'module-04', sectionId: 'm4-s5', type: 'module' }],
    relatedConcepts: ['Ionizable Lipid', 'Cytoplasmic Translation'],
  },
  {
    id: 'term-helper-phospholipid',
    term: 'Helper Phospholipid',
    letter: 'H',
    definition: 'A structural lipid (such as DSPC or DOPE) in LNP formulations that contributes to bilayer phase behavior, particle stability, and membrane fusion.',
    category: 'LNP Formulation',
    relatedModuleBadges: [{ label: 'MODULE 04', moduleId: 'module-04', sectionId: 'm4-s1', type: 'module' }],
    relatedConcepts: ['DSPC', 'LNP Structure'],
  },
  {
    id: 'term-ionizable-lipid',
    term: 'Ionizable Lipid',
    letter: 'I',
    definition: 'A synthetic lipid with a tertiary amine headgroup that is positively charged at low pH during formulation to condense RNA, neutral at physiological pH, and re-protonated in acidic endosomes to facilitate endosomal escape.',
    category: 'LNP Formulation',
    relatedModuleBadges: [{ label: 'MODULE 04', moduleId: 'module-04', sectionId: 'm4-s1', type: 'module' }],
    relatedConcepts: ['N/P Ratio', 'Endosomal Escape'],
  },
  {
    id: 'term-ivt',
    term: 'In Vitro Transcription (IVT)',
    letter: 'I',
    definition: 'A cell-free enzymatic reaction where a phage RNA polymerase (e.g. T7) synthesizes RNA transcripts from a linearized DNA template in the presence of ribonucleoside triphosphates (NTPs).',
    category: 'Manufacturing',
    relatedModuleBadges: [{ label: 'MODULE 03', moduleId: 'module-03', sectionId: 'm3-s2', type: 'module' }],
    relatedConcepts: ['T7 RNA Polymerase', 'DNA Template'],
  },
  {
    id: 'term-kozak-sequence',
    term: 'Kozak Sequence',
    letter: 'K',
    definition: 'A consensus nucleotide motif surrounding the AUG start codon that facilitates ribosome recognition and optimal translation initiation in eukaryotic cells.',
    category: 'mRNA Architecture',
    relatedModuleBadges: [{ label: 'MODULE 02', moduleId: 'module-02', sectionId: 'm2-s2', type: 'module' }],
    relatedConcepts: ['5′ UTR', 'Translation Initiation'],
  },
  {
    id: 'term-m1psi',
    term: 'N1-Methylpseudouridine (m1Ψ)',
    letter: 'M',
    definition: 'A naturally occurring modified nucleoside that replaces uridine in synthetic mRNA to suppress innate immune recognition (TLR3/7/8, RIG-I, PKR) and enhance protein translation efficiency.',
    category: 'Nucleoside Modifications',
    relatedModuleBadges: [{ label: 'MODULE 02', moduleId: 'module-02', sectionId: 'm2-s4', type: 'module' }],
    relatedConcepts: ['Modified Nucleosides', 'Innate Immunity'],
  },
  {
    id: 'term-np-ratio',
    term: 'N/P Ratio',
    letter: 'N',
    definition: 'The molar ratio of positively chargeable nitrogen (amine) groups in the ionizable lipid to negatively charged phosphate groups in the RNA backbone, governing particle self-assembly and encapsulation.',
    category: 'LNP Formulation',
    relatedModuleBadges: [{ label: 'MODULE 04', moduleId: 'module-04', sectionId: 'm4-s2', type: 'module' }],
    relatedConcepts: ['Microfluidic Encapsulation', 'Ionizable Lipid'],
  },
  {
    id: 'term-orf',
    term: 'Open Reading Frame (ORF)',
    letter: 'O',
    definition: 'The protein-coding sequence of the mRNA transcript extending from the AUG initiation codon to the termination stop codon.',
    category: 'mRNA Architecture',
    relatedModuleBadges: [{ label: 'MODULE 02', moduleId: 'module-02', sectionId: 'm2-s3', type: 'module' }],
    relatedConcepts: ['Codon Optimization', 'Antigen Protein'],
  },
  {
    id: 'term-peg-lipid',
    term: 'PEG-Lipid (Polyethylene Glycol-Lipid)',
    letter: 'P',
    definition: 'A lipid conjugate bearing a hydrophilic polyethylene glycol chain that coats the exterior of LNPs, controlling particle size, preventing aggregation, and imparting colloidal stability.',
    category: 'LNP Formulation',
    relatedModuleBadges: [{ label: 'MODULE 04', moduleId: 'module-04', sectionId: 'm4-s1', type: 'module' }],
    relatedConcepts: ['Colloidal Stability', 'Particle Size'],
  },
  {
    id: 'term-polya-tail',
    term: 'Poly(A) Tail',
    letter: 'P',
    definition: 'A homopolymeric tract of adenine nucleotides located at the 3′ terminus of eukaryotic mRNA that binds poly(A)-binding proteins to enhance translation initiation and protect against 3′ exonuclease decay.',
    category: 'mRNA Architecture',
    relatedModuleBadges: [{ label: 'MODULE 02', moduleId: 'module-02', sectionId: 'm2-s5', type: 'module' }],
    relatedConcepts: ['PABP', 'Transcript Stability'],
  },
  {
    id: 'term-ribogreen',
    term: 'RiboGreen Assay',
    letter: 'R',
    definition: 'A fluorescent dye-binding assay used to quantify RNA concentration and determine LNP encapsulation efficiency by comparing fluorescence in intact vs. detergent-disrupted particles.',
    category: 'Analytical Testing',
    relatedModuleBadges: [{ label: 'MODULE 04', moduleId: 'module-04', sectionId: 'm4-s3', type: 'module' }],
    relatedConcepts: ['Encapsulation Efficiency', 'Critical Quality Attributes'],
  },
  {
    id: 'term-t7-polymerase',
    term: 'T7 RNA Polymerase',
    letter: 'T',
    definition: 'A highly processive bacteriophage DNA-dependent RNA polymerase widely used in cell-free in vitro transcription reactions to produce synthetic mRNA transcripts.',
    category: 'Manufacturing',
    relatedModuleBadges: [{ label: 'MODULE 03', moduleId: 'module-03', sectionId: 'm3-s2', type: 'module' }],
    relatedConcepts: ['In Vitro Transcription', 'Promoter Recognition'],
  },
  {
    id: 'term-utr',
    term: 'Untranslated Region (5′ and 3′ UTR)',
    letter: 'U',
    definition: 'Non-coding flanking regions of an mRNA transcript that contain regulatory elements governing ribosome scanning, mRNA localization, cellular stability, and interactions with RNA-binding proteins.',
    category: 'mRNA Architecture',
    relatedModuleBadges: [{ label: 'MODULE 02', moduleId: 'module-02', sectionId: 'm2-s2', type: 'module' }],
    relatedConcepts: ['5′ UTR', '3′ UTR', 'Transcript Half-Life'],
  },
];

export const resourcesData: ResourceItem[] = [
  {
    id: 'res-core-01',
    title: 'Pre-Workshop Reading Materials: mRNA Vaccine Design and Manufacturing (Master Guide)',
    description: 'The authoritative master reading guide covering Modules 1 through 4: Why mRNA, How Do I Design an mRNA Molecule, How Do I Manufacture and Test mRNA, and How Do I Deliver mRNA.',
    category: 'core',
    type: 'pdf',
    sizeOrDoi: 'PDF • Master Course Document (13 Pages)',
    authorInfo: 'NIBM Scientific Program Committee',
    publishedDate: '2026',
    downloadUrl: '/resources/master-guide-mrna-vaccine-design.pdf',
  },
  {
    id: 'res-lit-01',
    title: 'mRNA Vaccines — A New Era in Vaccinology',
    description: 'Foundational review paper discussing the evolution of mRNA vaccine platforms, immunological mechanisms, lipid nanoparticle delivery systems, and clinical applications.',
    category: 'literature',
    type: 'doi',
    sizeOrDoi: 'DOI: 10.1038/nrd.2017.243',
    externalUrl: 'https://doi.org/10.1038/nrd.2017.243',
    authorInfo: 'Pardi, N., Hogan, M. J., Porter, F. W., & Weissman, D.',
    publishedJournal: 'Nature Reviews Drug Discovery, 17(4), 261–279 (2018)',
    publishedDate: '2018',
    abstract: 'mRNA vaccines represent a promising alternative to conventional vaccine approaches because of their high potency, capacity for rapid development, and potential for low-cost manufacture and safe administration. This review provides a comprehensive overview of mRNA vaccine technologies and their applications against infectious diseases and cancer.',
  },
  {
    id: 'res-lit-02',
    title: 'Lipid Nanoparticles for mRNA Delivery',
    description: 'Comprehensive review detailing ionizable lipid chemistry, formulation parameters, microfluidic manufacturing, endosomal escape kinetics, and analytical characterization.',
    category: 'literature',
    type: 'doi',
    sizeOrDoi: 'DOI: 10.1038/s41578-021-00358-0',
    externalUrl: 'https://doi.org/10.1038/s41578-021-00358-0',
    authorInfo: 'Hou, X., Zaks, T., Langer, R., & Dong, Y.',
    publishedJournal: 'Nature Reviews Materials, 6(12), 1078–1094 (2021)',
    publishedDate: '2021',
    abstract: 'Lipid nanoparticles (LNPs) are the leading non-viral delivery system for mRNA therapeutics. This article reviews the composition of LNPs, mechanism of intracellular delivery and endosomal escape, clinical translation, and future design strategies.',
  },
  {
    id: 'res-sop-01',
    title: 'Laboratory Protocol: Cell-Free In Vitro Transcription (IVT) & Silica-Based RNA Purification',
    description: 'Practical laboratory procedure outlining template linearization, T7 RNA polymerase reaction setup, co-transcriptional capping, DNase I digestion, and spin-column cleanup.',
    category: 'sop',
    type: 'protocol',
    documentId: 'SOP-MRNA-301',
    sizeOrDoi: 'PDF • Laboratory Protocol Guide',
    lastUpdated: 'Master Workshop Series (2026)',
    downloadUrl: '/resources/sop-mrna-301-ivt-purification.pdf',
  },
  {
    id: 'res-sop-02',
    title: 'Laboratory Protocol: Microfluidic Formulation & Characterization of mRNA-Loaded LNPs',
    description: 'Step-by-step operating protocol for rapid-mixing microfluidic LNP formulation, buffer exchange via dialysis, DLS particle sizing, and RiboGreen encapsulation efficiency assay.',
    category: 'sop',
    type: 'protocol',
    documentId: 'SOP-LNP-401',
    sizeOrDoi: 'PDF • Formulation & QC Guide',
    lastUpdated: 'Master Workshop Series (2026)',
    downloadUrl: '/resources/sop-lnp-401-microfluidic-formulation.pdf',
  },
];
