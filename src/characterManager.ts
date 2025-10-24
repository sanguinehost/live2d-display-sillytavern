/**
 * Character Manager - handles character/model associations
 */

import type { CharacterData, Live2DModelConfig } from './types.js';

export class CharacterManager {
  /**
   * Get Live2D model path for character
   */
  static getModelPath(character: CharacterData): string | null {
    return character.data?.live2d_model_path ?? null;
  }

  /**
   * Get Live2D model configuration for character
   */
  static getModelConfig(character: CharacterData): Live2DModelConfig | undefined {
    return character.data?.live2d_config;
  }

  /**
   * Set Live2D model path for character
   */
  static setModelPath(character: CharacterData, modelPath: string): void {
    if (!character.data) {
      character.data = {};
    }
    character.data.live2d_model_path = modelPath;
  }

  /**
   * Set Live2D model configuration for character
   */
  static setModelConfig(character: CharacterData, config: Live2DModelConfig): void {
    if (!character.data) {
      character.data = {};
    }
    character.data.live2d_config = config;
  }

  /**
   * Remove Live2D model from character
   */
  static removeModel(character: CharacterData): void {
    if (character.data) {
      delete character.data.live2d_model_path;
      delete character.data.live2d_config;
    }
  }

  /**
   * Check if character has Live2D model
   */
  static hasModel(character: CharacterData): boolean {
    return !!character.data?.live2d_model_path;
  }
}
