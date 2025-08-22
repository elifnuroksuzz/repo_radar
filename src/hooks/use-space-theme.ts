import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface UseSpaceThemeReturn {
  spaceMode: 'light' | 'dark' | 'system';
  setSpaceMode: (theme: 'light' | 'dark' | 'system') => void;
  isDarkGalaxy: boolean;
  isLightGalaxy: boolean;
  toggleGalaxyMode: () => void;
  mounted: boolean;
}

export function useSpaceTheme(): UseSpaceThemeReturn {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setSpaceMode = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const toggleGalaxyMode = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return {
    spaceMode: (theme as 'light' | 'dark' | 'system') || 'system',
    setSpaceMode,
    isDarkGalaxy: resolvedTheme === 'dark',
    isLightGalaxy: resolvedTheme === 'light',
    toggleGalaxyMode,
    mounted,
  };
}