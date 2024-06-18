import React from "react";
import styles from './ResetButton.module.css';

type Props = {
    handleReset: () => void,
}

export const ResetButton = ( {handleReset}: Props) => {

    return (
        <button className={styles.resetButton}
                onClick={handleReset} >
            &#8635;
        </button>
    );
}