    const lightTypes = [
        {type: 'pointLight', display: "Point light"},
        {type: 'spotLight', display: "Spot light"}
    ];

    const defaultLight = {
        type: "pointLight",
        position:[5,5,0],
        color: "white",
        intensity: 1,
        angle: 0.1,
        penumbra: 0.6,
        visible: true
    }

    export { lightTypes, defaultLight };