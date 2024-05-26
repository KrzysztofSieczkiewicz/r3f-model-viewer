import { PivotControls } from "@react-three/drei";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Euler, Group, Matrix4, Object3DEventMap, Quaternion, Vector3 } from "three";
import { LightWrapper } from "../../../models/Light";

type Props = {
    light: LightWrapper,
    handleChange: (change: Partial<LightWrapper>) => void
}


export const LightsGizmo = ( {light, handleChange}: Props) => {

    const [ handledPosition, setHandledPosition ] = useState(light.position);

    const controlsRef = useRef<Group<Object3DEventMap>>(null)

    // Allign controls to the object on init
    useEffect(() => {
        const initialMatrix = new Matrix4();
        const initialControlsPosition = new Vector3(...light.position);

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
        handleChange( {position: handledPosition} );
    }, [handledPosition]);

    // Update controls when values are changed externally
    useEffect(() => {
        if (!controlsRef.current) return;

        controlsRef.current.position.set(...light.position);
        controlsRef.current.rotation.setFromQuaternion(new Quaternion().setFromEuler(new Euler(...light.rotation)));
        controlsRef.current.updateMatrix();
    }, [light.position, light.rotation]);


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