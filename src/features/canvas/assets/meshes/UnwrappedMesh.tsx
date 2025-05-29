import React from "react";
import { ReactNode } from "react";
import { AssetWrapper } from "../../../../models/assets/Asset";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";
import { useImportFromGLTF } from "../../hooks/useImportFromGLTF";

type Props = {
    asset: AssetWrapper
    children?: ReactNode
}

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