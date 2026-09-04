import React from 'react';

interface NIBMLogoProps {
  /**
   * 'full': Full official logo with tall orange N, IBM, and the subtitle "NATIONAL INSTITUTES OF BIOTECHNOLOGY MALAYSIA"
   * 'compact': The iconic tall orange N + IBM mark without the bottom subtitle
   * 'badge': Square/rounded icon mark suitable for avatars or tight spaces
   */
  variant?: 'full' | 'compact' | 'badge';
  className?: string;
  showSubtitle?: boolean;
  title?: string;
}

export const NIBMLogo: React.FC<NIBMLogoProps> = ({
  variant = 'full',
  className = '',
  showSubtitle = true,
  title = 'National Institutes of Biotechnology Malaysia (NIBM)',
}) => {
  if (variant === 'badge') {
    return (
      <svg
        viewBox="0 0 256 256"
        className={`w-auto shrink-0 select-none ${className}`}
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <rect width="256" height="256" rx="48" fill="#FFFFFF" stroke="#F1F3F5" strokeWidth="4" />
        <g style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Times New Roman', serif", fontWeight: 900 }}>
          <text x="14" y="206" fontSize="195" fill="#EB5B24">N</text>
          <text x="140" y="206" fontSize="104" fill="#EB5B24">IBM</text>
        </g>
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <svg
        viewBox="0 0 340 180"
        className={`w-auto shrink-0 select-none ${className}`}
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <g style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Times New Roman', serif", fontWeight: 800 }}>
          <text x="8" y="160" fontSize="190" fill="#EB5B24">N</text>
          <text x="156" y="160" fontSize="102" fill="#EB5B24" letterSpacing="2px">IBM</text>
        </g>
      </svg>
    );
  }

  // Default 'full' variant
  return (
    <svg
      viewBox="0 0 540 270"
      className={`w-auto shrink-0 select-none ${className}`}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Times New Roman', serif" }}>
        {/* Tall N */}
        <text x="16" y="215" fontSize="236" fontWeight="800" fill="#EB5B24">
          N
        </text>

        {/* Baseline-aligned IBM */}
        <text x="195" y="215" fontSize="128" fontWeight="800" fill="#EB5B24" letterSpacing="2px">
          IBM
        </text>

        {/* Subtitle text */}
        {showSubtitle && (
          <text
            x="14"
            y="254"
            fontSize="15"
            fontWeight="700"
            fill="#000000"
            textLength="512"
            lengthAdjust="spacing"
          >
            NATIONAL INSTITUTES OF BIOTECHNOLOGY MALAYSIA
          </text>
        )}
      </g>
    </svg>
  );
};
