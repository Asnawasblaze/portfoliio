# KPRVerse Typography & Color System

**Executive Summary:** The KPRVerse site uses the **ABC Whyte** typeface family (specifically the *Inktrap* subfamily) for its bold, futuristic headings and nav items, paired with the *Mono* subfamily for UI labels. Critically, it leverages the variable-font **optical size (opsz)** axis to deepen the inktrap cuts at display sizes. Headings use heavy weights (700–800+) of *ABC Whyte Inktrap* with very tight tracking (negative `letter-spacing`) and large sizes. UI labels use medium-weight *ABC Whyte Mono* with slight positive tracking. The color scheme is a dark, monochromatic purple (#6D64A3) accented with neon cyan/blue highlights; light gray or white text on this background meets accessibility contrast. We outline the font inventory, exact `@font-face` rules, CSS design tokens for font sizing/tracking, recommended opsz+weight combos, color tokens/hex values, and implementation tips. The result is a drop-in-ready CSS system matching KPRVerse’s aesthetic.

## Font Inventory on KPRVerse

- **ABC Whyte Inktrap (Variable):** Used for large display text (page titles, main menu). Weights from *Bold (700)* up to *Heavy/Black (800–900)*. Exposes at least `wght` (weight) and `opsz` (optical size) axes. Example static files: `ABCWhyteInktrap-Bold.otf`, `ABCWhyteInktrap-Heavy.otf`, or a single variable TTF/WOFF2 (trial version).
- **ABC Whyte Mono (Variable):** Used for small UI labels, metadata, and page numbers. Typically the *Medium (500)* weight. Also exposes `wght` (and possibly `opsz` if variable format is used). Example: `ABCWhyteMono-Medium.otf` or the variable OTF/TTF.
- **(Possibly) ABC Whyte (Sans):** For any body or paragraph text. If present, weights around *Book/Regular (400)* are used. Not prominently featured on the homepage (minimal body copy).
- **(Secondary)** In some branding contexts, *IBM Plex Mono* is mentioned as a fallback/secondary font, but on the site itself the Whyte family appears dominant.
  
The table below summarizes the main fonts:

| Font Family         | Weights Used     | Variable Axes    | Use Case                 |
|---------------------|------------------|------------------|--------------------------|
| **ABC Whyte Inktrap** | 700–900 (Bold–Black) | `wght`, `opsz`   | Hero titles, nav labels  |
| **ABC Whyte Mono**    | 500 (Medium)       | `wght` (maybe `opsz`) | Small labels, page numbers |
| **ABC Whyte (sans)**  | 400 (Regular/Book) | `wght`, `opsz`   | Body text (if any)        |

## @font-face Rules

Include `@font-face` blocks that load the variable fonts (WOFF2/WOFF for web use). For example:

```css
/* ABC Whyte Inktrap (Variable Font) */
@font-face {
  font-family: "ABC Whyte Inktrap";
  src: url("/fonts/ABCWhyteInktrapVariable-Trial.woff2") format("woff2"),
       url("/fonts/ABCWhyteInktrapVariable-Trial.woff") format("woff"),
       url("/fonts/ABCWhyteInktrapVariable-Trial.ttf") format("truetype");
  font-weight: 100 900;    /* covers Light through Black */
  font-style: normal;
  font-display: swap;
}

/* ABC Whyte Mono (Variable Font) */
@font-face {
  font-family: "ABC Whyte Mono";
  src: url("/fonts/ABCWhyteMonoVariable-Trial.woff2") format("woff2"),
       url("/fonts/ABCWhyteMonoVariable-Trial.woff") format("woff"),
       url("/fonts/ABCWhyteMonoVariable-Trial.ttf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

Use `font-display: swap;` to avoid flash of invisible text. Ensure correct paths and formats for your build. If a variable font is not available, you can similarly define separate `@font-face` rules for each static weight (e.g. Bold, Heavy) with matching `font-weight` values.

**Fallback fonts:** In CSS, always include generic or system fallbacks. Example:
```css
body {
  font-family: "ABC Whyte Inktrap", "ABC Whyte", Helvetica, Arial, sans-serif;
}
```
And for monospace labels:
```css
.code-label {
  font-family: "ABC Whyte Mono", "IBM Plex Mono", monospace;
}
```

## Typography Tokens & CSS Settings

Define CSS custom properties for consistent typography. Use `clamp()` for responsive scaling. Example token definitions:

```css
:root {
  /* Font Families */
  --font-display: "ABC Whyte Inktrap", sans-serif;
  --font-ui:      "ABC Whyte Mono", monospace;

  /* Hero/Title text (large scale) */
  --fs-hero:   clamp(7rem, 10vw, 14rem);
  --lh-hero:   0.82;             /* tight line-height */
  --ts-hero:   -0.08em;          /* tight tracking (letter-spacing) */
  --fw-hero:   800;              /* heavy weight */

  /* Navigation items */
  --fs-nav:    clamp(3rem, 6vw, 6rem);
  --lh-nav:    0.85;
  --ts-nav:    -0.07em;
  --fw-nav:    700;

  /* Labels / Meta text */
  --fs-label:  0.75rem;
  --lh-label:  1.0;
  --ts-label:  0.04em;
  --fw-label:  500;

  /* Colors (defined later) */
  --color-bg:          #08060E;
  --color-primary:     #6D64A3;
  --color-text:        #F4F4F4;
  --color-text-bold:   #FFFFFF;
  --color-accent-neon: #00FFFF;
  --color-meta-gray:   #A0A0A0;
}
```

### Component Styles

Use these tokens in class definitions. For example, the **hero title** (main page heading) and navigation items:

```css
.hero-title {
  font-family: var(--font-display);
  font-size: var(--fs-hero);
  line-height: var(--lh-hero);
  letter-spacing: var(--ts-hero);
  text-transform: uppercase;
  font-variation-settings: 
      "wght" var(--fw-hero),
      "opsz" 0.5; /* maximum inktrap depth */
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
}

.nav-item {
  font-family: var(--font-display);
  font-size: var(--fs-nav);
  line-height: var(--lh-nav);
  letter-spacing: var(--ts-nav);
  text-transform: uppercase;
  font-variation-settings: 
      "wght" var(--fw-nav),
      "opsz" 0.5;
  font-kerning: normal;
}

.label {
  font-family: var(--font-ui);
  font-size: var(--fs-label);
  line-height: var(--lh-label);
  letter-spacing: var(--ts-label);
  font-weight: var(--fw-label);
  text-transform: uppercase;
  color: var(--color-meta-gray);
}
```

### Opsz + Weight Combinations

Key combinations to reproduce the KPR look:

- **Opsz (Optical Size) = 0.5:** This is the minimum value and yields the deepest inktraps (the “high-fashion” style). Use this for all display text. 
- **Weight (wght) ~700–800:** The site’s titles use bold/heavy weights. For example, `font-variation-settings: "wght" 800, "opsz" 0.5` creates very bold letters with pronounced ink traps.
- **Higher Opsz (e.g. 72):** A large opsz (~72) makes a nearly trap-free, normal-looking glyph. (KPRVerse does *not* use high opsz; it specifically uses the low end to amplify the effect.)
- You can combine both axes smoothly. For interactive effects, you might animate or transition opsz. E.g.:
  ```css
  .hero-title:hover {
    font-variation-settings: "wght" 800, "opsz" 0.5;
  }
  .hero-title {
    font-variation-settings: "wght" 700, "opsz" 4;
    transition: font-variation-settings 0.3s ease;
  }
  ```
  This would make the text “pop” with deeper traps on hover.

The table below summarizes typical values:

| Element       | Font                 | Weight (`wght`) | Opsz | Letter-Spacing   |
|---------------|----------------------|-----------------|------|------------------|
| Hero/Title    | ABC Whyte Inktrap    | 800             | 0.5  | -0.08em          |
| Nav Items     | ABC Whyte Inktrap    | 700             | 0.5  | -0.07em          |
| Small Labels  | ABC Whyte Mono       | 500             | n/a  | +0.04em          |

*(“n/a” for opsz means it’s either not varied or not needed for small body text.)*

## Color Palette and Tokens

KPRVerse uses a **monochromatic purple theme** with neon accents. Define these in CSS as variables for consistency:

```css
:root {
  --color-primary:     #6D64A3; /* Deep violet (used in sections/accents) */
  --color-bg:          #08060E; /* Almost-black background */
  --color-text:        #F4F4F4; /* Light gray text */
  --color-text-bold:   #FFFFFF; /* Pure white for highest contrast (titles) */
  --color-accent:      #00FFFF; /* Neon cyan (interactive highlights) */
  --color-meta:        #A0A0A0; /* Muted gray for secondary info */
}
```

**Usage roles:**  
- **Background:** `var(--color-bg)` on main containers (near-black).  
- **Primary Accent/Sections:** `var(--color-primary)` (purple) for header/footer backgrounds or highlights.  
- **Text:** Use `var(--color-text)` (#F4F4F4) for most text on dark backgrounds (contrast ~5.3:1 against #6D64A3). Use `var(--color-text-bold)` (#FFF) for titles to maximize legibility.  
- **Accent:** `var(--color-accent)` (#00FFFF) for links, buttons, or glow effects.  
- **Meta/Disabled:** `var(--color-meta)` for captions or inactive items.

### Accessibility (Contrast & Fallbacks)

- **Contrast:** Ensure all text meets WCAG 2.1 AA contrast (4.5:1 for normal text). White on the deep purple (#6D64A3) has ~5.25:1, which passes AA. Light gray (#F4F4F4) on purple is ~4.77:1 (just above AA). For safety, main headings use pure white. Always test with tools (e.g. WebAIM Contrast Checker).
- **Scaling:** Use responsive units (`rem`, `vw`, `clamp()`) so typography scales on different screens. Ensure minimum font sizes remain readable. 
- **Fallback Fonts:** In case the custom font fails, list system fonts. For example:
  ```css
  font-family: "ABC Whyte Inktrap", "Helvetica Neue", Arial, sans-serif;
  ```
  This ensures legibility. Similarly, monospace fallback can be `"ABC Whyte Mono", "IBM Plex Mono", monospace`.
- **Font Loading:** Use `font-display: swap` in `@font-face` as shown, to avoid blank text. Optionally preconnect or preload the font files for performance.
- **Opsz Support:** Most modern browsers (Chrome, Safari, Firefox) support the `opsz` axis. Always test in older browsers; if unsupported, the font will use default opsz (usually matching font-size). You can detect support in JavaScript:
  ```js
  console.log(CSS.supports("font-variation-settings", "\"opsz\" 0.5"));
  ```
  If false, consider that the inktraps may be shallower. The site should still be legible (fallback to normal variation).

## Implementation Checklist & Troubleshooting

- **🗹 @font-face loaded:** Verify the custom fonts are correctly defined (check Network tab for 200 status).  
- **🗹 Font weights range:** `font-weight: 100 900` covers all. If using static fonts, ensure each weight (`700`, `800`, etc.) is declared.  
- **🗹 CSS variables applied:** Check DevTools that `--fs-hero`, `--ts-hero` etc. resolve correctly.  
- **🗹 Font-variation effective:** Inspect an element in Chrome DevTools → *Styles* to see `font-variation-settings`. You can also use `document.fonts.check()` in console to see if a variation is active.  
- **🗹 Contrast meets AA:** Use a contrast-check tool with the chosen colors and text sizes.  
- **🗹 Responsive:** Resize the viewport; headings should fluidly scale (due to `clamp`) and remain legible.  
- **🗹 Fallbacks:** Temporarily disable the custom font (e.g. in DevTools) to ensure the page still renders in a reasonable alternative font.

Below is a **drop-in snippet** showing how this could be used in HTML/CSS:

```html
<!-- Example HTML Structure -->
<header>
  <h1 class="hero-title">STORY</h1>
  <nav>
    <ul>
      <li><a class="nav-item" href="#">DISCOVER</a></li>
      <li><a class="nav-item" href="#">CONNECT</a></li>
      <li><a class="nav-item" href="#">JOURNAL</a></li>
    </ul>
    <div class="label">PAGE 001</div>
  </nav>
</header>
```

```css
/* CSS Styling (uses the variables defined above) */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  margin: 0;
}

