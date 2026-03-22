import React, { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext"
import { UnwrappedWrapper } from "../../../models/assets/meshes/Unwrapped";
import { AssetOutline } from "./AssetOutline";
import { useFileLoad } from "../../../hooks/useLoad";
import { Meshes } from "../../../models/assets/Asset";

type Props = {
    assetID: string,
    isHovered: boolean,
    isSelected: boolean,
}

export const UnwrappedAsset = memo( 
    ({assetID, isHovered, isSelected}: Props ) => {
        const { getAsset } = useSceneObjectsContext();
    
        const meshRef = useRef<THREE.Mesh>(null);
    
        const asset = getAsset(assetID)

        if (asset.meshType !== Meshes.Unwrapped) return;
        const mesh = asset.meshUrl

        // const requiredMesh = useMemo(() => {
        //     return { geometry: mesh.geometries[0] };
        // }, [mesh.geometries]);

        // const loadedFile = useFileLoad(mesh.src, requiredMesh);

        // const geometry = loadedFile?.geometry;
    
        if (!asset.properties.visible) return;
        return (
            <mesh
                ref={meshRef}
                matrixWorldAutoUpdate={true}
                castShadow={asset.properties.castShadow}
                receiveShadow={asset.properties.receiveShadow}
                visible={asset.properties.visible}
                // {...props}
                // geometry={geometry}
                position={asset.properties.position}
                rotation={asset.properties.rotation}
                scale={asset.properties.scale}
            >
                {meshRef.current &&
                    <AssetOutline isHovered={isHovered} isSelected={isSelected} parentRef={meshRef}  />
                }
            </mesh>
        );
    }
);