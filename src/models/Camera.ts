
export enum CAMERA_TYPES {
    perspectiveCamera =  "Perspective Camera",
    ortographicCamera = "Ortographic Camera"
};
export type CameraTypes = 
    CAMERA_TYPES.perspectiveCamera | 
    CAMERA_TYPES.ortographicCamera
;

export type BaseCameraProperties = {
    is: string;
    position: [number, number, number],
    aspectRatio: number,
}

export type PerspectiveCameraProperties = {
    fov: number,
} & BaseCameraProperties;

export type OrtographicCameraProperties = {
} & BaseCameraProperties;


export type CameraWrapper =
    { type: CAMERA_TYPES.perspectiveCamera, id: string, properties: PerspectiveCameraProperties } | 
    { type: CAMERA_TYPES.ortographicCamera, id: string, properties: OrtographicCameraProperties }
