import React from "react";

import { OrtographicCameraProperties } from "../../../../models/Camera";
import { ListItemBody } from "../../commons/ListItemBody";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SlidersArray } from "../../controls/SlidersArray";
import { TraitSingle } from "../../../../features/sideMenu/components/common/traitContainers/TraitSingle";

type Props = {
    id: string,
    properties: OrtographicCameraProperties;
}

export const OrtogtaphicCameraControls = ( {id, properties}: Props) => {
    const { updateCameraProperties } = useSceneObjectsContext();

    return (
        <ListItemBody>
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
        </ListItemBody>
    );
}