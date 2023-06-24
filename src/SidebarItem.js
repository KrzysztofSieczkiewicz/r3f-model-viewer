import { useState } from "react";

export function SidebarItem(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="sidebar-item">
            <a href="#" className="icon-button" onClick={() => setIsOpen(!isOpen)}>
                {props.icon}
            </a>

            {isOpen && props.children}
        </li>
    );
}