import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  return <>{isTablet && children}</>;
};

const Desktop = ({ children }) => {
  const isPc = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  return <>{isPc && children}</>;
};

export { Tablet, Desktop };
