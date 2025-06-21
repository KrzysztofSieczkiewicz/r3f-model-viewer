import React, { memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext"
import { useImportGLTF } from "../../sideMenu/hooks/useImportGLTF";
import { UnwrappedWrapper } from "../../../models/assets/meshes/Unwrapped";
import { AssetOutline } from "./AssetOutline";

type Props = {
    assetID: string,

    isHovered: boolean,
    isSelected: boolean,
}

export const UnwrappedAsset = memo( 
    ({assetID, isHovered, isSelected}: Props ) => {
        const { getAsset } = useSceneObjectsContext();
        
            const [ props, setProps ] = useState<{geometry?: THREE.BufferGeometry, material?: THREE.Material}>();
            const meshRef = useRef<THREE.Mesh>(null);
            const { loadContents } =  useImportGLTF()
        
            const asset = getAsset(assetID)
            const mesh = asset.mesh as UnwrappedWrapper
        
            console.log({asset})
        
            useEffect( () => {
                loadContents(mesh.src, mesh.geometries[0], null)
                    .then( (contents) => {
                        const geometry = contents.geometry || undefined;
                        const material = contents.material || undefined;
        
                        setProps({
                            geometry: geometry,
                            material: material
                        })
                    })
                    .catch( err => {
                        console.error("Failed to load contents of the GLTF file: ", err);
                    });
            }, [mesh.src, mesh.geometries])
        
            if (!asset.properties.visible) return;
            return (
                <mesh
                    ref={meshRef}
                    matrixWorldAutoUpdate={true}
                    castShadow={asset.properties.castShadow}
                    receiveShadow={asset.properties.receiveShadow}
                    visible={asset.properties.visible}
                    {...props}
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