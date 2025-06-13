'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import doLogin from '@/services/auth/doLogin';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';

const loginFormSchema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  password: z.string().nonempty('Senha é obrigatória'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const router: AppRouterInstance = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormSchema) => {
    const status = await doLogin(data, router);

    if (status === 401) {
      form.setError('password', {
        type: 'manual',
        message: 'Email ou senha inválidos',
      });
      form.setValue('password', '');
      form.setFocus('password');

      toast.warning('Erro de autenticação', {
        description: () => (
          <p className="text-zinc-400">Email ou senha inválidos</p>
        ),
        position: 'bottom-center',
        duration: 5000,
        action: {
          label: 'Fechar',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    } else if (status === 500) {
      form.setError('password', {
        type: 'manual',
        message: 'Erro interno do servidor',
      });

      toast.warning('Erro interno', {
        description: () => (
          <p className="text-zinc-400">Erro ao tentar conectar ao servidor</p>
        ),
        position: 'bottom-center',
        duration: 5000,
        action: {
          label: 'Fechar',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    } else if (status === 200) {
      toast.success('Usuário logado com sucesso!', {
        duration: 5000,
        action: {
          label: 'Fechar',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    } else {
      form.setError('password', {
        type: 'manual',
        message: 'Erro desconhecido',
      });
      toast.warning('Erro desconhecido', {
        position: 'bottom-center',
        duration: 5000,
        action: {
          label: 'Fechar',
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Insira seu email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Insira sua senha"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
