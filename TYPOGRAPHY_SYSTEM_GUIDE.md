# Typography System Implementation Guide

## Overview
This document outlines the complete KPRVerse-inspired typography system implemented in the Asnawas Portfolio. The system uses variable fonts with CSS custom properties for consistent, responsive, and accessible typography.

---

## 1. Font Files & @font-face Rules

### Font Files Location
All font files are stored in `/public/fonts/`:
- `ABCWhyteInktrapVariable-Trial-1.ttf` - Display/Headlines
- `ABCWhyteVariable-Trial.ttf` - Body text
- `ABCWhyteSemi-MonoInktrap-Regular-Trial.otf` - UI Labels & Code

### @font-face Declarations
Located in `/styles/typography-system.css` (lines 7-37):
- **ABC Whyte Inktrap** - Display font with variable weight and optical size axes
- **ABC Whyte** - Body font with variable weight and optical size axes
- **ABC Whyte Mono** - UI/Code font for labels and monospace text

All fonts use `font-display: swap` for optimal loading performance.

---

## 2. CSS Custom Properties (Design Tokens)

### Font Families
```css
--font-display: "ABC Whyte Inktrap", sans-serif;
--font-body: "ABC Whyte", sans-serif;
--font-ui: "ABC Whyte Mono", monospace;
```

### Hero Title (Largest)
```css
--fs-hero: clamp(7rem, 10vw, 14rem);     /* 7rem min, 10vw preferred, 14rem max */
--lh-hero: 0.82;                         /* Tight line-height */
--ts-hero: -0.08em;                      /* Tight tracking (letter-spacing) */
--fw-hero: 800;                          /* Heavy weight */
--opsz-hero: 0.5;                        /* Maximum inktrap effect */
```

### Page Title
```css
--fs-title: clamp(4rem, 8vw, 10rem);
--lh-title: 0.84;
--ts-title: -0.07em;
--fw-title: 800;
--opsz-title: 0.5;
```

### Navigation Items
```css
--fs-nav: clamp(3rem, 6vw, 6rem);
--lh-nav: 0.85;
--ts-nav: -0.07em;
--fw-nav: 700;
--opsz-nav: 0.5;
```

### Heading Hierarchy (H1-H3)
- **H1**: clamp(2.5rem, 5vw, 5rem) - weight 700
- **H2**: clamp(1.8rem, 4vw, 3.5rem) - weight 700
- **H3**: clamp(1.2rem, 2.5vw, 2.2rem) - weight 600

### Body Text
```css
--fs-body: clamp(0.95rem, 1.2vw, 1.1rem);
--lh-body: 1.6;
--fw-body: 350;
--opsz-body: 0.5;
```

### Labels / UI Text
```css
--fs-label: clamp(0.65rem, 0.8vw, 0.85rem);
--lh-label: 1.0;
--ts-label: 0.04em;    /* Positive tracking */
--fw-label: 500;
```

---

## 3. Component Classes

### Hero Title
```html
<h1 class="hero-title">Portfolio</h1>
```
- **Font**: ABC Whyte Inktrap
- **Weight**: 800
- **Size**: clamp(7rem, 10vw, 14rem)
- **Tracking**: -0.08em
- **Font Variation**: wght 800, opsz 0.5

### Page Title
```html
<h2 class="page-title">KEEPERS</h2>
```
- **Font**: ABC Whyte Inktrap
- **Weight**: 800
- **Size**: clamp(4rem, 8vw, 10rem)
- **Tracking**: -0.07em

### Navigation Item
```html
<a class="nav-item" href="#">IDEAS</a>
```
- **Font**: ABC Whyte Inktrap
- **Weight**: 700
- **Size**: clamp(3rem, 6vw, 6rem)
- **Tracking**: -0.07em

### Headings (H1-H3)
```html
<h1>Large Heading</h1>
<h2>Medium Heading</h2>
<h3>Small Heading</h3>
```
All use font-display with appropriate sizing and weights.

### Body Text
```html
<p class="body-text">Regular paragraph text...</p>
```
- **Font**: ABC Whyte
- **Weight**: 350
- **Size**: clamp(0.95rem, 1.2vw, 1.1rem)
- **Line-height**: 1.6

### Label / UI Text
```html
<span class="label">DISCOVER MORE</span>
<span class="label">JOIN THE CONVERSATION</span>
```
- **Font**: ABC Whyte Mono
- **Weight**: 500
- **Size**: clamp(0.65rem, 0.8vw, 0.85rem)
- **Letter-spacing**: +0.04em
- **Color**: #A0A0A0 (--color-meta-gray)

### Caption Text
```html
<p class="caption">Additional information...</p>
```
- **Size**: clamp(0.75rem, 0.9vw, 0.9rem)
- **Weight**: 400
- **Color**: #A0A0A0 (--color-meta-gray)

---

## 4. Optical Size (opsz) & Weight Combinations

### Variable Font Axes

