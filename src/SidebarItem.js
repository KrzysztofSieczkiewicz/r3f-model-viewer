import { useState } from "react";

export function SidebarItem(props) {
    const active = props.active;

    return (
        <li className="sidebar-item">
            <a 
                href="#" 
                className="icon-button"
                onClick={props.onClick}
            >
                {props.icon}
            </a>

            {active && props.children}
        </li>
    );
}