import React from "react";

import { PositionSliders } from "../../controls/PositionSliders";
import { RotationSliders } from "../../controls/RotationSliders";
import { useCamerasContext } from "../../../contexts/CamerasContext";
import { OrtographicCameraProperties } from "../../../../models/Camera";
import { ItemTrait } from "../../commons/ItemTrait";
import { ListItemBody } from "../../commons/ListItemBody";

type Props = {
    id: string,
    properties: OrtographicCameraProperties;
}

export const OrtogtaphicCameraControls = ( {id, properties}: Props) => {
    const { updateCameraProperties } = useCamerasContext();

    return (
        <ListItemBody>
            <ItemTrait name="Positon" >
                <PositionSliders
                    value={properties.position} step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Rotation">
                <RotationSliders
                    value={properties.rotation} step={0.01}
                    handleChange={(val) => updateCameraProperties(id, {rotation: val} )} />
            </ItemTrait>
        </ListItemBody>
    );
}