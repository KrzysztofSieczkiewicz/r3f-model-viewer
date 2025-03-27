import React from "react";
import styles from './../common/submenu/Submenu.module.css';
import lightStyles from './LightItem.module.css';
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";

import { VisbilityEyeToggle } from "../../../../components/sidebar/common/VisbilityEyeToggle";
import { LightTypeIcon } from "../../../../components/sidebar/lights/LightTypeIcon";
import { LIGHT_TYPES, LightTypes, LightWrapper } from "../../../../models/Light";
import { LightTypeDropdown } from "./LightTypeDropdown";
import { DropdownChangeListedObjectType } from "../common/submenu/DropdownChangeListedObjectType";


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
            <DropdownChangeListedObjectType<LIGHT_TYPES> 
                current={light.type} 
                availableOptions={Object.values(LIGHT_TYPES)} 
                onChange={(type: LightTypes) => changeLightType(light.id, type)} />

            <LightTypeDropdown 
                current={light.type} 
                selectionList={[{type: LIGHT_TYPES.pointLight, display: "Point light"}, {type: LIGHT_TYPES.spotLight, display: "Spot light"}]} 
                handleChange={(val) => changeLightType(light.id, val)}  />
            <div className={lightStyles.headerColorPreview} style={{backgroundColor: color}}/>
            <VisbilityEyeToggle 
                isVisible={isVisible}
                updateObject={ (val) => updateLightProperties(light.id, {isVisible: val} )} 
            />
            <span className={styles.listedItemExtendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}