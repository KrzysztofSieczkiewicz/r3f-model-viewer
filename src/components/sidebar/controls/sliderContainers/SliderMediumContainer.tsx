import React, { ReactNode } from "react";
import styles from "./SliderContainers.module.css";

type Props = {
    children?: ReactNode
}

export const SliderMediumContainer = ({children}: Props) => {
    return (
        <div className={styles.mediumContainer}>
            {children}
        </div>
    );
}