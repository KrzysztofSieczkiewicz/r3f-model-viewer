export type SceneWrapper = {
  selectedObjectId: string,
  backgroundColor: string,
  isAmbientActive: boolean
  ambientColor: string,
  ambientIntensity: number,
  viewCameraRotation: [number,number,number],
}

const INITIAL_SCENE_SETTINGS = {
  selectedObjectId: "",
  backgroundColor: "#262626",
  isAmbientActive: true,
  ambientColor: "#ffffff",
  ambientIntensity: 0.1,
  viewCameraRotation: [0, 0, 0] as [number,number,number],
}

export { INITIAL_SCENE_SETTINGS };