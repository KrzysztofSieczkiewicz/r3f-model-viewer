    const lightTypes = [
        {type: 'pointLight', display: "point light"},
        {type: 'spotLight', display: "spot light"}
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

    export {lightTypes, defaultLight};