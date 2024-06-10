import React from "react";
import menuStyles from './../NewSidebar.module.css'

import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    title: string,
}
export const MenuSection = ({children, title}: Props) => {
    return (
        <section className={menuStyles.menuSection}>
            <h3 className={menuStyles.sectionHeader}>{title}</h3>
            {children}
        </section>
    );
}