import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh | THREE.Object3D;
    };
    materials: {
        [key: string]: THREE.Material;
    };
};

export const useImportFromGLTF = (src: string) => {
    
    const { scene, materials } = useGLTF(src) as unknown as GLTFResult;

    let geometry: THREE.BufferGeometry | null = null;
    let mesh: THREE.Mesh | null = null;
    let material: THREE.Material | null = null;


    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            if (mesh === null) {
                mesh = object;
            }

            if (object.geometry) {
                const clonedGeometry = object.geometry.clone();
                object.updateWorldMatrix(true, false);
                clonedGeometry.applyMatrix4(object.matrixWorld);
                geometry = clonedGeometry;
            }

            if (object.material) {
                if (Array.isArray(object.material)) {
                    if (object.material.length > 0) {
                        material = object.material[0];
                    }
                } else {
                    material = object.material;
                }
            }
        }
    });

    if (!mesh) {
        console.warn(`No THREE.Mesh objects found in GLTF file: ${src}.`);
    }

    if (!material && Object.keys(materials).length > 0) {
        material = materials[Object.keys(materials)[0]];
        console.warn('Selected mesh had no material. Using first material from GLTF instead');
    }
    if (!material) {
        material = new THREE.MeshStandardMaterial({ color: 0x808080 });
        console.warn(`No materials found in file ${src}. Returning a default MeshStandardMaterial.`);
    }

    if (!geometry) {
        geometry = new THREE.BufferGeometry();
        console.warn(`Mesh has no geometry in file: ${src}`);
    }

    return { geometry, material }
}