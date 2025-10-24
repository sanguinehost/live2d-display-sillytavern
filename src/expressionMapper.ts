/**
 * Expression mapper - converts message text to Live2D expressions
 */

import { EMOTION_KEYWORDS, EXPRESSION_MAP } from './config';
import type { Emotion } from './types';

/**
 * Analyze message text and detect emotion
 */
export function detectEmotion(message: string): Emotion {
  const text = message.toLowerCase();

  // Check for each emotion's keywords
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return emotion as Emotion;
      }
    }
  }

  return 'neutral';
}

/**
 * Map emotion to Live2D expression name
 */
export function getExpressionName(emotion: Emotion): string {
  return EXPRESSION_MAP[emotion] || EXPRESSION_MAP.neutral;
}

/**
 * Main function: Convert message to expression
 */
export function messageToExpression(message: string): string {
  const emotion = detectEmotion(message);
  return getExpressionName(emotion);
}
