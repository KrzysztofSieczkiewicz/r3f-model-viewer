import React from "react";

import { DepthOfFieldProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../controls/Checkbox";
import { SliderLimited } from "../../controls/SliderLimited";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";
import { SliderSingleContainer } from "../../controls/sliderContainers/SliderSingleContainer";
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
            <ItemTrait name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </ItemTrait>

            <ItemTrait name="Focus distance">
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focusDistance}
                        handleChange={(value) => updateEffectProperties(type, {focusDistance: value} )} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {focusDistance: 0.0035} )} />
            </ItemTrait>

            <ItemTrait name="Focal length">
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focalLength}
                        handleChange={(value) => updateEffectProperties(type, {focalLength: value} )} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {focalLength: 0.01} )} />
            </ItemTrait>

            <ItemTrait name="Bokeh scale">
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={5} step={0.005} 
                        value={properties.bokehScale} 
                        handleChange={(value) => updateEffectProperties(type, {bokehScale: value} )} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {bokehScale: 3} )} />
            </ItemTrait>
        </ListItemBody>
    );
}