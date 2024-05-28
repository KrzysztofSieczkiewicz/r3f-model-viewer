import React from 'react';
import styles from './Effects.module.css'

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';

import { EFFECT_TYPES, EffectWrapper } from '../../../models/Effect';
import { Slider } from '../common/Slider';
import { Checkbox } from '../common/Checkbox';
import { useEffectsContext } from '../../contexts/EffectsContext';


type Props = {
    active: boolean,
    effect: EffectWrapper
    onClick: () => void
}

export const EffectItem = ( {active, effect, onClick}: Props) => {
    const { updateEffectProperties } = useEffectsContext(); 

    const handleEffectName = () => {
        return effect.type.charAt(0).toUpperCase() + effect.type.slice(1);
    }

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={active ? `${styles.effectContainer} ${styles.active}` : styles.effectContainer}>
            <div className={styles.effectHeader}
                onClick={onClick}
            >
                <PointLightIcon className={styles.effectIcon} />
                <p className={styles.effectName}>{ handleEffectName() }</p>
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>

            {active && <div className={styles.effectBody}>
                {effect.type === EFFECT_TYPES.bloom && <>
                    <Checkbox
                        name={'Active'}
                        value={effect.properties.enabled}
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.bloom, {enabled: value} )} />
                    <Slider 
                        name={'Intensity'} 
                        min={0} max={5} step={0.005} 
                        value={effect.properties.intensity} defaultValue={1} 
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.bloom, {intensity: value} )} />
                    <Slider 
                        name={'Threshold'} 
                        min={0} max={1} step={0.0005} 
                        value={effect.properties.luminanceThreshold} defaultValue={0.15} 
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.bloom, {luminanceThreshold: value} )} />
                    <Slider 
                        name={'Smoothing'} 
                        min={0} max={1} step={0.0005} 
                        value={effect.properties.luminanceSmoothing} defaultValue={0.025} 
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.bloom, {luminanceSmoothing: value} )} />
                </>}
                {effect.type === EFFECT_TYPES.depthOfField && <>
                    <Checkbox
                        name={'Active'}
                        value={effect.properties.enabled}
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.depthOfField, {enabled: value} )} />
                    <Slider 
                        name={'Focus distance'} 
                        min={0} max={50} step={0.005} 
                        value={effect.properties.focusDistance} defaultValue={1} 
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.depthOfField, {focusDistance: value} )} />
                    <Slider 
                        name={'Focal length'} 
                        min={0} max={50} step={0.005} 
                        value={effect.properties.focalLength} defaultValue={1} 
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.depthOfField, {focalLength: value} )} />
                    <Slider 
                        name={'Bokeh scale'} 
                        min={0} max={5} step={0.005} 
                        value={effect.properties.bokehScale} defaultValue={1} 
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.depthOfField, {bokehScale: value} )} />
                </>}
                {effect.type === EFFECT_TYPES.glitch && <>
                    <Checkbox
                        name={'Active'}
                        value={effect.properties.enabled}
                        handleChange={(value) => updateEffectProperties(EFFECT_TYPES.glitch, {enabled: value} )} />
                </>}
            </div>}
        </div>
    );
}