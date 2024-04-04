/*
THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
<mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
</mesh>

get how to recover pure geometry and material from gltf file to allow for modifying materials
*/
import { PivotControls, useGLTF, useHelper } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { BoxHelper, BufferGeometry, Group, Mesh, Object3DEventMap } from "three";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { AssetWrapper } from "../models/Asset";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";

type Props = {
    assetsList: AssetWrapper[]
}

type GLTFResult = GLTF & {
    nodes: {
      [key: string]: THREE.Mesh;
    };
  };

export const Assets = ({ assetsList }: Props) => {
    const { updateAssetProperty } = useSidebarControlsContext();

    const meshRef = useRef<Mesh>(null);
    const controlsRef = useRef<Group<Object3DEventMap>>(null)
    useHelper(meshRef as any, BoxHelper, 'cyan')
    
    // useEffect(() => {
    //     assetsList.map((asset: AssetWrapper) => {
    //         if (asset.isSelected)
    //         {
    //             asset.ref = meshRef.current;
    //         }
    //         else asset.ref = null;
    //     });
    // });

    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as unknown as GLTFResult;

    const asset = assetsList[0]

    const handleControlsDrag = () => {
        const controlsPosition = controlsRef.current?.getWorldPosition(new THREE.Vector3);
        //const controlsRotation = controlsRef.current?.getWorldQuaternion(new THREE.Quaternion)
        //const assetPosition = meshRef.current?.getWorldPosition(new THREE.Vector3)

        updateAssetProperty(asset.id, 'position', [controlsPosition?.x, controlsPosition?.y, controlsPosition?.z])
        //updateAssetProperty(asset.id, 'rotation', [controlsRotation?.x, controlsRotation?.y, controlsRotation?.z])        
    }
        
    useEffect( () => {
        controlsRef.current?.position.set(...asset.position)
        controlsRef.current?.matrixWorld.setPosition(new THREE.Vector3(...asset.position))
    }, [asset.position])

    // TODO: CHECK STORE

    // TODO: Consider PivotControls vs TransformControls (or maybe add a way to toggle them)

    // TODO: [TUTORING] HOW TO GET REF FOR EACH ASSET IN THE ASSETSLIST
    // APPARENTLY ATTRIBUTES SHOULD BY SET USING e.g. ref.current.position = ... INSTEAD OF CURRENT SOLUTION
    // BUT MIGHT REQUIRE FURTHER CHECK
    
    if(asset.visible) {
        return (
            <group
                position={asset.position}
            >
                <PivotControls
                    onDrag={ () => { handleControlsDrag() }}
                    ref={controlsRef}
                    visible={true}
                    depthTest={false}
                    key={asset.id} 
                >
                </PivotControls >
                <mesh
                    matrixWorldAutoUpdate={true}
                    ref={meshRef}
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
                    position={[0,0,0]}
                    rotation={asset.rotation}
                    scale={asset.scale}
                />
            </group>
            
        );
    }

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");