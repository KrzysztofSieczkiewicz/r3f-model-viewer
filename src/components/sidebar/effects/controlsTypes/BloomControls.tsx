import React from "react";

import { BloomProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { SliderLimited } from "../../controls/SliderLimited";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { ListItemBody } from "../../commons/ListItemBody";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { TraitSingle } from "../../../../features/sideMenu/components/common/traitContainers/TraitSingle";

type Props = {
    properties: BloomProperties,
}

export const BloomControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.bloom;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <TraitSingle name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </TraitSingle>

            <TraitSingle name="Intensity" >
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={5} step={0.005} 
                        value={properties.intensity}
                        handleChange={(value) => updateEffectProperties(type, {intensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {intensity: 1} )} />
            </TraitSingle>
            
            <TraitSingle name="Threshold">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={1} step={0.0005} 
                        value={properties.luminanceThreshold}
                        handleChange={(value) => updateEffectProperties(type, {luminanceThreshold: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {luminanceThreshold: 0.15} )} />
            </TraitSingle>

            <TraitSingle name="Smoothing">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={1} step={0.0005} 
                        value={properties.luminanceSmoothing} 
                        handleChange={(value) => updateEffectProperties(type, {luminanceSmoothing: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {luminanceSmoothing: 0.025} )} />
            </TraitSingle>
        </ListItemBody>
    );
}