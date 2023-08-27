/*
THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
<mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
</mesh>

get how to recover pure geometry and material from gltf
*/
import React from "react";
import { useGLTF } from "@react-three/drei";

export function Assets(props) {
    const assetsList = props.assetsList;

    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf");

    return (
        assetsList.map((asset) => {
        if(asset.visible) {
            return ( 
                <group dispose={null} key={asset.id}>
                    <mesh
                        castShadow = {asset.castShadow}
                        receiveShadow = {asset.receiveShadow}
                        geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry} // TODO: Still to be parametrized
                        material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material} // TODO: As above
                        position={asset.position}
                        rotation={asset.rotation} // TODO: FIX THAT -> LIGHTS ARE NOT ROTATING
                        scale={[10,10,10]} // TODO: SCALE SHOULD BE PARAMETRIZED
                    />
                </group>
            );
        }
        })
    );
    
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");