import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    children: ReactNode
}

export const ListedObject = ({children}: Props) => {
    return (
        <div className={styles.listedObjectContainer}>
            {children}
        </div>
    );
}