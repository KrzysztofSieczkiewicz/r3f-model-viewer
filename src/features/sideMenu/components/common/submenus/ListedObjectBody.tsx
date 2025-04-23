import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    children: ReactNode;
}

export const ListedObjectBody = ( {children}: Props) => {
    return (
        <div className={styles.listedItemBody}>
            {children}
        </div>
    );
}