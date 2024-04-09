import React, { useState } from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Lights } from './rendering/Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import { useSidebarControlsContext } from './components/sidebar/SidebarControlsContext';
import { Assets } from './rendering/Assets';

import { Selection } from "@react-three/postprocessing";
// import { Bloom, ChromaticAberration, DepthOfField, EffectComposer, Outline } from '@react-three/postprocessing';
// import { BlendFunction } from 'postprocessing';

export const AssetScene = () => {

  const { scene, lightsList, assetsList } = useSidebarControlsContext();

  return (
    <>
      <Canvas shadows
        style= {{ background: scene.backgroundColor }}
      >
        <ambientLight color={scene.ambientLight.color} intensity={scene.ambientLight.intensity} />

        <OrbitControls makeDefault target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <Selection>
          <Lights lightsList={lightsList} />
          <Assets assetsList={assetsList}/>
        </Selection>        

      </Canvas>
      
      <Sidebar />
    </>
  );
}

/*
<EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="red" edgeStrength={100} />
          <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={400} />
          <Bloom 
            blendFunction={BlendFunction.ADD}
            intensity={0}
            width={300}
            height={300}
            kernelSize={5}
            luminanceThreshold={0.15}
            luminanceSmooting={0.025}
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL}
            intensity={0}
            offset={[0.0005, 0.00012]}
          />
        </EffectComposer>
*/