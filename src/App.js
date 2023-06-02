import React, { Suspense, useState } from 'react';

import './style.css';
import { AssetSceneContext } from './AssetSceneContext';
import { Canvas } from '@react-three/fiber';
import AssetScene from './AssetScene';
import Sidebar from './Sidebar';


function App() {
  const [lightIntensity, setLightIntensity] = useState(0.1);

  return (
    <>
      <Suspense fallback={null}>
        <AssetSceneContext.Provider value={{lightIntensity, setLightIntensity}}>
          <Canvas shadows>
            <AssetScene />
          </Canvas>
          <Sidebar />
        </AssetSceneContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
