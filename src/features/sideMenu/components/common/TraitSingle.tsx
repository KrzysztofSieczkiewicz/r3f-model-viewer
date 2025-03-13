import React, { ReactNode } from "react";
import styles from './TraitContainers.module.css';

type Props = {
    name?: string,
    children: ReactNode,
}

// TODO: HOW TO ADJUST FOR DIFFERENT TRAIT NAMES LENGTHS?
export const TraitSingle = ({name, children}: Props) => {

    return (
        <div className={styles.singleMainContainer}>
            {name && <p className={styles.singleContainerName}>{name}</p>}
            {children}
        </div>
    );
}