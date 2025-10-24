/**
 * Live2D Renderer - handles model loading and display
 */
import type { Live2DModelConfig } from './types.js';
export declare class Live2DRenderer {
    private app;
    private currentModel;
    private container;
    constructor(containerId: string);
    private initializeApp;
    /**
     * Load a Live2D model from path
     */
    loadModel(modelPath: string, config?: Live2DModelConfig): Promise<void>;
    /**
     * Setup idle animation loop
     */
    private setupIdleAnimation;
    /**
     * Set expression
     */
    setExpression(expressionName: string): void;
    /**
     * Update model position
     */
    setPosition(x: number, y: number): void;
    /**
     * Update model scale
     */
    setScale(scale: number): void;
    /**
     * Set rendering quality
     */
    setQuality(quality: 'high' | 'medium' | 'low'): void;
    /**
     * Show/hide renderer
     */
    setVisible(visible: boolean): void;
    /**
     * Cleanup and destroy renderer
     */
    destroy(): void;
}
//# sourceMappingURL=renderer.d.ts.map