import React from "react"

interface SidebarItem {
    active: boolean,
    icon: React.ReactElement
    children: React.ReactNode
    onClick: () => void,
}

const SidebarItem = ({ active, icon, children, onClick } : SidebarItem) => (
    <li className="sidebar-item">\
        <a 
            href="#" 
            className={`icon-button ${active ? "active" : ""}`}
            onClick={onClick}
        >
            {icon}
        </a>

        {active && children}
    </li>
)