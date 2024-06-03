export type SceneWrapper = {
  selectedObjectId: string,
  viewCameraRotation: [number,number,number],

  // TODO: CONSIDER MOVING THESE INTO SEPARATE CONTEXT REGARDING ONLY RENDER SETTINGS OR ENVIRONMENT SETTINGS
  backgroundColor: string,
  isAmbientActive: boolean
  ambientColor: string,
  ambientIntensity: number,
  
}

const INITIAL_SCENE_SETTINGS = {
  selectedObjectId: "",
  viewCameraRotation: [0, 0, 0] as [number,number,number],

  backgroundColor: "#262626",
  isAmbientActive: true,
  ambientColor: "#ffffff",
  ambientIntensity: 0.1,
  
}

export { INITIAL_SCENE_SETTINGS };