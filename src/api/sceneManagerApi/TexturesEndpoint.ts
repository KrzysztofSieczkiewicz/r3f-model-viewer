import { apiClient } from "./SceneManagerApi";

interface Texture {
    
}

// GET all textures
export const getTextures = async () => {
    return apiClient.get<Texture[]>('/textures');
}

// GET a single texture by ID
export const getTexture = async (id: string) => {
    const result = apiClient.get<Texture>(`/textures${id}`);

    console.log({result})
    return result
}