import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { useSidebarControlsContext } from '../SidebarControlsContext'
import React from 'react';
import { EffectWrapper } from '../../../models/Effect';
import { Slider } from '../common/Slider';
import { Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';

type Props = {
    active: boolean,
    effect: EffectWrapper
    onClick: () => void
}

// TODO [TUTORING]: SHOULD I WRAP FUNCTIONS PASSED TO THE CHILDREN WITH useMemo()/useCallback()?
export const EffectItem = ( {active, effect, onClick}: Props) => {

    const { updateEffectProperty } = useSidebarControlsContext();

    const handleEffectName = () => {
        return effect.name.charAt(0).toUpperCase() + effect.name.slice(1);
    }

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header asset-item-header"
                onClick={onClick}
            >
                <PointLightIcon className='type-icon header-icon' />
                <p className='header-title'>{ handleEffectName() }</p>
                <div/>
                <span className='show-hide header-icon'>{ handleIsActive() }</span>
            </div>

            {active && <div className="dropdown-item-body">
                {effect.type === Bloom && <>
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
            </div>}
        </div>
    );
}