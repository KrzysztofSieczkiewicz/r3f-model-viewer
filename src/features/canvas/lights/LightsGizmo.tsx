import { PivotControls } from "@react-three/drei";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Group, Matrix4, Object3DEventMap, Quaternion, Vector3 } from "three";

type Props = {
    position: [number, number, number];
    handleChange: (change: any) => void;
}


export const LightsGizmo = ( {position, handleChange}: Props) => {

    const [ handledPosition, setHandledPosition ] = useState(position);

    const controlsRef = useRef<Group<Object3DEventMap>>(null)

    // Allign controls to the object on init
    useEffect(() => {
        const initialMatrix = new Matrix4();
        const initialControlsPosition = new Vector3(...position);

        initialMatrix.compose(initialControlsPosition, new Quaternion(0,0,0), new Vector3(1,1,1))

        controlsRef.current?.applyMatrix4(initialMatrix);
    }, []);

    // Handle controls interaction
    const handleControlsDrag = (local: Matrix4) => {
        const controlsPosition = new Vector3();
        const constrolsQuaternion = new Quaternion();

        local.decompose(controlsPosition, constrolsQuaternion, new Vector3());

        setHandledPosition([controlsPosition.x, controlsPosition.y, controlsPosition.z]);
    };

    // Update attached object on local changes
    useEffect(() => {
        handleChange( handledPosition );
    }, [handledPosition]);

    // Update controls when values are changed externally
    useEffect(() => {
        if (!controlsRef.current) return;

        controlsRef.current.position.set(...position);
        controlsRef.current.updateMatrix();
    }, [position]);


    return (
        <PivotControls
            ref={controlsRef}
            fixed={false}
            disableRotations={true}
            scale={1}
            onDrag={ (local) => { handleControlsDrag(local) }}
            depthTest={false} />
    );
}