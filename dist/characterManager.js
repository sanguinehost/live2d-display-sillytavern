/**
 * Character Manager - handles character/model associations
 */
export class CharacterManager {
    /**
     * Get Live2D model path for character
     */
    static getModelPath(character) {
        return character.data?.live2d_model_path ?? null;
    }
    /**
     * Get Live2D model configuration for character
     */
    static getModelConfig(character) {
        return character.data?.live2d_config;
    }
    /**
     * Set Live2D model path for character
     */
    static setModelPath(character, modelPath) {
        if (!character.data) {
            character.data = {};
        }
        character.data.live2d_model_path = modelPath;
    }
    /**
     * Set Live2D model configuration for character
     */
    static setModelConfig(character, config) {
        if (!character.data) {
            character.data = {};
        }
        character.data.live2d_config = config;
    }
    /**
     * Remove Live2D model from character
     */
    static removeModel(character) {
        if (character.data) {
            delete character.data.live2d_model_path;
            delete character.data.live2d_config;
        }
    }
    /**
     * Check if character has Live2D model
     */
    static hasModel(character) {
        return !!character.data?.live2d_model_path;
    }
}
//# sourceMappingURL=characterManager.js.map