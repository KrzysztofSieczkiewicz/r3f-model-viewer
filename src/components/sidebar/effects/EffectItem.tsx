import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from '../../../models/Asset';
import { VisibilityEyeButton } from '../common/VisibilityEyeButton';
import { useSidebarControlsContext } from '../SidebarControlsContext'
import { SlidersArray } from '../common/SlidersArray';
import React from 'react';
import { EffectWrapper } from '../../../models/Effect';
import { Slider } from '../common/Slider';

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
                <Slider 
                    name={'Intensity'} 
                    min={0} max={5} step={0.005} 
                    value={effect.intensity} defaultValue={1} 
                    handleChange={(value) => { updateEffectProperty(effect.id, 'intensity', value) }} />

            </div>}
        </div>
    );
}