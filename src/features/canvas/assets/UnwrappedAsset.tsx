import React, { memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext"
import { AssetOutline } from "./AssetOutline";
import { Meshes } from "../../../models/assets/Asset";

type Props = {
    assetID: string,
    isHovered: boolean,
    isSelected: boolean,
}

export const UnwrappedAsset = memo( 
    ({assetID, isHovered, isSelected}: Props ) => {
        const { getAsset } = useSceneObjectsContext();
    
        const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
        const [error, setError] = useState<string | null>(null);

        const meshRef = useRef<THREE.Mesh>(null);
    
        const asset = getAsset(assetID)

        var blobUrl: string;
        if (asset.meshType !== Meshes.Unwrapped) 
            blobUrl = "";
        else 
            blobUrl = asset.meshUrl

        // TODO: replace this after fixing blobURL logic in SceneObjectsContext and AssetModalBrowseModelPage
        useEffect(() => {
            if (!blobUrl) return;

            fetch(blobUrl)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch Blob URL");
                return response.json();
            })
            .then((jsonData) => {
                const loader = new THREE.BufferGeometryLoader();
                
                const geoData = jsonData.geometry || jsonData; 
                const parsedGeometry = loader.parse(geoData);

                setGeometry(parsedGeometry);
            })
            .catch((err) => {
                console.error("Error loading serialized geometry:", err);
                setError("Could not load geometry.");
            });

            // We don't revoke the URL here because your app needs it to stay alive!
        }, [blobUrl]);
    
        if (!asset.properties.visible) return;
        if (!geometry) return;
        return (
            <mesh
                ref={meshRef}
                matrixWorldAutoUpdate={true}
                castShadow={asset.properties.castShadow}
                receiveShadow={asset.properties.receiveShadow}
                visible={asset.properties.visible}
                // {...props}
                geometry={geometry}
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