import { SidebarItem } from "./SidebarItem";
import { LightPanel } from "./components/sidebar/LightMenu";
import { ReactComponent as LightIcon } from './icons/light.svg';
import { ReactComponent as CubeIcon } from './icons/cube.svg';
import { ReactComponent as EarthIcon } from './icons/earth.svg';
import { ReactComponent as ImageIcon } from './icons/image.svg';
import { DropdownMenu } from "./DropdownMenu";

export function Sidebar(props) {
    const lightsList = props.lightsList;
    const addLight = props.addLight;
    const updateLight = props.addLight;
    const removeLight = props.removeLight;

    return (
        <nav className="sidebar">
            <p>TEST</p>
            <ul className="sidebar-nav">
                <SidebarItem icon={<EarthIcon />} >
                    <DropdownMenu />
                </SidebarItem>
                <SidebarItem icon={<CubeIcon />} />
                <SidebarItem icon={<LightIcon />} />
                <SidebarItem icon={<ImageIcon />} />
            </ul>
        </nav>
    );
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