import React from "react";
import styles from './PopupMainButton.module.css';

import { ReactComponent as CubeIcon } from './../../../../icons/sidebar/cube.svg';

type Props = {
    displayName: string,
    isOpen: boolean,
    toggleOpen: () => void,
}

export const PopupMainButton = ( {displayName, isOpen, toggleOpen}: Props) => {
    return (
        <div
            className={isOpen ? `${styles.button} ${styles.active}` : styles.button}
            onClick={() => toggleOpen() }
        >
            <label className={styles.name}>{displayName}</label>
            <div>
                <CubeIcon className={styles.mainIcon} />
                {isOpen
                    ? <span className={styles.arrow}>&#8657;</span>
                    : <span className={styles.arrow}>&#8659;</span>}
            </div>
        </div>
    );
}