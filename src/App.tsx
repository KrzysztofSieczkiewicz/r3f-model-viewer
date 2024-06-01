import React, { Suspense } from 'react';

import './App.module.css';
import {AssetScene} from './AssetScene';
import { SidebarControlsContextProvider } from './components/contexts/SidebarControlsContext';
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
      <SidebarControlsContextProvider>
      <SceneObjectsContextProvider>
        <Suspense fallback={null}>
          <AssetScene />
        </Suspense>
      </SceneObjectsContextProvider>
      </SidebarControlsContextProvider>
      </EffectsContextProvider>
      </CamerasContextProvider>
      </SceneContextProvider>
    </>
  );
}