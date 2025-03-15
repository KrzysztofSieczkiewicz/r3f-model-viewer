import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    children: ReactNode
}

export const SubmenuListedItemHeader = ( {children }: Props) => {

    return (
        <div
            style={{gridTemplateColumns: '1fr 5fr 1fr 1fr'}}
            className={styles.header}
        >
            {children}
        </div>
    );
}