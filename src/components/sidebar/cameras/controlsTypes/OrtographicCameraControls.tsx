import React from "react";

import { PositionSliders } from "../../common/PositionSliders";
import { RotationSliders } from "../../common/RotationSliders";
import { useCamerasContext } from "../../../contexts/CamerasContext";
import { OrtographicCameraProperties } from "../../../../models/Camera";

type Props = {
    id: string,
    properties: OrtographicCameraProperties;
}

export const OrtogtaphicCameraControls = ( {id, properties}: Props) => {
    const { updateCameraProperties } = useCamerasContext();

    return (
        <>
            <PositionSliders name="Position"
                value={properties.position} step={0.01}
                handleChange={(val) => updateCameraProperties(id, {position: val} )} />
            <RotationSliders name="Rotation"
                value={properties.rotation} step={0.01}
                handleChange={(val) => updateCameraProperties(id, {rotation: val} )} />
        </>
    );
}