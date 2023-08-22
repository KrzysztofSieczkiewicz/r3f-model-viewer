/*
THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
<mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
</mesh>

get how to recover pure geometry and material from gltf
*/
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Assets(props) {
    const assetsList = props.assetsList;

    const assetName = 'Aset_food_fruit_S_tezbbgrra_LOD0'; // TODO: THIS HAS TO BE PASSED AS PARAMETER7

    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf");

    //console.log(nodes);
    //console.log(assetsList);
    //console.log(assetsList[0].id);

    assetsList.map((asset) => {
        console.log(asset.rotation);
    })


    return (
        <group dispose={null} key={assetsList[0].id}>
            <mesh
                castShadow = { assetsList[0].castShadow }
                receiveShadow = { assetsList[0].receiveShadow }
                geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry}
                material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material}
                position={assetsList[0].position}
                rotation={assetsList[0].rotation}
            />
        </group>
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");