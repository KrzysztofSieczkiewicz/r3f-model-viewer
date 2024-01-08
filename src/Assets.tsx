import React from "react";
import THREE, { Euler, Vector3 } from "three";
import { AssetWrapper } from "./interfaces/asset.model";
import { PivotControls } from "@react-three/drei/web/pivotControls";
import { useGLTF } from "@react-three/drei";
import { GLTF as GLTFRes } from "three-stdlib";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";


interface AssetsArray {
    assetsList: AssetWrapper[]
}

// TODO: Replace by parametrized asset handling
type NodeType = {
        geometry: THREE.Geometry;
    material: THREE.Material;
   };
   
type GLTFResult = GLTFRes & {
    nodes: {
        [key: string]: THREE.Object3D;
    };
 };
const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf") as unknown as GLTFResult;

/* --------- */

const Assets = ({ assetsList }: AssetsArray) => (
    <>
        {
            assetsList.map((asset) => {
                if(asset.visible) {
                    return <PivotControls >
                        <mesh
                            key={asset.id}
                            castShadow = {asset.castShadow}
                            receiveShadow = {asset.receiveShadow}
                            geometry={nodes.a} // TODO: Still to be parametrized
                            material={nodes.material} // TODO: As above
                            position={asset.position}
                            rotation={asset.rotation}
                            scale={asset.scale}
                        />
                    </PivotControls >
                }
            })
            .filter(x => x)
        }
    </>
);

export default Assets;