import { SidebarItem } from "./SidebarItem";
import { ReactComponent as LightIcon } from './icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './icons/sidebar/image.svg';
import { LightsMenu } from "./components/sidebar/LightsMenu";
import { useState } from "react";

export function Sidebar(props) {

    const [activeItem, setActiveItem] = useState();

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null);
        } else {
            setActiveItem(item)
        }
    };

    const lightsList = props.lightsList;

    // CURRENTLY CHILD ELEMENTS INSIDE SIDEBARITEM PREVENT ONCLICK FROM FIRING - FIX THAT

    return (
        <nav className="sidebar">
            <p>TEST</p>
            <ul className="sidebar-nav">
                <SidebarItem 
                    icon={<EarthIcon />}
                    active={activeItem === "Environment"}
                    onClick={() => handleItemClick("Environment")}
                />
                <SidebarItem icon={<CubeIcon />} >
                    <LightsMenu 
                        lightsList={lightsList}
                        active={activeItem === "Objects"}
                        onClick={() => handleItemClick("Objects")}
                    />
                </SidebarItem>
                <SidebarItem 
                    icon={<LightIcon />} 
                    active={activeItem === "Lights"}
                    onClick={() => handleItemClick("Lights")}
                >
                    <LightsMenu lightsList={lightsList} />
                </SidebarItem>
                <SidebarItem 
                    icon={<ImageIcon />}
                    active={activeItem === "Rendering"}
                    onClick={() => handleItemClick("Rendering")}
                />
            </ul>
        </nav>
    );

    //props.updateLight(0, newLight)
/*
    return (
        <div id="sidebar">
            <p>TEST SIDEBAR LOCATION</p>
            <button onClick={() => {addLight()}}>Add Light</button>
            {lightsList.map((light) => {
                return (
                    <LightPanel light={light} removeLight={removeLight} key={light.id}/>
                );
            })}
        </div>
    );
*/
}