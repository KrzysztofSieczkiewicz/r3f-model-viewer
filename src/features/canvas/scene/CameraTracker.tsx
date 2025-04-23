import { useFrame } from "@react-three/fiber";
import React from "react";
import { RefObject } from "react";
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';
import { useScene } from "../../common/contexts/SceneContext";

type Props = {
  cameraRef: RefObject<PerspectiveCameraType>
}

export const CameraTracker = ( { cameraRef }: Props ) => {
    const [ scene, setScene ] = useScene();
    
    useFrame( () => {
        if(!cameraRef.current) return;
        
        const rotation = cameraRef.current.rotation;
        setScene({viewCameraRotation: [rotation.x, rotation.y, rotation.z]});
    })

    return <group />
}