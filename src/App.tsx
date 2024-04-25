import React, { Suspense } from 'react';

import './App.module.css';
import {AssetScene} from './AssetScene';
import { SidebarControlsContextProvider } from './components/sidebar/SidebarControlsContext';
import { SceneObjectsContextProvider } from './components/sidebar/SceneObjectsContext';

export const App = (): JSX.Element => {
  return (
    <>
      <SceneObjectsContextProvider>
      <SidebarControlsContextProvider>
        <Suspense fallback={null}>
          <AssetScene />
        </Suspense>
      </SidebarControlsContextProvider>
      </SceneObjectsContextProvider>
    </>
  );
}