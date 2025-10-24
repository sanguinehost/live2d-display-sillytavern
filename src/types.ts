/**
 * Type definitions for Live2D Display extension
 */

export interface Live2DModelConfig {
  modelPath: string;
  scale?: number;
  x?: number;
  y?: number;
  enableIdleAnimation?: boolean;
  enableExpressions?: boolean;
}

export interface CharacterData {
  name: string;
  avatar?: string;
  data?: {
    live2d_model_path?: string;
    live2d_config?: Live2DModelConfig;
  };
}

export interface ExtensionSettings {
  enabled: boolean;
  showLive2D: boolean;
  enableExpressions: boolean;
  enableIdleAnimation: boolean;
  modelScale: number;
  modelX: number;
  modelY: number;
  quality: 'high' | 'medium' | 'low';
  hideMobile: boolean;
}

export interface SillyTavernContext {
  characterId: number;
  characters: CharacterData[];
  chat: ChatMessage[];
  saveCharacter: () => Promise<void>;
}

export interface ChatMessage {
  name: string;
  is_user: boolean;
  mes: string;
  swipe_id?: number;
  swipes?: string[];
}

export type Emotion = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'fear';

export interface ExpressionMapping {
  [key: string]: Emotion;
}
