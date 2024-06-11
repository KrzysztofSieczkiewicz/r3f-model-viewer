import React, { ReactNode } from "react";
import styles from './../NewSidebar.module.css'

type Props = {
    children?: ReactNode
}

export const SidebarMenu = ({children}: Props) => {
    return (
        <div className={styles.menu}>
            {children}
        </div>
    );
}