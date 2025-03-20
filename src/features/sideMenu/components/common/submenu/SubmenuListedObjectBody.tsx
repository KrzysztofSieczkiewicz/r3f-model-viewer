import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    children: ReactNode;
}

export const SubmenuListedObjectBody = ( {children}: Props) => {
    return (
        <div className={styles.listItemBody}>
            {children}
        </div>
    );
}