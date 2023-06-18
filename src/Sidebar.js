import { SidebarItem } from "./SidebarItem";
import { LightPanel } from "./components/sidebar/LightPanel";

export function Sidebar(props) {
    const lightsList = props.lightsList;
    const addLight = props.addLight;
    const updateLight = props.addLight;
    const removeLight = props.removeLight;

    return (
        <nav className="sidebar">
            <p>TEST SIDEBAR LOCATION</p>
            <ul className="sidebar-nav">
                <SidebarItem icon="⛷" />
                <SidebarItem icon="⛵" />
                <SidebarItem icon="⛱" />
                <SidebarItem icon="⛓" />
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