The ABC Whyte fonts expose **two main axes**:
1. **Weight (wght)**: 100-900
2. **Optical Size (opsz)**: 0.5-72 (controls inktrap depth)

### Optimal Combinations

| Element | Weight | opsz | Effect |
|---------|--------|------|--------|
| Hero Title | 800 | 0.5 | Maximum inktrap, deep cuts |
| Page Title | 800 | 0.5 | Bold, dramatic appearance |
| Nav Items | 700 | 0.5 | Strong, uppercase impact |
| H1-H3 | 700/600 | 0.5 | Display-optimized |
| Body Text | 350 | 0.5 | Light, readable |
| Labels | 500 | n/a | Monospace, consistent |

### Opsz Values Explained

- **opsz = 0.5** (minimum): Maximum inktrap depth - dramatic, fashion-forward look
- **opsz = 4** (medium): Balanced appearance, good for medium-sized text
- **opsz = 72** (maximum): Nearly normal appearance, minimal traps

---

## 5. Color Palette

### Dark Mode (Primary)
```css
--color-bg: #08060E;                 /* Almost-black background */
--color-primary: #6D64A3;            /* Deep violet accents */
--color-text: #F4F4F4;               /* Light gray text */
--color-text-bold: #FFFFFF;          /* Pure white for high contrast */
--color-accent-neon: #00FFFF;        /* Neon cyan highlights */
--color-meta-gray: #A0A0A0;          /* Muted gray for captions */
```

### Light Mode (Alternative)
```css
--color-bg-light: #ecebe7;           /* Light beige background */
--color-text-dark: #000000;          /* Black text on light */
```

