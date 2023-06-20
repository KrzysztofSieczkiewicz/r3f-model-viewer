import { useState } from "react";

export function SidebarItem(props) {

    const [open, setOpen] = useState(false);

    return (
        <li className="sidebar-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}