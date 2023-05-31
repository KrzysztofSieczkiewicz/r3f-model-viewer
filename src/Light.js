import { useRef, useState } from "react";

export function Light(props) {
    const lightRef = useRef();
    const type = props.type;

    const types = {
        pointLight: "pointLight",
        spotLight: "spotLight",
    }

    // common
    const [castShadow, setCastShadow] = useState(true);
    const [position, setPosition] = useState([5,5,0]);
    const [color, setColor] = useState([1,1,1]);
    const [intensity, setIntensity] = useState(1);
    //const [type, setType] = useState(pointLight);

    // only for spotlight
    const [angle, setAngle] = useState(0.5);
    const [penumbra, setPenumbra] = useState(0.5);

    // only for area light
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(5);
    const [target, setTarget] = useState([0,0,0]);

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
        default:
            return null;
    }
}