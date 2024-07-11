import React from "react";

import { PositionSliders } from "../../controls/PositionSliders";
import { RotationSliders } from "../../controls/RotationSliders";
import { useCamerasContext } from "../../../contexts/CamerasContext";
import { OrtographicCameraProperties } from "../../../../models/Camera";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { ListItemBody } from "../../commons/ListItemBody";

type Props = {
    id: string,
    properties: OrtographicCameraProperties;
}

export const OrtogtaphicCameraControls = ( {id, properties}: Props) => {
    const { updateCameraProperties } = useCamerasContext();

    return (
        <ListItemBody>
            <SingleLineTrait name="Positon" >
                <PositionSliders
                    value={properties.position} step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {position: val} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Rotation">
                <RotationSliders
                    value={properties.rotation} step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {rotation: val} )} />
            </SingleLineTrait>
        </ListItemBody>
    );
}