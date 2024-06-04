import React, { Suspense } from 'react';

import './App.module.css';
import {AssetScene} from './AssetScene';
import { SceneObjectsContextProvider } from './components/contexts/SceneObjectsContext';
import { EffectsContextProvider } from './components/contexts/EffectsContext';
import { SceneContextProvider } from './components/contexts/SceneContext';
import { CamerasContextProvider } from './components/contexts/CamerasContext';

export const App = (): JSX.Element => {
  return (
    <>
      <SceneContextProvider>
      <CamerasContextProvider>
      <EffectsContextProvider>
      <SceneObjectsContextProvider>
        <Suspense fallback={null}>
          <AssetScene />
        </Suspense>
      </SceneObjectsContextProvider>
      </EffectsContextProvider>
      </CamerasContextProvider>
      </SceneContextProvider>
    </>
  );
}