import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import './style.css';
import AssetShow from './AssetShow';
import { Sidebar } from './Sidebar';

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <AssetShow />
      </Canvas>
      <Sidebar />
    </Suspense>
  );
}

export default App;
