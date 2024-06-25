import React, { useRef } from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Lights } from './components/canvas/lights/Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './components/sidebar/Sidebar';
import { Assets } from './components/canvas/assets/Assets';
import { Effects } from './components/canvas/effects/Effects';
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';
import { CameraTracker } from './components/canvas/scene/CameraTracker';
import { AmbientLight } from './components/canvas/scene/AmbientLight';
import { useSceneValue } from './components/contexts/SceneContext';
import { Cameras } from './components/canvas/cameras/Cameras';
import { RenderedPrimitive } from './components/canvas/assets/RenderedPrimitive';

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

        <RenderedPrimitive />

        <Effects />
      </Canvas>
      
      <Sidebar />
    </>
  );
}