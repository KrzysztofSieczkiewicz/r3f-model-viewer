import React, { ReactNode } from "react";
import styles from "./SliderContainer.module.css";

type Props = {
    children?: ReactNode
}

export const SliderContainerLong = ({children}: Props) => {
    return (
        <div className={styles.longContainer}>
            {children}
        </div>
    );
}