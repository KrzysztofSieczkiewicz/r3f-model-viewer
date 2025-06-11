import { Outlines } from "@react-three/drei/core/Outlines"
import React, { useMemo } from "react"

type Props = {
    isSelected?: boolean,
    isHovered?: boolean,
    parentScale?: number, // Used to normalize outline thickness
}

const OUTLINE_COLOR_SELECTED = "#00BFFF";
const OUTLINE_COLOR_HOVERED = "#E0FFFF";
const OUTLINE_COLOR_SELECTED_HOVERED = "#00FFFF";
const OUTLINE_COLOR_DEFAULT = "white"; 

const BASE_THICKNESS = 0.025;

export const useCanvasOutline = ( {isSelected, isHovered, parentScale}: Props) => {

    const outlineColor = useMemo(() => {
        if (isSelected && isHovered) {
            return OUTLINE_COLOR_SELECTED_HOVERED;
        } else if (isSelected) {
            return OUTLINE_COLOR_SELECTED;
        } else if (isHovered) {
            return OUTLINE_COLOR_HOVERED;
        } else {
            return OUTLINE_COLOR_DEFAULT;
        }
    }, [isSelected, isHovered]);

    const thickness = useMemo(() => {
        return parentScale ? BASE_THICKNESS / parentScale : BASE_THICKNESS;
    }, [parentScale]);

    return (<>
        {(isSelected || isHovered) && 
            <Outlines 
                thickness={thickness} 
                color={outlineColor} 
                screenspace={false} 
                opacity={1} 
                transparent={false} 
                angle={0} />
        }
    </>)
}