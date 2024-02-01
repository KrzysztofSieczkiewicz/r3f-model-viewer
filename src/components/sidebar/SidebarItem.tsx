import React from "react"
import styles from "./Sidebar.module.css";


interface SidebarItem {
    active: boolean,
    //icon: React.ReactElement
    children: React.ReactNode
    onClick: () => void,
}

const SidebarItem = ({ active, children, onClick } : SidebarItem) => (
    <li className={styles.sidebarItem}>
        <a 
            href="#" 
            className={`${styles.iconButton} ${active ? styles.active : ""}`}
            onClick={onClick}
        >
            {/*icon*/}
        </a>

        {active && children}
    </li>
)

export default SidebarItem;