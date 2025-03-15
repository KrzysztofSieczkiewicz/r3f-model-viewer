import React from "react";

import { PerspectiveCameraProperties } from "../../../../models/Camera";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SlidersArray } from "../../controls/SlidersArray";
import { TraitSingle } from "../../../../features/sideMenu/components/common/traitContainers/TraitSingle";

type Props = {
    id: string,
    properties: PerspectiveCameraProperties;
}

export const PerspectiveCameraControls = ( {id, properties}: Props) => {
    const { updateCameraProperties } = useSceneObjectsContext();

    return (
        <>
            <TraitSingle name="Positon" >
                <SlidersArray
                    value={properties.position}
                    step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {position: val} )} />
            </TraitSingle>

            <TraitSingle name="Rotation" >
                <SlidersArray
                    value={properties.rotation}
                    step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {rotation: val} )} />
            </TraitSingle>
        </>
    );
}