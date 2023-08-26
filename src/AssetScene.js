import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Lights } from './Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import SidebarControlsContext from './components/sidebar/SidebarControlsContext.js';
import { defaultLight, lightTypes } from './models/LightModel';
import { defaultAsset } from './models/AssetModel';
import { Assets } from './Assets';

function AssetScene() {

  /* LIGHTS */
  const [lightsList, setLightsList] = useState([{
    id:0,
    position:[5,5,0],
    rotation:[0,0,0],
    color: "#f53259",
    intensity:1,
    angle: 0.1,
    penumbra: 0.6,
    type:"spotLight",
    visible: true
  },
  {
    id:1,
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
    let newLightsList = [...lightsList];

    newLightsList[id] = {
      ...newLightsList[id],
      [property]: value
    }

    setLightsList(newLightsList);
    console.log(lightsList[id])
  }

  /* ASSETS */
  const [assetsList, setAssetsList] = useState([
      defaultAsset
    ]);

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

        <Assets assetsList={assetsList} />
      </Canvas>
      <SidebarControlsContext.Provider value={{ lightsList, updateLight, lightTypes, 
        assetsList, updateAsset }}
      >
        <Sidebar addLight={addLight} removeLight={removeLight} />
      </SidebarControlsContext.Provider>
    </>
  );
}

export default AssetScene;