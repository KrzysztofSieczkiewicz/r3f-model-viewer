import React, { ReactElement } from "react";
import styles from './SidebarMenuButton.module.css';

import { MenuTypes } from "./Sidebar";

type Props = {
    type: MenuTypes,
    active: boolean,
    onClick: () => void,
    children: ReactElement,
}

export const SidebarMenuButton = ({ type, active, onClick, children }: Props) => {

    const handleIcon = () => React.cloneElement(children, {
        className: active
            ? `${children.props.className ? children.props.className + ' ' : ''}${styles.icon} ${styles.active}`
            : `${children.props.className ? children.props.className + ' ' : ''}${styles.icon}`,
    });

    return (
        <li className={styles.sidebarItem} >
            <span className={styles.buttonBackground}>
                <a
                    href="#" 
                    className={active ? `${styles.button} ${styles.active}` : styles.button}
                    onClick={onClick}
                >
                    {handleIcon()}
                </a>
            </span>
        </li>
    );
}