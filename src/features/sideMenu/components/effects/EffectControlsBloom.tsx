import React from "react";

import { BloomProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { TraitSingle } from "../common/traits/TraitSingle";
import { useEffectsContext } from "../../../common/contexts/EffectsContext";
import { CheckboxItemTrait } from "../common/controls/CheckboxItemTrait";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
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
                <SliderContainerLong>
                    <Slider
                        min={0} max={5} step={0.005} 
                        value={properties.intensity}
                        handleChange={(value) => updateEffectProperties(type, {intensity: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEffectProperties(type, {intensity: 1} )} />
            </TraitSingle>
            
            <TraitSingle name="Threshold">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.0005} 
                        value={properties.luminanceThreshold}
                        handleChange={(value) => updateEffectProperties(type, {luminanceThreshold: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEffectProperties(type, {luminanceThreshold: 0.15} )} />
            </TraitSingle>

            <TraitSingle name="Smoothing">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.0005} 
                        value={properties.luminanceSmoothing} 
                        handleChange={(value) => updateEffectProperties(type, {luminanceSmoothing: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEffectProperties(type, {luminanceSmoothing: 0.025} )} />
            </TraitSingle>
        </>
    );
}