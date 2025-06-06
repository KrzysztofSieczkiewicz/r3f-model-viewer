import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { ReactNode } from "react";
import { AssetWrapper } from "../../../../models/assets/Asset";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";
import { useImportFromGLTF } from "../../hooks/useImportFromGLTF";
import { useImportGLTF } from "../../../sideMenu/hooks/useImportGLTF";

type Props = {
    asset: AssetWrapper
    children?: ReactNode
}

// TODO: CREATE A LOADER THAT LISTS MESHES WITH THEIR GEOMETRY AND MATERIALS
// THEN YOU WILL DISPLAY THIS LIST IN A MODAL AND ALLOW IMPORTING SELECTED GEOMETRY WITH MATERIALS

export const UnwrappedMesh = ( {asset, children}: Props ) => {

    const mesh = asset.mesh as UnwrappedWrapper
    //const { material, geometry } = useImportFromGLTF(mesh.src);
     
    const [ geometry, setGeometry ] = useState<THREE.BufferGeometry>(new THREE.BufferGeometry)
    const [ material, setMaterial ] = useState<THREE.Material>(new THREE.Material)
    const { loadContents } =  useImportGLTF() 
    
    useEffect( () => {
        // console.log({src: mesh.src})
        // console.log({geometry: mesh.geometries[0]})
        console.log({mesh: mesh}) 

        loadContents(mesh.src, mesh.geometries[0], null)
            .then( (contents) => {
                setGeometry(contents.geometry)
                console.log("loaded object:", {geometry})
            })
            .catch( err => {
                console.error("Failed to load contents of the GLTF file: ", err);
            });
    }, []);

    if(!asset.properties.visible) return;
    return (
        <mesh
            matrixWorldAutoUpdate={true}
            castShadow={asset.properties.castShadow}
            receiveShadow={asset.properties.receiveShadow}
            geometry={geometry}
            material={material}
            position={asset.properties.position}
            rotation={asset.properties.rotation}
            scale={asset.properties.scale}
        >
            {children}
        </mesh>
    );
};