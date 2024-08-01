import React from "react";
import styles from './RectangleButtonLarge.module.css';

type Props = {
    isToggled: boolean,
    toggle: () => void,

    displayName: string,
    icon: JSX.Element,
    
}

export const RectangleButtonLarge = ({isToggled, toggle, displayName, icon}: Props) => {

    return (
        <button
                className={isToggled 
                        ? `${styles.button} ${styles.active}` 
                        : styles.button}
                onClick={() => toggle() }
            >
                <label className={styles.name}>{displayName}</label>
                <div className={styles.iconContainer}>
                {React.cloneElement(icon, {className: styles.icon})}
                    {isToggled
                        ? <span className={styles.arrow}>&#8657;</span>
                        : <span className={styles.arrow}>&#8659;</span>}
                </div>
        </button>
    );
}