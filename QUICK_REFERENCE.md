# Typography System - Quick Reference Card

## 🎯 Class Reference

| Class | Font | Weight | Size | Use |
|-------|------|--------|------|-----|
| `.hero-title` | Inktrap | 800 | 7-14rem | Largest headings |
| `.page-title` | Inktrap | 800 | 4-10rem | Section titles |
| `.nav-item` | Inktrap | 700 | 3-6rem | Navigation links |
| `.h3` / `h3` | Inktrap | 600 | 1.2-2.2rem | Subsection headings |
| `.body-text` / `p` | Body | 350 | 0.95-1.1rem | Paragraphs |
| `.label` | Mono | 500 | 0.65-0.85rem | UI text, buttons |
| `.caption` | Body | 400 | 0.75-0.9rem | Captions, metadata |

---

## 🎨 Color Palette

### Dark Mode (Primary)
```
Background:      #08060E  (almost black)
Primary:         #6D64A3  (deep purple)
Text:            #F4F4F4  (light gray)
Bold Text:       #FFFFFF  (white)
Accent:          #00FFFF  (neon cyan)
Meta/Gray:       #A0A0A0  (muted gray)
```

### Light Mode
```
Background:      #ecebe7  (light beige)
Text:            #000000  (black)
```

### CSS Variable Usage
```css
color: var(--color-text);         /* Most text */
color: var(--color-text-bold);    /* Headings */
color: var(--color-meta-gray);    /* Captions, labels */
color: var(--color-accent-neon);  /* Links, highlights */
background: var(--color-bg);      /* Dark sections */
```

---

## 📐 Font Sizes (Responsive with clamp)

```
Hero:       clamp(7rem, 10vw, 14rem)
Title:      clamp(4rem, 8vw, 10rem)
Nav:        clamp(3rem, 6vw, 6rem)
H1:         clamp(2.5rem, 5vw, 5rem)
H2:         clamp(1.8rem, 4vw, 3.5rem)
H3:         clamp(1.2rem, 2.5vw, 2.2rem)
Body:       clamp(0.95rem, 1.2vw, 1.1rem)
Label:      clamp(0.65rem, 0.8vw, 0.85rem)
Caption:    clamp(0.75rem, 0.9vw, 0.9rem)
```

---

## 🔤 Font Families

```css
/* Display/Headlines */
--font-display: "ABC Whyte Inktrap", sans-serif;

/* Body Text */
--font-body: "ABC Whyte", sans-serif;

/* UI/Code */
--font-ui: "ABC Whyte Mono", monospace;
```

---

## ⚙️ Font Variation Settings

### Optical Size (opsz) Values
- `0.5` = Maximum inktrap (dramatic)
- `4` = Balanced
- `72` = Minimal inktrap (normal)

### Weight (wght) Values
- `350` = Light (body text)
- `500` = Medium (labels)
- `600` = Semi-bold (subheadings)
- `700` = Bold (nav, headings)
- `800` = Heavy (hero titles)

### Common Combinations
```css
/* Hero Title - Maximum effect */
font-variation-settings: "wght" 800, "opsz" 0.5;

/* Navigation - Bold, prominent */
font-variation-settings: "wght" 700, "opsz" 0.5;

/* Body - Light, readable */
font-variation-settings: "wght" 350, "opsz" 0.5;
```

---

## 📝 Letter Spacing (Tracking)

| Element | Value | Purpose |
|---------|-------|---------|
| Hero Title | -0.08em | Tight, dramatic |
| Page Title | -0.07em | Tight, bold |
| Navigation | -0.07em | Tight, prominent |
| H1-H3 | -0.03 to -0.06em | Tight hierarchy |
| Body | 0em | Normal |
| Labels | +0.04em | Wide, clear |

---

## 📏 Line Height (Leading)

| Element | Value |
|---------|-------|
| Hero Title | 0.82 |
| Page Title | 0.84 |
| Navigation | 0.85 |
| Headings | 0.88-0.95 |
| Body | 1.6 |
| Labels | 1.0 |
| Captions | 1.4 |

---

## 🎛️ CSS Custom Properties Quick List

### Sizes
```css
--fs-hero:      clamp(7rem, 10vw, 14rem)
--fs-title:     clamp(4rem, 8vw, 10rem)
--fs-nav:       clamp(3rem, 6vw, 6rem)
--fs-h1:        clamp(2.5rem, 5vw, 5rem)
--fs-h2:        clamp(1.8rem, 4vw, 3.5rem)
--fs-h3:        clamp(1.2rem, 2.5vw, 2.2rem)
--fs-body:      clamp(0.95rem, 1.2vw, 1.1rem)
--fs-label:     clamp(0.65rem, 0.8vw, 0.85rem)
--fs-caption:   clamp(0.75rem, 0.9vw, 0.9rem)
```

### Weights
```css
--fw-hero:      800
--fw-title:     800
--fw-nav:       700
--fw-h1:        700
--fw-h2:        700
--fw-h3:        600
--fw-body:      350
--fw-label:     500
--fw-caption:   400
```

