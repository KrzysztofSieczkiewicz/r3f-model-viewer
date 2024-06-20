import React from "react";
import styles from './ResetButton.module.css';

type Props = {
    onReset: () => void,
}

export const ResetButton = ( {onReset}: Props) => {

    return (
        <button className={styles.resetButton}
                onClick={onReset} >
            &#8635;
        </button>
    );
}