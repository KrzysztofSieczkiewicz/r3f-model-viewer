import { PivotControls } from "@react-three/drei";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Euler, Group, Matrix4, Object3DEventMap, Quaternion, Vector3 } from "three";
import { CameraProperties } from "../../../models/Camera";

type Props = {
    position: [number, number, number],
    rotation: [number, number, number]
    handleChange: (change: Partial<CameraProperties>) => void // TODO: WHEN CREATING ABSTRACTION => just allow for providing position and rotation
}

type Transformation = {
    position: [number, number, number],
    rotation: [number, number, number]
}

// TODO: MOVE THIS AND LightsGizmo.tsx and AssetsGizmo.tsx into new gizmo classess 
export const CamerasGizmo = ( {position, rotation, handleChange}: Props) => {
    const [ transformation, setTransformation ] = useState<Transformation>({
        position: position, 
        rotation: rotation
    });

    const controlsRef = useRef<Group<Object3DEventMap>>(null)

    // Allign controls to the object on init
    useEffect(() => {
        const initialMatrix = new Matrix4();
        const initialControlsPosition = new Vector3(...transformation.position);
        const initialControlsRotation = new Quaternion().setFromEuler(new Euler(...transformation.rotation));

        initialMatrix.compose(initialControlsPosition, initialControlsRotation, new Vector3(1,1,1))

        controlsRef.current?.applyMatrix4(initialMatrix);
    }, []);

    // Handle controls interaction
    const handleControlsDrag = (local: Matrix4) => {
        const controlsPosition = new Vector3();
        const constrolsQuaternion = new Quaternion();

        local.decompose(controlsPosition, constrolsQuaternion, new Vector3());
        const controlsRotation = new Euler().setFromQuaternion(constrolsQuaternion);

        setTransformation({
            position: [controlsPosition.x, controlsPosition.y, controlsPosition.z], 
            rotation:[controlsRotation.x, controlsRotation.y, controlsRotation.z]
        });
    };

    // Update attached object on local changes
    useEffect(() => {
        handleChange({
            position: transformation.position, 
            rotation: transformation.rotation
        });
    }, [transformation]);

    // Update controls when values are changed externally
    // Update controls when values are changed externally
    useEffect(() => {
        if (!controlsRef.current) return;

        controlsRef.current.position.set(...position);
        controlsRef.current.rotation.setFromQuaternion(new Quaternion().setFromEuler(new Euler(...rotation)));
        controlsRef.current.updateMatrix();
    }, [position, rotation]);


    return (
        <PivotControls
            ref={controlsRef}
            fixed={false}
            disableRotations={false}
            scale={1}
            onDrag={ (local) => { handleControlsDrag(local) }}
            depthTest={false} />
    );
}