import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three-stdlib";

export function Asset() {
    // REPLACE with function allowing to point to an asset from given list
    const gltf = useLoader(
        GLTFLoader,
        "models/pear/Pear2_LOD0.gltf"
    );

    console.log(gltf.scene.children[0].name);

    useEffect(() => {
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.traverse((object) => {
            if(object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);

    return <primitive object={gltf.scene} />
}