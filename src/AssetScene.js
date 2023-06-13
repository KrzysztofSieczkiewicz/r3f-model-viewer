import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Asset } from './Asset';
import { Lights } from './components/Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';

const defaultLight = {
  type: "pointLight",
  position:[5,5,0],
  color: [0,1,1],
  intensity: 1,
  angle: 0.6,
  penumbra: 0.6
}

function AssetScene() {
  const [lightsList, setLightsList] = useState([{
    ref:1,
    position:[5,5,0],
    color:[1,1,1],
    intensity:1,
    angle: 0.6,
    penumbra: 0.6,
    type:"spotLight"
  },
  {
    ref:2,
    position:[-5,5,-5],
    color:[1,0,1],
    intensity:1,
    type:"pointLight"
  }]);

  // Consider moving functions for lights, assets etc to their respective helpers
  function addLight() {
    const light = defaultLight;
    light.id = nanoid(4);

    setLightsList([...lightsList, light]);
  }

  function removeLight(id) {
      setLightsList(lightsList.current.filter(light => light.id !== id));
  }

  function updateLight(id, light) {
      setLightsList((lightsList) => {
          const newLightsList = [...lightsList];
          newLightsList[id] = light;
      });
  }

  let newLight = defaultLight;
  newLight.color = [0,1,1];
  newLight.position = [-5,5,0];

  return (
    <>
      <Canvas shadows>
        <color args={[0, 0, 0]} attach="background" />
        <OrbitControls target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>
        <Lights lightsList={lightsList}/>
        <Asset />
      </Canvas>
      <Sidebar lightsList={lightsList} addLight={addLight} updateLight={updateLight}/>
    </>
  );
}

export default AssetScene;