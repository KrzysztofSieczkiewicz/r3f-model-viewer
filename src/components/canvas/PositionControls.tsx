import { PivotControls } from "@react-three/drei";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Euler, Group, Matrix4, Object3DEventMap, Quaternion, Vector3 } from "three";
import { AssetWrapper } from "../../models/Asset";
import { LightWrapper } from "../../models/Light";

type Props = {
    object: AssetWrapper | LightWrapper,
    handleChange: (newObject: AssetWrapper | LightWrapper) => void
}

export const PositionControls = ( {object: asset, handleChange}: Props) => {
    const [ localPosition, setLocalPosition ] = useState<[number, number, number]>(asset.position);
    const [ localRotation, setLocalRotation ] = useState<[number, number, number]>(asset.rotation);
    const controlsRef = useRef<Group<Object3DEventMap>>(null)

    // Allign controls to the object on init
    useEffect(() => {
        const initialMatrix = new Matrix4();
        const initialControlsPosition = new Vector3(...localPosition);
        const initialControlsRotation = new Quaternion().setFromEuler(new Euler(...localRotation));

        initialMatrix.compose(initialControlsPosition, initialControlsRotation, new Vector3(1,1,1))

        controlsRef.current?.applyMatrix4(initialMatrix);
    }, []);

    // Handle controls interaction
    const handleControlsDrag = (local: Matrix4) => {
        const controlsPosition = new Vector3();
        const constrolsQuaternion = new Quaternion();

        local.decompose(controlsPosition, constrolsQuaternion, new Vector3());
        const controlsRotation = new Euler().setFromQuaternion(constrolsQuaternion);

        // TODO [TUTORING]: IS THERE A WAY TO DO THIS EFFICIENTLY WITHOUT TRIGGERING RERENDERING FOR THE VALUE THAT IS NOT BEING SET?
        setLocalPosition([controlsPosition.x, controlsPosition.y, controlsPosition.z]);
        setLocalRotation([controlsRotation.x, controlsRotation.y, controlsRotation.z]);
    };

    // Update attached object on local changes
    useEffect(() => {
        const newAsset = structuredClone(asset);
        newAsset.position = localPosition;
        newAsset.rotation = localRotation;

        handleChange(newAsset);
    }, [localPosition, localRotation]);

    // Update controls when values are changed externally
    useEffect(() => {
        if (!controlsRef.current) return;

        controlsRef.current.position.set(...asset.position);
        controlsRef.current.rotation.setFromQuaternion(new Quaternion().setFromEuler(new Euler(...asset.rotation)));
        controlsRef.current.updateMatrix();
    }, [asset.position, asset.rotation]);


    return (
        <PivotControls
                ref={controlsRef}
                fixed={false}
                scale={1}
                onDrag={ (local) => { handleControlsDrag(local) }}
                depthTest={false} />
    );
}