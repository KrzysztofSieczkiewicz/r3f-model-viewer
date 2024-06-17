import React from "react";
import styles from '../Effects.module.css'

import { DepthOfFieldProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../common/Checkbox";
import { SliderLimited } from "../../controls/SliderLimited";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";
import { SliderSingleContainer } from "../../controls/sliderContainers/SliderSingleContainer";

type Props = {
    properties: DepthOfFieldProperties,
}

export const DepthOfFieldControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.depthOfField;

    return (
        <div className={styles.effectBody}>
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
            </ItemTrait>

            <ItemTrait name="Focal length">
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={50} step={0.005} 
                        value={properties.focalLength}
                        handleChange={(value) => updateEffectProperties(type, {focalLength: value} )} />
                </SliderSingleContainer>
            </ItemTrait>

            <ItemTrait name="Bokeh scale">
                <SliderSingleContainer>
                    <SliderLimited
                        min={0} max={5} step={0.005} 
                        value={properties.bokehScale} 
                        handleChange={(value) => updateEffectProperties(type, {bokehScale: value} )} />
                </SliderSingleContainer>
            </ItemTrait>
        </div>
    );
}