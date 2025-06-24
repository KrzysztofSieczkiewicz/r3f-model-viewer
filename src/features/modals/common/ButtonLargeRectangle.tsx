import React from "react";
import styles from './ButtonLargeRectangle.module.css';

type Props = {
    onClick: () => void,

    displayName: string,
    icon: JSX.Element,
    
}

export const ButtonLargeRectangle = ({onClick, displayName, icon}: Props) => {

    return (
        <button className={styles.button} onClick={() => onClick()}  >
            <div className={styles.iconContainer}>
                {React.cloneElement(icon, {className: styles.icon})}
            </div>
            <label className={styles.name}>{displayName}</label>
        </button>
    );
}