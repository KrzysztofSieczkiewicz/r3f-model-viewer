import React from "react";

import { BloomProperties, DEFAULT_BLOOM_EFFECT, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../controls/Checkbox";
import { SliderLimited } from "../../controls/SliderLimited";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";
import { SliderSingleContainer } from "../../controls/sliderContainers/SliderSingleContainer";
import { ListItemBody } from "../../commons/ListItemBody";
import { ResetButton } from "../../controls/buttons/ResetButton";

type Props = {
    properties: BloomProperties,
}

export const BloomControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.bloom;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <ItemTrait name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </ItemTrait>

            <ItemTrait name="Intensity" >
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={5} step={0.005} 
                        value={properties.intensity}
                        handleChange={(value) => updateEffectProperties(type, {intensity: value} )} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {intensity: 1} )} />
            </ItemTrait>
            
            <ItemTrait name="Threshold">
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={1} step={0.0005} 
                        value={properties.luminanceThreshold}
                        handleChange={(value) => updateEffectProperties(type, {luminanceThreshold: value} )} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {luminanceThreshold: 0.15} )} />
            </ItemTrait>

            <ItemTrait name="Smoothing">
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={1} step={0.0005} 
                        value={properties.luminanceSmoothing} 
                        handleChange={(value) => updateEffectProperties(type, {luminanceSmoothing: value} )} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {luminanceSmoothing: 0.025} )} />
            </ItemTrait>
        </ListItemBody>
    );
}