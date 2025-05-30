import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type ListedMesh = {
    meshName: string,
    materialNames: string[],
}

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh | THREE.Object3D;
    };
    materials: {
        [key: string]: THREE.Material;
    };
};

export const useImportFromGLTF = (src: string) => {
    
    const { scene } = useGLTF(src) as unknown as GLTFResult;

    const meshes: ListedMesh[] = [];

    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            
            const meshName = object.name;
            const materialNames: string[] = [];

            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach( material => {
                        if (material.name) materialNames.push(material.name);
                    });
                } else {
                    if (object.material.name) materialNames.push(object.material.name);
                }
            }

            meshes.push({
                meshName,
                materialNames,
            });
        }
    });

    return { meshes }
}