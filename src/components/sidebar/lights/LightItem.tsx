import React from 'react';
import styles from './Lights.module.css';

import { LightTypeDropdown } from './LightTypeDropdown';
import { VisibilityButton } from '../common/VisibilityButton';
import { LIGHT_TYPES, LightProperties, LightTypes, LightWrapper } from '../../../models/Light';
import { LightTypeIcon } from './LightTypeIcon';
import { PointLightControls } from './controlsTypes/PointLightControls';
import { SpotLightControls } from './controlsTypes/SpotLightControls';

type Props = |{
    isActive: boolean,
    light: LightWrapper,

    onClick: () => void,
    changeLightType: (type: LightTypes) => void,
    updateLight: (change: Partial<LightProperties>) => void,
}

export const LightItem = ({ isActive, light, onClick, changeLightType, updateLight }: Props) => {
    const { color, isVisible } = light.properties;

    const handleIsActive = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    const renderControls = () => {
        switch(light.type) {
            case LIGHT_TYPES.pointLight:
                return <PointLightControls id={light.id} properties={light.properties} />
            case LIGHT_TYPES.spotLight:
                return <SpotLightControls id={light.id} properties={light.properties} />
        }
    }

    return (
        <div className={isActive ? `${styles.lightContainer} ${styles.active}` : styles.lightContainer}>
            <div className={styles.lightHeader}
                onClick={onClick} >

                <LightTypeIcon type={light.type} />
                <LightTypeDropdown 
                    current={light.type} 
                    selectionList={[{type: LIGHT_TYPES.pointLight, display: "Point light"}, {type: LIGHT_TYPES.spotLight, display: "Spot light"}]} 
                    handleChange={(val) => changeLightType(val)} 
                />
                <div className={styles.colorPreview} style={{backgroundColor: color}}/>
                <VisibilityButton 
                    isVisible={isVisible}
                    updateObject={ (val) => updateLight( {isVisible: val} )} 
                />
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>
            {isActive && renderControls()}
        </div>
    );
}