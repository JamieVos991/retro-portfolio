# Jamie.exe — Retro Portfolio

Een interactief portfolio in Win95-stijl. Vensters slepen, iconen openen, klok tikt mee.

## Wat het is

Een statische webpagina die eruitziet als een Windows 95-bureaublad. Elk onderdeel van het portfolio (over mij, projecten, cv, skills, contact) zit in een eigen versleepbaar venster. Geen frameworks, geen buildstap — alleen HTML, CSS en JavaScript.

## Bestandsstructuur

```
├── index.html        Markup — semantische HTML, data-attributen als JS-hooks
├── styleguide.css    Design tokens, reset, basis typografie (Win95 kleurenpalet, border-variabelen)
├── styles.css        Layout en componenten — @layer reset/base/layout/components/utilities
├── script.js         Vensters slepen, openen/sluiten, klok, tool-chips
└── fotos/            Afbeeldingen (avif, png)
```

## Technieken

- **CSS `@layer`** — cascade gelaagd in `reset → base → layout → components → utilities`
- **CSS design tokens** — Win95 kleuren en border-stijlen als custom properties in `styleguide.css`
- **CSS Grid** — icoonplank gebruikt `grid-auto-flow: column` + `repeat(auto-fill, 110px)` zodat iconen automatisch naar een nieuwe kolom wrappen op basis van schermhoogte
- **CSS nesting** — component-stijlen genest binnen hun ouder-selector
- **Pointer Events API** — vensters slepen met `setPointerCapture` voor soepele tracking ook buiten het element
- **`data-*` attributen** — `data-window` op iconen, `data-window-id` op vensters, `data-description` op tool-chips; klassen alleen voor JS-state (`.open`, `.active`, `.dragging`)
- **`aria-live`** — beschrijvingstekst bij tool-chips wordt aangekondigd aan screenreaders
- **z-index hiërarchie** — vensters beginnen op z-index 10 en worden bij aanraken naar voren gebracht; taskbar zit altijd op 1000, CRT-overlay op 1001

## Browserondersteuning

Moderne browsers (Chrome, Firefox, Safari, Edge). Vereist ondersteuning voor CSS nesting en `@layer`.
