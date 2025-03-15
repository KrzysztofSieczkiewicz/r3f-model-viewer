import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    isActive: boolean,
    children: ReactNode
}

export const SubmenuListedItem = ({isActive, children}: Props) => {
    return (
        <div className={isActive ? `${styles.listItemContainer} ${styles.active}` : styles.listItemContainer}>
            {children}
        </div>
    );
}