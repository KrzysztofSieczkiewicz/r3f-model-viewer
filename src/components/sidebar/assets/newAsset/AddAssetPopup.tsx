import React, { useState } from "react";
import styles from './AddAssetPopup.module.css'

import { PopupRectangleButton } from "./PopupRectangleButton";

import { ReactComponent as SphereIcon } from '../../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as ConeIcon } from '../../../../icons/sidebar/primitives/primitive_cone.svg'
import { PopupListItem } from "./PopupListItem";
import { Primitives } from "../../../../models/Primitive";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

export const AddAssetPopup = () => {
    const {addAssetPrimitive} = useSceneObjectsContext();

    const [ activeName, setActiveName ] = useState("");

    const toggleOpen = (name: string) => {
        if (activeName === name) {
            setActiveName("");
        } else {
            setActiveName(name);
        }
    };

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <PopupRectangleButton
                    isOpen={activeName === "Primitives"}
                    toggleOpen={() => toggleOpen("Primitives")}
                    displayName="Primitives"
                >
                    <PopupListItem 
                        displayName="Sphere" 
                        icon={<SphereIcon className={styles.listIcon}/>} 
                        onClick={ () => addAssetPrimitive(Primitives.Sphere)} />
                    <PopupListItem 
                        displayName="Cone" 
                        icon={<ConeIcon className={styles.listIcon}/>}
                        onClick={ () => addAssetPrimitive(Primitives.Cone)} />
                </PopupRectangleButton>
            </div>
        </div>
    );
}