import React from "react";
import styles from '../Effects.module.css'

import { DepthOfFieldProperties, EFFECT_TYPES } from "../../../../models/Effect";
import { Checkbox } from "../../common/Checkbox";
import { Slider } from "../../common/Slider";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";

type Props = {
    properties: DepthOfFieldProperties,
}

export const DepthOfFieldControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.depthOfField;

    return (
        <div className={styles.effectBody}>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <Checkbox
                name={'Active'}
                value={properties.enabled}
                handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            <Slider 
                name={'Focus distance'} 
                min={0} max={50} step={0.005} 
                value={properties.focusDistance}
                handleChange={(value) => updateEffectProperties(type, {focusDistance: value} )} />
            <Slider 
                name={'Focal length'} 
                min={0} max={50} step={0.005} 
                value={properties.focalLength}
                handleChange={(value) => updateEffectProperties(type, {focalLength: value} )} />
            <Slider 
                name={'Bokeh scale'} 
                min={0} max={5} step={0.005} 
                value={properties.bokehScale} 
                handleChange={(value) => updateEffectProperties(type, {bokehScale: value} )} />
        </div>
    );
}