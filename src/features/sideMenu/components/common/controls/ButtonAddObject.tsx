import React, { ReactNode, useRef } from "react";
import styles from './ButtonAddObject.module.css';

type Props = {
    buttonName: string,
    handleClicked: () => void,
    children: ReactNode,
}

export const ButtonAddObject = ( {buttonName, handleClicked, children}: Props) => {

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <button ref={buttonRef} className={styles.button} onClick={() => handleClicked()}> {buttonName} </button>
            {children}
        </>
    );
}