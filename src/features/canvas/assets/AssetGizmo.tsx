import { PivotControls } from "@react-three/drei";
import React, { memo, useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { Euler, Group, Matrix4, Object3DEventMap, Quaternion, Vector3 } from "three";
import { AssetProperties } from "../../../models/assets/Asset";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";

type Props = {
    assetID: string,
    handleChange: (change: Partial<AssetProperties>) => void
}

type Transformation = {
    position: [number, number, number],
    rotation: [number, number, number]
}

export const AssetGizmo = memo( ({assetID, handleChange}: Props) => {

    const { getAsset } = useSceneObjectsContext();
    const asset = getAsset(assetID);

    const isBeingDraggedRef = useRef(false);
    const controlsRef = useRef<Group<Object3DEventMap>>(null)

    const [ transformation, setTransformation ] = useState<Transformation>({
        position: asset.properties.position, 
        rotation: asset.properties.rotation
    });
    

    // Allign controls to the object on mount
    useEffect( () => {
        if (!controlsRef.current) return;

        const initialMatrix = new Matrix4();
        const initialControlsPosition = new Vector3(...transformation.position);
        const initialControlsRotation = new Quaternion().setFromEuler(new Euler(...transformation.rotation));

        initialMatrix.compose(initialControlsPosition, initialControlsRotation, new Vector3(1,1,1))
        controlsRef.current.applyMatrix4(initialMatrix);
    }, []);

    // Sync transformation with parent asset
    useEffect( () => {
        if (isBeingDraggedRef.current) return;

        const currentPos = transformation.position;
        const currentRot = transformation.rotation;
        const newPos = asset.properties.position;
        const newRot = asset.properties.rotation;
        
        const posChanged = !currentPos.every( (val, i) => val === newPos[i]);
        const rotChanged = !currentRot.every( (val, i) => val === newRot[i]);

        if (posChanged || rotChanged) {
            setTransformation({
                position: newPos,
                rotation: newRot,
            });
        }
    }, [asset.properties.position, asset.properties.rotation, transformation, isBeingDraggedRef])

    // Apply transformation to the controls gizmo
    useEffect( () => {
        if (!controlsRef.current) return;
        controlsRef.current.position.set(...transformation.position);
        controlsRef.current.rotation.setFromQuaternion(new Quaternion().setFromEuler(new Euler(...transformation.rotation)));
        controlsRef.current.updateMatrix();
    }, [transformation]);

    const handleDragStart = useCallback( () => {
        isBeingDraggedRef.current = true;
    }, []);

    const handleDrag = useCallback( (local: Matrix4) => {
        const controlsPosition = new Vector3();
        const constrolsQuaternion = new Quaternion();
        local.decompose(controlsPosition, constrolsQuaternion, new Vector3());
        const controlsRotation = new Euler().setFromQuaternion(constrolsQuaternion);

        const newTransformation: Transformation = {
            position: [controlsPosition.x, controlsPosition.y, controlsPosition.z],
            rotation: [controlsRotation.x, controlsRotation.y, controlsRotation.z]
        }
        setTransformation(newTransformation);

        handleChange({
            position: newTransformation.position,
            rotation: newTransformation.rotation
        });
    }, [handleChange]);

    const handleDragEnd = useCallback( () => {
        isBeingDraggedRef.current = false;
    }, []);

    return (
        <PivotControls
            ref={controlsRef}
            fixed={false}
            scale={1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            depthTest={false} />
    );
});