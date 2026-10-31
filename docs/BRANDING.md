# Fanio website: branding and source provenance

This website uses the branding from the supplied Fanio application archive, `budget-tool-source(1).zip`. It is an independent static marketing website. The application remains the reference for the theme, logo variants, tagline and feature descriptions.

## Which theme is actually active?

The application's `src/main.jsx` imports styles in this order:

1. `src/index.css`
2. `src/styles/modern-ui.css`
3. **`src/styles/fanam-theme.css`**

The final stylesheet supplies the current warm-white, graphite and gold identity. The older blue/slate token declarations near the beginning of `src/index.css` are overridden. Reading only the first color declarations would therefore select the wrong theme.

The website's `brand.css` copies the active light and dark token blocks from `src/styles/fanam-theme.css`. Its additional `--font-sans` variable uses the application's own font stack. Layout rules live separately in `styles.css`.

### Key palette values

| Role / application token | Light | Dark |
|---|---|---|
| Canvas / `--bg-base` | `#f7f5f0` | `#101216` |
| Surface / `--bg-surface` | `#fffefa` | `#15181d` |
| Card / `--bg-card` | `#fffefa` | `#181b20` |
| Elevated surface / `--bg-elevated` | `#f1eee7` | `#1b1f25` |
| Main text / `--ink-1` | `#20242c` | `#f5f3ee` |
| Supporting text / `--ink-2` | `#424852` | `#d8d4ca` |
| Muted text / `--ink-3` | `#6b7280` | `#aaa69d` |
| Primary gold / `--brand-primary` | `#b88931` | `#d9b96e` |
| Stronger gold / `--brand-primary-dark` | `#93691f` | `#c79d48` |
| Text on gold / `--brand-on-primary` | `#171a20` | `#171a20` |
| Positive state / `--mint` | `#2e936a` | `#58c394` |
| Negative state / `--rose` | `#c95c5c` | `#ef8181` |

The metallic effect belongs to the supplied coin artwork. Interface controls use restrained gold highlights and neutral surfaces, following `docs/BRAND_GUIDE.md` in the application.

The app defaults to light mode in `src/hooks/useTheme.jsx`; this website does the same. The website stores an optional preference under `fanio-marketing-theme`, separate from the app's `fanio-theme` setting.

## Logo selection follows the components

The source of truth for logo selection is **`src/components/Brand/FanioLogo.jsx`**, particularly its `BRAND_ASSETS` and `VARIANTS` mappings. Current component usage was also inspected; artwork was not chosen by filename alone.

In the supplied filenames, **`dark` means dark artwork intended for a light surface**, while **`light` means light artwork intended for a dark surface**.

| Website use | Source asset under `public/` | Reason for selection |
|---|---|---|
| Header and footer on light surfaces | `brand/fanio-lockup-dark.svg` | Approved horizontal `lockup`, also used by the app's desktop sidebar. |
| Header and footer on dark surfaces | `brand/fanio-lockup-light.svg` | Matching approved artwork for dark surfaces. |
| Illustrative phone header on light surfaces | `brand/fanio-wordmark-dark.svg` | The current mobile `src/components/Layout/Header.jsx` selects `variant="wordmark"`. |
| Illustrative phone header on dark surfaces | `brand/fanio-wordmark-light.svg` | Matching wordmark variation for dark surfaces. |
| Coin mark, name story and decorative app watermark | `brand/fanio-symbol.svg` | Exact asset selected by the app's `FanioMark` component. |
| Stacked branding in the APK request section | `brand/fanio-vertical-lockup-dark.png` and `brand/fanio-vertical-lockup-light.png` | Approved vertical variants used in authentication, app lock and profile surfaces. |
| Social sharing artwork | `brand/fanio-og-1200x630.png` | Explicitly registered as `BRAND_ASSETS.openGraph`. |
| Favicon and touch icon | `icons/icon-192.png` | Supplied app icon, copied as `assets/brand/fanio-icon-192.png`. |

The complete copy map and SHA-256 checksums are recorded in **[asset-manifest.json](asset-manifest.json)**. The logo files are copied from the source; they are not AI-generated replacements or approximate redrawings.

### Preserve the artwork's proportions

The horizontal lockups have a **2172 × 724** viewBox: an exact **3:1** ratio. The website preserves that ratio using the intrinsic dimensions, proportional width and automatic height. The other artwork retains its own dimensions.

Do not force the horizontal lockup into a square image box. Do not place an additional ordinary-text “fanio” beside it: the supplied lockup already includes the wordmark. Do not recolor the logo with CSS filters. Select the appropriate approved light-surface or dark-surface asset instead.

Some supplied SVG files contain embedded bitmap artwork and are substantially larger than path-only SVGs. The complete original artwork is retained here for fidelity.

## Typography and brand wording

The site's body and interface use the same stack as the application:

```css
Inter, ui-sans-serif, system-ui, -apple-system,
BlinkMacSystemFont, "Segoe UI", sans-serif
```

The supplied app does not include local Inter font files. This website follows the same system fallback behavior and does not add an external font request. The precise body-font rendering can therefore vary by operating system. The logo's lettering is supplied artwork and remains visually consistent.

The following wording comes from `src/lib/brand.js`:

- Product name: **Fanio**
- Tagline: **the smartest way to watch your fanam**
- Motto: **See it clearly. Decide with confidence.**

The name story separates externally sourced Fanam history from Fanio's own interpretation. Historical links appear directly in the website's “Explore the history” section. The illustrated coin is identified as the supplied brand mark, rather than presented as a photograph of a museum specimen.

## What was wrong with the previous website?

The supplied `fanio-website.zip` had two concrete branding problems:

1. Its `brand.css` set `--primary` to **`#f8fafc`**, with `--page: #fbfaf8` and `--ink: #182321`. Those were not the app's active gold, warm-white and graphite values. The nearly white primary color made intended accent treatments disappear.
2. Its `assets/fanio-logo.svg` was actually a byte-for-byte copy of the approved horizontal dark lockup. However, the page put that full 3:1 lockup into **42 × 42** and **38 × 38** image boxes, then added a separate CSS-text **“fanio.”** beside it. This shrank the correct artwork and duplicated the brand name.

The rebuild fixes the token selection, the artwork roles, the proportions and the contextual light/dark variations.

## Product preview and illustrative content

The phone preview and feature illustrations are HTML/CSS demonstrations with sample figures. They are **not screenshots of a running app**, connected financial records or evidence of user results. The phone's caption states this explicitly, and examples are labeled in the relevant sections.

The illustrations use the source-verified features and actual theme assets, but the website does not include or execute the Capacitor/Supabase application. Keep the example-data labels if you update or reuse the illustrations.

## Updating the branding later

When the application branding changes, inspect its current entry-point stylesheet order and `FanioLogo.jsx` mappings again. Update `brand.css` and only the assets selected for their intended roles, then refresh `asset-manifest.json`. Preserve the separate website theme preference, sample-data labels and supplied wordmark proportions.
