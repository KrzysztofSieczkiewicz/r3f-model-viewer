import React, { Suspense } from 'react';

import './style.css';
import {AssetScene} from './AssetScene';
import { SidebarControlsContext, SidebarControlsContextProvider, useSidebarControlsContext } from './components/sidebar/SidebarControlsContext';



function App() {
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

export default App;
