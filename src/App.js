import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import './style.css';
import AssetScene from './AssetScene';
import { Sidebar } from './Sidebar';

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <AssetScene />
      </Canvas>
      <Sidebar />
    </Suspense>
  );
}

export default App;
