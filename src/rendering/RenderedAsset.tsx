import * as THREE from "three";
import { Outlines, useGLTF, useHelper } from "@react-three/drei";
import { PivotControls } from "@react-three/drei/web/pivotControls";
import { useEffect, useRef, useState } from "react";
import { Group, Mesh, Object3DEventMap } from "three/src/Three";
import { AssetWrapper } from "../models/Asset";
import React from "react";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";

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

    const [ controlsPosition, setControlsPosition ] = useState(asset.position)
    const [ controlsScale, setControlsScale ] = useState(asset.scale)
    const [ controlsRotation, setControlsRotation ] = useState(asset.rotation)

    const [ isOutline, setIsOutline ] = useState(false);
    const [ outlineColor, setOutlineColor ] = useState("white")

    const meshRef = useRef<Mesh>(null);
    const controlsRef = useRef<Group<Object3DEventMap>>(null)
    
    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as unknown as GLTFResult;

    // ALLOW CONTROLS TO SET TRANSFORMATION MATRIX
    const handleControls = (local: THREE.Matrix4) => {
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();

        local.decompose(position, quaternion, scale);
        const rotation = new THREE.Euler().setFromQuaternion(quaternion);

        setControlsPosition([position.x, position.y, position.z]);
        setControlsRotation([rotation.x, rotation.y, rotation.z]);
        setControlsScale([scale.x, scale.y, scale.z]);
    };

    // ON EACH MATRIX CHANGE, UPDATE OBJECT
    useEffect( () => {
        updateAssetProperty(asset.id, 'position', [controlsPosition[0], controlsPosition[1], controlsPosition[2]])
    }, [controlsPosition])

    
    useEffect( () => {// TODO: MOVE COLORS TO SOME COMMON FILE TO BE SHARED ACROSS ALL COMPONENTS
        if (!isSelected && !isHovered) {
            setIsOutline(false);
        } else if (isSelected && !isHovered) {
            setIsOutline(true);
            setOutlineColor("#00BFFF");
        } else if (!isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#E0FFFF");
        } else if (isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#00FFFF");
        }
     }, [isHovered, isSelected])

    
    
    if(!asset.visible) return;

    // TODO [TUTORING]: SOMEHOW I NEED TO MANAGE FEEDBACK LOOP:
    // PivotControls should respect asset.position (and adhere to it when it's modified externally e.g. by a sliders)
    // But it also has to be able to set it
    // Current solutions seems to be working, but it ignores initial asset.position
    return (
        <group>
            <PivotControls
                ref={controlsRef}
                offset={[0,0,0]}
                scale={1}
                //autoTransform={false}
                onDrag={ (local) => { handleControls(local) }}
                visible={isSelected}
                depthTest={false} />
            <mesh
                ref={meshRef}
                matrixWorldAutoUpdate={true}
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
                position={asset.position}
                rotation={asset.rotation}
                scale={asset.scale}
            >
                {isOutline && 
                <Outlines 
                    thickness={0.0025} 
                    color={outlineColor} 
                    screenspace={false} 
                    opacity={1} 
                    transparent={false} 
                    angle={0} 
                />}
            </mesh>
        </group>
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");
