import React, { ReactNode } from "react";
import styles from './../NewSidebar.module.css'

type Props = {
    isActive: boolean,
    children: ReactNode
}

export const MenuListItem = ({isActive, children}: Props) => {
    return (
        <div className={isActive ? `${styles.listItemContainer} ${styles.active}` : styles.listItemContainer}>
            {children}
        </div>
    );
}