### Tracking
```css
--ts-hero:      -0.08em
--ts-title:     -0.07em
--ts-nav:       -0.07em
--ts-h1:        -0.06em
--ts-h2:        -0.05em
--ts-h3:        -0.03em
--ts-body:      0em
--ts-label:     +0.04em
--ts-caption:   +0.02em
```

### Line Heights
```css
--lh-hero:      0.82
--lh-title:     0.84
--lh-nav:       0.85
--lh-h1:        0.88
--lh-h2:        0.9
--lh-h3:        0.95
--lh-body:      1.6
--lh-label:     1.0
--lh-caption:   1.4
```

### Optical Size
```css
--opsz-hero:    0.5
--opsz-title:   0.5
--opsz-nav:     0.5
--opsz-h1:      0.5
--opsz-h2:      0.5
--opsz-h3:      0.5
--opsz-body:    0.5
```

---

## ✅ WCAG Contrast Compliance

| Text | Background | Ratio | Level |
|------|------------|-------|-------|
| White (#FFF) | Purple (#6D64A3) | 5.25:1 | AAA |
| Light Gray (#F4F4F4) | Purple (#6D64A3) | 4.77:1 | AA |
| Black (#000) | Light (#ecebe7) | 7:1+ | AAA |
| Cyan (#00FFFF) | Dark (#08060E) | Very High | AAA |

---

## 🔍 Browser Support

### Full Support (Variable Fonts)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Mobile

### Fallback
- Static font weights for unsupported browsers
- System fonts (Helvetica Neue, Arial) if custom fonts fail
- Text remains readable in all cases

---

## 🚀 Performance

| Metric | Target |
|--------|--------|
| Font Files Total | < 400KB |
| First Contentful Paint | < 2s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Load Strategy | font-display: swap |

---

## 📱 Responsive Breakpoints

### Desktop (> 1024px)
- Full scale clamp() values
- Maximum sizes applied

### Tablet (768px - 1024px)
- Smooth scaling via clamp()
- Optimized spacing

### Mobile (< 768px)
- Adjusted sizing via @media
- Minimum font sizes enforced
- Readable without zoom

### Small Mobile (< 480px)
- Further size reductions
- Tighter letter-spacing
- Optimized for touch

---

## 🎬 Hover States

```css
/* Hero Title - Hover Effect */
.hero-title:hover {
  font-variation-settings: "wght" 800, "opsz" 0.5;
  transition: font-variation-settings 0.3s ease;
}

/* Nav Item - Hover Effect */
.nav-item:hover {
  font-variation-settings: "wght" 750, "opsz" 0.5;
  transition: font-variation-settings 0.3s ease;
}
```

---

## 📄 File Locations

```
/styles/typography-system.css     ← Primary system
/index.html                        ← Linked stylesheet
/public/fonts/                     ← Font files (3)
TYPOGRAPHY_SYSTEM_GUIDE.md         ← Full reference
TYPOGRAPHY_TEST_CHECKLIST.md       ← Testing
QUICK_REFERENCE.md                 ← This file
```

---

## ⚡ Common CSS Patterns

### Hero Title
```html
<h1 class="hero-title">Your Headline</h1>
```

### Navigation
```html
<a class="nav-item" href="#">MENU ITEM</a>
```

### Section Heading
```html
<h2 class="page-title">Section Title</h2>
```

### Subheading
```html
<h3>Subsection Heading</h3>
```

### Body Text
```html
<p class="body-text">Paragraph content goes here...</p>
```

### UI Label
```html
<span class="label">BUTTON TEXT</span>
```

### Caption
```html
<p class="caption">Small supplementary text</p>
```

---

## 🐛 Quick Troubleshooting

### Issue: Text looks wrong
**Check**: Class applied? Font file loaded? Browser support?

### Issue: Responsive sizing off
**Check**: clamp() values correct? Media queries active? Viewport width?

### Issue: Contrast fails WCAG
**Check**: Use lighter color? Increase text size? Use pure white?

### Issue: Fonts not loading
**Check**: File paths correct? Network 200 status? Fallback fonts active?

---

## 📚 Full Documentation

- **Complete Guide**: See `TYPOGRAPHY_SYSTEM_GUIDE.md`
- **Testing**: See `TYPOGRAPHY_TEST_CHECKLIST.md`
- **Implementation**: See `FONT_SYSTEM_IMPLEMENTATION_SUMMARY.md`
- **Source**: See `/styles/typography-system.css`

---

## 🎯 Remember

✅ Use **classes** instead of inline styles  
✅ Use **CSS variables** for consistency  
✅ Test **responsive** on all breakpoints  
✅ Verify **contrast** ratios (WCAG AA min)  
✅ Check **browser** compatibility  
✅ Validate **font loading** in Network tab  

---

**Last Updated**: June 2026  
**System**: KPRVerse Typography v1.0

For detailed information, see the full documentation files.
