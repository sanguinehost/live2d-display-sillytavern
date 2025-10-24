/**
 * Character Manager - handles character/model associations
 */
import type { CharacterData, Live2DModelConfig } from './types';
export declare class CharacterManager {
    /**
     * Get Live2D model path for character
     */
    static getModelPath(character: CharacterData): string | null;
    /**
     * Get Live2D model configuration for character
     */
    static getModelConfig(character: CharacterData): Live2DModelConfig | undefined;
    /**
     * Set Live2D model path for character
     */
    static setModelPath(character: CharacterData, modelPath: string): void;
    /**
     * Set Live2D model configuration for character
     */
    static setModelConfig(character: CharacterData, config: Live2DModelConfig): void;
    /**
     * Remove Live2D model from character
     */
    static removeModel(character: CharacterData): void;
    /**
     * Check if character has Live2D model
     */
    static hasModel(character: CharacterData): boolean;
}
//# sourceMappingURL=characterManager.d.ts.map