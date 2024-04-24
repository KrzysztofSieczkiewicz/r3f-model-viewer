import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { RefObject, useState } from "react";
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';

type Props = {
    cameraRef: RefObject<PerspectiveCameraType>
}

// TODO [TUTORING]: WHATS A PROPER PLACE FOR THIS? IT'S NEITHER UI, NOR RENDERING
export const CameraTracker = ( { cameraRef }: Props ) => {

    const [ cameraRotation, setCameraRotation ] = useState([0,0,0])

    useFrame( () => {
        if(cameraRef.current) {
          const cameraRotation = cameraRef.current.rotation;
          setCameraRotation([cameraRotation.x, cameraRotation.y, cameraRotation.z])
        }
    })

      return <PerspectiveCamera fov={50} position={[3, 2, 5]} />
}