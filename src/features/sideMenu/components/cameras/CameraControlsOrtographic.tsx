import React from "react";

import { OrtographicCameraProperties } from "../../../../models/Camera";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { SlidersArray } from "../../../../components/sidebar/controls/SlidersArray";
import { TraitSingle } from "../common/traits/TraitSingle";

type Props = {
    id: string,
    properties: OrtographicCameraProperties;
}

export const CameraControlsOrtographic = ( {id, properties}: Props) => {
    const { updateCameraProperties } = useSceneObjectsContext();

    return (
        <>
            <TraitSingle name="Positon" >
                <SlidersArray
                    value={properties.position}
                    step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {position: val} )} />
            </TraitSingle>
            
            <TraitSingle name="Rotation">
                <SlidersArray
                    value={properties.rotation}
                    step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {rotation: val} )} />
            </TraitSingle>
        </>
    );
}