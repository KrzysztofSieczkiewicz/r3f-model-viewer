import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Lights } from './Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import SidebarControlsContext from './components/sidebar/SidebarControlsContext.js';
import { defaultLight, lightTypes } from './models/LightModel.js';
import { Assets } from './Assets';
import { defaultScene } from './models/SceneModel';

import { Selection } from "@react-three/postprocessing";
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer, Outline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

function AssetScene() {
  //TODO: create a common list of all objects (lights/assets/cameras?) that stores their type, and id.
  // when some list is updated, common list should be refreshed using useEffect().
  // When any object is selected in the canvas it should be selected both for viewport and sidebar?
  // Does this make any sense?
  // ALTERNATIVELY: only a list of selected objects, add objectType property to the other lists to communicate with that


  // TODO: move all useStates to the top,
  // move functions to separate files
  const [ selectedList, setSelectedList ] = useState([]);

  function updateSelected(objectId) {
    setSelectedList(objectId);
    // SET PROVIDED OBJECT ID AS THE ONLY SELECTED OBJECT
    console.log(objectId);
    // IF SHIFT KEY WAS PRESSED, ADD IT TO THE LIST INSTEAD
  }

  /* LIGHTS */
  const [lightsList, setLightsList] = useState([
    {
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

    //TODO => move functions to their respective models -> then You can create unique nanoId by calling addLight()
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

  // replace with updateAssetById => no point in separating properties when it's just creating new asset later on
  function updateAssetProperty(id, property, value) {
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

  // replace with updateAssetOnIndex()
  function updateAsset(index, asset) {
    const newAssetsList = [...assetsList];
    newAssetsList[index] = asset;
    setAssetsList(newAssetsList);
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
  const [ selectedID, setSelectedID ] = useState(null);

  function handleSelected(newID) {
    const prevIndex = assetsList.findIndex(asset => asset.id === selectedID);
    const index = assetsList.findIndex(asset => asset.id === newID);
    const asset = assetsList[index];

    if(newID === selectedID || 
       newID === undefined) {
      if (asset?.isSelected) { // UNSELECT
        const {isSelected, ...rest} = asset;
        updateAsset(index, rest);
        setSelectedID(null);
        //console.log("I unsnpelected current selection: " + newID);
      }
    }
    else {
      // UNSELECT CURRENT
      const {isSelected, ...rest} = asset;
      updateAsset(prevIndex, rest);

      // SELECT NEW
      updateAsset(index, {...asset, isSelected: true});
      setSelectedID(newID);
    }
  }

  // TODO: JUST FOR LOGGING PURPOSES
  useEffect(() => {
    console.log("Currently selected id:  " + selectedID);
}, [selectedID]);

  return (
    <>
      <Canvas 
        shadows
        style= {{ background: scene.backgroundColor }}
      >
        <ambientLight color={scene.ambientLight.color} intensity={scene.ambientLight.intensity} />

        <OrbitControls makeDefault target={[0, 0.32, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <Selection>
          <Lights lightsList={lightsList} />
          <Assets assetsList={assetsList} updateSelected={updateSelected} />
        </Selection>        

      </Canvas>
      
      <SidebarControlsContext.Provider value={{ lightsList, updateLight, lightTypes, 
        assetsList, updateAssetProperty,
        scene, updateScene
      }}
      >
        <Sidebar addLight={addLight} removeLight={removeLight} />
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