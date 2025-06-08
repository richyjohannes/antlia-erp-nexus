
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('antlia-theme-mode');
    return (saved as ThemeMode) || 'light';
  });

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isDark = mode === 'dark';

  useEffect(() => {
    localStorage.setItem('antlia-theme-mode', mode);
    
    // Update CSS variables based on theme
    const root = document.documentElement;
    
    if (mode === 'dark') {
      // Dark theme colors
      root.style.setProperty('--theme-header-bg', 'linear-gradient(135deg, #0d171c, #204855, #a8aaff)');
      root.style.setProperty('--theme-sidebar-bg', 'linear-gradient(135deg, #0d171c, #204855, #a8aaff)');
      root.style.setProperty('--theme-card-header-bg', 'linear-gradient(135deg, #0d171c, #204855, #a8aaff)');
      root.style.setProperty('--theme-text-primary', '#ffffff');
      root.style.setProperty('--theme-bg-main', '#0f172a');
      root.style.setProperty('--theme-card-bg', '#1e293b');
      root.style.setProperty('--theme-border', '#334155');
    } else {
      // Light theme colors
      root.style.setProperty('--theme-header-bg', '#05b2fd');
      root.style.setProperty('--theme-sidebar-bg', '#05b2fd');
      root.style.setProperty('--theme-card-header-bg', '#05b2fd');
      root.style.setProperty('--theme-text-primary', '#1f2937');
      root.style.setProperty('--theme-bg-main', '#f9fafb');
      root.style.setProperty('--theme-card-bg', '#ffffff');
      root.style.setProperty('--theme-border', '#e5e7eb');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
