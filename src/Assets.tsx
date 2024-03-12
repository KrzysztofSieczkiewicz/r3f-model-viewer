/*
THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
<mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
</mesh>

get how to recover pure geometry and material from gltf file to allow for modifying materials
*/
import { PivotControls, TransformControls, useGLTF, useHelper } from "@react-three/drei";
import React, { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
import { BoxHelper, Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {
    assetsList: AssetsWrapper[],
    updateSelected: (objectId: string) => void
}

type AssetsWrapper = {
    id: string,
    object: string,
    name: string,
    position: number[],
    rotation: number[],
    scale: number[],
    ref: HTMLDivElement | null,
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean,
    isSelected: boolean,
}

type GLTFResult = GLTF & {
    nodes: {
      [key: string]: THREE.Mesh;
    };
  };

export const Assets = (props: Props) => {
    const { assetsList, updateSelected } = props;

    const meshRef = useRef<HTMLDivElement>(null);
    useHelper(meshRef as any, BoxHelper, 'cyan')

    useEffect(() => {
        assetsList.map((asset: AssetsWrapper) => {
            if (asset.isSelected)
            {
                asset.ref = meshRef.current;
            }
            else asset.ref = null;
        });
    });

    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as GLTFResult;

    // TODO: Consider PivotControls vs TransformControls (or maybe add a way to toggle them)
    return (
        assetsList.map((asset) => {
        if(asset.visible) {
            return ( 
                <PivotControls
                    key={asset.id} 
                >
                    <mesh
                        onPointerOver={() => {
                            //console.log("Pointer moved over the mesh")
                        }} 
                        onPointerOut={() => {
                            //console.log("Pointer removed from mesh")
                        }}
                        onClick={(e) => {
                            //updateSelected(e.intersections[0].object.assetID);
                        }}
                        key={asset.id}
                        castShadow = {asset.castShadow}
                        receiveShadow = {asset.receiveShadow}
                        geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry} // TODO: Still to be parametrized
                        material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material} // TODO: As above
                        position={new Vector3(...asset.position)}
                        rotation={new Euler(...asset.rotation)}
                        scale={new Vector3(...asset.scale)}
                    />
                </PivotControls >
            );
        }
        return;
        })
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");