import React, { ReactNode } from "react"
import styles from './SideNavbar.module.css';

type Props = {
    children: ReactNode;
}

export const SideNavbar = ( {children}: Props ) => {


    return (
    <nav className={styles.sideNavbar}>
        <ul className={styles.buttonsList}>
            {children}
        </ul>
    </nav>
    )
}