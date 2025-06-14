import React, { memo, useMemo } from "react";

import { Outlines } from "@react-three/drei";
import { useEffect, useState } from "react";
import { AssetGizmo } from "./AssetGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { RenderedMesh } from "./meshes/RenderedMesh";
import { Meshes } from "../../../models/assets/Asset";
import { PrimitiveMesh } from "./meshes/PrimitiveMesh";

type Props = {
    assetID: string
}

export const RenderedAsset = memo( ( {assetID}: Props) => {
    const { getAsset, updateAssetProperties } = useSceneObjectsContext();
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isOutline, setIsOutline ] = useState(false);
    const [ outlineColor, setOutlineColor ] = useState("white")

    const isSelected = useIsSelected(assetID);
    const handleSelect = useToggleSelect(assetID);

    const asset = getAsset(assetID);
    let renderedMeshComponent = null;
    
    useEffect( () => {// TODO: MOVE COLORS TO SOME COMMON FILE TO BE SHARED ACROSS ALL COMPONENTS
        if (!isSelected && !isHovered) {
            setIsOutline(false);
        } else if (isSelected && !isHovered) {
            //setIsOutline(true);
            setOutlineColor("#00BFFF");
        } else if (!isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#E0FFFF");
        } else if (isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#00FFFF");
        }
     }, [isHovered, isSelected])

    console.log(`RenderedAsset (NAME: ${asset.name}) RENDERED`);

    const handleGeometryOutline = (isEnabled: boolean) => {
        return <>
            {isEnabled && 
                <Outlines 
                    thickness={0.025} 
                    color={outlineColor} 
                    screenspace={false} 
                    opacity={1} 
                    transparent={false} 
                    angle={0}  />
            }</>
    }

    
    // TODO: UNIFY ROTATION UNITS, EVERYTHING IS USING DIFFERENT SYSTEM
    if(!asset.properties.visible) return <></>;
    return (
        <group
            onPointerOver={() => setIsHovered(true) }
            onPointerOut={() => setIsHovered(false) }
            onClick={handleSelect} >

            {isSelected && 
                <AssetGizmo
                    assetID={assetID}
                    handleChange={(newAsset) => updateAssetProperties(assetID, {...newAsset})} /> 
            }

            <RenderedMesh assetID={assetID} meshType={asset.meshType} >
                {handleGeometryOutline(isOutline)}
            </RenderedMesh>
        </group>
    );
});
