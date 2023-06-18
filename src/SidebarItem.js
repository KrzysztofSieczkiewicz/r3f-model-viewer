export function SidebarItem(props) {
    return (
        <li className="sidebar-item">
            <a href="#" className="icon-button">
                {props.icon}
            </a>
        </li>
    );
}