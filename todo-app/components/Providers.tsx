'use client';

import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Toaster } from './ui/toaster';

const queryClient = new QueryClient();

const Providers = (props: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <Toaster />
    </QueryClientProvider>
  )
}

export default Providers