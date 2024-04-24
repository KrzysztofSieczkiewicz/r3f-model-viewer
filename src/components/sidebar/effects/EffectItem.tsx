import React from 'react';
import styles from './Effects.module.css'
import { useSidebarControlsContext } from '../SidebarControlsContext'

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';

import { EffectWrapper } from '../../../models/Effect';
import { Slider } from '../common/Slider';
import { Checkbox } from '../common/Checkbox';
import { Bloom, DepthOfField, Glitch } from '@react-three/postprocessing';


type Props = {
    active: boolean,
    effect: EffectWrapper
    onClick: () => void
}

export const EffectItem = ( {active, effect, onClick}: Props) => {

    const { updateEffectProperty } = useSidebarControlsContext();

    const handleEffectName = () => {
        return effect.name.charAt(0).toUpperCase() + effect.name.slice(1);
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
                {effect.type === Bloom && <>
                    <Checkbox
                        name={'Active'}
                        value={effect.enabled}
                        handleChange={(value) => { updateEffectProperty(effect.id, 'enabled', value)}}
                    />
                    <Slider 
                        name={'Intensity'} 
                        min={0} max={5} step={0.005} 
                        value={effect.intensity} defaultValue={1} 
                        handleChange={(value) => { updateEffectProperty(effect.id, 'intensity', value) }} />
                    <Slider 
                        name={'Threshold'} 
                        min={0} max={1} step={0.0005} 
                        value={effect.luminanceThreshold} defaultValue={0.15} 
                        handleChange={(value) => { updateEffectProperty(effect.id, 'luminanceThreshold', value) }} />
                    <Slider 
                        name={'Smoothing'} 
                        min={0} max={1} step={0.0005} 
                        value={effect.luminanceSmoothing} defaultValue={0.025} 
                        handleChange={(value) => { updateEffectProperty(effect.id, 'luminanceSmoothing', value) }} />
                </>}
                {effect.type === DepthOfField && <>
                    <Checkbox
                        name={'Active'}
                        value={effect.enabled}
                        handleChange={(value) => { updateEffectProperty(effect.id, 'enabled', value)}}
                    />
                    <Slider 
                        name={'Focus distance'} 
                        min={0} max={50} step={0.005} 
                        value={effect.focusDistance} defaultValue={1} 
                        handleChange={(value) => { updateEffectProperty(effect.id, 'focusDistance', value) }} />
                    <Slider 
                        name={'Focal length'} 
                        min={0} max={50} step={0.005} 
                        value={effect.focalLength} defaultValue={1} 
                        handleChange={(value) => { updateEffectProperty(effect.id, 'focalLength', value) }} />
                    <Slider 
                        name={'Bokeh scale'} 
                        min={0} max={5} step={0.005} 
                        value={effect.bokehScale} defaultValue={1} 
                        handleChange={(value) => { updateEffectProperty(effect.id, 'bokehScale', value) }} />
                </>}
                {effect.type === Glitch && <>
                    <Checkbox
                        name={'Active'}
                        value={effect.enabled}
                        handleChange={(value) => { updateEffectProperty(effect.id, 'enabled', value)}}
                    />
                    <Slider 
                        name={'Ratio'} 
                        min={0} max={50} step={0.005} 
                        value={effect.ratio} defaultValue={1} 
                        handleChange={(value) => { updateEffectProperty(effect.id, 'ratio', value) }} />
                </>}
            </div>}
        </div>
    );
}