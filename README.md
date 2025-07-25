# PAN OCR Frontend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Configure Backend URL:**
   - In `src/App.tsx`, replace `https://YOUR_BACKEND_URL/extract_pan` with your deployed backend URL (e.g., Railway URL).

## Run Locally
```bash
npm start
```

## Deploy to GitHub Pages
1. Install gh-pages:
   ```bash
   npm install --save gh-pages
   ```
2. Add the following to your `package.json`:
   ```json
   "homepage": "https://<your-github-username>.github.io/<repo-name>"
   ```
   And add scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Deploy:
   ```bash
   npm run deploy
   ``` 