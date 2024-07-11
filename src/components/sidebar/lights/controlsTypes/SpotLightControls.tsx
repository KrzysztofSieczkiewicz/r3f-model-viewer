import React from "react";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

import { PositionSliders } from "../../controls/PositionSliders";
import { SliderLimited } from "../../controls/SliderLimited";
import { ColorPicker } from "../../controls/ColorPicker";
import { SpotLightProperties } from "../../../../models/Light";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { ListItemBody } from "../../commons/ListItemBody";
import { ResetButton } from "../../controls/buttons/ResetButton";

type Props = {
    id: string,
    properties: SpotLightProperties,
}

export const SpotLightControls = ( {id, properties}: Props ) => {
    const { updateLightProperties, deleteLight } = useSceneObjectsContext();

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteLight(id)}/>
            <SingleLineTrait name="Position" >
                <PositionSliders
                    value={properties.position} step={0.01}
                    handleChange={(val) => updateLightProperties(id, {position: val} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Color" >
                <ColorPicker
                    currentColor={properties.color}
                    handleChange={(val) => updateLightProperties(id, {color: val} )}  />
            </SingleLineTrait>

            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderLimited
                        value={properties.intensity}
                        handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                        min={0} max={3} step={0.005} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {intensity: 1} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Distance">
                <SliderLongContainer>
                    <SliderLimited
                        value={properties.distance}
                        handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                        min={0} max={100} step={0.1} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {distance: 10} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Angle">
                <SliderLongContainer>
                    <SliderLimited
                            value={properties.angle}
                            handleChange={(val) => updateLightProperties(id, {angle: val} )} 
                            min={0} max={1} step={0.002} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {angle: 0.6} )} />
            </SingleLineTrait>
                
            <SingleLineTrait name="Penumbra">
                <SliderLongContainer>
                    <SliderLimited
                        value={properties.penumbra}
                        handleChange={(val) => updateLightProperties(id, {penumbra: val} )} 
                        min={0} max={1} step={0.002} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {penumbra: 0.6} )} />
            </SingleLineTrait>
        </ListItemBody>
    );
}