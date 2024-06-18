import React from "react";
import styles from './VisbilityEyeToggle.module.css';

type Props = {
    isVisible: boolean
    updateObject: (isVisible: boolean) => void
}

export const VisbilityEyeToggle = ({isVisible, updateObject} :Props): JSX.Element => {
    return (
        <button
            className={isVisible ? styles.button : `${styles.button} ${styles.suppressed}`}
            onClick={(e) => {
                e.stopPropagation();
                updateObject(!isVisible)
            }}
        >&#128065;</button>
    );
}