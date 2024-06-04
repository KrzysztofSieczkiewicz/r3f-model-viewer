import React, { useRef, useState } from "react";

import { BoxHelper, Mesh } from "three";
import { Sphere } from "@react-three/drei/core/shapes";
import { useHelper } from "@react-three/drei/core/useHelper";

type Props = {
    onClick: () => void;
}

export const SelectionSphere = ( {onClick}: Props) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const selectionSphere = useRef<Mesh>(null)

    useHelper(isHovered && selectionSphere as any, BoxHelper, "white");
    
    return (
        <>
            <Sphere
                ref={selectionSphere}
                visible={false}
                position={[0,0,0]}
                args={[0.35, 4,2]}
                onPointerOver={ () => {
                    setIsHovered(true)
                }}
                onPointerOut={ () => {
                    setIsHovered(false)
                }}
                onClick={() => onClick()}
            />
        </>
    );
}