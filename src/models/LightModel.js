import { nanoid } from 'nanoid';

const lightTypes = [
    {type: 'pointLight', display: "Point light"},
    {type: 'spotLight', display: "Spot light"}
];

const defaultLight = {
    id: nanoid(5),
    type: "pointLight",
    position:[5,5,0],
    rotation:[0,0,0], // TODO: Remove and replace by target later on
    color: "white",
    intensity: 1,
    angle: 0.1,
    penumbra: 0.6,
    visible: true
}

export { lightTypes, defaultLight };