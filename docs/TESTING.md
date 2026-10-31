# Verification report

Checked on 31 October 2026 against the supplied Fanio app and the rebuilt standalone website.

## Responsive layout

The site was served locally and opened in Chromium. An internal, same-origin iframe harness exercised real CSS layout at the following viewport widths. The harness is not included in the delivery.

| CSS viewport width | Document width after scrollbar | Document scroll width | Result |
| ---: | ---: | ---: | --- |
| 320 px | 305 px | 305 px | No horizontal overflow |
| 375 px | 360 px | 360 px | No horizontal overflow |
| 390 px | 375 px | 375 px | No horizontal overflow |
| 430 px | 415 px | 415 px | No horizontal overflow |
| 768 px | 753 px | 753 px | No horizontal overflow |
| 1024 px | 1009 px | 1009 px | No horizontal overflow |
| 1440 px | 1425 px | 1425 px | No horizontal overflow |
| 1920 px | 1905 px | 1905 px | No horizontal overflow |

The browser used a 15 px vertical scrollbar. A separate top-level desktop view also measured a 1348 px document and 1348 px scroll width, inside a 1363 px browser viewport.

The 320 px test initially found a grid minimum-width issue in the hero. The final CSS uses zero-minimum grid tracks and allows the phone illustration to shrink. The mobile callout sits below the phone so it does not obscure the sample entries. The complete width sweep passed after these changes.

Desktop and narrow mobile views were visually inspected. The layout checks use Chromium and CSS viewports; they are not a claim of testing on physical Android/iOS devices, Safari or Firefox.

## Interactions checked

- Theme switching updates the actual theme, palette and contextual logo artwork. The dark primary token computed to `#d9b96e`; the corresponding button computed to `rgb(217, 185, 110)`. Both light and dark views were inspected.
- Selecting the Budget preview updates `aria-selected` and shows `panel-budget` while hiding the other panels.
- Pressing End on the Budget tab selects and focuses Recurring. The code also implements ArrowLeft, ArrowRight and Home, with one tab in the forward tab sequence.
- Opening the mobile menu sets `aria-expanded="true"` and focuses its first link. Escape closes the menu and returns focus to the menu button.
- The transaction-capture FAQ disclosure opens and exposes its qualification text.
- The copy-email action reports successful copying of the public contact email.
- The request form creates an encoded `mailto:` URL with the correct subject, APK/install request, optional name, optional device and message. Inputs containing `&`, `?`, `#`, `+` and a line break were preserved in the generated URL.
- No email was sent. The managed test browser blocked the external `mailto:` handoff, so opening an actual email composer or delivering an email was not verified. The final link opens in a separate context to retain the page and visible fallback address. Visitors still need a configured email handler or can copy the address into their preferred mail service.
- With JavaScript disabled at 320 px, navigation and the direct email link remain visible; theme controls, inactive preview tabs and the enhanced form stay hidden. The document still has no horizontal overflow.

## Source and package checks

- All 170 active light/dark theme declarations in `brand.css` match the corresponding declarations from the supplied app's final theme layer.
- All nine files in `docs/asset-manifest.json` match their original application assets and recorded SHA-256 values byte-for-byte.
- All 17 local file references in `index.html` resolve, and local fragment links point to existing IDs.
- JavaScript syntax was checked with `node --check`.
- Product claims were traced to reachable components/hooks. Unsupported transfer/refund entry claims and payment-method search filtering were removed. Disabled-by-default automatic capture is qualified explicitly.
- Browser scripts make no API/network requests. There is no service worker, external runtime script, remote font or analytics integration.
- The deliverable excludes environment files, credentials, app source, Android/Capacitor configuration, Supabase client/project endpoints, databases and the QA harness.

## Practical limits

This package is a tested static marketing page. It does not ship an APK, implement financial features itself, verify the production app's behavior, publish the site, or verify a future host's security-header configuration. Its original local brand assets and system font fallback work without third-party runtime downloads.
