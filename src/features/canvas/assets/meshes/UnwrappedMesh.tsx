import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh;
    };
};

export const UnwrappedMesh = (unwrapped: UnwrappedWrapper) => {
    
    const { nodes } = useGLTF("models/pear/Pear2_LOD0.gltf") as unknown as GLTFResult;

    return (nodes.node.geometry)

}