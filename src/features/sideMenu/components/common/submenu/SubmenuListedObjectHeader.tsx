import React, { ReactNode } from "react";
import styles from './Submenu.module.css';

type Props = {
    children: ReactNode
}

// TODO: make this a parametrized class that can be used by any submenu.
// at best it should just contain all children as parameter and list of their widths ratios

export const SubmenuListedObjectHeader = ( {children }: Props) => {

    return (
        <div
            style={{gridTemplateColumns: '1fr 5fr 1fr 1fr'}}
            className={styles.header}
        >
            {children}
        </div>
    );
}