import { apiClient } from "./SceneManagerApi";

interface ApiTexture {
    id: string,
    name: string,
    path: string,
}

// GET all textures
export const getTextures = async () => {
    const result = apiClient.get<ApiTexture[]>('/textures');

    console.log({result});
    return result;
}

// GET a single texture by ID
export const getTexture = async (id: string) => {
    const result = apiClient.get<ApiTexture>(`/textures${id}`);

    console.log({result});
    return result;
}