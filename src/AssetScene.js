import React from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Asset } from './Asset';
import { Light } from './Light';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';

function AssetScene() {

  return (
    <>
      <Canvas shadows>
        <color args={[0, 0, 0]} attach="background" />
        <OrbitControls target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>
        <Light />
        <Asset />
      </Canvas>
      <Sidebar />
    </>
  );
}

export default AssetScene;