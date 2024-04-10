import * as THREE from "three";
import { useGLTF, useHelper } from "@react-three/drei";
import { PivotControls } from "@react-three/drei/web/pivotControls";
import { RefObject, useEffect, useRef, useState } from "react";
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

export const RenderedAsset = ( {asset, isSelected}: Props) => {
    const { updateAssetProperty, updateSelected } = useSidebarControlsContext();

    const [ isHovered, setIsHovered ] = useState(false);

    let meshRef = useRef<Mesh>(null);
    const controlsRef = useRef<Group<Object3DEventMap>>(null)

    // TODO [TUTORING]: IS THIS HOOK A VALID APPROACH AND IS IT CORRECTLY USED?
    useBoxHelper(isSelected, isHovered, meshRef);
    
    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as unknown as GLTFResult;

    // TODO: CONSIDER REPLACING THIS WITH useFrame() hook => WHEN CONTROLS ARE DRAGGED, TRIGGER useFrame to update
    const handleControlsDrag = () => {
        const initialControlsPosition = asset.position;
        const controlsPosition = controlsRef.current?.getWorldPosition(new THREE.Vector3());

        const isTransformed = 
            initialControlsPosition[0] !== controlsPosition?.x ||
            initialControlsPosition[1] !== controlsPosition?.y ||
            initialControlsPosition[2] !== controlsPosition?.z

        if (isTransformed) {
            updateAssetProperty(asset.id, 'position', [controlsPosition?.x, controlsPosition?.y, controlsPosition?.z])
        } else {
            const controlsRotation = controlsRef.current?.getWorldQuaternion(new THREE.Quaternion());
            updateAssetProperty(asset.id, 'rotation', [controlsRotation?.x, controlsRotation?.y, controlsRotation?.z])
        }
    }
    if(!asset.visible) return;

    // TODO [TUTORING]: WHEN CONTROLS ARE DRAGGED DYNAMICALLY AND MOUSE BUTTON IS RELEASED CONTROLS MOVE A BIT FURTHER THAT THE MODEL
    // IT'LL JUMP BACK INTO POSITION WHEN ANOTHER DRAG IS INITIATED AND EVEN onDragEnd CANNOT FIX THAT
    // ROTATION DISPLAYS THE SAME BEHAVIOR (THOUGH IT'S HARDER TO SPOT ATM)
    return (
        <group
            key={asset.id} 
            position={asset.position}
            rotation={asset.rotation}
        >
            {isSelected && 
                <PivotControls
                    offset={[0,0,0]}
                    onDrag={ () => { handleControlsDrag() }}
                    //onDragEnd={ () => {  }}
                    ref={controlsRef}
                    visible={true}
                    depthTest={false}
                /> 
            }
            <mesh
                matrixWorldAutoUpdate={true}
                ref={meshRef}
                onPointerOver={() => {
                    setIsHovered(true);
                }}
                onPointerOut={() => {
                    setIsHovered(false);
                }}
                onClick={() => {
                    updateSelected(asset.id);
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



// TODO: CONSIDER REPLACING WITH EdgesGeometry or simple highlight instead of Bounding Box
// https://github.com/pmndrs/drei
const useBoxHelper = (isSelected: boolean, isHovered: boolean, meshRef: RefObject<Mesh>) => {
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [color, setColor] = useState('');
   
    useEffect(() => {
       if (!isSelected && !isHovered) {
            setIsDisplayed(false);
       } else if (isSelected && !isHovered) {
            setIsDisplayed(true);
            setColor("#00BFFF");
       } else if (!isSelected && isHovered) {
            setIsDisplayed(true);
            setColor("#E0FFFF");
       } else if (isSelected && isHovered) {
            setIsDisplayed(true);
            setColor("#00FFFF");
       }
    }, [isSelected, isHovered]);
   
    useHelper(isDisplayed && meshRef as any, BoxHelper, color);
   };