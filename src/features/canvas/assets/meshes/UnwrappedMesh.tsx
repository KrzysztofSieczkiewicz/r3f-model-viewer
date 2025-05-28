import React from "react";
import { ReactNode } from "react";
import { AssetWrapper } from "../../../../models/assets/Asset";
import { useLoadAndMergeGLTF } from "../../hooks/useLoadAndMergeGLTF";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";
import { getEditableMaterial } from "../materials/EditableMaterial";

type Props = {
    asset: AssetWrapper
    children?: ReactNode
}

export const UnwrappedMesh = ( {asset, children}: Props ) => {

    const mesh = asset.mesh as UnwrappedWrapper
    const geometry = useLoadAndMergeGLTF(mesh.src)

    
    if(!asset.properties.visible) return;

    return (
        <mesh
            matrixWorldAutoUpdate={true}
            castShadow={asset.properties.castShadow}
            receiveShadow={asset.properties.receiveShadow}
            geometry={geometry}
            material={getEditableMaterial(asset.material)}
            position={asset.properties.position}
            rotation={asset.properties.rotation}
            scale={asset.properties.scale}
        >
            {children}
        </mesh>
    );
};