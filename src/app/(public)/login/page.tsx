'use client';

import Image from 'next/image';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import LoginForm from './login-form';

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl font-bold text-center mb-4">
            <Image
              src="/logo/logo.png"
              className="h-full w-36"
              alt="Logo"
              width={144}
              height={48}
            />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
