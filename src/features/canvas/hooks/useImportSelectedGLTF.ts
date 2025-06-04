import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {
    src: string, 
    meshName: string, 
    materialName?: string;
}

type MeshIdentifier = {
    name: string,
    traversalIndex: number;
}

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh | THREE.Object3D;
    };
    materials: {
        [key: string]: THREE.Material;
    };
};

// TODO: modify to work with indices instead of names
export const useImportFromGLTF = ({src, meshName, materialName}: Props) => {
    
    const { scene, materials } = useGLTF(src) as unknown as GLTFResult;

    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.Material | null = null;

    //BufferGeometryUtils.mergeBufferGeometries

    const loadGeometry = (meshName: string) => {
        let geometry = null;

        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                if (object.name === meshName && object.geometry) {
                    geometry = object.geometry.clone();
                    object.updateWorldMatrix(true, false);
                    geometry.applyMatrix4(object.matrixWorld);
                }
            }
        });

        if (!geometry) {
            geometry = new THREE.BufferGeometry();
            console.warn(`Mesh contains no geometry in file: ${src}`);
            }

        return geometry;
    }

    const loadMaterial = (materialName: string) => {
        let material = null;

        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                if (materialName && object.material) {
                if (Array.isArray(object.material)) {
                    material = object.material.find( mat => mat.name === materialName)
                } else {
                    material = object.material;
                }
            }
            }
        });

        if (!material && Object.keys(materials).length > 0) {
            material = materials[Object.keys(materials)[0]];
            console.warn('Selected mesh had no material. Using first material from GLTF instead');
        }
        if (!material) {
            material = new THREE.MeshStandardMaterial({ color: 0x808080 });
            console.warn(`No materials found in file ${src}. Returning a default MeshStandardMaterial.`);
        }

        return material;
    }

    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            if (object.name === meshName && object.geometry) {
                const clonedGeometry = object.geometry.clone();
                object.updateWorldMatrix(true, false);
                clonedGeometry.applyMatrix4(object.matrixWorld);
                geometry = clonedGeometry;
            }

            if (materialName && object.material) {
                if (Array.isArray(object.material)) {
                    material = object.material.find( mat => mat.name === materialName)
                } else {
                    material = object.material;
                }
            }
        }
    });

    return { geometry, material }
}