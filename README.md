<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/00424bac-8f5f-4f25-88c1-ea81f1b16459

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. Run the app:
   ```bash
   npm run dev
   ```

---

## Deploy to GitHub Pages (Static Hosting)

The project includes a GitHub Actions workflow in `.github/workflows/deploy.yml` that automatically builds and deploys your site whenever changes are pushed to the `main` branch. 

If your website is currently showing a **blue blank screen** at `https://sabilyent.github.io/city-game/`, it is because GitHub Pages is serving the raw, unbuilt source code from the `main` branch root (which browsers cannot run). 

### How to Fix & Configure Deployment:

1. **Go to your GitHub Repository Settings**:
   Navigate to your repository page on GitHub.
2. **Open the Pages Section**:
   Click on the **Settings** tab at the top of the repository, then select **Pages** from the left-hand sidebar menu.
3. **Change Build and Deployment Source**:
   * Under the **Build and deployment** section, look for the **Source** option.
   * Change it from **"Deploy from a branch"** to **"GitHub Actions"**.
4. **Trigger Deployment**:
   * Push any change (such as this `README.md` update) to your `main` branch.
   * Go to the **Actions** tab on GitHub to monitor the build and deployment process.
   * Once the workflow completes, your website will be successfully deployed using the optimized production files from the `dist/` folder.
