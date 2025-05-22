// packages/design-system/src/components/Text/H1.tsx
import React from 'react';
import clsx from 'clsx';

export type H1Props = {
  children: React.ReactNode;
  textColorClass?: string;
  className?: string;
};

export const H1: React.FC<H1Props> = ({
  children,
  textColorClass = 'text-text_primary',
  className,
}) => (
  <h1
    className={clsx(
      'font-heading text-h1 font-bold', // base styles from your tailwind tokens
      textColorClass,
      className
    )}
  >
    {children}
  </h1>
);
