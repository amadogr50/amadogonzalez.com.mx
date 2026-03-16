# Doom WASM Assets

This directory should contain the following files for the Doom easter egg:

## Required Files

| File | Description |
|------|-------------|
| `doom.js` | Emscripten-generated JavaScript loader |
| `doom.wasm` | Compiled WebAssembly binary |
| `doom.data` | Emscripten packaged data file |
| `doom.wad` | Doom WAD file (e.g., `doom1.wad` for shareware) |
| `secret.mp3` | Sound effect for the glitch transition |

## Compiling Doom with Emscripten

### Prerequisites

1. Install [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html):

```bash
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

2. Get a Doom source port (e.g., [doomgeneric](https://github.com/nicx/doomgeneric)):

```bash
git clone https://github.com/nicx/doomgeneric.git
```

3. Get a WAD file — the shareware `doom1.wad` is freely available.

### Build Steps

```bash
cd doomgeneric/doomgeneric

emcc -O2 \
  -s WASM=1 \
  -s ASYNCIFY \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS='["_main","_D_DoomLoop"]' \
  -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
  --preload-file doom1.wad@doom.wad \
  -o doom.js \
  *.c

# This produces: doom.js, doom.wasm, doom.data
```

### Placement

Copy the output files into this directory (`apps/web/public/doom/`):

```bash
cp doom.js doom.wasm doom.data /path/to/apps/web/public/doom/
cp doom1.wad /path/to/apps/web/public/doom/doom.wad
```

Add a `secret.mp3` sound effect (any short glitch/static sound, ~1s).

## Notes

- The shareware `doom1.wad` is free to distribute; the full version is not.
- These files are NOT committed to the repo — they are listed in `.gitignore`.
- Total asset size is ~3-4 MB, loaded only when the easter egg is triggered.
