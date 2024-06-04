import { generateNewID } from "../utils/idUtil";

export enum CAMERA_TYPES {
    perspectiveCamera =  "Perspective Camera",
    ortographicCamera = "Ortographic Camera"
};
export type CameraTypes = 
    CAMERA_TYPES.perspectiveCamera | 
    CAMERA_TYPES.ortographicCamera
;

export type BaseCameraProperties = {
    position: [number, number, number],
    rotation: [number, number, number],
    aspectRatio: number,
}

export type PerspectiveCameraProperties = {
    fov: number,
} & BaseCameraProperties;

export type OrtographicCameraProperties = {
} & BaseCameraProperties;

export type CameraProperties = PerspectiveCameraProperties | OrtographicCameraProperties;


export type CameraWrapper =
    { type: CAMERA_TYPES.perspectiveCamera, id: string, properties: PerspectiveCameraProperties } | 
    { type: CAMERA_TYPES.ortographicCamera, id: string, properties: OrtographicCameraProperties }


const INIT_CAMERAS_LIST: CameraWrapper[] = [
    {
        type: CAMERA_TYPES.perspectiveCamera,
        id: generateNewID(),
        properties: {
            position: [1,2,3],
            rotation: [0,0,0],
            aspectRatio: 2,
            fov: 50
        }
    },
    {
        type: CAMERA_TYPES.ortographicCamera,
        id: generateNewID(),
        properties: {
            position: [3,2,1],
            rotation: [0,1,0],
            aspectRatio: 1.5
        }
    }
]

export { INIT_CAMERAS_LIST }
