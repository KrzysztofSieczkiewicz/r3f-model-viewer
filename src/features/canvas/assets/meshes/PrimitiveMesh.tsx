import { Primitives, PrimitiveWrapper } from "../../../../models/assets/meshes/Primitive";
import { SphereGeometry } from "three/src/geometries/SphereGeometry";
import { BoxGeometry, ConeGeometry } from "three";
import React, { ReactNode } from "react";
import { AssetWrapper } from "../../../../models/assets/Asset";
import { getEditableMaterial } from "../materials/EditableMaterial";

type Props = {
    asset: AssetWrapper
    children?: ReactNode
}

export const PrimitiveMesh = ( {asset, children}: Props ) => {

    const handleGeometry = (mesh: PrimitiveWrapper) => {
        switch(mesh.type) {
            case Primitives.Sphere:
                return new SphereGeometry(
                    mesh.properties.radius, 
                    mesh.properties.widthSegments, 
                    mesh.properties.heightSegments);
            case Primitives.Cone:
                return new ConeGeometry(
                    mesh.properties.radius,
                    mesh.properties.height,
                    mesh.properties.radialSegments,
                    mesh.properties.heightSegments);
            case Primitives.Box:
                return new BoxGeometry(
                    mesh.properties.height,
                    mesh.properties.width,
                    mesh.properties.depth);
        }
    }

    return (
        <mesh
            matrixWorldAutoUpdate={true}
            castShadow={asset.properties.castShadow}
            receiveShadow={asset.properties.receiveShadow}
            geometry={handleGeometry(asset.mesh as PrimitiveWrapper)}
            material={getEditableMaterial(asset.material)}
            position={asset.properties.position}
            rotation={asset.properties.rotation}
            scale={asset.properties.scale}
        >
            {children}
        </mesh>
    );
}