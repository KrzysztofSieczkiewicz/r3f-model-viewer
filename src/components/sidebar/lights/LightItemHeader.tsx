import React from "react";
import styles from './Lights.module.css';

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

    const renderArrow = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={styles.lightHeader} onClick={toggleExtend} >

            <LightTypeIcon type={light.type} />
            <LightTypeDropdown 
                current={light.type} 
                selectionList={[{type: LIGHT_TYPES.pointLight, display: "Point light"}, {type: LIGHT_TYPES.spotLight, display: "Spot light"}]} 
                handleChange={(val) => changeLightType(light.id, val)} 
            />
            <div className={styles.colorPreview} style={{backgroundColor: color}}/>
            <VisbilityEyeToggle 
                isVisible={isVisible}
                updateObject={ (val) => updateLightProperties(light.id, {isVisible: val} )} 
            />
            <span className={styles.extendIcon}>{ renderArrow() }</span>
        </div>
    );
}