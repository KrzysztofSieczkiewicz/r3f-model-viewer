// TODO - consider adding separate variables and hooks for each light type for better customization and control
export function Light() {
    //const [lights, setLights] = useState([]);

    //temporary, just to create initial state
    const light1 = {
        ref:1,
        position:[5,5,0],
        color:[0,1,1],
        intensity:1,
        angle: 0.6,
        penumbra: 0.6,
        type:"spotLight"
    }
    const light2 = {
        ref:2,
        position:[-5,5,-5],
        color:[1,0,1],
        intensity:1,
        type:"pointLight"
    }
    //end of temporary

    const lights=[light1, light2]
    //setLights([...lights, light1, light2]);

/*
    const [castShadow, setCastShadow] = useState(true);
    const [position, setPosition] = useState([5,5,0]);
    const [color, setColor] = useState([1,1,1]);
    const [intensity, setIntensity] = useState(lightIntensity);
    const [type, setType] = useState("ambientLight");

    const [angle, setAngle] = useState(0.5);
    const [penumbra, setPenumbra] = useState(0.5);
*/
    return (
        <>
            {lights.map((light) => {
                if (light.type === 'pointLight') {
                return <pointLight 
                    key={light.ref} 
                    position={light.position}
                    color={light.color} 
                    intensity={light.intensity} 
                    />;
                } else if (light.type === 'spotLight') {
                return <spotLight 
                    key={light.ref} 
                    position={light.position}
                    color={light.color} 
                    intensity={light.intensity}
                    />;
                } else {
                return null;
                }
            })}
        </>
    );
}