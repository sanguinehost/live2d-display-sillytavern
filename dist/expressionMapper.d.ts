/**
 * Expression mapper - converts message text to Live2D expressions
 */
import type { Emotion } from './types.js';
/**
 * Analyze message text and detect emotion
 */
export declare function detectEmotion(message: string): Emotion;
/**
 * Map emotion to Live2D expression name
 */
export declare function getExpressionName(emotion: Emotion): string;
/**
 * Main function: Convert message to expression
 */
export declare function messageToExpression(message: string): string;
//# sourceMappingURL=expressionMapper.d.ts.map