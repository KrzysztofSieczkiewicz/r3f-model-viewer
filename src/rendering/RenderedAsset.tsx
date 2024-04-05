import * as THREE from "three";
import { useGLTF, useHelper } from "@react-three/drei";
import { PivotControls } from "@react-three/drei/web/pivotControls";
import { useEffect, useRef } from "react";
import { BoxHelper, Group, Mesh, Object3DEventMap } from "three/src/Three";
import { AssetWrapper } from "../models/Asset";
import React from "react";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {
    asset: AssetWrapper,
    isSelected: boolean,
}

type GLTFResult = GLTF & {
    nodes: {
      [key: string]: THREE.Mesh;
    };
  };

// TODO: Consider PivotControls vs TransformControls (or maybe add a way to toggle them)
export const RenderedAsset = ( {asset, isSelected}: Props) => {
    const { updateAssetProperty, updateSelected } = useSidebarControlsContext();

    let meshRef = useRef<Mesh>(null);
    const controlsRef = useRef<Group<Object3DEventMap>>(null)

    // TODO: NOW I HAVE MY 'isSelected'. HOW TO CONDITIONALLY PROVIDE REF TO THE HELPER?
    useHelper(meshRef as any, BoxHelper, 'cyan')
    
    
    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as unknown as GLTFResult;


    const handleControlsDrag = () => {
        const controlsPosition = controlsRef.current?.getWorldPosition(new THREE.Vector3);
        //const controlsRotation = controlsRef.current?.getWorldQuaternion(new THREE.Quaternion)

        updateAssetProperty(asset.id, 'position', [controlsPosition?.x, controlsPosition?.y, controlsPosition?.z])
        //updateAssetProperty(asset.id, 'rotation', [controlsRotation?.x, controlsRotation?.y, controlsRotation?.z])        
    }

    const handleAssetSelected = () => {
        // TRIGGER PROPER SELECT FUNCTION (PROBABLY PASSED VIA SidebarControlsContext)
        // IF ASSET IS SELECTED, DISPLAY THE BoxHelper
    }

    const handleAssetHovered = () => {
        // DISPLAY SUBTLE BoxHelper
    }

    const handleDragEnd = () => {
        const controlsPosition = controlsRef.current?.getWorldPosition(new THREE.Vector3);

        updateAssetProperty(asset.id, 'position', [controlsPosition?.x, controlsPosition?.y, controlsPosition?.z])
    }
        
    useEffect( () => {
        controlsRef.current?.position.set(...asset.position)
        controlsRef.current?.matrixWorld.setPosition(new THREE.Vector3(...asset.position))
    }, [asset.position])

    if(!asset.visible) return;

    // TODO [TUTORING]: WHEN CONTROLS ARE DRAGGED DYNAMICALLY AND MOUSE BUTTON IS RELEASED CONTROLS MOVE A BIT FURTHER THAT THE MODEL ITSELF
    // IT'LL JUMP BACK INTO POSITION WHEN ANOTHER DRAG IS INITIATED
    // BUT EVEN onDragEnd CANNOT FIX THAT
    // HOW TO KEEP TRACK OF THAT?
    return (
        <group
                key={asset.id} 
                position={asset.position}
        >
            <PivotControls
                offset={[0,0,0]}
                onDrag={ () => { handleControlsDrag() }}
                onDragEnd={ () => { handleDragEnd() }}
                ref={controlsRef}
                visible={true}
                depthTest={false}
            />
            <mesh
                matrixWorldAutoUpdate={true}
                ref={meshRef}
                onPointerOver={() => {
                    //console.log("Pointer moved over the mesh")
                }}
                onPointerOut={() => {
                    //console.log("Pointer removed from mesh")
                }}
                onClick={() => {
                    updateSelected(asset.id);
                    console.log(isSelected)
                }} 
                castShadow = {asset.castShadow}
                receiveShadow = {asset.receiveShadow}
                geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry} // TODO: Still to be parametrized
                material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material} // TODO: As above
                position={[0,0,0]}
                rotation={asset.rotation}
                scale={asset.scale}
            />
        </group>
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");