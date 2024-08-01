export type SceneWrapper = {
  selectedObject: string,
  viewCameraRotation: [number,number,number],

// TODO: ADD FOG https://threejs.org/docs/#api/en/scenes/Fog

  // TODO: CONSIDER MOVING THESE INTO SEPARATE CONTEXT REGARDING ONLY RENDER SETTINGS OR ENVIRONMENT SETTINGS
  // TODO: MAKE A SEPARATE CONTEXT FOR USER SETTINGS (e.g. background color, sliders sensitivity, icons size etc.)
  backgroundColor: string,
  isAmbientActive: boolean
  ambientColor: string,
  ambientIntensity: number,
  
}

const INITIAL_SCENE_SETTINGS = {
  selectedObject: "",
  viewCameraRotation: [0, 0, 0] as [number,number,number],

  backgroundColor: "#262626",
  isAmbientActive: true,
  ambientColor: "#ffffff",
  ambientIntensity: 0.1,
  
}

export { INITIAL_SCENE_SETTINGS };