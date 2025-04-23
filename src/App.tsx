import React, { Suspense } from 'react';

import './App.module.css';
import {AssetScene} from './AssetScene';
import { SceneObjectsContextProvider } from './features/common/contexts/SceneObjectsContext';
import { EffectsContextProvider } from './features/common/contexts/EffectsContext';
import { SceneContextProvider } from './features/common/contexts/SceneContext';

export const App = (): JSX.Element => {
  return (
    <>
      <SceneContextProvider>
      <EffectsContextProvider>
      <SceneObjectsContextProvider>
        <Suspense fallback={null}>
          <AssetScene />
        </Suspense>
      </SceneObjectsContextProvider> 
      </EffectsContextProvider>
      </SceneContextProvider>
    </>
  );
}