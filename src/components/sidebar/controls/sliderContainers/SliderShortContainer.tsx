import React, { ReactNode } from "react";
import styles from "./SliderContainers.module.css";

type Props = {
    children?: ReactNode
}

export const SliderShortContainer = ({children}: Props) => {
    return (
        <div className={styles.shortContainer}>
            {children}
        </div>
    );
}