import React from "react";

import { DepthOfFieldProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { TraitSingle } from "../common/traits/TraitSingle";
import { useEffectsContext } from "../../../common/contexts/EffectsContext";
import { CheckboxItemTrait } from "../common/controls/CheckboxItemTrait";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
import { ButtonReset } from "../common/controls/ButtonReset";
import { Slider } from "../common/controls/Slider";

type Props = {
    properties: DepthOfFieldProperties,
}

export const EffectControlsDepthOfField = ( {properties}: Props ) => {
    const { updateEffectProperties } = useEffectsContext(); 

    const type = EFFECT_TYPES.depthOfField;

    return (
        <>
            <TraitSingle name="Active">
                <CheckboxItemTrait
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </TraitSingle>

            <TraitSingle name="Focus distance">
                <SliderContainerLong>
                    <Slider
                        min={0} max={50} step={0.005} 
                        value={properties.focusDistance}
                        handleChange={(value) => updateEffectProperties(type, {focusDistance: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEffectProperties(type, {focusDistance: 0.0035} )} />
            </TraitSingle>

            <TraitSingle name="Focal length">
                <SliderContainerLong>
                    <Slider
                        min={0} max={50} step={0.005} 
                        value={properties.focalLength}
                        handleChange={(value) => updateEffectProperties(type, {focalLength: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEffectProperties(type, {focalLength: 0.01} )} />
            </TraitSingle>

            <TraitSingle name="Bokeh scale">
                <SliderContainerLong>
                    <Slider
                        min={0} max={5} step={0.005} 
                        value={properties.bokehScale} 
                        handleChange={(value) => updateEffectProperties(type, {bokehScale: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEffectProperties(type, {bokehScale: 3} )} />
            </TraitSingle>
        </>
    );
}