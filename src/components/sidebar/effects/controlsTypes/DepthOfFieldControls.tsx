import React from "react";

import { DepthOfFieldProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { SliderLimited } from "../../controls/SliderLimited";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { ListItemBody } from "../../commons/ListItemBody";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { TraitSingle } from "../../../../features/sideMenu/components/common/traitContainers/TraitSingle";

type Props = {
    properties: DepthOfFieldProperties,
}

export const DepthOfFieldControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.depthOfField;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
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
                <ResetButton onReset={() => updateEffectProperties(type, {focusDistance: 0.0035} )} />
            </TraitSingle>

            <TraitSingle name="Focal length">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focalLength}
                        handleChange={(value) => updateEffectProperties(type, {focalLength: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {focalLength: 0.01} )} />
            </TraitSingle>

            <TraitSingle name="Bokeh scale">
                <SliderLongContainer>
                    <SliderLimited
                        min={0} max={5} step={0.005} 
                        value={properties.bokehScale} 
                        handleChange={(value) => updateEffectProperties(type, {bokehScale: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEffectProperties(type, {bokehScale: 3} )} />
            </TraitSingle>
        </ListItemBody>
    );
}