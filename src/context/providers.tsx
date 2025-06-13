'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/layout/header';
import Footer from '@/layout/footer';

interface IProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<IProvidersProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname === '/login' ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
};

export default Providers;
