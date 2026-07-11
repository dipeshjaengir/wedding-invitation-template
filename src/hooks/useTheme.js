import { useEffect } from 'react';
import { applyTheme } from '../utils/themes';

export const useTheme = (themeName) => {
  useEffect(() => {
    if (!themeName) return;
    applyTheme(themeName);
  }, [themeName]);
};
