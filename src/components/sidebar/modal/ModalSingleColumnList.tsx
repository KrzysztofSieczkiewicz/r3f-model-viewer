import React, { ReactNode } from "react";
import styles from './ModalSingleColumnList.module.css'

type Props = {
    isOpen: boolean,
    
    children: ReactNode,
}

const renderListItem = (button: ReactNode) => {
    return (
        <li key={button?.toString()}>
           {button} 
        </li>
    );
}

export const ModalSingleColumnList = ({ isOpen, children }: Props) => {

    if(!isOpen) return;
    return (
        <ul className={styles.optionsList}>
            {React.Children.map(children, child => renderListItem(child))}
        </ul>
    )

}