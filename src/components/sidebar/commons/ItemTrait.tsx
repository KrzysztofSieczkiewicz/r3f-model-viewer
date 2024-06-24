import React from "react";
import { ReactNode } from "react";
import styles from '../Sidebar.module.css';

type Props = {
    name: string,
    children: ReactNode,
}

export const ItemTrait = ({name, children}: Props) => {

    return (
        <div className={styles.traitContainer}>
            <label className={styles.traitName}>{name}</label>
            {children}
        </div>
    );
}