import React from "react";
import styles from './Submenu.module.css';

import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    title?: string,
}
export const SubmenuSection = ({children, title}: Props) => {
    return (
        <section className={styles.menuSection}>
            {title &&
            <h3 className={styles.sectionHeader}>
                {title}
            </h3> }
            {children}
        </section>
    );
}