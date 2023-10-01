/*
THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
<mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
</mesh>

get how to recover pure geometry and material from gltf
*/
import { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Outline, Select, Selection } from "@react-three/postprocessing";

export function Assets(props) {
    const assetsList = props.assetsList;

    const [highlighted, setHighlighted] = useState(false);

    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf");

    // Wrap map function with <Selection> and <EffectComposer>, then wrap mesh with <Select> with enabled={selected}. Don't forget
    // to put <Outline> inside <EffectComposer>. All elements should be importable from /postprocessing
    // It may be required to add selected/hovered to synchronise behavior between sidebar and canvas
    return (
        <Selection>
            <EffectComposer multisampling={8} autoClear={false}>
                <Outline blur visibleEdgeColor="red" edgeStrength={100} width={500} />
            </EffectComposer>
        {assetsList.map((asset) => {
        if(asset.visible) {
            return ( 
                    <Select enabled={highlighted} key={asset.id}>
                        <mesh
                            onPointerOver={() => setHighlighted(true)} 
                            onPointerOut={() => setHighlighted(false)}
                            castShadow = {asset.castShadow}
                            receiveShadow = {asset.receiveShadow}
                            geometry={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.geometry} // TODO: Still to be parametrized
                            material={nodes.Aset_food_fruit_S_tezbbgrra_LOD0.material} // TODO: As above
                            position={asset.position}
                            rotation={asset.rotation}
                            scale={asset.scale}
                        />
                    </Select>
                );
            }
        return;
        })}
        </Selection>
    );
}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");