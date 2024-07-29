import React from "react";
import styles from './PopupListItem.module.css'

type Props = {
    displayName: string;
    icon: JSX.Element;
    onClick: () => void;
}

export const PopupListItem = ( {displayName, icon, onClick}: Props) => {

    return (
        <li 
            className={styles.option}
            onClick={() => onClick()}
        >
            {icon}
            {displayName}
        </li>
    );
}