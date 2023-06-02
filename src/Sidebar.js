import { useContext } from "react";
import { AssetSceneContext } from "./AssetSceneContext";


export function Sidebar() {
    const { lightIntensity, setLightIntensity } = useContext(AssetSceneContext);

    function handleClick() {
        if(lightIntensity!==0) setLightIntensity(0);
        else if(lightIntensity===0) setLightIntensity(1);
    }

    return (
    <div  id="sidebar" >
        <label>Light intensity: {lightIntensity}. Click the button to toggle between 1 and 0</label>
        <button onClick={handleClick}></button>
    </div>
    );
}