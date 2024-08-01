import React from "react";
import styles from './ModalDropdownOptionButton.module.css'

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
            {React.cloneElement(icon, {className: styles.listIcon})}
            {displayName}
        </button>
    );
}