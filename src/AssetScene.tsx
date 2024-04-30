import React, { memo, useRef } from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Lights } from './components/canvas/lights/Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './components/sidebar/Sidebar';
import { useSidebarControlsContext } from './components/contexts/SidebarControlsContext';
import { Assets } from './components/canvas/assets/Assets';
import { Selection } from "@react-three/postprocessing";
import { Effects } from './components/canvas/effects/Effects';
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';
import { CameraTracker } from './components/canvas/scene/CameraTracker';
import { AmbientLight } from './components/canvas/scene/AmbientLight';

export const AssetScene = () => {
  const { scene } = useSidebarControlsContext();

  const cameraRef = useRef<PerspectiveCameraType>(null);

  console.log({cameraRef: cameraRef.current?.rotation})

  return (
    <>
      <Canvas shadows
        style= {{ background: scene.backgroundColor }}
        frameloop="demand"
      >

        <AmbientLight />

        <OrbitControls makeDefault target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault ref={cameraRef} fov={50} position={[3, 2, 5]} />
        <CameraTracker cameraRef={cameraRef} />


        <Selection>
          <Lights />
          <Assets />
        </Selection>

        <Effects />

      </Canvas>
      
      <Sidebar />
    </>
  );
}