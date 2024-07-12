import React, { useState } from "react";
import styles from './AddAssetPopup.module.css'
import { PopupRectangleButton } from "./PopupRectangleButton";


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
                    optionsList={["Sphere", "Cone"]} />
                <PopupRectangleButton 
                    isOpen={activeName === "Unwrapped"}
                    toggleOpen={() => toggleOpen("Unwrapped")}
                    displayName="Unwrapped"
                    optionsList={["Sphere", "Cone"]} />
                <PopupRectangleButton 
                    isOpen={activeName === "Scans"}
                    toggleOpen={() => toggleOpen("Scans")}
                    displayName="Scans"
                    optionsList={["Sphere", "Cone"]} />
            </div>
        </div>
    );
}