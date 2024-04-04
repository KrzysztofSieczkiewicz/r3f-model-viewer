import * as THREE from "three";
import { useGLTF, useHelper } from "@react-three/drei";
import { PivotControls } from "@react-three/drei/web/pivotControls";
import { useRef } from "react";
import { BoxHelper, Group, Mesh, Object3DEventMap } from "three/src/Three";
import { AssetWrapper } from "../models/Asset";
import React from "react";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {
    asset: AssetWrapper
}

type GLTFResult = GLTF & {
    nodes: {
      [key: string]: THREE.Mesh;
    };
  };

export const RenderedAsset = ( {asset}: Props) => {
    const { updateAssetProperty } = useSidebarControlsContext();

    const meshRef = useRef<Mesh>(null);
    const controlsRef = useRef<Group<Object3DEventMap>>(null)
    useHelper(meshRef as any, BoxHelper, 'cyan')

    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf")  as unknown as GLTFResult;

    const handleControlsDrag = () => {
        const controlsPosition = controlsRef.current?.getWorldPosition(new THREE.Vector3);
        const controlsRotation = controlsRef.current?.getWorldQuaternion(new THREE.Quaternion)
        const assetPosition = meshRef.current?.getWorldPosition(new THREE.Vector3)
        updateAssetProperty(asset.id, 'position', [controlsPosition?.x, controlsPosition?.y, controlsPosition?.z])
        updateAssetProperty(asset.id, 'rotation', [controlsRotation?.x, controlsRotation?.y, controlsRotation?.z])
    }

    if(!asset.visible) return;

    return (
        <PivotControls
            onDrag={ () => { handleControlsDrag() }}
            ref={controlsRef}
            visible={true}
            depthTest={false}
            key={asset.id} 
        >
            <mesh
                matrixWorldAutoUpdate={true}
                ref={meshRef}
                key={asset.id}
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

useGLTF.preload("models/pear/Pear2_LOD0.gltf");