import React, { useState } from "react";
import styles from './AddAssetPopup.module.css'

import { PopupRectangleButton } from "./PopupRectangleButton";

import { ReactComponent as SphereIcon } from '../../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as ConeIcon } from '../../../../icons/sidebar/primitives/primitive_cone.svg'
import { PopupListItem } from "./PopupListItem";


export const AddAssetPopup = () => {

    const [ activeName, setActiveName ] = useState("")

    const toggleOpen = (name: string) => {
        if (activeName === name) {
            setActiveName("");
        } else {
            setActiveName(name);
        }
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <PopupRectangleButton
                    isOpen={activeName === "Primitives"}
                    toggleOpen={() => toggleOpen("Primitives")}
                    displayName="Primitives"
                >
                    <PopupListItem displayName="Sphere" icon={<SphereIcon className={styles.listIcon}/>} />
                    <PopupListItem displayName="Cone" icon={<ConeIcon className={styles.listIcon}/>} />
                </PopupRectangleButton>
            </div>
        </div>
    );
}