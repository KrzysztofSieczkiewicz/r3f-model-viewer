import React, { ReactNode } from "react";
import styles from './ModalSingleColumnList.module.css'

type Props = {
    children: ReactNode,
}

const renderListItem = (button: ReactNode) => {
    return (
        <li key={button?.toString()}>
           {button} 
        </li>
    );
}

export const ModalSingleColumnList = ({ children }: Props) => {

    return (
        <ul className={styles.optionsList}>
            {React.Children.map(children, child => renderListItem(child))}
        </ul>
    )

}