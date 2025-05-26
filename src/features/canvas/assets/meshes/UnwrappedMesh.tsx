import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import { useGLTF } from "@react-three/drei";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh;
    };
};

export const UnwrappedGeometry = (unwrappedModel: UnwrappedWrapper) => {

    unwrappedModel.src = "models/pear/Pear2_LOD0.gltf";
    
    const { nodes } = useGLTF(unwrappedModel.src) as unknown as GLTFResult;

    const geometries: THREE.BufferGeometry[] = [];
    for (const key in nodes) {
        const node = nodes[key];

        if (node instanceof THREE.Mesh && node.geometry) {
            const geometry = node.geometry.clone();
            node.updateWorldMatrix(true, false);
            geometry.applyMatrix4(node.matrixWorld);
            geometries.push(geometry);
        }
    }

    if (geometries.length == 0) {
        console.warn("File " + unwrappedModel.src + " doesn't contain any geometry")
        return new THREE.BufferGeometry(); // TODO: handle asset not being created
    }

    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);

    if (!mergedGeometry) {
        console.warn("Failed to merge geometries for file: " + unwrappedModel.src)
        return new THREE.BufferGeometry();
    }

    return (nodes.node.geometry)

}