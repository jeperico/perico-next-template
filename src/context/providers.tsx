'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import { Toaster } from '@/components/ui/sonner';

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
