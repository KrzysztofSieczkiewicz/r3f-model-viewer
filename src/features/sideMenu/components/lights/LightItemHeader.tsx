import React from "react";
import styles from './../common/submenus/Submenu.module.css';
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";

import { VisbilityEyeToggle } from "../../../../components/sidebar/common/VisbilityEyeToggle";
import { LightTypeIcon } from "../../../../components/sidebar/lights/LightTypeIcon";
import { LIGHT_TYPES, LightTypes, LightWrapper } from "../../../../models/Light";
import { DropdownListedObjectType } from "../common/controls/DropdownListedObjectType";


type Props = {
    isActive: boolean,
    light: LightWrapper
    
    toggleExtend: () => void,
}

export const LightItemHeader = ( {isActive, light, toggleExtend }: Props) => {
    const { updateLightProperties, changeLightType, } = useSceneObjectsContext();

    const { color, isVisible } = light.properties;

    const handleArrowDirection = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div 
            style={{gridTemplateColumns: '1fr 5fr 1fr 1fr 1fr'}}
            className={styles.listedItemHeader} 
            onClick={toggleExtend}
        >
            <LightTypeIcon type={light.type} />
            <DropdownListedObjectType<LIGHT_TYPES> 
                current={light.type} 
                availableOptions={Object.values(LIGHT_TYPES)} 
                onChange={(type: LightTypes) => changeLightType(light.id, type)} />
            <div className={styles.headerColorPreview} style={{backgroundColor: color}}/>
            <VisbilityEyeToggle 
                isVisible={isVisible}
                updateObject={ (val) => updateLightProperties(light.id, {isVisible: val} )} 
            />
            <span className={styles.listedItemExtendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}