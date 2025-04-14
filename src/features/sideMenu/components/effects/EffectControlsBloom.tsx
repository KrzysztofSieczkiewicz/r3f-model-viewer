import React from "react";

import { BloomProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { TraitSingle } from "../common/traits/TraitSingle";
import { useEffectsContext } from "../../../../components/contexts/EffectsContext";
import { CheckboxItemTrait } from "../common/controls/CheckboxItemTrait";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { ButtonReset } from "../common/controls/ButtonReset";
import { Slider } from "../common/controls/Slider";

type Props = {
    properties: BloomProperties,
}

export const EffectControlsBloom = ( {properties}: Props ) => {
    const { updateEffectProperties } = useEffectsContext(); 

    const type = EFFECT_TYPES.bloom;

    return (
        <>
            <TraitSingle name="Active">
                <CheckboxItemTrait
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </TraitSingle>

            <TraitSingle name="Intensity" >
                <SliderLongContainer>
                    <Slider
                        min={0} max={5} increment={0.005} 
                        value={properties.intensity}
                        handleChange={(value) => updateEffectProperties(type, {intensity: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEffectProperties(type, {intensity: 1} )} />
            </TraitSingle>
            
            <TraitSingle name="Threshold">
                <SliderLongContainer>
                    <Slider
                        min={0} max={1} increment={0.0005} 
                        value={properties.luminanceThreshold}
                        handleChange={(value) => updateEffectProperties(type, {luminanceThreshold: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEffectProperties(type, {luminanceThreshold: 0.15} )} />
            </TraitSingle>

            <TraitSingle name="Smoothing">
                <SliderLongContainer>
                    <Slider
                        min={0} max={1} increment={0.0005} 
                        value={properties.luminanceSmoothing} 
                        handleChange={(value) => updateEffectProperties(type, {luminanceSmoothing: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEffectProperties(type, {luminanceSmoothing: 0.025} )} />
            </TraitSingle>
        </>
    );
}