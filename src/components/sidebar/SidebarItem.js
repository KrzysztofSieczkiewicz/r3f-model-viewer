export function SidebarItem(props) {
    const active = props.active;

    return (
        <li className="sidebar-item">
            <a 
            
                href="#" 
                className={`icon-button ${active ? "active" : ""}`}
                onClick={props.onClick}
            >
                {props.icon}
            </a>

            {active && props.children}
        </li>
    );
}