import { PivotControls } from "@react-three/drei";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Euler, Group, Matrix4, Object3DEventMap, Quaternion, Vector3 } from "three";
import { AssetProperties } from "../../../models/assets/Asset";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { useFrame } from "@react-three/fiber";

type Props = {
    assetID: string,
    handleChange: (change: Partial<AssetProperties>) => void
}

type Transformation = {
    position: [number, number, number],
    rotation: [number, number, number]
}

export const AssetGizmo = ( {assetID, handleChange}: Props) => {

    const { getAsset } = useSceneObjectsContext();
    const asset = getAsset(assetID);

    const controlsRef = useRef<Group<Object3DEventMap>>(null)
    const assetPropsRef = useRef({
        position: asset.properties.position,
        rotation: asset.properties.rotation
    });

    const [ transformation, setTransformation ] = useState<Transformation>({
        position: asset.properties.position, 
        rotation: asset.properties.rotation
    });
    

    // Allign controls to the object on mount
    useEffect(() => {
        if (!controlsRef.current) return;

        const initialMatrix = new Matrix4();
        const initialControlsPosition = new Vector3(...transformation.position);
        const initialControlsRotation = new Quaternion().setFromEuler(new Euler(...transformation.rotation));

        initialMatrix.compose(initialControlsPosition, initialControlsRotation, new Vector3(1,1,1))
        controlsRef.current.applyMatrix4(initialMatrix);

        assetPropsRef.current = {
            position: transformation.position,
            rotation: transformation.rotation
        };
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
    useFrame(() => {
        if (!controlsRef.current) return;

        controlsRef.current.position.set(...asset.properties.position);
        controlsRef.current.rotation.setFromQuaternion(new Quaternion().setFromEuler(new Euler(...asset.properties.rotation)));
        controlsRef.current.updateMatrix();
    });


    return (
        <PivotControls
            ref={controlsRef}
            fixed={false}
            scale={1}
            onDrag={ (local) => { handleControlsDrag(local) }}
            depthTest={false} />
    );
}