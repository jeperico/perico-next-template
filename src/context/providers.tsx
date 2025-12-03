'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { Toaster } from '@/components/ui/sonner';
import Footer from '@/layout/footer';
import Header from '@/layout/header';

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
      <Toaster />
    </>
  );
};

export default Providers;
