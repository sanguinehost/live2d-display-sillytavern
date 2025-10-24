# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Build the Extension

```bash
pnpm run build
```

This compiles TypeScript (`src/`) to JavaScript (`dist/`).

### 3. Install in SillyTavern

**Option A: Symlink (for development)**
```bash
ln -s $(pwd) /path/to/SillyTavern/data/default-user/extensions/live2d-display-sillytavern
```

**Option B: Copy (for production)**
```bash
cp -r . /path/to/SillyTavern/data/default-user/extensions/live2d-display-sillytavern
```

### 4. Restart SillyTavern

The extension will appear in Extensions → Live2D Display

## Development Workflow

### Watch Mode

```bash
pnpm run watch
```

This automatically rebuilds TypeScript on file changes.

### Testing Changes

1. Make changes in `src/`
2. Build compiles to `dist/`
3. Refresh SillyTavern (F5)
4. Check browser console for errors

## Project Structure

```
src/                      # TypeScript source (edit these)
  ├── index.ts            # Main entry point
  ├── renderer.ts         # Live2D renderer class
  ├── expressionMapper.ts # Emotion detection
  ├── characterManager.ts # Character/model association
  ├── types.ts            # Type definitions
  └── config.ts           # Constants

dist/                     # Compiled JavaScript (auto-generated)
  ├── index.js            # ← This is what SillyTavern loads
  └── ...

manifest.json             # Extension metadata (points to dist/index.js)
style.css                 # Styling
settings.html             # Settings UI
template.html             # Canvas container
```

## Adding Features

1. Edit TypeScript files in `src/`
2. Run `pnpm run build`
3. Test in SillyTavern
4. Commit changes (including compiled `dist/`)

## Type Safety

The project uses TypeScript for:
- **Type safety** - Catch errors at compile time
- **IntelliSense** - Better IDE autocomplete
- **Documentation** - Types serve as documentation
- **Refactoring** - Safe code changes
- **Scribe compatibility** - Easy port to Svelte

## Common Issues

### Build fails
- Check `tsconfig.json` is valid
- Ensure TypeScript is installed: `pnpm install`
- Check for syntax errors in `src/` files

### Extension doesn't load
- Verify `dist/index.js` exists
- Check manifest.json points to `dist/index.js`
- Look for errors in browser console

### Changes don't appear
- Did you run `pnpm run build`?
- Did you refresh SillyTavern (F5)?
- Clear browser cache if needed

## Porting to Scribe

When ready to integrate into Scribe:

1. Copy `src/` TypeScript files to Scribe project
2. Import directly in Svelte components:

```svelte
<script lang="ts">
  import { Live2DRenderer } from '$lib/live2d/renderer';
  import { onMount } from 'svelte';

  let renderer: Live2DRenderer;

  onMount(() => {
    renderer = new Live2DRenderer('canvas-id');
  });
</script>

<div id="canvas-id"></div>
```

3. No build changes needed - TypeScript works natively in SvelteKit

## Scripts Reference

- `pnpm run build` - Compile TypeScript once
- `pnpm run watch` - Auto-compile on changes
- `pnpm run dev` - Alias for watch
- `pnpm run clean` - Remove dist/ folder

## Contributing

Before submitting:
1. Run `pnpm run build` to ensure it compiles
2. Test in SillyTavern
3. Commit both `src/` and `dist/` files
4. Include type definitions (`.d.ts` files)

## License

AGPL-3.0 - see LICENSE file
