import React from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Lights } from './rendering/lights/Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './components/sidebar/Sidebar';
import { useSidebarControlsContext } from './components/sidebar/SidebarControlsContext';
import { Assets } from './rendering/assets/Assets';
import { Selection } from "@react-three/postprocessing";
import { Effects } from './rendering/effects/Effects';

export const AssetScene = () => {
  const { scene, lightsList, assetsList, effectsList } = useSidebarControlsContext();

  return (
    <>
      <Canvas shadows
        style= {{ background: scene.backgroundColor }}
        frameloop="demand"
      >
        <ambientLight color={scene.ambientLight.color} intensity={scene.ambientLight.intensity} />

        <OrbitControls makeDefault target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <Selection>
          <Lights lightsList={lightsList} />
          <Assets assetsList={assetsList} />
        </Selection>

        <Effects effectsList={effectsList} />

      </Canvas>
      
      <Sidebar />
    </>
  );
}