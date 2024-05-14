export type SceneWrapper = {
  backgroundColor: string,
  ambientLight: {
    color: string,
    intensity: number
  },
  viewCameraRotation: [number,number,number],
}

const INITIAL_SCENE_SETTINGS = {
  backgroundColor: "#262626",
  ambientLight: {
    color: "#ffffff",
    intensity: 0.1
  },
  viewCameraRotation: [0, 0, 0] as [number,number,number],
}

export { INITIAL_SCENE_SETTINGS };