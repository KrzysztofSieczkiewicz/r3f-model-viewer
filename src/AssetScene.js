import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Asset } from './Asset';
import { Lights } from './Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import SidebarControlsContext from './components/sidebar/SidebarControlsContext.js'

const defaultLight = {
  type: "pointLight",
  position:[5,5,0],
  color: "white",
  intensity: 1,
  angle: 0.6,
  penumbra: 0.6,
  visible: true
}

const defaultAsset = {
  id: 0,
  nameId: "pear",
  variant: 0,
  position:[0,0,0],
  scale: [10,10,10],
  rotation: [0,0,0],
  castShadow: true,
  visible: true,
  path: "models/pear/Pear2_LOD0.gltf"
}

function AssetScene() {

  /* LIGHTS */
  const [lightsList, setLightsList] = useState([{
    id:0,
    position:[5,5,0],
    color: "#f53259",
    intensity:1,
    angle: 0.6,
    penumbra: 0.6,
    type:"spotLight",
    visible: true
  },
  {
    id:1,
    position:[-5,5,-5],
    color:"#33dcfa",
    intensity:1,
    type:"pointLight",
    visible: true
  }]);

  function addLight() {
    let light = {...defaultLight};
    light.id = nanoid(5);

    setLightsList([...lightsList, light]);
  }

  function removeLight(id) {
    setLightsList((current) =>
      current.filter((light) => light.id !== id)
    );
  }

  function updateLight(id, property, value) {
    let newLightsList = [...lightsList];

    newLightsList[id] = {
      ...newLightsList[id],
      [property]: value
    }

    setLightsList(newLightsList);
    console.log(lightsList[id])
  }

  /* ASSETS */
  const [assetsList, setAssetsList] = useState(
    [defaultAsset]
    );

  function updateAsset(id, asset) {
    let newAssetsList = [...assetsList];
    newAssetsList[id] = asset;

    setAssetsList(newAssetsList);
    console.log(assetsList[id]);
  }

  return (
    <>
      <Canvas shadows>
        <color args={[0, 0, 0]} attach="background" />
        <OrbitControls target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>
        <Lights lightsList={lightsList}/>
        <Asset />
      </Canvas>
      <SidebarControlsContext.Provider value={{ lightsList, updateLight, assetsList, updateAsset }}>
        <Sidebar lightsList={lightsList} addLight={addLight} removeLight={removeLight} />
      </SidebarControlsContext.Provider>
    </>
  );
}

export default AssetScene;