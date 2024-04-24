import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect } from "react";
import { RefObject, useState } from "react";
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';
import { useSidebarControlsContext } from "../../components/sidebar/SidebarControlsContext";

type Props = {
  cameraRef: RefObject<PerspectiveCameraType>
}

// TODO [TUTORING]: WHATS A PROPER PLACE FOR THIS? IT'S NEITHER UI, NOR RENDERING
export const CameraTracker = ( { cameraRef }: Props ) => {
  const { scene, updateScene } = useSidebarControlsContext();

  const [ cameraRotation, setCameraRotation ] = useState(scene.viewCameraRotation)

  
  useFrame( () => {
    if(cameraRef.current) {
      const rotation = cameraRef.current.rotation;
      setCameraRotation([rotation.x, rotation.y, rotation.z])
      console.log("USE FRAME IS TRIGGERED")
    }
  })

  // TODO [TUTORING]: IF I SET SCENE PROPERTY, ELEMENTS ARE GETTING RERENDERED (TRIGGERING USEFRAME AND IN TURN TRIGGERING USEEFFECT AGAIN)
  useEffect( () => {
    updateScene('viewCameraRotation', cameraRotation)
    console.log("CAMERA UPDATED")
  }, [])

  return <PerspectiveCamera fov={50} position={[3, 2, 5]} />
}