import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Asset } from './Asset';
import { Lights } from './Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import SidebarControlsContext from './components/SidebarControlsContext.js'

const defaultLight = {
  type: "pointLight",
  position:[5,5,0],
  color: "white",
  intensity: 1,
  angle: 0.6,
  penumbra: 0.6
}

function AssetScene() {
  const [lightsList, setLightsList] = useState([{
    id:0,
    position:[5,5,0],
    color: "#f53259",
    intensity:1,
    angle: 0.6,
    penumbra: 0.6,
    type:"spotLight"
  },
  {
    id:1,
    position:[-5,5,-5],
    color:"#33dcfa",
    intensity:1,
    type:"pointLight"
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

  function updateLight(id, light) {
    let newLightsList = [...lightsList];
    newLightsList[id] = light;

    setLightsList(newLightsList);
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
      <SidebarControlsContext.Provider value={{ updateLight }}>
        <Sidebar lightsList={lightsList} addLight={addLight} removeLight={removeLight} />
      </SidebarControlsContext.Provider>
    </>
  );
}

export default AssetScene;