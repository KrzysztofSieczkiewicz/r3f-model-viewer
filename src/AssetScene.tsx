import React, { useEffect, useState } from 'react';

import { LightService } from './services/light.service';
import { LightWrapper } from './interfaces/light.model';

import { nanoid } from 'nanoid';
import THREE, { Euler, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';


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

  function removeLight(id) {
    setLightsList((current) =>
      current.filter((light) => light.id !== id)
    );
  }

    if (newLight[property] !== lightsList[index][property]) {
      const newLightsList = [...lightsList];
      newLightsList[index] = newLight;
      
      setLightsList(newLightsList);
    }
  }

  /* ASSETS */
  const [assetsList, setAssetsList] = useState([
    {
      id: nanoid(5),
      name: "pear",
      object: "toBeReplaced",
      position:[0,0,0],
      rotation:[0,0,0],
      scale:[10,10,10],
      castShadow: true,
      receiveShadow: true,
      visible: true,
    },{
      id: nanoid(5),
      name: "pear",
      object: "toBeReplaced",
      position:[1,0,1],
      rotation:[0,90,0],
      scale:[10,10,10],
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
      
      <SidebarControlsContext.Provider value={{ lightsList, updateLight, 
        assetsList, updateAssetProperty,
        scene, updateScene
      }}
      >
        <Sidebar/>
      </SidebarControlsContext.Provider>
    </>
  );
}

export default AssetScene;

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