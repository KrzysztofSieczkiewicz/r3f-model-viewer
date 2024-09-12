import { SceneManagerClient } from "../SceneManagerClient"


// Fetch all textures
export const getTextures = async () => {
    return SceneManagerClient('/textures');
}

// Fetch a single texture by ID
export const getTexture = async (id: string) => {
    return SceneManagerClient(`/textures/${id}`)
}