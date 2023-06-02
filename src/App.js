import React, { Suspense, useState } from 'react';

import './style.css';
import { AssetSceneContext } from './AssetSceneContext';
import { Canvas } from '@react-three/fiber';
import AssetScene from './AssetScene';
import Sidebar from './Sidebar';


function App() {
  return (
    <>
      <Suspense fallback={null}>
        <AssetScene />
      </Suspense>
    </>
  );
}

export default App;
