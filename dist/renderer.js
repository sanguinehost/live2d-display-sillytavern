/**
 * Live2D Renderer - handles model loading and display
 */
import { CANVAS_CONFIG, QUALITY_SETTINGS } from './config.js';
export class Live2DRenderer {
    constructor(containerId) {
        this.app = null;
        this.currentModel = null;
        this.container = null;
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`[Live2D] Container element #${containerId} not found`);
            return;
        }
        this.initializeApp();
    }
    initializeApp() {
        if (!this.container)
            return;
        try {
            this.app = new PIXI.Application({
                width: CANVAS_CONFIG.width,
                height: CANVAS_CONFIG.height,
                backgroundAlpha: 0, // transparent
                antialias: CANVAS_CONFIG.antialias,
            });
            // Append canvas to container
            this.container.appendChild(this.app.view);
            console.log('[Live2D] Renderer initialized');
        }
        catch (error) {
            console.error('[Live2D] Failed to initialize renderer:', error);
        }
    }
    /**
     * Load a Live2D model from path
     */
    async loadModel(modelPath, config) {
        if (!this.app) {
            console.error('[Live2D] App not initialized');
            return;
        }
        try {
            // Remove existing model
            if (this.currentModel) {
                this.app.stage.removeChild(this.currentModel);
                this.currentModel.destroy();
            }
            console.log('[Live2D] Loading model:', modelPath);
            // Load new model
            this.currentModel = await Live2DModel.from(modelPath);
            this.app.stage.addChild(this.currentModel);
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
        }
        catch (error) {
            console.error('[Live2D] Failed to load model:', error);
        }
    }
    /**
     * Setup idle animation loop
     */
    setupIdleAnimation() {
        if (!this.currentModel)
            return;
        try {
            // Play idle motion (group 'idle', index 0, priority 3)
            this.currentModel.motion('idle', 0, 3);
            console.log('[Live2D] Idle animation started');
        }
        catch (error) {
            console.warn('[Live2D] Could not start idle animation:', error);
        }
    }
    /**
     * Set expression
     */
    setExpression(expressionName) {
        if (!this.currentModel) {
            console.warn('[Live2D] No model loaded');
            return;
        }
        try {
            this.currentModel.expression(expressionName);
            console.log('[Live2D] Expression set to:', expressionName);
        }
        catch (error) {
            console.warn('[Live2D] Failed to set expression:', expressionName, error);
        }
    }
    /**
     * Update model position
     */
    setPosition(x, y) {
        if (this.currentModel) {
            this.currentModel.x = x;
            this.currentModel.y = y;
        }
    }
    /**
     * Update model scale
     */
    setScale(scale) {
        if (this.currentModel) {
            this.currentModel.scale.set(scale);
        }
    }
    /**
     * Set rendering quality
     */
    setQuality(quality) {
        if (!this.app)
            return;
        const settings = QUALITY_SETTINGS[quality];
        this.app.renderer.resolution = settings.resolution;
        this.app.ticker.maxFPS = settings.fps;
        console.log('[Live2D] Quality set to:', quality);
    }
    /**
     * Show/hide renderer
     */
    setVisible(visible) {
        if (this.container) {
            this.container.style.display = visible ? 'block' : 'none';
        }
    }
    /**
     * Cleanup and destroy renderer
     */
    destroy() {
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
//# sourceMappingURL=renderer.js.map