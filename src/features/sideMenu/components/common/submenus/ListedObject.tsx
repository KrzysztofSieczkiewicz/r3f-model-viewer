import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    isActive: boolean,
    children: ReactNode
}

export const ListedObject = ({isActive, children}: Props) => {
    return (
        <div className={isActive ? `${styles.listedItemContainer} ${styles.active}` : styles.listedItemContainer}>
            {children}
        </div>
    );
}