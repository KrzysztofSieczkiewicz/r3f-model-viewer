import { useContext } from "react";

function LightHelper() {
    const [lightsList, setLightsList] = useState([]);

    const defaultLight = {
        type: "pointLight",
        color: [0,1,1],
        intensity: 1,
        angle: 0.6,
        penumbra: 0.6
    }

    function addLight() {
        setLightsList([...lightsList, defaultLight]);
    }

    function removeLight() {

    }

    function updateLight() {

    }
}