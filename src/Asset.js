import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three-stdlib";

export function Asset() {
    const gltf = useLoader(
        GLTFLoader,
        "models/pear/Pear2_LOD0.gltf"
    );

    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.traverse((object) => {
        if(object instanceof Mesh) {
            object.position.set(0, 0, 0);
            object.rotation.set(0, 0, 0);
            object.scale.set(1, 1, 1);

            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    return <primitive object={gltf.scene} />
}