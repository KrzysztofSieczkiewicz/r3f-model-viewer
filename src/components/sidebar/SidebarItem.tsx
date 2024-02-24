import React, { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    children: ReactNode;
    active: boolean,
    onClick: () => void
}

export const SidebarItem = (props: Props) => {
    const { icon, children, active, onClick } = props;

    return (
        <li className="sidebar-item">
            <a
                href="#" 
                className={`icon-button ${active ? "active" : ""}`}
                onClick={onClick}
            >
                {icon}
            </a>

            {active && children}
        </li>
    );
}