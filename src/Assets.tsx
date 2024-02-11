import React, { useEffect } from "react";
import THREE from "three";
import { AssetWrapper } from "./interfaces/asset.model";
import { PivotControls } from "@react-three/drei/web/pivotControls";

import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";


interface AssetsArray {
    assetsList: AssetWrapper[]
}

// TODO: Replace by parametrized asset handling
type NodeType = {
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
};
type NodesType = Record<string, NodeType>;
type GLTFResult = {
    nodes: NodesType;
};

//const gltf = useLoader(GLTFLoader, "models/pear/Pear2_LOD0.gltf") as unknown as GLTFResult;
//const nodes = gltf.nodes as unknown as NodesType;
/* --------- */

const Assets = ({ assetsList }: AssetsArray) => {
    const gltf = useLoader(GLTFLoader, "models/pear/Pear2_LOD0.gltf") as unknown as GLTFResult;
    const nodes = gltf.nodes as unknown as NodesType;

    return (
    <>
        {
            assetsList.map((asset) => {
                if(asset.visible) {
                    return (
                    //<PivotControls key={asset.id}>
                        <mesh
                            key={asset.id}
                            castShadow = {asset.castShadow}
                            receiveShadow = {asset.receiveShadow}
                            geometry={nodes["Aset_food_fruit_S_tezbbgrra_LOD0"].geometry} // TODO: Still to be parametrized
                            material={nodes["Aset_food_fruit_S_tezbbgrra_LOD0"].material} // TODO: As above
                            position={asset.position}
                            rotation={asset.rotation}
                            scale={asset.scale}
                        />
                    //</PivotControls >
                );}
            })
            .filter(x => x)
        }
    </>
    )
};
export default Assets;