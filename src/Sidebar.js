import { SidebarItem } from "./SidebarItem";
import { ReactComponent as LightIcon } from './icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './icons/sidebar/image.svg';
import { LightsMenu } from "./components/sidebar/LightsMenu";

export function Sidebar(props) {
    const lightsList = props.lightsList;
    const addLight = props.addLight;
    const updateLight = props.updateLight;
    const removeLight = props.removeLight;

    return (
        <nav className="sidebar">
            <p>TEST</p>
            <ul className="sidebar-nav">
                <SidebarItem icon={<EarthIcon />} />
                <SidebarItem icon={<CubeIcon />} >
                    <LightsMenu lightsList={lightsList} updateLight={updateLight} />
                </SidebarItem>
                <SidebarItem icon={<LightIcon />} >
                    <LightsMenu lightsList={lightsList} />
                </SidebarItem>
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