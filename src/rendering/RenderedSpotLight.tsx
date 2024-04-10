import React, { Ref, RefObject, useEffect, useRef, useState } from "react";
import { LightWrapper } from "../models/Light"
import { Cone, Polyhedron, Sphere, useHelper } from "@react-three/drei";
import { BoxHelper, Camera, Color, DirectionalLightHelper, Light, LightShadow, PointLightHelper, SpotLight, SpotLightHelper, Vector3 } from "three";
import { useThree } from "@react-three/fiber";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedSpotLight = ( {light, isSelected}: Props) => {

    const [isHovered, setIsHovered] = useState(false);

    let lightRef = useRef<SpotLight>(null);

    // TODO: RELPACE HELPER WITH 3D WIREFRAME (PROBABLY NEED TO MODEL MYSELF)
    useHelper(lightRef as any, SpotLightHelper, light.color);

    // TODO: ADD TARGET HANDLING
    //lightRef.current?.lookAt(new Vector3(0,0,0))

    return (
        <group
            position={light.position}
            rotation={light.rotation}
        >
            <Sphere
                visible={false}
                position={[0,0,0]}
                args={[0.5, 4,2]}
                onPointerOver={ () => setIsHovered(true) }
                onPointerOut={ () => setIsHovered(false) }
            />
            <spotLight
                key={light.id} 
                position={[0,0,0]}
                distance={light.distance} // TODO: REPLACE THIS ONE BY CALCULATING DISTANCE TO THE TARGET
                ref={lightRef}
                color={light.color} 
                intensity={light.intensity}
                angle={light.angle}
                penumbra={light.penumbra}  
            />
        </group>
    );
}