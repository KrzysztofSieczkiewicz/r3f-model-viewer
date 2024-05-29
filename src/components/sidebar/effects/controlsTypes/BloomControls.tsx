import React from "react";
import styles from '../Effects.module.css'

import { BloomProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../common/Checkbox";
import { Slider } from "../../common/Slider";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";

type Props = {
    properties: BloomProperties,
}

export const BloomControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.bloom;

    return (
        <div className={styles.effectBody}>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <Checkbox
                name={'Active'}
                value={properties.enabled}
                handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            <Slider 
                name={'Intensity'} 
                min={0} max={5} step={0.005} 
                value={properties.intensity} defaultValue={1} 
                handleChange={(value) => updateEffectProperties(type, {intensity: value} )} />
            <Slider 
                name={'Threshold'} 
                min={0} max={1} step={0.0005} 
                value={properties.luminanceThreshold} defaultValue={0.15} 
                handleChange={(value) => updateEffectProperties(type, {luminanceThreshold: value} )} />
            <Slider 
                name={'Smoothing'} 
                min={0} max={1} step={0.0005} 
                value={properties.luminanceSmoothing} defaultValue={0.025} 
                handleChange={(value) => updateEffectProperties(type, {luminanceSmoothing: value} )} />
        </div>
    );
}