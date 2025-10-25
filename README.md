# Live2D Display for SillyTavern

Display Live2D character models in SillyTavern with automatic expression synchronization.

## Features

- 🎭 **Live2D Model Display** - Render Live2D Cubism 2.1 and 4.0 models
- 😊 **Auto Expressions** - Expressions change based on message emotions
- 🎬 **Idle Animations** - Smooth idle animations when not speaking
- ⚙️ **Customizable** - Adjust scale, position, and quality settings
- 📱 **Responsive** - Optional mobile support with auto-hide
- 🎨 **Per-Character Models** - Associate different models with each character

## Installation

### Option 1: Clone Repository

```bash
cd SillyTavern/data/default-user/extensions
git clone https://github.com/yourusername/live2d-display-sillytavern.git
cd live2d-display-sillytavern
npm install
npm run build
```

### Option 2: Download Release

1. Download the latest release from GitHub
2. Extract to `SillyTavern/data/default-user/extensions/live2d-display-sillytavern`
3. Restart SillyTavern

## Quick Start

### Try the Test Models

Two Live2D models are included for testing:

**1. Jian (简)** - Female character with rich expressions
- Path: `models/jian/简.model3.json`

**2. Jingliu (镜流)** - Female character
- Path: `models/jingliu/╛╡┴ў.model3.json`

**To use a test model:**
1. Open SillyTavern and select a character
2. Go to **Extensions → Live2D Display**
3. In the "Model Path" field, enter: `models/jian/简.model3.json`
4. Click **"Save Model Path"**
5. The model should appear in the corner!

### Adding Your Own Models

**1. Prepare Your Live2D Model**

You need a Live2D Cubism model folder containing:
- `.model3.json` (Cubism 4) or `.model.json` (Cubism 2)
- `.moc3` file (model data)
- Texture images (`.png`)
- Motion files (`.motion3.json`)
- Expression files (optional)

**Where to get models:**
- Create your own in [Live2D Cubism Editor](https://www.live2d.com/en/download/cubism/)
- Download from [VRoid Hub](https://hub.vroid.com/) (some support Live2D export)
- Find free models on [Live2D community](https://www.live2d.com/en/)
- Commission an artist

**2. Install the Model**

1. Place your model folder in:
   ```
   live2d-display-sillytavern/models/your-model/
   ```
2. In SillyTavern, select a character
3. Go to **Extensions → Live2D Display**
4. Enter the model path: `models/your-model/model.model3.json`
5. Click **"Save Model Path"**

**IMPORTANT:** Paths are relative to the extension directory. Just use `models/folder-name/file.model3.json`

### 3. Configure Settings

Open Extensions → Live2D Display to adjust:
- **Model Scale** - Size of the model (0.1 - 2.0)
- **Position** - X/Y coordinates on screen
- **Quality** - High (60fps), Medium (30fps), Low (24fps)
- **Auto Expressions** - Toggle emotion-based expressions
- **Idle Animation** - Toggle idle motion loops
- **Hide on Mobile** - Auto-hide on small screens

## Expression Mapping

The extension automatically detects emotions in messages and maps them to Live2D expressions:

| Emotion | Keywords | Expression |
|---------|----------|------------|
| Happy | happy, joy, laugh, smile, cheerful | `happy` |
| Sad | sad, cry, tear, sorrow, upset | `sad` |
| Angry | angry, mad, furious, rage, annoyed | `angry` |
| Surprised | surprise, shock, amaze, wow | `surprised` |
| Fear | fear, scared, afraid, terrified | `fear` |

Expressions return to neutral after 5 seconds.

## Development

### Build from Source

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch

# Clean dist folder
npm run clean
```

### Project Structure

```
live2d-display-sillytavern/
├── src/                      # TypeScript source code
│   ├── index.ts              # Main entry point
│   ├── renderer.ts           # Live2D renderer
│   ├── expressionMapper.ts   # Emotion detection
│   ├── characterManager.ts   # Character/model association
│   ├── types.ts              # TypeScript interfaces
│   └── config.ts             # Configuration constants
├── dist/                     # Compiled JavaScript (generated)
├── models/                   # Place Live2D models here (optional)
├── manifest.json             # Extension manifest
├── style.css                 # Styling
├── settings.html             # Settings UI
├── template.html             # Canvas container
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md                 # This file
```

### Porting to Scribe

This extension is designed for easy integration into Scribe:

1. The core logic is in TypeScript with proper type definitions
2. Renderer, expression mapper, and character manager are modular
3. Simply import into Svelte components:

```svelte
<script lang="ts">
  import { Live2DRenderer } from './renderer';
  import { messageToExpression } from './expressionMapper';

  let renderer: Live2DRenderer;

  onMount(() => {
    renderer = new Live2DRenderer('canvas-id');
    renderer.loadModel('/path/to/model.model3.json');
  });
</script>
```

## Troubleshooting

### Model doesn't load
- Check browser console for errors
- Verify `.model3.json` path is correct
- Ensure all files (textures, moc3, etc.) are in the same folder
- Try a different model to rule out corruption

### Performance issues
- Lower quality setting (Medium or Low)
- Reduce model scale
- Disable idle animation
- Check model polygon count (high-poly models are slower)

### Expressions don't work
- Verify model has expression files
- Check expression names match (neutral, happy, sad, etc.)
- Enable "Auto Expressions" in settings
- Check browser console for warnings

### Mobile issues
- Enable "Hide on Mobile" if performance is poor
- Mobile browsers have limited WebGL support
- Consider using static avatar fallback on mobile

## Dependencies

- [PixiJS](https://pixijs.com/) - 2D WebGL rendering engine
- [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) - Live2D integration for Pixi
- [Live2D Cubism Core](https://www.live2d.com/en/sdk/download/web/) - Official Live2D runtime

## License

AGPL-3.0 - see [LICENSE](LICENSE)

## Credits

Created by **Paperboy** for the SillyTavern and Scribe projects.

Special thanks to:
- Live2D Inc. for the Cubism SDK
- guansss for pixi-live2d-display
- The SillyTavern community

## Support

- GitHub Issues: [Report bugs](https://github.com/yourusername/live2d-display-sillytavern/issues)
- Discord: Join the SillyTavern Discord for help

## Roadmap

- [ ] In-app model upload via UI
- [ ] Model preview before loading
- [ ] Custom emotion keyword mapping
- [ ] Lip sync with TTS
- [ ] Multi-model scenes
- [ ] Model parameter adjustments (eye tracking, breathing)
- [ ] Integration with SillyTavern Expressions extension
- [ ] Model marketplace/browser

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes (TypeScript source in `src/`)
4. Build and test (`npm run build`)
5. Submit a pull request

---

Made with ❤️ for the SillyTavern community
