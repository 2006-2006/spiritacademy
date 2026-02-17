import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = "", 
  as: Component = 'span' 
}) => {
  return (
    <Component 
      className={`glitch-text font-bold tracking-widest uppercase ${className}`} 
      data-text={text}
    >
      {text}
    </Component>
  );
};