header {
  padding: 2rem;
}

.hero-title {
  /* uses --fs-hero, --lh-hero, etc. */
}

.nav-item {
  /* uses --fs-nav, --ts-nav, etc. */
}

.label {
  /* uses --fs-label, --ts-label */
}
```

This setup mirrors KPRVerse’s style: large, uppercase purple-ink-trapped headings and tight tracking, a minimal color palette of purple/white/neon, and attention to contrast and variable-font axes. Adjust the exact numeric values (sizes, tracking) to fine-tune the look, but the above code provides the core system needed. 


"Create a sophisticated, responsive sidebar and menu system. > > **The Dynamic Background:** > - Implement a **Full-Viewport Canvas Background**: A `<canvas>` element that covers the entire frame (`width: 100vw; height: 100vh; position: fixed; z-index: -1;`). > - **Visual Effect:** The background should feature a dynamic effect (such as a subtle grain/noise filter, a fluid gradient, or interactive particle movement) that sits behind all content layers. > > **Core Architecture:** > 1. **The Frame Layering:** Use a multi-layered structure with `.the-frame-layer` and `.mask` elements (top and bottom outer/inner) to create depth and frame the navigation. > 2. **Navigation Bar:** A `.bar.flex-row` that uses `display: flex` to house the menu. > > **Typography & Interaction Layering:** > - **Hacky-Text Component:** Use a `.hacky-text.relative.label` container. > - **Static Layer (`.spacer`):** This defines the layout and contains the primary visible text. > - **Animation Layer (`.animation`):** Use an absolute-positioned overlay (`.animation`) on top of the text. This layer should be used for reveal effects (e.g., text changing color, sliding in, or glitching) triggered by mouse-over on the parent. > > **CSS Styling:** > - Set parent containers to `position: relative` and `overflow: hidden`. > - Use large, bold typography (`~5rem`) with tight line-height (`0.94`). > - Ensure all backgrounds on UI elements are `transparent` (`rgba(0,0,0,0)`) to let the underlying Canvas effect remain visible."
Here is the breakdown of the CSS currently applied to the areas you requested:
The Canvas Overlay: The site uses a <canvas> element that spans the full 326px x 751px (viewport size). This is likely running a WebGL or 2D context loop to render the visuals you see.
Transparency Chain: To make this work, every ancestor of your inspected element—from .animation all the way up to .layout-default—has background-color: rgba(0, 0, 0, 0) (transparent).
Masking & Framing: The classes like .mask-top-outer and .mask-bottom-inner suggest the site uses "CSS Masking" or simply layout divs to "cut out" the areas where the background effect should be most prominent, creating a "framed" look for the sidebar.
1. The Parent Container (.hacky-text.relative.label)
This acts as the layout anchor for the text and its animation counterpart.
css
.hacky-text.relative.label {
  position: relative;
  display: block;
  width: 152.062px; /* Calculated width */
  height: 42.0625px; /* Calculated height */
  font-size: 5.15325rem; /* Large impact typography */
  line-height: .94;
  box-sizing: border-box;
}
2. The Spacer (.spacer)
The spacer provides the physical footprint of the text while ensuring the layout doesn't collapse.
css
.spacer {
  display: block;
  width: 152.062px;
  height: 42.0625px;
  max-width: 100%;
}
3. The Animation Layer (.animation)
This is the hidden layer meant for "reveal" animations or hover effects.
css
.animation {
  position: absolute;
  top: 0;
  left: 0;
  display: none; /* Hidden by default, toggled via JS or hover */
  width: auto;
  max-width: 100%;
  pointer-events: none; /* Usually disabled to allow interaction with layer below */
}
4. The Sidebar Frame (.bar.flex-row)
Though currently showing 0px width (likely due to a collapsed state or mobile view), it is structured as:
css
.bar.flex-row {
  display: flex;
  flex-direction: row;
  position: relative;
  /* Parent of the submenu and label groups */
}