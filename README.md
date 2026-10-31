# Fanio marketing website

The completed, standalone Fanio landing page. Open it locally with a static web server; there is no code generator, dependency installation or build step.

## Run locally

Extract `fanio-website-rebuilt.zip`. Open a terminal in its `fanio-website` folder and run:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open **http://localhost:8080**. Stop the server with **Ctrl+C**.

For example, on Linux or macOS:

```bash
unzip fanio-website-rebuilt.zip
cd fanio-website
python3 -m http.server 8080 --bind 127.0.0.1
```

On Windows with Python installed:

```powershell
Expand-Archive .\fanio-website-rebuilt.zip -DestinationPath .\fanio-preview
cd .\fanio-preview\fanio-website
py -m http.server 8080 --bind 127.0.0.1
```

Use a fresh extraction folder if one with that name already exists. Opening `index.html` directly also shows the page, but a local server provides more consistent browser behavior, including clipboard support.

## What is included

- A responsive landing page using the app's actual warm cream, graphite and gold tokens.
- Exact supplied horizontal logos, wordmarks, vertical artwork, coin symbol, favicon and social image.
- Light mode by default and an optional persistent dark theme. The website uses its own `fanio-marketing-theme` preference key.
- An interactive Daily / Budget / Recurring phone illustration with clearly labeled sample data.
- Source-checked feature descriptions, the researched Fanam name story, FAQ and email-based APK requests.
- The requested **Google Play — coming soon** status, without an inactive store-download button.
- Accessible navigation, keyboard-operated preview tabs, visible focus, reduced-motion support, and direct email links that work without JavaScript.

## The website is separate from the application

This directory contains HTML, CSS, browser JavaScript, supplied public brand artwork and documentation. It does not contain the React application, Capacitor configuration, Android project, Supabase client, application database, environment files, tokens or credentials. The app source was inspected as a reference and was not modified.

There are no remote fonts, analytics scripts, API requests, sign-in flows or third-party runtime dependencies. Typography uses the same Inter/system stack specified by the app; the supplied project did not include an Inter font file, so the browser uses the available system fallback when Inter is not installed.

The phone visual is an interactive HTML illustration of supported concepts. It is **not a captured screen, a working financial application or a live bank connection**. All amounts are fictional example data. See `docs/FEATURES.md` for the evidence and arithmetic notes.

## APK requests

The contact address is **adiljaseem.2000@gmail.com**, retained from the public email link in your supplied website.

1. A visitor optionally enters their name, Android device and message.
2. **Open email request** builds a URL-encoded `mailto:` draft containing the APK request and installation-instruction request.
3. The visitor reviews and sends the email in their mail application.
4. You reply with the APK and instructions yourself.

The website does not send email, save requests or distribute an APK. Actual opening of the mail composer depends on the visitor having a mail handler configured. The draft link opens in a separate context so the landing page and fallback address remain available; a browser may briefly open a new tab. A direct email link, visible address, copy button and retry link are provided. Requests are not represented as delivered just because a draft is opened.

To change the contact address, replace its occurrences in `index.html`. `site.js` derives the recipient from `#contact-email`; it does not contain a separate hardcoded address. If the contact person's name changes, also update the draft greeting in `site.js`.

## Edit the page

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, product copy, references, contact email and metadata |
| `brand.css` | Active light/dark token blocks copied from the supplied app |
| `styles.css` | Responsive layout, component styling and reduced-motion rules |
| `theme-init.js` | Applies the saved website theme before the first render |
| `site.js` | Theme button, mobile menu, keyboard tabs, email draft and copy behavior |
| `assets/brand/` | Original supplied app assets, without recoloring or stretching |
| `_headers` | Optional security headers for static hosts that support this file |
| `robots.txt` | Basic crawler instructions |
| `docs/BRANDING.md` | Exact source files, palette and correct logo roles |
| `docs/FEATURES.md` | Feature evidence and limitations |
| `docs/RESEARCH.md` | Historical research and published source URLs |
| `docs/TESTING.md` | Actual layout and interaction verification results |
| `docs/asset-manifest.json` | Original asset paths and SHA-256 checksums |

## Deploy later

The folder is ready to serve on a static host. Set no build command and serve the directory containing `index.html`. Upload its contents together, preserving the `assets/brand` paths. The site is not published by this delivery.

After choosing a public domain, replace the relative `og:image` value in `index.html` with that image's absolute HTTPS URL, and add `og:url` and a canonical URL for your actual domain. No deployment domain has been invented in this package.

`_headers` is optional host configuration. On hosts that do not understand it, configure equivalent headers through that host or leave it as a plain file. Python's local server does not apply `_headers`.

When Google Play becomes available, replace the status text and add the real listing URL. The current design deliberately describes availability without inventing a listing or release date.

## Branding and rights

Brand files were copied byte-for-byte from the supplied project. Their existing ownership and licensing remain unchanged. Historical sources are linked for verification; no museum image or external font has been downloaded into this site.
