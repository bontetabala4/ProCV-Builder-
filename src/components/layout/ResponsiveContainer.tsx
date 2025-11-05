import React from 'react';
import { useMobile } from '../../hooks/useMobile';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  mobileView?: React.ReactNode;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  mobileView,
  className = ''
}) => {
  const isMobile = useMobile();

  if (isMobile && mobileView) {
    return <div className={className}>{mobileView}</div>;
  }

  return <div className={className}>{children}</div>;
};