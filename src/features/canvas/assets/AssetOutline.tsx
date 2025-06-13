import { Outlines } from "@react-three/drei/core/Outlines"
import * as THREE from "three";
import React, { useMemo } from "react"

type Props = {
    isSelected: boolean,
    isHovered: boolean,
    parentRef: React.RefObject<THREE.Mesh>
}

const OUTLINE_COLOR_SELECTED = "#00BFFF";
const OUTLINE_COLOR_HOVERED = "#E0FFFF";
const OUTLINE_COLOR_SELECTED_HOVERED = "#00FFFF";
const OUTLINE_COLOR_DEFAULT = "white"; 

const OUTLINE_THICKNESS = 0.025;

export const AssetOutline = ( {isSelected, isHovered, parentRef}: Props) => {

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

    const normalizeOutline = useMemo(() => {
        const parent = parentRef.current;
        if (!parent) {
            console.warn("AssetOutline: Parent mesh ref not available, defaulting outline scale.");
            return [1,1,1] as [number, number, number];
        }

        parent.geometry.computeBoundingBox();
        if (!parent.geometry.boundingBox) {
            console.warn("AssetOutline: Bounding box not available for parent geometry");
            return [1,1,1] as [number, number, number];
        }
        
        const T = OUTLINE_THICKNESS;
        const parentScale = parent.scale;
        const parentSize = new THREE.Vector3();
    
        parent.geometry.boundingBox?.getSize(parentSize)

        const x = parentSize.x*parentSize.x === 0
            ? 1
            : 1 + (2*T) / (parentSize.x*parentScale.x);

        const y = parentSize.y*parentScale.y === 0
            ? 1
            : 1 + (2*T) / (parentSize.y*parentScale.y);
        
        const z = parentSize.z*parentScale.z === 0
            ? 1
            : 1 + (2*T) / (parentSize.z*parentScale.z);

        console.log([x,y,z]);

        return [x,y,z] as [number, number, number]
    }, [
        parentRef.current,
        parentRef.current?.scale.x,
        parentRef.current?.scale.y,
        parentRef.current?.scale.z,
        parentRef.current?.geometry
    ]);

    return (<>
        {(isSelected || isHovered) && 
            <Outlines 
                scale={normalizeOutline}
                thickness={0} 
                color={outlineColor} 
                screenspace={false}
                toneMapped={true}
                opacity={1} 
                transparent={false} 
                angle={0} />
        }
    </>)
}