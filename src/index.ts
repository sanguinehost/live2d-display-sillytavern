/**
 * Live2D Display Extension for SillyTavern
 * Main entry point
 */

import { Live2DRenderer } from './renderer';
import { CharacterManager } from './characterManager';
import { messageToExpression } from './expressionMapper';
import { DEFAULT_SETTINGS, EXTENSION_NAME, RETURN_TO_NEUTRAL_DELAY } from './config';
import type { ExtensionSettings, SillyTavernContext } from './types';

// Global state
let renderer: Live2DRenderer | null = null;
let extensionSettings: ExtensionSettings = { ...DEFAULT_SETTINGS };
let expressionTimeout: number | null = null;

// SillyTavern API imports (will be available at runtime)
declare const getContext: () => SillyTavernContext;
declare const saveSettingsDebounced: () => void;
declare const eventSource: {
  addEventListener(event: string, callback: (data: any) => void): void;
};
declare const event_types: {
  MESSAGE_RECEIVED: string;
  CHARACTER_CHANGED: string;
  CHAT_CHANGED: string;
};
declare const extension_settings: Record<string, any>;
declare const jQuery: any;

/**
 * Initialize extension
 */
function initializeExtension(): void {
  console.log('[Live2D] Initializing extension');

  // Load settings
  loadSettings();

  // Initialize renderer if enabled
  if (extensionSettings.enabled && extensionSettings.showLive2D) {
    initializeRenderer();
  }

  // Register event listeners
  registerEventListeners();

  // Load current character's model
  loadCurrentCharacterModel();

  console.log('[Live2D] Extension initialized');
}

/**
 * Initialize Live2D renderer
 */
function initializeRenderer(): void {
  if (renderer) return;

  try {
    renderer = new Live2DRenderer('live2d-canvas');
    renderer.setQuality(extensionSettings.quality);

    // Apply mobile visibility
    if (extensionSettings.hideMobile && isMobile()) {
      renderer.setVisible(false);
    }

    console.log('[Live2D] Renderer created');
  } catch (error) {
    console.error('[Live2D] Failed to initialize renderer:', error);
  }
}

/**
 * Register SillyTavern event listeners
 */
function registerEventListeners(): void {
  // Character changed - load new character's model
  eventSource.addEventListener(event_types.CHARACTER_CHANGED, handleCharacterChanged);

  // Message received - update expression
  eventSource.addEventListener(event_types.MESSAGE_RECEIVED, handleMessageReceived);

  // Chat changed - reload model
  eventSource.addEventListener(event_types.CHAT_CHANGED, handleChatChanged);

  console.log('[Live2D] Event listeners registered');
}

/**
 * Handle character change
 */
async function handleCharacterChanged(): Promise<void> {
  console.log('[Live2D] Character changed');
  await loadCurrentCharacterModel();
}

/**
 * Handle new message received
 */
function handleMessageReceived(event: any): void {
  if (!renderer || !extensionSettings.enableExpressions) return;

  try {
    const message = event.detail?.mes || event.mes;
    if (!message) return;

    // Detect emotion and set expression
    const expression = messageToExpression(message);
    renderer.setExpression(expression);

    // Clear previous timeout
    if (expressionTimeout !== null) {
      clearTimeout(expressionTimeout);
    }

    // Return to neutral after delay
    expressionTimeout = window.setTimeout(() => {
      if (renderer) {
        renderer.setExpression('neutral');
      }
    }, RETURN_TO_NEUTRAL_DELAY);
  } catch (error) {
    console.error('[Live2D] Error handling message:', error);
  }
}

/**
 * Handle chat changed
 */
async function handleChatChanged(): Promise<void> {
  console.log('[Live2D] Chat changed');
  await loadCurrentCharacterModel();
}

/**
 * Load current character's Live2D model
 */
async function loadCurrentCharacterModel(): Promise<void> {
  if (!renderer) return;

  try {
    const context = getContext();
    const character = context.characters[context.characterId];

    if (!character) {
      console.warn('[Live2D] No character found');
      return;
    }

    // Check if character has Live2D model
    if (!CharacterManager.hasModel(character)) {
      console.log('[Live2D] Character has no Live2D model');
      return;
    }

    const modelPath = CharacterManager.getModelPath(character);
    const modelConfig = CharacterManager.getModelConfig(character);

    if (modelPath) {
      await renderer.loadModel(modelPath, modelConfig);
    }
  } catch (error) {
    console.error('[Live2D] Failed to load character model:', error);
  }
}

/**
 * Load settings from SillyTavern
 */
function loadSettings(): void {
  if (extension_settings[EXTENSION_NAME]) {
    extensionSettings = { ...DEFAULT_SETTINGS, ...extension_settings[EXTENSION_NAME] };
  } else {
    extension_settings[EXTENSION_NAME] = extensionSettings;
    saveSettingsDebounced();
  }

  console.log('[Live2D] Settings loaded:', extensionSettings);
}

/**
 * Save settings to SillyTavern
 */
function saveSettings(): void {
  extension_settings[EXTENSION_NAME] = extensionSettings;
  saveSettingsDebounced();
  console.log('[Live2D] Settings saved');
}

/**
 * Update setting value
 */
function updateSetting<K extends keyof ExtensionSettings>(
  key: K,
  value: ExtensionSettings[K]
): void {
  extensionSettings[key] = value;
  saveSettings();

  // Apply settings changes
  applySettingsChange(key, value);
}

/**
 * Apply settings change immediately
 */
function applySettingsChange<K extends keyof ExtensionSettings>(
  key: K,
  value: ExtensionSettings[K]
): void {
  if (!renderer) return;

  switch (key) {
    case 'modelScale':
      renderer.setScale(value as number);
      break;
    case 'modelX':
    case 'modelY':
      renderer.setPosition(extensionSettings.modelX, extensionSettings.modelY);
      break;
    case 'quality':
      renderer.setQuality(value as 'high' | 'medium' | 'low');
      break;
    case 'showLive2D':
      renderer.setVisible(value as boolean);
      break;
  }
}

/**
 * Check if running on mobile device
 */
function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Cleanup on extension unload
 */
function cleanup(): void {
  if (renderer) {
    renderer.destroy();
    renderer = null;
  }

  if (expressionTimeout !== null) {
    clearTimeout(expressionTimeout);
    expressionTimeout = null;
  }

  console.log('[Live2D] Extension cleaned up');
}

// Export API for settings UI
(window as any).Live2DDisplay = {
  updateSetting,
  getSettings: () => extensionSettings,
  loadCurrentCharacterModel,
  cleanup,
};

// Initialize when DOM is ready
jQuery(async () => {
  initializeExtension();
});

export { initializeExtension, cleanup };
