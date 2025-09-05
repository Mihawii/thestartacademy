'use client';

import { useTheme } from 'next-themes';
import ClickSpark from './click-spark';
import React, { useEffect, useState } from 'react';

export function ThemedClickSpark({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [sparkColor, setSparkColor] = useState('#FFFFFF');

  useEffect(() => {
    // We use useEffect to set the color after the component has mounted
    // to avoid server-client mismatch issues with the theme.
    setSparkColor(theme === 'dark' ? '#FFFFFF' : '#000000');
  }, [theme]);

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      {children}
    </ClickSpark>
  );
}
