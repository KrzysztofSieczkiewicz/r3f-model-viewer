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
    const { nodes, materials } = useGLTF("models/pear/Pear2_LOD0.gltf");
    return (
    <group {...props} dispose={null}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry}
        material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material}
        position={[0, 0.189, -0.043]}
        />
    </group>
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");