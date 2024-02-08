import React from "react"
import { StyledIconButton, StyledSidebarItem } from "./Sidebar.styles"


interface SidebarItem {
    active: boolean,
    icon: React.ReactElement
    children: React.ReactNode
    onClick: () => void,
}

const SidebarItem = ({ active, icon, children, onClick } : SidebarItem) => (
    <StyledSidebarItem>
        <StyledIconButton
            href="#"
            className={active ? 'active' : ''}
            onClick={onClick}
        >
            {icon}
        </StyledIconButton>   
        {active && children}
    </StyledSidebarItem>
)

export default SidebarItem;