import * as texturesEndpoint from '../api/sceneManagerApi/TexturesEndpoint';

export const useSceneManagerApi = () => {
    return {
        textures: texturesEndpoint,
    }
}