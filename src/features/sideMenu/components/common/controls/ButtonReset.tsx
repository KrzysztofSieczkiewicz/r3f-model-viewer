import React from "react";
import styles from './ButtonReset.module.css';

type Props = {
    onReset: () => void,
}

export const ButtonReset = ( {onReset}: Props) => {

    return (
        <button className={styles.resetButton}
                onClick={onReset} >
            &#8635;
        </button>
    );
}