import React, { useRef } from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './features/sideMenu/components/navbar/Sidebar';
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';
import { useSceneValue } from './features/common/contexts/SceneContext';
import { AmbientLight } from './features/canvas/scene/AmbientLight';
import { CameraTracker } from './features/canvas/scene/CameraTracker';
import { Lights } from './features/canvas/lights/Lights';
import { Assets } from './features/canvas/assets/Assets';
import { Cameras } from './features/canvas/cameras/Cameras';
import { Effects } from './features/canvas/effects/Effects';

export const AssetScene = () => {
  const [ backgroundColor ] = useSceneValue((scene) => scene['backgroundColor']);

  const cameraRef = useRef<PerspectiveCameraType>(null);

  return (
    <>
      <Canvas shadows
        style= {{ background: backgroundColor }}
        frameloop="demand" >

        <AmbientLight />
        <OrbitControls makeDefault target={[0, 0.32, 0]} maxPolarAngle={1.45} enableDamping={false} />
        <PerspectiveCamera makeDefault ref={cameraRef} fov={50} position={[3, 2, 5]} />
        <CameraTracker cameraRef={cameraRef} />
        
        <Lights />
        <Assets />
        <Cameras />
        <Effects />

      </Canvas>
      
      <Sidebar />
      <div id="sidebar-modal"></div>
    </>
  );
}