import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    children?: ReactNode
}

export const Submenu = ({children}: Props) => {
    return (
        <div className={styles.menu}>
            {children}
        </div>
    );
}