### Contrast & Accessibility
- White (#FFF) on Purple (#6D64A3): ~5.25:1 contrast (WCAG AAA)
- Light Gray (#F4F4F4) on Purple: ~4.77:1 contrast (WCAG AA)
- Meta Gray (#A0A0A0) for captions and secondary text

---

## 6. Implementation Checklist

### ✅ Font Loading
- [ ] Verify `/fonts/` directory contains all three font files
- [ ] Check DevTools Network tab - fonts load with 200 status
- [ ] Font swap enabled (no flash of invisible text)

### ✅ CSS Variables Applied
- [ ] Open DevTools → Styles panel
- [ ] Inspect any element with typography class
- [ ] Verify `--fs-*`, `--fw-*`, `--ts-*` custom properties resolve

### ✅ Font Variations Active
- [ ] Inspect hero title in DevTools
- [ ] Look for `font-variation-settings: "wght" 800, "opsz" 0.5`
- [ ] Test in Chrome, Firefox, Safari (all support variable fonts)

### ✅ Responsive Scaling
- [ ] Resize viewport from 320px to 2560px
- [ ] Headings should scale smoothly with clamp()
- [ ] Text remains readable at all sizes

### ✅ Contrast & Accessibility
- [ ] Use WebAIM Contrast Checker tool
- [ ] Test main text (light gray on dark purple) - passes AA
- [ ] Test captions (muted gray) - visible and distinguishable

### ✅ Fallback Fonts
- [ ] Disable custom fonts in DevTools (Coverage tab)
- [ ] Page still renders legibly with fallback fonts
- [ ] Fallback: Helvetica Neue, Arial, sans-serif

### ✅ Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (iOS & macOS)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## 7. Testing Variable Font Support

### Browser Compatibility Check
```javascript
// In DevTools Console:
console.log(CSS.supports('font-variation-settings', '"opsz" 0.5'));
// Returns: true (supported) or false (not supported)
```

### Font Loading Status
```javascript
// Check if fonts are loaded:
document.fonts.ready.then(() => {
  console.log('All fonts loaded');
});

// Check specific font:
const isLoaded = document.fonts.check('800 "ABC Whyte Inktrap"');
console.log('ABC Whyte Inktrap:', isLoaded ? 'loaded' : 'not loaded');
```

---

## 8. Responsive Breakpoints

### Desktop (> 1024px)
- Full typography scale applied
- clamp() functions prioritize `vw` (viewport width)
- Optimal spacing and tracking

### Tablet (768px - 1024px)
- Slight adjustments in font sizes
- clamp() functions adapt smoothly
- Maintained visual hierarchy

### Mobile (< 768px)
- @media query adjustments (lines 530-570)
- Minimum font sizes enforced
- Reduced letter-spacing for readability
- Slightly increased line-height

### Small Mobile (< 480px)
- Further size reductions
- Tighter letter-spacing
- Optimized for thumb interaction

---

## 9. Component-Specific Guidance

### Header Navigation
- Use `.nav-item` class for all nav links
- Automatic hover state with opsz/weight variation
- Supports dark-to-light background transitions

### Hero Section
- Use `.hero-title` for largest display text
- Maximum opsz=0.5 for dramatic inktrap effect
- Font size: clamp(7rem, 10vw, 14rem)

### Section Headings
- H1-H3 elements automatically styled
- Font-variation-settings applied via rules
- Maintains consistent heading hierarchy

### Footer Labels
- Use `.label` class for all UI text and labels
- Monospace rendering for consistency
- Color: --color-meta-gray by default

### Body Copy
- Use `.body-text` class or wrap in `<p>` tags
- Automatic line-height and letter-spacing
- Weight 350 for optimal readability

---

## 10. Common Modifications

### Change Hero Title Size
Edit in typography-system.css (line 57):
```css
--fs-hero: clamp(7rem, 10vw, 14rem);  /* Change 10vw or clamp values */
```

### Change Nav Item Weight
```css
--fw-nav: 700;  /* Change 700 to 600, 750, 800, etc. */
```

### Add Custom Typography Class
```css
.custom-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  font-variation-settings: "wght" 700, "opsz" 0.5;
}
```

### Override Label Color
```css
.label.alt {
  color: var(--color-text);  /* Use text color instead of meta-gray */
}
```

---

## 11. Common Issues & Solutions

### Issue: Text appears blurry or pixelated
**Solution**: Ensure `font-display: swap` is in @font-face rules. Check font file format (should be TTF or WOFF2).

### Issue: Optical size (opsz) not working
**Solution**: 
- Verify browser support: `CSS.supports('font-variation-settings', '"opsz" 0.5')`
- Check font file is variable format (.ttf not .otf)
- Ensure `font-weight: 100 900` in @font-face

### Issue: Text not responsive on mobile
**Solution**: Check media queries at bottom of typography-system.css. Verify clamp() values are correct.

### Issue: Custom fonts don't load
**Solution**:
1. Check Network tab - verify font files return 200 status
2. Verify file paths in @font-face rules
3. Check CORS headers if fonts hosted externally
4. Fallback fonts should activate automatically

### Issue: Contrast ratio fails WCAG
**Solution**: Use pure white (#FFF) for headings instead of light gray. Test with WebAIM Contrast Checker.

---

## 12. Performance Optimization

### Font Loading Strategy
- `font-display: swap` allows text to render immediately
- Fonts are cached after first load
- Fallback fonts kick in if custom fonts fail

### CSS Variables Efficiency
- Custom properties calculated once at `:root`
- No performance penalty for variable fonts
- Easier maintenance and updates

### Bundle Size
- WOFF2 format recommended (smallest size)
- Each font file ~100-300KB
- Considerable improvement over multiple static weights

---

## 13. Future Enhancements

### Potential Additions
- [ ] Dark/Light mode toggle affecting color tokens
- [ ] Animation triggers for opsz transitions
- [ ] Per-component typography overrides
- [ ] Theme switcher for color palette
- [ ] Fallback to system fonts option

### Browser Testing Priorities
- [ ] Test opsz support in older browsers
- [ ] Verify font loading in slow 3G
- [ ] Check scrolling performance with animations
- [ ] Mobile Safari font rendering

---

## 14. File Structure

```
project/
├── index.html                    # Updated with typography-system.css link
├── index.css                     # Minimal overrides only
├── styles/
│   └── typography-system.css     # Complete typography system (primary)
├── public/
│   └── fonts/
│       ├── ABCWhyteInktrapVariable-Trial-1.ttf
│       ├── ABCWhyteVariable-Trial.ttf
│       └── ABCWhyteSemi-MonoInktrap-Regular-Trial.otf
└── components/
    ├── Header.tsx               # Uses .nav-item, .label
    ├── Hero.tsx                 # Uses .hero-title
    ├── Footer.tsx               # Uses .label, .hero-title
    ├── Keepers.tsx              # Uses .page-title, .label
    └── WhoIsHe.tsx              # Uses .h3, .body-text, .caption
```

---

## 15. Quick Reference Table

| Class | Font | Size | Weight | Tracking | Use Case |
|-------|------|------|--------|----------|----------|
| `.hero-title` | Inktrap | 7-14rem | 800 | -0.08em | Largest display |
| `.page-title` | Inktrap | 4-10rem | 800 | -0.07em | Section titles |
| `.nav-item` | Inktrap | 3-6rem | 700 | -0.07em | Navigation |
| `h1` | Inktrap | 2.5-5rem | 700 | -0.06em | Page headings |
| `h2` | Inktrap | 1.8-3.5rem | 700 | -0.05em | Section headings |
| `h3` | Inktrap | 1.2-2.2rem | 600 | -0.03em | Subsection |
| `.body-text` / `<p>` | Body | 0.95-1.1rem | 350 | 0em | Paragraphs |
| `.label` | Mono | 0.65-0.85rem | 500 | +0.04em | UI text |
| `.caption` | Body | 0.75-0.9rem | 400 | +0.02em | Captions |

---

## 16. Contact & Support

For questions about the typography system:
- Review `/styles/typography-system.css` for all definitions
- Check this guide for implementation details
- Test in browser DevTools for variable font support
- Reference the deep-research-report.md for KPRVerse analysis

---

**Last Updated**: June 2026
**System Version**: 1.0
**Based On**: KPRVerse Typography & Color System
**Fonts Used**: ABC Whyte Family (Variable)
