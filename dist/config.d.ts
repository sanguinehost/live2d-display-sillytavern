/**
 * Configuration constants for Live2D Display extension
 */
import type { ExtensionSettings, ExpressionMapping } from './types.js';
export declare const EXTENSION_NAME = "live2d-display";
export declare const DEFAULT_SETTINGS: ExtensionSettings;
export declare const QUALITY_SETTINGS: {
    high: {
        resolution: number;
        fps: number;
    };
    medium: {
        resolution: number;
        fps: number;
    };
    low: {
        resolution: number;
        fps: number;
    };
};
export declare const CANVAS_CONFIG: {
    width: number;
    height: number;
    transparent: boolean;
    antialias: boolean;
};
export declare const EXPRESSION_MAP: ExpressionMapping;
export declare const EMOTION_KEYWORDS: {
    happy: string[];
    sad: string[];
    angry: string[];
    surprised: string[];
    fear: string[];
};
export declare const EXPRESSION_DURATION = 5000;
export declare const RETURN_TO_NEUTRAL_DELAY = 5000;
//# sourceMappingURL=config.d.ts.map