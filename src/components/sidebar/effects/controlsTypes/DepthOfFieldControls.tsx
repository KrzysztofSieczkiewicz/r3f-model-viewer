import React from "react";

import { DepthOfFieldProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../controls/Checkbox";
import { SliderLimited } from "../../controls/SliderLimited";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { ListItemBody } from "../../commons/ListItemBody";
import { ResetButton } from "../../controls/buttons/ResetButton";

type Props = {
    properties: DepthOfFieldProperties,
}

export const DepthOfFieldControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.depthOfField;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <SingleLineTrait name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Focus distance">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focusDistance}
                        handleChange={(value) => updateEffectProperties(type, {focusDistance: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {focusDistance: 0.0035} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Focal length">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focalLength}
                        handleChange={(value) => updateEffectProperties(type, {focalLength: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {focalLength: 0.01} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Bokeh scale">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={5} step={0.005} 
                        value={properties.bokehScale} 
                        handleChange={(value) => updateEffectProperties(type, {bokehScale: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {bokehScale: 3} )} />
            </SingleLineTrait>
        </ListItemBody>
    );
}