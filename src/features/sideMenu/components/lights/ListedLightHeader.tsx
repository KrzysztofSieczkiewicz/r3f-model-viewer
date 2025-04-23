import React from "react";
import styles from './../common/submenus/Submenu.module.css';
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";

import { ButtonToggleVisibility } from "../common/controls/ButtonToggleVisibility";
import { ListedLightTypeIcon } from "./ListedLightTypeIcon";
import { LIGHT_TYPES, LightType, LightWrapper } from "../../../../models/Light";
import { DropdownListedObjectType } from "../common/controls/DropdownListedObjectType";


type Props = {
    isActive: boolean,
    light: LightWrapper
    
    toggleExtend: () => void,
}

export const ListedLightHeader = ( {isActive, light, toggleExtend }: Props) => {
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
            <ListedLightTypeIcon type={light.type} />
            <DropdownListedObjectType<LIGHT_TYPES> 
                current={light.type} 
                availableOptions={Object.values(LIGHT_TYPES)} 
                onChange={(type: LightType) => changeLightType(light.id, type)} />
            <div className={styles.listedItemColorPreview} style={{backgroundColor: color}}/>
            <ButtonToggleVisibility 
                isVisible={isVisible}
                updateObject={ (val) => updateLightProperties(light.id, {isVisible: val} )} 
            />
            <span className={styles.listedItemExtendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}