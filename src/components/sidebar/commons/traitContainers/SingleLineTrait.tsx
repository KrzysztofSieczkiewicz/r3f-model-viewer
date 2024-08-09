import React, { ReactNode } from "react";
import styles from './SingleLineTrait.module.css';

type Props = {
    name?: string,
    children: ReactNode,
}

// TODO: HOW TO ADJUST FOR DIFFERENT TRAIT NAMES LENGTHS?
export const SingleLineTrait = ({name, children}: Props) => {

    return (
        <div className={styles.container}>
            {name && <label className={styles.traitName}>{name}</label>}
            {children}
        </div>
    );
}