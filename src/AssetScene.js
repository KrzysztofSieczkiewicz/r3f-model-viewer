import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Lights } from './Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import SidebarControlsContext from './components/sidebar/SidebarControlsContext.js';
import { defaultLight, lightTypes } from './models/LightModel';
import { Assets } from './Assets';
import { defaultScene } from './models/SceneModel';

import { Select, Selection } from "@react-three/postprocessing";
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer, Outline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

function AssetScene() {

  /* LIGHTS */
  const [lightsList, setLightsList] = useState([{
    id:nanoid(5),
    position:[5,5,0],
    rotation:[Math.PI * 0.5, Math.PI * 0.5, 0],
    color: "#f53259",
    intensity:1,
    angle: 0.1,
    penumbra: 0.6,
    type:"spotLight",
    visible: true
  },{
    id:nanoid(5),
    position:[-5,5,-5],
    rotation:[0,0,0],
    color:"#33dcfa",
    intensity:1,
    type:"pointLight",
    visible: true
  }]);

    //TODO => move functions to their respective models -> then You can create unique nanoId upon calling addLight()
  function addLight() {
    let light = {...defaultLight};

    setLightsList([...lightsList, light]);
  }

  function removeLight(id) {
    setLightsList((current) =>
      current.filter((light) => light.id !== id)
    );
  }

  function updateLight(id, property, value) {
    const index = lightsList.findIndex(light => light.id === id);
    const newLight = {
      ...lightsList[index],
      [property]: value
    };

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

  function updateAsset(id, property, value) {
    const index = assetsList.findIndex(asset => asset.id === id);
    const newAsset = {
      ...assetsList[index],
      [property]: value
    };

    if (newAsset[property] !== assetsList[index][property]) {
      const newAssetsList = [...assetsList];
      newAssetsList[index] = newAsset;

      setAssetsList(newAssetsList);
    }
  }


  /* SCENE */
  const [ scene, setScene ] = useState(defaultScene); 
  
  function updateScene(property, value) {
    const updateNested = (obj, keys, value) => {
      if (keys.length === 1) {
        obj[keys[0]] = value;
      } else {
        const key = keys.shift();
        updateNested(obj[key], keys, value);
      }
    };

    const keys = property.split('.');
    const updatedScene = { ...scene };
    updateNested(updatedScene, keys, value);

    setScene({
      ...scene,
      [property]: value
    });
    console.log(scene)
  }

  // SELECTION
  const [ selected, setSelected ] = useState(null);

  // should I store selected object id or set single object property to selected
  function handleSelected(selectedObject) {
    setSelected(selectedObject);
    console.log(selectedObject);
    // Recognize what type of object was selected
    //
  }

  return (
    <>
      <Canvas shadows
        style= {{ background: scene.backgroundColor }}
      >
        <ambientLight color={scene.ambientLight.color} intensity={scene.ambientLight.intensity} />

        <OrbitControls target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <Selection>
          <Lights lightsList={lightsList} />
          <Assets assetsList={assetsList} handleSelected={handleSelected} />

          <Select enabled={true}>
                    <mesh onPointerOver={() => console.log("test on")} onPointerOut={() => console.log("test off")}>
                        <boxGeometry />
                        <meshStandardMaterial color="orange" />
                    </mesh>
          </Select>
        </Selection>

        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="red" edgeStrength={100} />
          <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={400} />
          <Bloom 
            blendFunction={BlendFunction.ADD}
            intensity={0.3}
            width={300}
            height={300}
            kernelSize={5}
            luminanceThreshold={0.15}
            luminanceSmooting={0.025}
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.00012]}
          />
        </EffectComposer>

      </Canvas>
      
      <SidebarControlsContext.Provider value={{ lightsList, updateLight, lightTypes, 
        assetsList, updateAsset,
        scene, updateScene
      }}
      >
        <Sidebar addLight={addLight} removeLight={removeLight} />
      </SidebarControlsContext.Provider>
    </>
  );
}

export default AssetScene;