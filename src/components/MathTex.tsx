import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathTexProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathTex: React.FC<MathTexProps> = ({ math, displayMode = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode,
          throwOnError: false,
          output: 'htmlAndMathml',
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
        containerRef.current.innerText = math;
      }
    }
  }, [math, displayMode]);

  return <span ref={containerRef} className={`inline-block ${className}`} />;
};
