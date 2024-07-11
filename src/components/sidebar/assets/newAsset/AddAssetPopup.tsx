import React from "react";
import styles from './AddAssetPopup.module.css'


export const AddAssetPopup = () => {

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <button>Primitive</button>
                <button></button>
                <button></button>
            </div>
        </div>
    );
}