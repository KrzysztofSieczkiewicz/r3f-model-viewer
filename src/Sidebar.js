import { SidebarItem } from "./SidebarItem";
import { ReactComponent as LightIcon } from './icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './icons/sidebar/image.svg';
import { LightsMenu } from "./components/sidebar/LightsMenu";

export function Sidebar(props) {
    // PASS RESPECTIVE FUNCTIONS BY CONTEXT
    const lightsList = props.lightsList;
    const addLight = props.addLight;
    const updateLight = props.updateLight;
    const removeLight = props.removeLight;

    const newLight = {
        id:0,
        position:[5,5,0],
        color: "#f53259",
        intensity: 1,
        angle: 0.6,
        penumbra: 0.6,
        type:"spotLight"
    }

    return (
        <nav className="sidebar">
            <p>TEST</p>
            <ul className="sidebar-nav">
                <SidebarItem icon={<EarthIcon />} />
                <SidebarItem icon={<CubeIcon />} >
                    <LightsMenu lightsList={lightsList} updateLight={() => updateLight()} />
                </SidebarItem>
                <SidebarItem icon={<LightIcon />} >
                    <LightsMenu lightsList={lightsList} />
                </SidebarItem>
                <SidebarItem icon={<ImageIcon />} />
                <input 
                        className='trait'
                        value={lightsList[0].intensity} 
                        onChange={() => props.updateLight(0, newLight)}/>
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