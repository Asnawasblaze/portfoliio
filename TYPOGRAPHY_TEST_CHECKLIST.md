# Typography System Testing Checklist

## Pre-Testing Setup
- [ ] Browser: Chrome/Edge (Chromium) v90+
- [ ] Browser: Firefox v88+
- [ ] Browser: Safari v14+
- [ ] DevTools open (F12 or Cmd+Option+I)
- [ ] Network tab visible
- [ ] Console available for JavaScript checks

---

## 1. Font Loading Tests

### 1.1 Network Status
- [ ] Open DevTools → Network tab
- [ ] Reload page (Ctrl+Shift+R for hard refresh)
- [ ] Filter by "font" keyword
- [ ] Verify all 3 fonts load:
  - `ABCWhyteInktrapVariable-Trial-1.ttf` - Status: **200**
  - `ABCWhyteVariable-Trial.ttf` - Status: **200**
  - `ABCWhyteSemi-MonoInktrap-Regular-Trial.otf` - Status: **200**
- [ ] All fonts should load within **500ms**
- [ ] File sizes reasonable (100-300KB each)

### 1.2 Font Loading Priority
- [ ] Typography-system.css loads before component files
- [ ] Index.html includes stylesheet link
- [ ] @font-face rules execute before element styling

### 1.3 Font Display Strategy
- [ ] No "flash of invisible text" (FOIT)
- [ ] Text appears immediately with fallback font
- [ ] Custom fonts fade in smoothly
- [ ] `font-display: swap` verified in DevTools → Elements → Styles

---

## 2. CSS Variables (Design Tokens) Tests

### 2.1 Root Level Variables
Open DevTools Console and run:
```javascript
const root = getComputedStyle(document.documentElement);
console.log(root.getPropertyValue('--fs-hero'));      // Should show size value
console.log(root.getPropertyValue('--fw-hero'));      // Should show 800
console.log(root.getPropertyValue('--opsz-hero'));    // Should show 0.5
```
- [ ] All --fs-* variables return valid size values
- [ ] All --fw-* variables return weight values (100-900)
- [ ] All --opsz-* variables return optical size values
- [ ] All --color-* variables return valid hex colors

### 2.2 Variable Inheritance
- [ ] Inspect `.hero-title` element
- [ ] Computed styles show `--fs-hero`, `--fw-hero`, `--opsz-hero`
- [ ] Inherited properties calculate correctly
- [ ] Fallback values don't appear in output

### 2.3 Tailwind Integration
- [ ] Tailwind classes apply without conflicts
- [ ] Custom font family extended in tailwind.config
- [ ] Color utilities use CSS variables
- [ ] Responsive classes work alongside clamp()

---

## 3. Font Variation Settings Tests

### 3.1 Optical Size (opsz) Support
Console check:
```javascript
CSS.supports('font-variation-settings', '"opsz" 0.5');
// Expected: true (or graceful false fallback)
```
- [ ] Returns `true` in Chrome/Edge/Firefox/Safari
- [ ] Gracefully degrades if false
- [ ] No JavaScript errors in console

### 3.2 Weight Variation Support
Console check:
```javascript
CSS.supports('font-variation-settings', '"wght" 800');
// Expected: true
```
- [ ] Returns `true` in all modern browsers
- [ ] Variable weight applies visually

### 3.3 Visual Appearance - Hero Title
Navigate to Hero section:
- [ ] Text renders as **ABC Whyte Inktrap** font
- [ ] Heavy/bold appearance (weight 800)
- [ ] Distinctive inktrap cuts visible in letterforms
- [ ] Tight letter-spacing (-0.08em) apparent
- [ ] Responsive scaling with viewport resize
- [ ] Text stays crisp and sharp

### 3.4 Visual Appearance - Navigation
Check header navigation:
- [ ] Nav items use **ABC Whyte Inktrap** (weight 700)
- [ ] Slightly lighter than hero but still bold
- [ ] Uppercase text transformation applied
- [ ] Letter-spacing visible (-0.07em)

### 3.5 Visual Appearance - Labels
Check footer labels:
- [ ] Use **ABC Whyte Mono** font
- [ ] Medium weight (500) for UI text
- [ ] Monospace appearance consistent
- [ ] Letter-spacing +0.04em (wider than body)

