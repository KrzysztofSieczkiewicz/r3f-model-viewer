import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ReactNode } from "react";
import { AssetWrapper } from "../../../../models/assets/Asset";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";
import { useImportGLTF } from "../../../sideMenu/hooks/useImportGLTF";

type Props = {
    asset: AssetWrapper
    children?: ReactNode
}

// TODO: CREATE A LOADER THAT LISTS MESHES WITH THEIR GEOMETRY AND MATERIALS
// THEN YOU WILL DISPLAY THIS LIST IN A MODAL AND ALLOW IMPORTING SELECTED GEOMETRY WITH MATERIALS

export const UnwrappedMesh = ( {asset, children}: Props ) => {

    const [ props, setProps ] = useState<{geometry?: THREE.BufferGeometry, material?: THREE.Material}>();
    const meshRef = useRef<THREE.Mesh>(null);
    const { loadContents } =  useImportGLTF()

    const mesh = asset.mesh as UnwrappedWrapper

    console.log("TRIGGERED RERENDER")

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

    if(!asset.properties.visible) return;
    return (
        <mesh
            ref={meshRef}
            matrixWorldAutoUpdate={true}
            castShadow={asset.properties.castShadow}
            receiveShadow={asset.properties.receiveShadow}
            {...props}
            position={asset.properties.position}
            rotation={asset.properties.rotation}
            scale={asset.properties.scale}
        >
            {children}
        </mesh>
    );
};