/**
 * Configuration constants for Live2D Display extension
 */
export const EXTENSION_NAME = 'live2d-display';
export const DEFAULT_SETTINGS = {
    enabled: true,
    showLive2D: true,
    enableExpressions: true,
    enableIdleAnimation: true,
    modelScale: 0.5,
    modelX: 200,
    modelY: 300,
    quality: 'high',
    hideMobile: true,
};
export const QUALITY_SETTINGS = {
    high: { resolution: 2, fps: 60 },
    medium: { resolution: 1, fps: 30 },
    low: { resolution: 0.5, fps: 24 },
};
export const CANVAS_CONFIG = {
    width: 400,
    height: 600,
    transparent: true,
    antialias: true,
};
// Map emotions to Live2D expression IDs
// These are standard Live2D expression names, but may vary per model
export const EXPRESSION_MAP = {
    neutral: 'neutral',
    happy: 'happy',
    sad: 'sad',
    angry: 'angry',
    surprised: 'surprised',
    fear: 'fear',
};
// Keywords for emotion detection in messages
export const EMOTION_KEYWORDS = {
    happy: ['happy', 'joy', 'laugh', 'smile', 'grin', 'cheerful', 'delighted'],
    sad: ['sad', 'cry', 'tear', 'sorrow', 'melancholy', 'upset', 'depressed'],
    angry: ['angry', 'mad', 'furious', 'rage', 'irritated', 'annoyed', 'frustrated'],
    surprised: ['surprise', 'shock', 'amaze', 'astonish', 'startle', 'wow'],
    fear: ['fear', 'scared', 'afraid', 'terrified', 'frightened', 'worried', 'anxious'],
};
// Expression change duration (ms)
export const EXPRESSION_DURATION = 5000;
// Return to neutral expression after this duration
export const RETURN_TO_NEUTRAL_DELAY = 5000;
//# sourceMappingURL=config.js.map