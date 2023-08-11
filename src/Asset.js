import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three-stdlib";

export function Asset() {
    const gltf = useLoader(
        GLTFLoader,
        "models/pear/Pear2_LOD0.gltf"
    );

    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.set(0, 0, 0);
    gltf.scene.traverse((object) => {
        if(object instanceof Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    return <primitive object={gltf.scene} />
}