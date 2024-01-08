import React, { useEffect, useState } from 'react';

import { LightsService } from './services/lights.service';
import { LightWrapper } from './interfaces/light.model';

import { nanoid } from 'nanoid';
import THREE, { Euler, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { SidebarControlsContext } from './components/sidebar/SidebarControlsContext';
import { AssetWrapper } from './interfaces/asset.model';


function AssetScene() {
  /* LIGHTS */
  const [lightsList, setLightsList] = useState<LightWrapper[]>([
    {
      id: nanoid(5),
      position: new Vector3(5, 5, 0),
      rotation: new Euler(Math.PI * 0.5, Math.PI * 0.5, 0),
      color: "#f53259",
      intensity: 1,
      angle: 0.1,
      penumbra: 0.6,
      type: THREE.SpotLight,
      visible: true
    },
    {
      id: nanoid(5),
      position: new Vector3(-5, 5, -5),
      rotation: new Euler(0, 0, 0),
      color: "#33dcfa",
      intensity: 1,
      type: THREE.PointLight,
      visible: true
    }
]);

  /* ASSETS */
  const [assetsList, setAssetsList] = useState<AssetWrapper[]>([
    {
      id: nanoid(5),
      name: "pear",
      object: "toBeReplaced",
      position: new Vector3(0,0,0),
      rotation: new Euler(0,0,0),
      scale: new Vector3(10,10,10),
      castShadow: true,
      receiveShadow: true,
      visible: true,
    },{
      id: nanoid(5),
      name: "pear",
      object: "toBeReplaced",
      position: new Vector3(1,0,1),
      rotation: new Euler(0,90,0),
      scale: new Vector3(10,10,10),
      castShadow: true,
      receiveShadow: true,
      visible: true,
    }
  ]);

  return (
    <>
      <Canvas 
        shadows
        style= {{ background: scene.backgroundColor }}
      >
        <ambientLight color={scene.ambientLight.color} intensity={scene.ambientLight.intensity} />

        <OrbitControls makeDefault target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <Lights lightsList={lightsList} />
        <Assets assetsList={assetsList} updateSelected={updateSelected} />

      </Canvas>
      
      <SidebarControlsContext.Provider value={{ 
        lightsList, LightsService.updateLight, 
        assetsList, updateAssetProperty,
        scene, updateScene
      }}>
        <Sidebar/>
      </SidebarControlsContext.Provider>
    </>
  );
}

export default AssetScene;