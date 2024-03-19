import React, { useState } from 'react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Lights } from './Lights';
import { Canvas } from '@react-three/fiber';
import { Sidebar } from './Sidebar';
import { useSidebarControlsContext } from './components/sidebar/SidebarControlsContext';
import { Assets } from './Assets';

import { Selection } from "@react-three/postprocessing";
// import { Bloom, ChromaticAberration, DepthOfField, EffectComposer, Outline } from '@react-three/postprocessing';
// import { BlendFunction } from 'postprocessing';

export const AssetScene = () => {

  const { scene, lightsList, assetsList } = useSidebarControlsContext();

  const [ selectedList, setSelectedList ] = useState([]);

  function updateSelected(objectId: any) {
    setSelectedList(objectId);
    // SET PROVIDED OBJECT ID AS THE ONLY SELECTED OBJECT
    //console.log(objectId);
    // IF SHIFT KEY WAS PRESSED, ADD IT TO THE LIST INSTEAD

  }

/*
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
*/
  return (
    <>
        <Canvas shadows
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
      
      <Sidebar />
    </>
  );
}

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