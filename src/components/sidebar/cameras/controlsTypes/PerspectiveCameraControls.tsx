import React from "react";

import { PerspectiveCameraProperties } from "../../../../models/Camera";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SlidersArray } from "../../controls/SlidersArray";

type Props = {
    id: string,
    properties: PerspectiveCameraProperties;
}

export const PerspectiveCameraControls = ( {id, properties}: Props) => {
    const { updateCameraProperties } = useSceneObjectsContext();

    return (
        <>
            <SingleLineTrait name="Positon" >
                <SlidersArray
                    value={properties.position}
                    step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {position: val} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Rotation" >
                <SlidersArray
                    value={properties.rotation}
                    step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {rotation: val} )} />
            </SingleLineTrait>
        </>
    );
}