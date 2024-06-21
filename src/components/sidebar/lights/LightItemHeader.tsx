import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { VisbilityEyeToggle } from "../common/VisbilityEyeToggle";
import { LightTypeDropdown } from "./LightTypeDropdown";
import { LightTypeIcon } from "./LightTypeIcon";
import { LIGHT_TYPES, LightWrapper } from "../../../models/Light";


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
            className={styles.header} 
            onClick={toggleExtend}
        >
            <LightTypeIcon type={light.type} />
            <LightTypeDropdown 
                current={light.type} 
                selectionList={[{type: LIGHT_TYPES.pointLight, display: "Point light"}, {type: LIGHT_TYPES.spotLight, display: "Spot light"}]} 
                handleChange={(val) => changeLightType(light.id, val)}  />
            <div className={styles.colorPreview} style={{backgroundColor: color}}/>
            <VisbilityEyeToggle 
                isVisible={isVisible}
                updateObject={ (val) => updateLightProperties(light.id, {isVisible: val} )} 
            />
            <span className={styles.extendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}