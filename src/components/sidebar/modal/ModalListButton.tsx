import React from "react";
import styles from './ModalListButton.module.css'

type Props = {
    displayName: string;
    icon: JSX.Element;
    onClick: () => void;
}

export const ModalListButton = ( {displayName, icon, onClick}: Props) => {

    return (
        <button 
            className={styles.button}
            onClick={() => onClick()}
        >
            {icon}
            {displayName}
        </button>
    );
}