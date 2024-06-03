import * as THREE from "three";
import { Outlines, useGLTF } from "@react-three/drei";
import { memo, useEffect, useState } from "react";
import { AssetWrapper } from "../../../models/Asset";
import React from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { AssetsGizmo } from "./AssetsGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";

type Props = {
    asset: AssetWrapper,
    updateAsset: (change: Partial<AssetWrapper>) => void,
}

type GLTFResult = GLTF & {
    nodes: {
      [key: string]: THREE.Mesh;
    };
  };


export const RenderedAsset = memo(( {asset, updateAsset}: Props) => {
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isOutline, setIsOutline ] = useState(false);
    const [ outlineColor, setOutlineColor ] = useState("white")

    const isSelected = useIsSelected(asset.id);
    const handleSelect = useToggleSelect(asset.id);
    
    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as unknown as GLTFResult;

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

    // TODO: UNIFY ROTATION UNITS, EVERYTHING IS USING DIFFERENT SYSTEM
    return (
        <group>
            {isSelected && 
                <AssetsGizmo
                    asset={asset}
                    handleChange={(newAsset) => updateAsset({...newAsset})}
                />
            }
            
            <mesh
                matrixWorldAutoUpdate={true}
                onPointerOver={() => setIsHovered(true) }
                onPointerOut={() => setIsHovered(false) }
                onClick={handleSelect}
                castShadow={asset.castShadow}
                receiveShadow={asset.receiveShadow}
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
});


useGLTF.preload("models/pear/Pear2_LOD0.gltf");
