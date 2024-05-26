import React from 'react';
import styles from './Lights.module.css';

import { Slider } from '../common/Slider';
import { PositionSliders } from '../common/PositionSliders';
import { ColorPicker } from '../common/ColorPicker';
import { LightTypeDropdown } from './LightTypeDropdown';
import { VisibilityButton } from '../common/VisibilityButton';
import { LIGHT_TYPES, LightOptions, LightWrapper } from '../../../models/Light';
import { LightTypeIcon } from './LightTypeIcon';
import { DeleteItemButton } from '../common/DeleteItemButton';

type Props = |{
    isActive: boolean,
    type: LightOptions,
    position: [number, number, number],
    color: string,
    isVisible: boolean,
    intensity: number,
    distance: number,
    angle: number,
    penumbra: number,

    onClick: () => void,
    updateLight: (change: Partial<LightWrapper>) => void,
    deleteLight: () => void
}

export const LightItem = ({ isActive, type, position, color, isVisible, intensity, distance, angle, penumbra, onClick, updateLight, deleteLight }: Props) => {

    const handleIsActive = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={isActive ? `${styles.lightContainer} ${styles.active}` : styles.lightContainer}>
            <div className={styles.lightHeader}
                onClick={onClick}
            >
                <LightTypeIcon type={type} />
                <LightTypeDropdown 
                    selected={type} 
                    selectionList={[{type: LIGHT_TYPES.pointLight, display: "Point light"}, {type: LIGHT_TYPES.spotLight, display: "Spot light"}]} 
                    handleChange={(val) => updateLight( {type: val} )} 
                />
                <div className={styles.colorPreview} style={{backgroundColor: color}}/>
                <VisibilityButton 
                    isVisible={isVisible}
                    updateObject={ (val) => updateLight( {visible: val} )} 
                />
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>

            {isActive && <div className={styles.lightBody}>

            <span className={styles.deleteButtonContainer}>
                    <DeleteItemButton deleteObject={() => deleteLight()}/>
                </span>
                
                <PositionSliders name="Position"
                    value={position} step={0.01}
                    handleChange={(val) => updateLight( {position: val} )} 
                />
                <ColorPicker name="Color" 
                    currentColor={color}
                    handleChange={(val) => updateLight( {color: val} )}  />
                <Slider name="Intensity"
                    value={intensity}
                    handleChange={(val) => updateLight( {intensity: val} )} 
                    min={0} max={3} step={0.005} defaultValue={1}
                />
                <Slider name="Distance"
                    value={distance}
                    handleChange={(val) => updateLight( {distance: val} )} 
                    min={0} max={100} step={0.1} defaultValue={10}
                />
                {type === LIGHT_TYPES.spotLight && <>
                    <Slider name="Angle"
                        value={angle}
                        handleChange={(val) => updateLight( {angle: val} )} 
                        min={0} max={1} step={0.002} defaultValue={0.3}
                    />
                    <Slider name="Penumbra"
                        value={penumbra}
                        handleChange={(val) => updateLight( {penumbra: val} )} 
                        min={0} max={1} step={0.002} defaultValue={0.6}
                    />
                </>}
            </div>}
        </div>
    );
}