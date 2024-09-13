import { apiClient } from "./SceneManagerApi";

interface Texture {
    
}

// GET all textures
export const getTextures = async () => {
    return apiClient.request<Texture>(
        '/textures',
        'GET'
    );
}

// GET a single texture by ID
export const getTexture = async (id: string) => {
    const result = apiClient.request<Texture>(
        `/textures${id}`,
        'GET'
    );

    console.log({result})
    return result
}