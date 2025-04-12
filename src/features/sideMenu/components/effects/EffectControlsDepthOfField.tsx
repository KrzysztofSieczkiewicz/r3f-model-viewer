import React from "react";

import { DepthOfFieldProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { TraitSingle } from "../common/traits/TraitSingle";
import { useEffectsContext } from "../../../../components/contexts/EffectsContext";
import { Checkbox } from "../common/controls/Checkbox";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { SliderLimited } from "../../../../components/sidebar/controls/SliderLimited";
import { ButtonReset } from "../common/controls/ButtonReset";

type Props = {
    properties: DepthOfFieldProperties,
}

export const EffectControlsDepthOfField = ( {properties}: Props ) => {
    const { updateEffectProperties } = useEffectsContext(); 

    const type = EFFECT_TYPES.depthOfField;

    return (
        <>
            <TraitSingle name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </TraitSingle>

            <TraitSingle name="Focus distance">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focusDistance}
                        handleChange={(value) => updateEffectProperties(type, {focusDistance: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEffectProperties(type, {focusDistance: 0.0035} )} />
            </TraitSingle>

            <TraitSingle name="Focal length">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focalLength}
                        handleChange={(value) => updateEffectProperties(type, {focalLength: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEffectProperties(type, {focalLength: 0.01} )} />
            </TraitSingle>

            <TraitSingle name="Bokeh scale">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={5} step={0.005} 
                        value={properties.bokehScale} 
                        handleChange={(value) => updateEffectProperties(type, {bokehScale: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEffectProperties(type, {bokehScale: 3} )} />
            </TraitSingle>
        </>
    );
}