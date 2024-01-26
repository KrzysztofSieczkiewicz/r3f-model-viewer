import { useState } from 'react';

import { nanoid } from 'nanoid';
import { Euler, PointLight, SpotLight, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { SidebarControlsContext } from './components/sidebar/SidebarControlsContext';
import { AssetWrapper } from './interfaces/asset.model';
import { LightWrapper } from './interfaces/light.model';
import Lights from './Lights';
import Assets from './Assets';
import { SceneWrapper } from './interfaces/scene.model';
import Sidebar from './Sidebar';


function AssetScene() {

  const [lightsList, setLightsList] = useState<LightWrapper[]>([
    {
      id: nanoid(5),
      position: new Vector3(5, 5, 0),
      rotation: new Euler(Math.PI * 0.5, Math.PI * 0.5, 0),
      color: "#f53259",
      intensity: 1,
      angle: 0.1,
      penumbra: 0.6,
      type: SpotLight,
      visible: true
    },
    {
      id: nanoid(5),
      position: new Vector3(-5, 5, -5),
      rotation: new Euler(0, 0, 0),
      color: "#33dcfa",
      intensity: 1,
      angle: 0.1,
      penumbra: 0.6,
      type: PointLight,
      visible: true
    }
  ]);

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

  const [scene, setScene] = useState<SceneWrapper>({
    backgroundColor: "#262626",
      ambientLight: {
          color: "#ffffff",
          intensity: 0.1
      }
  })

  return (
    <>
      <Canvas 
        shadows
        style= {{ background: scene.backgroundColor }}
      >
        <OrbitControls makeDefault target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <Lights lightsList={lightsList} />
        <Assets assetsList={assetsList} />

      </Canvas>
      
      <SidebarControlsContext.Provider value={{ 
        lightsList, setLightsList, 
        assetsList, setAssetsList,
        scene, setScene
      }}>
        <Sidebar/>
      </SidebarControlsContext.Provider>
    </>
  );
}

export default AssetScene;