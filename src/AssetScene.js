import React, { useContext } from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Asset } from './Asset';
import { Lights } from './components/Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import { AssetSceneContext } from './AssetSceneContext';

function AssetScene() {
  const lightsList = useContext(AssetSceneContext);

  return (
    <>
        <Canvas shadows>
          <color args={[0, 0, 0]} attach="background" />
          <OrbitControls target={[0, 0.32, 0]} maxPolarAngle={1.45} />
          <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>
          <Lights />
          <Asset />
        </Canvas>
        <Sidebar />
    </>
  );
}

export default AssetScene;