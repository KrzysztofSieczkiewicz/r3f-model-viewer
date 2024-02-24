/*
THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
<mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
</mesh>

get how to recover pure geometry and material from gltf file to allow for modifying materials
*/
import { PivotControls, TransformControls, useGLTF, useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { BoxHelper } from "three";

export function Assets(props) {
    const { assetsList, updateSelected } = props;

    const meshRef = useRef();
    useHelper(meshRef, BoxHelper, 'cyan')

    useEffect(() => {
        assetsList.map((asset) => {
            if (asset.isSelected)
            {
                asset.ref=meshRef;
            }
            else asset.ref=null;
        });
    });

    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf");

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
                            console.log(asset.isSelected)
                            console.log(asset.ref)
                            updateSelected(e.intersections[0].object.assetID);
                            //console.log(asset);
                            //console.log(e.target)
                        }}
                        key={asset.id}
                        assetID={asset.id}
                        castShadow = {asset.castShadow}
                        receiveShadow = {asset.receiveShadow}
                        geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry} // TODO: Still to be parametrized
                        material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material} // TODO: As above
                        position={asset.position}
                        rotation={asset.rotation}
                        scale={asset.scale}
                    />
                </PivotControls >
            );
        }
        return;
        })
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");