import React, { ReactNode, useRef } from "react";
import styles from './ButtonAddListedObject.module.css';

type Props = {
    buttonName: string,
    handleClicked: () => void,
    children: ReactNode,
}

export const ButtonAddListedObject = ( {buttonName, handleClicked, children}: Props) => {

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <button ref={buttonRef} className={styles.button} onClick={() => handleClicked()}> {buttonName} </button>
            {children}
        </>
    );
}