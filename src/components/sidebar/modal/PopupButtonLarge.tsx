import React, { ReactNode } from "react";
import styles from './PopupButtonLarge.module.css';

import { ReactComponent as CubeIcon } from './../../../icons/sidebar/cube.svg';

type Props = {
    displayName: string,
    isOpen: boolean,
    toggleOpen: () => void,
    
    children: ReactNode
}

// TODO: DISSOLVE THIS INTO THREE LEVELS:
/*
    1. Button accepting the children which are shown on click (e.g. types of lists)
    2. The main list with formatting accepting children which are options (e.g. <li> items with different styling)
    3. <li> items with different formatting and styles
*/
export const PopupButtonLarge = ( {displayName, isOpen, toggleOpen, children}: Props) => {
    return (
        <div className={styles.container} >
            <button
                className={isOpen ? `${styles.button} ${styles.active}` : styles.button}
                onClick={() => toggleOpen() }
            >
                <label className={styles.name}>{displayName}</label>
                <div className={styles.iconContainer}>
                    <CubeIcon className={styles.mainIcon} />
                    {isOpen
                        ? <span className={styles.arrow}>&#8657;</span>
                        : <span className={styles.arrow}>&#8659;</span>}
                </div>
            </button>
            {isOpen && (
                <ul className={styles.optionsList}>
                    {React.Children.map(children, child => (
                        child
                    ))}
                </ul>
            )}
        </div>
    );
}