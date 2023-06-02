import { useEffect, useRef, useState } from "react";
import { AssetSceneContext } from "./AssetSceneContext";
import { useContext } from "react";


// TODO - consider adding separate variables and hooks for each light type for better customization and control
export function Light() {
    const lightRef = useRef();

    const { lightIntensity } = useContext(AssetSceneContext);

    const [castShadow, setCastShadow] = useState(true);
    const [position, setPosition] = useState([5,5,0]);
    const [color, setColor] = useState([1,1,1]);
    const [intensity, setIntensity] = useState(1);
    const [type, setType] = useState("ambientLight");

    const [angle, setAngle] = useState(0.5);
    const [penumbra, setPenumbra] = useState(0.5);

    useEffect(() => {
        setIntensity(lightIntensity);
        console.log(lightIntensity + "...and from context: " + intensity);
    },[lightIntensity]);

    switch(type) {
        case "pointLight":
            return <pointLight
                ref={lightRef}
                position={position}
                color={color}
                intensity={intensity}
                castShadow={castShadow}
                shadow-bias={-0.0008}
            />;
        case "spotLight":
            return <spotLight
                ref={lightRef}
                position={position}
                color={color}
                intensity={intensity}
                angle={angle}
                penumbra={penumbra}
                castShadow={castShadow}
                shadow-bias={-0.0008}
            />;
            case "ambientLight":
        return <ambientLight
            ref={lightRef}
            color={color}
            intensity={intensity}
        />;
        default:
            return null;
    }
}