import React from "react";

import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

import { PositionSliders } from "../../common/PositionSliders";
import { Slider } from "../../common/Slider";
import { ColorPicker } from "../../common/ColorPicker";
import { PointLightProperties } from "../../../../models/Light";

type Props = {
    id: string,
    properties: PointLightProperties,
}

export const PointLightControls = ( {id, properties}: Props ) => {
    const { updateLightProperties } = useSceneObjectsContext();

    return (
        <>
            <PositionSliders name="Position"
                value={properties.position} step={0.01}
                handleChange={(val) => updateLightProperties(id, {position: val} )} />
            <ColorPicker name="Color" 
                currentColor={properties.color}
                handleChange={(val) => updateLightProperties(id, {color: val} )}  />
            <Slider name="Intensity"
                value={properties.intensity}
                handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                min={0} max={3} step={0.005} defaultValue={1} />
            <Slider name="Distance"
                value={properties.distance}
                handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                min={0} max={100} step={0.1} defaultValue={10} />
        </>
    );
}