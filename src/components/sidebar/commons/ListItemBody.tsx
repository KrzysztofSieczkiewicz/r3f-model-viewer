import React, { ReactNode } from "react";
import styles from './../NewSidebar.module.css'

type Props = {
    children: ReactNode;
}

export const ListItemBody = ( {children}: Props) => {
    return (
        <div className={styles.listItemBody}>
            {children}
        </div>
    );
}