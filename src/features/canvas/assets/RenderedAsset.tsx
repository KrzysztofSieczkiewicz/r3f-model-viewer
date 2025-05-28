import { Outlines } from "@react-three/drei";
import { useEffect, useState } from "react";
import { AssetWrapper } from "../../../models/assets/Asset";
import React from "react";
import { AssetsGizmo } from "./AssetsGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";

import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";

import { RenderedMesh } from "./meshes/RenderedMesh";

type Props = {
    asset: AssetWrapper
}

export const RenderedAsset = ( {asset}: Props) => {
    const { updateAssetProperties } = useSceneObjectsContext();
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isOutline, setIsOutline ] = useState(false);
    const [ outlineColor, setOutlineColor ] = useState("white")

    const isSelected = useIsSelected(asset.id);
    const handleSelect = useToggleSelect(asset.id);
    
    useEffect( () => {// TODO: MOVE COLORS TO SOME COMMON FILE TO BE SHARED ACROSS ALL COMPONENTS
        if (!isSelected && !isHovered) {
            setIsOutline(false);
        } else if (isSelected && !isHovered) {
            setIsOutline(true);
            setOutlineColor("#00BFFF");
        } else if (!isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#E0FFFF");
        } else if (isSelected && isHovered) {
            setIsOutline(true);
            setOutlineColor("#00FFFF");
        }
     }, [isHovered, isSelected])
    
    if(!asset.properties.visible) return;

    // TODO: UNIFY ROTATION UNITS, EVERYTHING IS USING DIFFERENT SYSTEM
    return (
        <group
            onPointerOver={() => setIsHovered(true) }
            onPointerOut={() => setIsHovered(false) }
            onClick={handleSelect} >

            {isSelected && 
                <AssetsGizmo
                    asset={asset}
                    handleChange={(newAsset) => updateAssetProperties(asset.id, {...newAsset})} /> 
            }

            <RenderedMesh asset={asset}>
                {isOutline && 
                    <Outlines 
                        thickness={0.025} 
                        color={outlineColor} 
                        screenspace={false} 
                        opacity={1} 
                        transparent={false} 
                        angle={0}  />
                }
            </RenderedMesh>
        </group>
    );
};
