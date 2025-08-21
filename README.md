# BlitJS

A lightweight TypeScript game framework built on the HTML5 Canvas API, inspired by pygame.
It provides familiar constructs like Surface, Vector2, Rect, Sprite, and Scene management for rapid 2D game development in the browser.

⚡ Write code that feels like pygame, but runs natively in the browser.

## ✨ Features
- Graphics
    * `Surface` wrapper around `<canvas>` with blitting support
    * Easy image loading via `image.load()`
    * Drawing utilities(`line`, `rect`, etc.)
- Audio
    * `mixer.Sound` and `mixer.Music` wrappers around `HTMLAudioElement`
- Display
    * `display.setMode()` → create the game canvas
    * `display.update()` → update the screen
- Core Math Utilities
    * `Vector2`, `Vector3` with common operations (dot, cross, normalize, etc.)
    * `Rect` for bounding boxes and collision checks
    * Handy functions like `clamp`, `lerp`
- Masks

## 📦 Installation
```shell
# Clone the repo
git clone https://github.com/devnmarki/blit-js.git
cd blit-js

# Install dependencies
npm install
```
Or add it as a dependency to your project:
```
npm install blit-js
```

## 🚀 Quick Start
```ts
import { BlitJS } from "blit-js";

async function main() {
    const screen = BlitJS.display.setMode([800, 600]);
    const clock = new BlitJS.time.Clock();

    const playerImg = await BlitJS.image.load("player.png");   
    
    function loop() {
        screen.fill({ r: 255, g: 255, b: 255, a: 1 });

        screen.blit(playerImg, [100, 100]);

        clock.tick(60);
        screen.update();

        requestAnimationFrame(loop);
    }
    loop();
}

main();
```

## 🤝 Contributing
Contributions are welcome! Feel free to:
- Open issues for bugs & suggestions
- Submit PRs with improvements
- Help expand the examples and documentation

## 📜 License

MIT License © 2025 Marko Smiljic

This project is independent and not affiliated with pygame.
Pygame is a separate project under the LGPL license. This repo is just inspired by its design philosophy.