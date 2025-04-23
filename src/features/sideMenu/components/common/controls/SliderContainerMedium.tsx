import React, { ReactNode } from "react";
import styles from "./SliderContainer.module.css";

type Props = {
    children?: ReactNode
}

export const SliderContainerMedium = ({children}: Props) => {
    return (
        <div className={styles.mediumContainer}>
            {children}
        </div>
    );
}