### 3.6 Visual Appearance - Body Text
Check paragraph text:
- [ ] Use **ABC Whyte** (not Inktrap)
- [ ] Light weight (350) for readability
- [ ] Regular letter-spacing
- [ ] Comfortable line-height (1.6)

---

## 4. Responsive Typography Tests

### 4.1 Desktop (1920px)
- [ ] Hero title size: optimal (largest clamp value)
- [ ] Navigation text readable and bold
- [ ] Body text comfortable to read (100-120 chars per line)
- [ ] Labels small but legible

### 4.2 Tablet (768px)
- [ ] Hero title scales down smoothly (clamp function)
- [ ] All text remains readable
- [ ] No text wrapping issues
- [ ] Spacing proportional

### 4.3 Mobile Portrait (375px)
- [ ] Hero title scales to mobile-friendly size
- [ ] Navigation text doesn't overflow
- [ ] Body text minimum size respected (≥14px)
- [ ] Labels small but still readable
- [ ] Single-column layout accommodates text width

### 4.4 Mobile Landscape (667px)
- [ ] Text scaling appropriate
- [ ] No text overlap with UI elements
- [ ] Proper padding around text
- [ ] Readable without zooming

### 4.5 Large Desktop (2560px+)
- [ ] Text scales smoothly to maximum clamp value
- [ ] Doesn't become unreadably large
- [ ] Maintains visual hierarchy
- [ ] Line length stays reasonable (<100 chars)

### 4.6 Clamp() Function Verification
Check computed styles on `.hero-title`:
- [ ] Size increases/decreases with viewport
- [ ] No jumping or stepping (smooth scaling)
- [ ] Minimum and maximum values respected
- [ ] Effective units: px, rem, or vw as appropriate

---

## 5. Color Palette & Contrast Tests

