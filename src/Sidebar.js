import { LightPanel } from "./components/sidebar/LightPanel";

export function Sidebar(props) {
    const lightsList = props.lightsList;
    const addLight = props.addLight;
    const updateLight = props.addLight;
    const removeLight = props.removeLight;

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
}

/*
return (<div key={light.id}>
                    <p>{light.id}</p>
                    <button onClick={() => {removeLight(light.id)}}>REMOVE</button>
        </div>)
*/