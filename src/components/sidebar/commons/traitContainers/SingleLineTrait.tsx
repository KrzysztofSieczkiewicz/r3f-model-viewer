import React from "react";
import { ReactNode } from "react";
import styles from '../../Sidebar.module.css';

type Props = {
    name: string,
    children: ReactNode,
}

// TODO: MOVE STYLES FOR TRAIT CONTAINERS INTO SEPARATE MODULE?
export const SingleLineTrait = ({name, children}: Props) => {

    return (
        <div className={styles.traitContainer}>
            <label className={styles.traitName}>{name}</label>
            {children}
        </div>
    );
}