### 5.1 Dark Mode Colors
Visual inspection:
- [ ] Background (#08060E) appears very dark
- [ ] Primary text (#F4F4F4) readable on background
- [ ] Bold text (#FFFFFF) used for high contrast headings
- [ ] Accent cyan (#00FFFF) clearly visible

### 5.2 Light Mode Colors
In WhoIsHe and other light sections:
- [ ] Background (#ecebe7) light beige
- [ ] Text (#000000) black on light background
- [ ] No contrast issues apparent

### 5.3 WCAG Contrast Compliance
Using WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/):

**Dark Mode:**
- [ ] White text (#FFF) on Purple (#6D64A3): **Pass AA** (ratio ≥4.5:1)
- [ ] Light gray (#F4F4F4) on Purple: **Pass AA** (ratio ≥4.5:1)
- [ ] Meta gray (#A0A0A0) on Dark: Test, document ratio
- [ ] Neon cyan (#00FFFF) on Dark: **Pass AAA** (high contrast)

**Light Mode:**
- [ ] Black text (#000) on Light (#ecebe7): **Pass AAA** (ratio ≥7:1)

### 5.4 Selection Color
- [ ] Select text on page
- [ ] Selection highlight: Neon cyan (#00FFFF)
- [ ] Selection text: Dark background (#08060E)
- [ ] High contrast and visually distinct

---

## 6. Browser Compatibility Tests

### 6.1 Chrome/Chromium (Latest)
- [ ] All fonts load (Network tab: 200 status)
- [ ] Variable font axes work (opsz, wght)
- [ ] Responsive sizes work with clamp()
- [ ] No console errors
- [ ] Text renders crisp with -webkit-font-smoothing

### 6.2 Firefox (Latest)
- [ ] Fonts load successfully
- [ ] Variable fonts render correctly
- [ ] Clamp() function responsive
- [ ] No console warnings
- [ ] Scrolling smooth

### 6.3 Safari (Latest macOS)
- [ ] Custom fonts load
- [ ] Optical size axes work
- [ ] Responsive typography functional
- [ ] Text rendering sharp

### 6.4 Safari iOS (iPad/iPhone)
- [ ] Fonts load on cellular and WiFi
- [ ] Text readable on small screens
- [ ] No layout shift due to font loading
- [ ] Touch interactions work

### 6.5 Edge (Chromium)
- [ ] Identical to Chrome behavior
- [ ] Variable fonts functional
- [ ] Responsive scaling works

### 6.6 Older Browser Fallback (Optional)
- [ ] System fonts load if custom fonts fail
- [ ] Fallback: Helvetica Neue, Arial
- [ ] Page remains readable
- [ ] No broken layout

---

## 7. Component-Specific Tests

### 7.1 Hero Component
- [ ] `.hero-title` class applied
- [ ] Font: ABC Whyte Inktrap
- [ ] Size: clamp(7rem, 10vw, 14rem)
- [ ] Weight: 800
- [ ] Opsz: 0.5 (maximum inktrap)
- [ ] Tracking: -0.08em
- [ ] Text uppercase
- [ ] Centered horizontally
- [ ] Scales responsively

### 7.2 Header/Navigation
- [ ] `.nav-item` class applied
- [ ] Font: ABC Whyte Inktrap
- [ ] Weight: 700
- [ ] Size: clamp(3rem, 6vw, 6rem)
- [ ] Tracking: -0.07em
- [ ] Hover state changes font-variation-settings
- [ ] Text color responsive (dark/light)

### 7.3 Footer
- [ ] `.hero-title` used for "ASNAWAS" text
- [ ] `.label` used for all footer labels
- [ ] Label color: #A0A0A0 (gray)
- [ ] Button text uses `.label` class
- [ ] Proper spacing and alignment

### 7.4 Keepers Section
- [ ] `.page-title` applied to "KEEPERS"
- [ ] `.label` applied to card titles
- [ ] All text readable on white background
- [ ] Font family correct for each element

### 7.5 WhoIsHe Section
- [ ] `.h3` applied to section headings
- [ ] `.body-text` applied to paragraphs
- [ ] `.caption` applied to section numbers (01, 02, etc)
- [ ] `.label` applied to topic tags
- [ ] Proper contrast on light background

---

## 8. Performance Tests

### 8.1 Font Loading Performance
- [ ] First Contentful Paint (FCP): < 2s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] No layout shift when fonts load

### 8.2 Rendering Performance
- [ ] Scroll FPS: Consistent 60fps
- [ ] No jank or stuttering
- [ ] Hover effects smooth (0.3s transition)
- [ ] No blocking main thread

### 8.3 Font Download Size
- [ ] Total font files: < 1MB combined
- [ ] Individual fonts: 100-300KB each
- [ ] Compressed (gzip): < 500KB combined
- [ ] Cached on subsequent visits

---

## 9. Accessibility Tests

### 9.1 Screen Reader Support
Using NVDA (Windows) or VoiceOver (Mac):
- [ ] All headings announced correctly
- [ ] Link text descriptive ("IDEAS" not "link")
- [ ] List structure recognized
- [ ] Button labels clear

### 9.2 Keyboard Navigation
- [ ] Tab key navigates all interactive elements
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Enter/Space activate buttons

### 9.3 Text Sizing
- [ ] Page readable at 200% zoom
- [ ] No horizontal scroll at 200% zoom
- [ ] Text remains clear when zoomed
- [ ] Minimum font size >= 12px (except labels)

### 9.4 Color Contrast
Already tested in section 5, but verify:
- [ ] All text meets WCAG AA minimum (4.5:1)
- [ ] Headings preferably AAA (7:1)
- [ ] Not relying on color alone for meaning

### 9.5 Motion/Animation
- [ ] No excessive animations
- [ ] prefers-reduced-motion respected
- [ ] Animations have purpose (not decorative)
- [ ] No auto-playing audio/video

---

## 10. Edge Cases & Error Handling

### 10.1 Fallback Font Rendering
Simulate missing custom fonts:
```css
/* Temporarily disable in DevTools */
@font-face { 
  src: url('invalid-path.woff2') format('woff2');
}
```
- [ ] Page remains readable with fallback fonts
- [ ] Layout doesn't break
- [ ] Text visible within 1-2 seconds

### 10.2 Slow Network Simulation
Using DevTools Network throttling:
- [ ] Set to "Slow 3G"
- [ ] Reload page
- [ ] Fonts eventually load
- [ ] Fallback fonts display initially
- [ ] Smooth transition when custom fonts arrive

### 10.3 Network Failure
Simulate offline:
- [ ] Page loads with fallback fonts
- [ ] Text remains readable
- [ ] No console errors
- [ ] Layout preserved

### 10.4 Very Small Viewports (320px)
- [ ] Hero title still visible (doesn't overflow)
- [ ] Navigation doesn't break
- [ ] Text remains readable
- [ ] No horizontal scroll

### 10.5 Very Large Viewports (3840px+)
- [ ] Hero title respects max clamp value
- [ ] Doesn't become unreadably large
- [ ] Layout maintains proportions

---

## 11. Visual Regression Tests

### 11.1 Hero Section
- [ ] "Portfolio" title visible behind avatar
- [ ] Proper tracking and weight
- [ ] Correct color for light background
- [ ] Responsive sizing

### 11.2 Navigation
- [ ] Menu items clearly visible
- [ ] Proper font rendering
- [ ] Color transitions smooth
- [ ] Hover states work

### 11.3 Section Headings
- [ ] All H1-H3 elements styled consistently
- [ ] Proper hierarchy maintained
- [ ] Colors appropriate for background
- [ ] Spacing correct

### 11.4 Body Copy
- [ ] Paragraphs readable
- [ ] Line length comfortable
- [ ] Line height appropriate
- [ ] No orphans/widows

### 11.5 Footer
- [ ] Typography consistent
- [ ] Labels prominent but secondary
- [ ] Contact info readable
- [ ] Buttons large enough to tap

---

## 12. Cross-Device Testing

### 12.1 iPhone 12/13 (375px)
- [ ] Text readable without zooming
- [ ] No horizontal scroll
- [ ] Touch targets >= 44x44px
- [ ] Proper safe area respect

### 12.2 iPad (768px)
- [ ] Layout uses tablet size well
- [ ] Text sized for comfortable reading
- [ ] Touch interactions work smoothly

### 12.3 Android Phone (360px)
- [ ] Compatible font loading
- [ ] Text rendering consistent
- [ ] Responsive scaling works
- [ ] No layout breaks

### 12.4 Tablet (1024px)
- [ ] Landscape and portrait modes
- [ ] Text readable in both orientations
- [ ] Proper spacing maintained

---

## 13. Code Quality Tests

### 13.1 CSS Validation
- [ ] No syntax errors in typography-system.css
- [ ] All @font-face rules valid
- [ ] No duplicate selectors
- [ ] CSS specificity appropriate

### 13.2 Component Code
- [ ] All components reference correct classes
- [ ] No inline styles conflicting with CSS
- [ ] Tailwind classes don't override font rules
- [ ] No unused CSS classes

### 13.3 HTML Structure
- [ ] Semantic HTML (h1, h2, h3, p, etc)
- [ ] Proper heading hierarchy
- [ ] No skipped heading levels
- [ ] Alt text on images

### 13.4 JavaScript Integration
- [ ] No JavaScript errors in console
- [ ] Font loading checks work
- [ ] No animation jank
- [ ] Event handlers work smoothly

---

## 14. Documentation Tests

### 14.1 TYPOGRAPHY_SYSTEM_GUIDE.md
- [ ] All sections present and complete
- [ ] Code examples accurate
- [ ] File paths correct
- [ ] Font file names match actual files

### 14.2 Implementation Comments
- [ ] Key CSS commented
- [ ] Component usage documented
- [ ] Edge cases explained
- [ ] No outdated comments

---

## 15. Test Results Summary

| Category | Status | Notes |
|----------|--------|-------|
| Font Loading | ✅/❌ | |
| CSS Variables | ✅/❌ | |
| Font Variations | ✅/❌ | |
| Responsiveness | ✅/❌ | |
| Colors/Contrast | ✅/❌ | |
| Browser Compat | ✅/❌ | |
| Components | ✅/❌ | |
| Performance | ✅/❌ | |
| Accessibility | ✅/❌ | |
| Edge Cases | ✅/❌ | |
| Code Quality | ✅/❌ | |

### Issues Found
- [ ] No critical issues
- [ ] List issues below:
  1. 
  2. 
  3. 

### Sign-Off
- **Tester**: _______________
- **Date**: _______________
- **Overall Status**: ✅ PASS / ❌ NEEDS WORK

---

## Testing Environment
- Browser: ________________
- Device: ________________
- Screen Size: ________________
- Network: ________________
- Accessibility Tools: ________________

---

**Notes**: Use this checklist for each new deployment, design change, or browser compatibility update.
