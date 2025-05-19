import React from 'react';
import { Skeleton } from './skeleton';

type TitleType = 'h1' | 'h2' | 'h3' | 'h4';

interface TextProps {
  children: React.ReactNode;
  cn?: string;
  variant?: TitleType;
  isLoading?: boolean;
}

const Text: React.FC<TextProps> = ({ children, cn, variant, isLoading }) => {
  if (isLoading) {
    return <Skeleton className="h-4 w-3/5 mt-1" />;
  }
  switch (variant) {
    case 'h1':
      return <h1 className={cn}>{children}</h1>;
    case 'h2':
      return <h2 className={cn}>{children}</h2>;
    case 'h3':
      return <h3 className={cn}>{children}</h3>;
    case 'h4':
      return <h4 className={cn}>{children}</h4>;
    default:
      return <p className={cn}>{children}</p>;
  }
};

export default Text;
