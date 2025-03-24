import React, { ReactNode } from "react";
import styles from './SidebarMenuButton.module.css';

import { MenuTypes } from "./Sidebar";

import { ReactComponent as LightIcon } from './../../../../icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './../../../../icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './../../../../icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './../../../../icons/sidebar/image.svg';
import { ReactComponent as CameraIcon } from './../../../../icons/sidebar/camera.svg';

type Props = {
    type: MenuTypes;
    children: ReactNode;
    active: boolean,
    onClick: () => void
}

export const SidebarMenuButton = ({ type, children, active, onClick }: Props) => {

    const renderMenuIcon = () => {
        switch(type) {
            case MenuTypes.Environment:
                return <EarthIcon className={active ? `${styles.icon} ${styles.active}` : styles.icon} />
            case MenuTypes.Objects:
                return <CubeIcon className={active ? `${styles.icon} ${styles.active}` : styles.icon} />
            case MenuTypes.Lights:
                return <LightIcon className={active ? `${styles.icon} ${styles.active}` : styles.icon} />
            case MenuTypes.Effects:
                return <ImageIcon className={active ? `${styles.icon} ${styles.active}` : styles.icon} />
            case MenuTypes.Cameras:
                return <CameraIcon className={active ? `${styles.icon} ${styles.active}` : styles.icon} />
        }
    }

    return (
        <li className={styles.sidebarItem} >
            <span className={styles.buttonBackground}>
                <a
                    href="#" 
                    className={active ? `${styles.button} ${styles.active}` : styles.button}
                    onClick={onClick}
                >
                    {renderMenuIcon()}
                </a>
            </span>

            {active && children}
        </li>
    );
}