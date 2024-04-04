export type SceneWrapper = {
  backgroundColor: string,
  ambientLight: {
    color: string,
    intensity: number
  }
}

const INITIAL_SCENE_SETTINGS = {
  backgroundColor: "#262626",
  ambientLight: {
    color: "#ffffff",
    intensity: 0.1
  }
}

export { INITIAL_SCENE_SETTINGS };