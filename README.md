# RoVo

A responsive, Apple-inspired marketing website for RoVo. Built with plain HTML, CSS, JavaScript, and a custom SVG bike illustration. No build step, package manager, external font, CDN, or framework is required.

## Publish on GitHub Pages

1. Unzip this folder.
2. Create a GitHub repository (or use your existing website repository).
3. Upload **the contents of this folder** to the repository root. `index.html` should be at the top level, not inside an additional `rovo` folder. Include the `assets` folder.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, then your `main` branch and **/ (root)**. Save.
6. GitHub will display your website URL once it finishes publishing. Project URLs work too: all internal links use relative paths.

No API keys or server configuration are needed. The hidden `.nojekyll` file disables unnecessary Jekyll processing; include it if uploading with Git.

## Edit founder profiles

Open `config.js`. Each founder has a name, one-sentence bio, initials, and optional photo path. The supplied bios are introductory draft copy, so adjust them to reflect each founder's actual contribution. Add full names for Dillon, Karan, and Ved if desired.

To add photos, put images in `assets/`, then update entries like this:

```js
{
  name: "Ankit Kantheti",
  shortName: "Ankit",
  initials: "AK",
  bio: "Your one-sentence description.",
  photo: "assets/ankit.jpg",
  photoPosition: "center 30%"
}
```

The attached reference photos could not be retrieved during this build. Designed initials are used intentionally instead of guessed photo-to-name matches. They are replaced automatically when you add photo paths; missing images gracefully fall back to initials. Use portrait images of approximately 900 × 1200 pixels, ideally under 300 KB each.

The brief founder mention on the home page is in `index.html`. The complete founders page is `founders.html`. For an official logo, replace the text wordmark in both HTML files with an image and provide accessible alt text. The current wordmark and bike illustration are original text/vector treatments, not a reconstruction of an inaccessible attachment.

## Files

- `index.html`: home page, concept walkthrough, FAQs.
- `founders.html`: dedicated founders page.
- `styles.css`: all responsive styling, animations, and reduced-motion rules.
- `app.js`: scroll effects, accessible experience tabs, founder rendering.
- `config.js`: editable founder profiles.
- `assets/rovo-bike.svg`: original editable bike illustration.
- `assets/icon.svg`: browser favicon.
- `.nojekyll`: GitHub Pages static-site setting.

## Preview locally

Double-click `index.html`, or run from this folder:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`. No installation is needed if Python is already available. The site also works directly from the filesystem.

## Design and behavior

Responsive layouts adapt from small iPhones through desktop monitors. Effects include scroll reveals, desktop bike parallax, a moving text strip, an animated route, hover transitions, and a scroll-progress indicator. System reduced-motion preferences disable motion. The concept walkthrough supports touch, click, arrow keys, Home, and End. FAQs use native accessible disclosure elements.

## Content before launch

This is a marketing website for a developing venture. The map is schematic and clearly labeled as a concept. No claims are made about approved university operations, live bikes, prices, or availability. There is no rental checkout, email collection, app download, or backend hidden behind the buttons. All calls to action lead to actual content on these pages.

Update the development status, FAQs, operational details, founder bios, and brand artwork before announcing an actual service. Photos and the official logo can be added without changing the site architecture.
