/**
 * Live2D Renderer - handles model loading and display
 */

import type { Application } from 'pixi.js';
import { CANVAS_CONFIG, QUALITY_SETTINGS } from './config.js';
import type { Live2DModelConfig, ExtensionSettings } from './types.js';

// Access PIXI and Live2DModel from global scope (loaded via CDN)
declare const PIXI: typeof import('pixi.js');

// Live2D Model type (from pixi-live2d-display)
interface Live2DModel {
  scale: { set(x: number, y?: number): void };
  x: number;
  y: number;
  motion(group: string, index: number, priority: number): void;
  expression(name: string): void;
  destroy(): void;
}

declare const Live2DModel: {
  from(modelPath: string): Promise<Live2DModel>;
};

export class Live2DRenderer {
  private app: Application | null = null;
  private currentModel: Live2DModel | null = null;
  private container: HTMLElement | null = null;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);

    if (!this.container) {
      console.error(`[Live2D] Container element #${containerId} not found`);
      return;
    }

    this.initializeApp();
  }

  private initializeApp(): void {
    if (!this.container) return;

    try {
      this.app = new PIXI.Application({
        width: CANVAS_CONFIG.width,
        height: CANVAS_CONFIG.height,
        backgroundAlpha: 0, // transparent
        antialias: CANVAS_CONFIG.antialias,
      });

      // Append canvas to container
      this.container.appendChild(this.app.view as HTMLCanvasElement);

      console.log('[Live2D] Renderer initialized');
    } catch (error) {
      console.error('[Live2D] Failed to initialize renderer:', error);
    }
  }

  /**
   * Load a Live2D model from path
   */
  async loadModel(modelPath: string, config?: Live2DModelConfig): Promise<void> {
    if (!this.app) {
      console.error('[Live2D] App not initialized');
      return;
    }

    try {
      // Remove existing model
      if (this.currentModel) {
        this.app.stage.removeChild(this.currentModel as any);
        this.currentModel.destroy();
      }

      console.log('[Live2D] Loading model:', modelPath);

      // Load new model
      this.currentModel = await Live2DModel.from(modelPath);
      this.app.stage.addChild(this.currentModel as any);

      // Apply configuration
      const scale = config?.scale ?? 0.5;
      const x = config?.x ?? 200;
      const y = config?.y ?? 300;

      this.currentModel.scale.set(scale);
      this.currentModel.x = x;
      this.currentModel.y = y;

      // Setup idle animation if enabled
      if (config?.enableIdleAnimation !== false) {
        this.setupIdleAnimation();
      }

      console.log('[Live2D] Model loaded successfully');
    } catch (error) {
      console.error('[Live2D] Failed to load model:', error);
    }
  }

  /**
   * Setup idle animation loop
   */
  private setupIdleAnimation(): void {
    if (!this.currentModel) return;

    try {
      // Play idle motion (group 'idle', index 0, priority 3)
      this.currentModel.motion('idle', 0, 3);
      console.log('[Live2D] Idle animation started');
    } catch (error) {
      console.warn('[Live2D] Could not start idle animation:', error);
    }
  }

  /**
   * Set expression
   */
  setExpression(expressionName: string): void {
    if (!this.currentModel) {
      console.warn('[Live2D] No model loaded');
      return;
    }

    try {
      this.currentModel.expression(expressionName);
      console.log('[Live2D] Expression set to:', expressionName);
    } catch (error) {
      console.warn('[Live2D] Failed to set expression:', expressionName, error);
    }
  }

  /**
   * Update model position
   */
  setPosition(x: number, y: number): void {
    if (this.currentModel) {
      this.currentModel.x = x;
      this.currentModel.y = y;
    }
  }

  /**
   * Update model scale
   */
  setScale(scale: number): void {
    if (this.currentModel) {
      this.currentModel.scale.set(scale);
    }
  }

  /**
   * Set rendering quality
   */
  setQuality(quality: 'high' | 'medium' | 'low'): void {
    if (!this.app) return;

    const settings = QUALITY_SETTINGS[quality];
    this.app.renderer.resolution = settings.resolution;
    this.app.ticker.maxFPS = settings.fps;

    console.log('[Live2D] Quality set to:', quality);
  }

  /**
   * Show/hide renderer
   */
  setVisible(visible: boolean): void {
    if (this.container) {
      this.container.style.display = visible ? 'block' : 'none';
    }
  }

  /**
   * Cleanup and destroy renderer
   */
  destroy(): void {
    if (this.currentModel) {
      this.currentModel.destroy();
      this.currentModel = null;
    }

    if (this.app) {
      this.app.destroy(true);
      this.app = null;
    }

    console.log('[Live2D] Renderer destroyed');
  }
}
