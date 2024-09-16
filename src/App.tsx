import React, { Suspense } from 'react';

import './App.module.css';
import {AssetScene} from './AssetScene';
import { SceneObjectsContextProvider } from './components/contexts/SceneObjectsContext';
import { EffectsContextProvider } from './components/contexts/EffectsContext';
import { SceneContextProvider } from './components/contexts/SceneContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';;

const queryClient = new QueryClient();

export const App = (): JSX.Element => {
  return (
    <>
      <QueryClientProvider 
      client={queryClient} >

        <SceneContextProvider>
        <EffectsContextProvider>
        <SceneObjectsContextProvider>

          <Suspense fallback={null}>
            <AssetScene />
          </Suspense>

        </SceneObjectsContextProvider> 
        </EffectsContextProvider>
        </SceneContextProvider>

        {/* Devtools for React Query */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}