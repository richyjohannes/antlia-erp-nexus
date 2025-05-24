
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ColorScheme {
  primary: string;
  secondary: string;
  gradientStart: string;
  gradientMiddle: string;
  gradientEnd: string;
}

interface ColorContextType {
  colors: ColorScheme;
  updateColors: (newColors: Partial<ColorScheme>) => void;
  resetColors: () => void;
}

const defaultColors: ColorScheme = {
  primary: '#38b6ff',
  secondary: '#f7f8fa',
  gradientStart: '#05b2fd',
  gradientMiddle: '#6f42c1',
  gradientEnd: '#e17a9'
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem('antlia-colors');
    return saved ? JSON.parse(saved) : defaultColors;
  });

  const updateColors = (newColors: Partial<ColorScheme>) => {
    setColors(prev => ({ ...prev, ...newColors }));
  };

  const resetColors = () => {
    setColors(defaultColors);
  };

  useEffect(() => {
    localStorage.setItem('antlia-colors', JSON.stringify(colors));
    
    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--gradient-start', colors.gradientStart);
    root.style.setProperty('--gradient-middle', colors.gradientMiddle);
    root.style.setProperty('--gradient-end', colors.gradientEnd);
  }, [colors]);

  return (
    <ColorContext.Provider value={{ colors, updateColors, resetColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
};
