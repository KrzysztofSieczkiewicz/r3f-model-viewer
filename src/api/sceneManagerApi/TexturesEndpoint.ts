import { apiClient } from "./SceneManagerApi";

export type ApiTexture = {
    id: string,
    name: string,
    path: string,
}

// GET all textures
export const getTextures = async () => {
    const result = await apiClient.get<ApiTexture[]>('/textures');

    console.log({result})
    return result;
}

// GET a single texture by ID
export const getTexture = async (id: string) => {
    const result = await apiClient.get<ApiTexture>(`/textures${id}`);

    console.log({result});
    return result;
}