import React from "react";
import { ReactNode } from "react";
import { AssetWrapper } from "../../../../models/assets/Asset";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";
import { useImportFromGLTF } from "../../hooks/useImportFromGLTF";

type Props = {
    asset: AssetWrapper
    children?: ReactNode
}

// TODO: CREATE A LOADER THAT LISTS MESHES WITH THEIR GEOMETRY AND MATERIALS
// THEN YOU WILL DISPLAY THIS LIST IN A MODAL AND ALLOW IMPORTING SELECTED GEOMETRY WITH MATERIALS

export const UnwrappedMesh = ( {asset, children}: Props ) => {

    const mesh = asset.mesh as UnwrappedWrapper
    const { material, geometry } = useImportFromGLTF(mesh.src);

    
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