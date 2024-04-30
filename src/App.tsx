import React, { Suspense } from 'react';

import './App.module.css';
import {AssetScene} from './AssetScene';
import { SidebarControlsContextProvider } from './components/contexts/SidebarControlsContext';
import { SceneObjectsContextProvider } from './components/contexts/SceneObjectsContext';
import { EffectsContextProvider } from './components/contexts/EffectsContext';

export const App = (): JSX.Element => {
  return (
    <>
      <EffectsContextProvider>
      <SidebarControlsContextProvider>
      <SceneObjectsContextProvider>
        <Suspense fallback={null}>
          <AssetScene />
        </Suspense>
      </SceneObjectsContextProvider>
      </SidebarControlsContextProvider>
      </EffectsContextProvider>
    </>
  );
}