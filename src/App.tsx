import React, { Suspense } from 'react';

import './style.css';
import {AssetScene} from './AssetScene';
import { SidebarControlsContextProvider } from './components/sidebar/SidebarControlsContext';


export const App = (): JSX.Element => {
  return (
    <>
      <SidebarControlsContextProvider>
        <Suspense fallback={null}>
          <AssetScene />
        </Suspense>
      </SidebarControlsContextProvider>
    </>
  );
}