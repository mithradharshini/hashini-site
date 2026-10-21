# The Diva | A Gift for Hashini 🌊✨

A personal, moonlit ocean-themed static website tribute to Hashini and our friendship.

Built with pure vanilla HTML5, CSS3, and JavaScript — no frameworks, no external dependencies, no build steps required. Works across mobile (360px) and desktop (1440px), accessible, and ready to deploy directly onto **GitHub Pages**.

---

## 🚀 How to Deploy on GitHub Pages

1. **Create a new GitHub Repository**:
   - Go to [github.com/new](https://github.com/new)
   - Name your repository (for example `hashini-site` or `the-diva`).
   - Leave it public or private (GitHub Pages supports both on Pro, or public for free).

2. **Push the project files to the `main` branch**:
   ```bash
   git init
   git add .
   git commit -m "Initial tribute to Hashini"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your GitHub repository, click on **Settings** (top menu).
   - In the left sidebar, click on **Pages**.
   - Under **Build and deployment** > **Branch**:
     - Select branch: `main`
     - Select folder: `/(root)`
   - Click **Save**.
   - After 1–2 minutes, your website will be live at:
     `https://<your-username>.github.io/<your-repo-name>/`

---

## 📝 How to Edit `content.js`

All text, captions, quiz questions, stat labels, mascot lines, the secret poem, and photo file names are centralized in **`content.js`**. You do not need to edit HTML or JavaScript logic to update content.

- Open `content.js` in any text editor.
- Modify captions, questions, or responses inside the `SITE_CONTENT` object.
- Save the file and refresh your browser.

---

## 🧪 Local Preview

To preview locally on your machine, you can run any simple static server, for example:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js / npx
npx serve .
```
Then open `http://localhost:8000` in your web browser.

---

## 🎨 Design System

- **Palette**: Midnight Navy (`#06152D`), Deep Ocean (`#0B3470`), Sapphire (`#145AA8`), Ocean Blue (`#398DD8`), Ice Blue (`#9DCFFF`), Moonlight White (`#F5F9FF`), Golden Blossom (`#F5C86B`).
- **Typography**: Cormorant Garamond (headings), Inter (body), Caveat (handwritten captions).
- **Mascot**: Bubble the cat (`assets/illustrations/bubble-cat.svg`).
