import React, { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { PrimitiveAssetWrapper } from "../../../../models/assets/Asset";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext"
import { getEditableMaterial } from "../materials/EditableMaterial";
import { useFrame } from "@react-three/fiber";
import { AssetOutline } from "../AssetOutline";
import { PrimitiveGeometry } from "./PrimitiveGeometry";

type Props = {
    assetID: string,

    isHovered: boolean,
    isSelected: boolean,
}

export const PrimitiveAsset = memo( ({assetID, isHovered, isSelected}: Props ) => {
    const { getAsset } = useSceneObjectsContext();
    const meshRef = useRef<THREE.Mesh>(null);
    
    const asset = getAsset(assetID) as PrimitiveAssetWrapper;
    const mesh = asset.mesh;

    const material = useMemo(() => {
        return getEditableMaterial(asset.material);
    }, [asset.material, asset.materialType])

    useFrame(() => {
        if (meshRef.current && asset) {
            const { position, rotation, scale } = asset.properties;

            meshRef.current.position.set(...position);
            meshRef.current.rotation.set(...rotation);
            meshRef.current.scale.set(...scale);
        }
    });

    return (
        <mesh
            ref={meshRef}
            matrixWorldAutoUpdate={true}
            visible={asset.properties.visible}
            castShadow={asset.properties.castShadow}
            receiveShadow={asset.properties.receiveShadow}
            material={material}
        >
            <PrimitiveGeometry mesh={mesh} />

            {meshRef.current &&
                <AssetOutline isHovered={isHovered} isSelected={isSelected} parentRef={meshRef}  />
            }
        </mesh>
    );
});