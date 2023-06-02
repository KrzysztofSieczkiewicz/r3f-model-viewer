import React, { useState } from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Asset } from './Asset';
import { Light } from './Light';
import { AssetSceneContext } from './AssetSceneContext';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';

function AssetScene() {
  const [lights, setLights] = useState([Light]);
  console.log(lights);
  const [lightIntensity, setLightIntensity] = useState(0.1);

  function addLight(light) {
    setLights([...lights, light]);
  }
  function removeLight(light) {
    setLights(lights.filter((l) => l !== light));
  }
  function updateLight(light) {
    console.log(light);
  }

  return (
    <AssetSceneContext.Provider value={{lightIntensity, setLightIntensity}}>
      <Canvas shadows>
        <color args={[0, 0, 0]} attach="background" />
        <OrbitControls target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>
        <Light />
        <Light />
        <Asset />
      </Canvas>
      <Sidebar />
    </AssetSceneContext.Provider>
  );
}

export default AssetScene;