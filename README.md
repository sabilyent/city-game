# SkyMetropolis - 3D Isometric AI City Builder

A beautiful, high-performance 3D isometric city-builder simulation game built with pure **HTML5, CSS3, Vanilla JavaScript, and Three.js**. The game features procedural voxel-style rendering, dynamic systems (flowing vehicle traffic, citizens walking, chimney smoke stacks), and an optional Penasihat AI advisor integration using the Google Gemini API.

Since the project is built with vanilla files, there is **zero build step** and **no node_modules required**. It runs natively in any browser and can be served as a direct static site on GitHub Pages.

---

## Live Demo
Check out the live deployment on GitHub Pages:
**[https://sabilyent.github.io/city-game/](https://sabilyent.github.io/city-game/)**

---

## Features & Gameplay

* **Procedural Architecture**: Homes, skyscrapers, corner stores, factories, and parks are dynamically generated on tiles with low-poly variations.
* **Dynamic Traffic & Citizens**: Instanced vehicles navigate road junctions, and citizens bounce-walk across roads, parks, and empty grass zones.
* **Bilingual Support**: Instant localization swap between English (EN) and Bahasa Melayu (BM).
* **AI City Advisor (Gemini API)**: Generates tailored, dynamic quests and witty news headlines based on your current city data.
* **Sandbox Mode**: Plays offline with static, local fallbacks if the Gemini API key is not present.

---

## How to Play

### 1. Build Tools (Bottom Panel)
* **Road ($10)**: Create connections between tiles. Required for traffic to flow.
* **House ($100)**: Attracts citizens (+5 population/day).
* **Shop ($200)**: Boosts daily income (+$15/day).
* **Factory ($400)**: Greatly boosts daily income (+$40/day) but does not grow population.
* **Park ($50)**: Beautifies the area (+1 population/day).
* **Demolish ($5)**: Destroys existing structures.

### 2. Camera Controls (Mouse / Touch)
* **Rotate**: Hold `Left Click + Drag` or use two-finger swipe.
* **Pan**: Hold `Right Click + Drag` or `Ctrl + Left Click + Drag` or use two-finger drag.
* **Zoom**: Use the scroll wheel or pinch-to-zoom.

---

## Run Locally

Simply open the `index.html` file directly in your browser!

Or, run a simple local web server:

### Python 3
```bash
python3 -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

### Node.js (Live Server)
```bash
npx live-server
```

---

## Using the AI Advisor (Gemini API Key)

To activate dynamic AI quests and headlines:
* Add your Gemini API key directly to the URL query string when visiting the site:
  `https://sabilyent.github.io/city-game/?key=YOUR_GEMINI_API_KEY`
* Or, if running locally, you can append `?key=YOUR_GEMINI_API_KEY` to `http://localhost:3000`.
* The key is handled entirely client-side and sent directly to Google's official Gemini API endpoints. If no key is set, the game automatically runs in **Mod Bebas / Sandbox Mode** using localized offline fallback lists.
