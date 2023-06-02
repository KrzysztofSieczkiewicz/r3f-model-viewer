import React from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Asset } from './Asset';
import { Light } from './Light';

function AssetScene() {

    return (
      <>
        <OrbitControls target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>
  
        <color args={[0, 0, 0]} attach="background" />
  
        <Asset />

        <Light />
        <Light />
        <Light />
        <Light />
      </>
    );
  }

export default AssetScene;