import { useFrame } from "@react-three/fiber";
import React from "react";
import { RefObject } from "react";
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';
import { useSceneContext } from "../../contexts/SceneContext";

type Props = {
  cameraRef: RefObject<PerspectiveCameraType>
}

export const CameraTracker = ( { cameraRef }: Props ) => {
  const [ scene, setScene ] = useSceneContext();
  
  useFrame( () => {
    if(!cameraRef.current) return;
    
    const rotation = cameraRef.current.rotation;
    //setScene({...scene, viewCameraRotation: [rotation.x, rotation.y, rotation.z]})
  })

  return <group />
}