/*
THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
<mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
</mesh>

get how to recover pure geometry and material from gltf
*/
import { useGLTF } from "@react-three/drei";

export function Assets(props) {
    const { assetsList, handleSelected } = props;


    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf");

    return (
        assetsList.map((asset) => {
        if(asset.visible) {
            return ( 
                    <mesh
                        onPointerOver={() => {
                            //console.log("Pointer moved over the mesh")
                        }} 
                        onPointerOut={() => {
                            //console.log("Pointer removed from mesh")
                        }}
                        onClick={(e) => {
                            handleSelected(e.intersections[0].object.assetID);
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
            );
        }
        return;
        })
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");