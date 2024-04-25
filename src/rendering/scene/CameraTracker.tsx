import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { memo, useEffect } from "react";
import { RefObject, useState } from "react";
import { PerspectiveCamera as PerspectiveCameraType} from 'three/src/Three';
import { useSidebarControlsContext } from "../../components/sidebar/SidebarControlsContext";

type Props = {
  cameraRef: RefObject<PerspectiveCameraType>
}

export const CameraTracker = ( { cameraRef }: Props ) => {
  // const { scene, updateScene } = useSidebarControlsContext();

  // const [ cameraRotation, setCameraRotation ] = useState(scene.viewCameraRotation)

  
  // useFrame( () => {
  //   if(cameraRef.current) {
  //     const rotation = cameraRef.current.rotation;
  //     //updateScene('viewCameraRotation', [rotation.x, rotation.y, rotation.z])
  //     //setCameraRotation([rotation.x, rotation.y, rotation.z])
  //     //console.log({cameraRotation})
  //   }

  //   console.log(scene.viewCameraRotation)
  // })


  // useEffect( () => {
  //   if(cameraRef.current) {
  //       const rotation = cameraRef.current.rotation;
  //       setCameraRotation([rotation.x, rotation.y, rotation.z]);
  //       console.log("USE FRAME IS TRIGGERED");
  // }  }, [cameraRef.current?.rotation])

  // useEffect( () => {
  //   updateScene('viewCameraRotation', cameraRotation)
  //   console.log("CAMERA UPDATED")
  // }, [cameraRotation])

  return <PerspectiveCamera fov={50} position={[3, 2, 5]} />
}