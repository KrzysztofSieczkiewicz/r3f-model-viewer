import React, { ReactNode } from "react";
import styles from "./SliderContainer.module.css";

type Props = {
    children?: ReactNode
}

export const SliderContainerShort = ({children}: Props) => {
    return (
        <div className={styles.shortContainer}>
            {children}
        </div>
    );
}