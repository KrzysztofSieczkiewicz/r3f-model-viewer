import { SceneWrapper } from '../interfaces/scene.model';

export class SceneService {
    resetToDefault(): SceneWrapper {
        return {
            backgroundColor: "#262626",
            ambientLight: {
                color: "#ffffff",
                intensity: 0.1
            }
        };
    }
}