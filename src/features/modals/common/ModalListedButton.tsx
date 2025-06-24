import React from "react";
import styles from './ModalListedButton.module.css'

type Props = {
    displayName: string;
    icon: JSX.Element;
    onClick: () => void;
}

export const ModalListedButton = ( {displayName, icon, onClick}: Props) => {

    return (
        <button 
            className={styles.button}
            onClick={() => onClick()}
        >
            {React.cloneElement(icon, {className: styles.listIcon})}
            {displayName}
        </button>
    );
}