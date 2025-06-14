import React, { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { BoxGeometry, ConeGeometry, SphereGeometry } from "three/src/geometries/Geometries";
import { PrimitiveAssetWrapper } from "../../../models/assets/Asset";
import { Primitives } from "../../../models/assets/meshes/Primitive";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext"
import { getEditableMaterial } from "./materials/EditableMaterial";
import { useFrame } from "@react-three/fiber";
import { AssetOutline } from "./AssetOutline";

type Props = {
    assetID: string,

    isHovered: boolean,
    isSelected: boolean,
}

export const PrimitiveAsset = memo( 
    ({assetID, isHovered, isSelected}: Props ) => {
        const { getAsset } = useSceneObjectsContext();
        const meshRef = useRef<THREE.Mesh>(null);
        
        const asset = getAsset(assetID) as PrimitiveAssetWrapper;
        const mesh = asset.mesh;

        const geometry = useMemo(() => {
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
        }, [mesh] );

        const material = useMemo(() => {
            return getEditableMaterial(asset.material);
        }, [asset.material, asset.materialType])

        useFrame(() => {
            if (meshRef.current && asset) {
                meshRef.current.position.set(...asset.properties.position);
                meshRef.current.rotation.set(...asset.properties.rotation);
                meshRef.current.scale.set(...asset.properties.scale);
            }
        });

        console.log({assetID}, {isHovered}, {isSelected})

        return (
            <mesh
                ref={meshRef}
                matrixWorldAutoUpdate={true}
                castShadow={asset.properties.castShadow}
                receiveShadow={asset.properties.receiveShadow}
                geometry={geometry}
                material={material}
            >
                {meshRef.current &&
                    <AssetOutline isHovered={isHovered} isSelected={isSelected} parentRef={meshRef}  />
                }
            </mesh>
        );
    }
);