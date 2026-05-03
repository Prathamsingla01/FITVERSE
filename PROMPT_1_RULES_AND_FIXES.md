# ╔══════════════════════════════════════════════════════════════════╗
# ║         FITVERSE — PROMPT 1: RULES & BUG FIXES                 ║
# ║         READ THIS ENTIRE PROMPT BEFORE TOUCHING ANY FILE        ║
# ╚══════════════════════════════════════════════════════════════════╝

You are working on a real multi-page fitness website called **FitVerse**.
The project files are: index.html, diet.html, workouts.html, supplements.html,
transformation.html, shop.html, premium.html, login.html, styles.css, main.js,
logo.svg, logo-light.svg.

This is a college project. The instructor reads and questions the student on
every line of code. Because of this, you must follow every rule below without
any exceptions.

---

## ══════════════════════════════════════
## RULE 1 — CODE STYLE (NON-NEGOTIABLE)
## ══════════════════════════════════════

### 1.1 — The 100-Line Beginner Rule
- In EVERY file (HTML, CSS, and JS), the first 100 lines must use only
  beginner-to-intermediate level code.
- This means: simple selectors, basic variables, straightforward functions,
  no chained methods, no complex ES6+ syntax in the first 100 lines.
- After line 100, you may use more advanced techniques.
- This rule applies to styles.css, main.js, and every single HTML file.

### 1.2 — Comments on Every Function
- Every JavaScript function must have a plain-English comment above it
  explaining what it does in simple words.
- Example:
  ```js
  // This function switches the website between dark and light mode
  function toggleTheme() { ... }
  ```
- No function should exist in ANY file without a comment above it.

### 1.3 — No Inline CSS
- Zero inline styles allowed. This means no `style="..."` attributes on
  any HTML element anywhere in any file.
- All styling must live either in styles.css or inside a `<style>` block
  in the `<head>` of the specific HTML file — never on the element itself.
- If you find existing inline styles, move them to the correct CSS location.

### 1.4 — No alert() Calls
- Replace every single `alert()` call in every file with a proper toast
  notification instead.
- The toast must appear at the top-right corner of the screen.
- It must automatically disappear after 3 seconds.
- Add the toast CSS to styles.css and the toast function to main.js.

### 1.5 — No Unused Code
- Remove any CSS class, HTML element, or JavaScript variable that is defined
  but never actually used anywhere in the project.
- Do not leave dead code behind.

---

## ══════════════════════════════════════
## RULE 2 — FILE STRUCTURE (MANDATORY)
## ══════════════════════════════════════

### 2.1 — The CSS Duplication Bug (MOST IMPORTANT FIX)
The following pages all have the entire `:root` CSS block copy-pasted inside
a `<style>` tag in their `<head>`. This is the biggest bug in the project:
- diet.html
- workouts.html
- supplements.html
- transformation.html
- shop.html
- premium.html

**Fix for each of these 6 files:**
1. Delete the entire `<style>` block from the `<head>` of that file completely.
2. Replace it with this single line:
   ```html
   <link rel="stylesheet" href="styles.css">
   ```
3. That's it. The file now uses the shared stylesheet just like index.html does.
4. After doing this, test that the page still looks correct.

### 2.2 — Duplicate Font Import in premium.html
In premium.html, the Outfit font is currently imported TWO times:
- Once via a `<link>` tag in the `<head>`
- Once via `@import url(...)` inside the `<style>` block

Remove the `@import` version. Keep only the `<link>` tag version.
After fixing Rule 2.1, this will already be solved since the `<style>` block
is deleted. But verify that styles.css has only ONE font import at the top.

### 2.3 — Single DOMContentLoaded in main.js
main.js currently has 3 separate `document.addEventListener('DOMContentLoaded', ...)`
blocks. This is messy and incorrect.

Merge all three into a single one like this:
```js
document.addEventListener('DOMContentLoaded', function() {
  // ALL code goes here as one block
});
```
Keep all the existing logic — just combine it under one listener.
Make sure the theme IIFE (the function that runs immediately to set the theme)
stays outside the DOMContentLoaded, at the very top of main.js.

### 2.4 — styles.css Organization
After fixing the CSS bug in Rule 2.1, styles.css becomes the single source of
truth for all page styles. Organize it with clear section comments like:
```css
/* ===================== RESET & BASE ===================== */
/* ===================== CSS VARIABLES ==================== */
/* ===================== NAVBAR =========================== */
/* ===================== HERO ============================= */
/* ===================== CARDS ============================ */
/* ===================== DIET PAGE ======================== */
/* ===================== WORKOUTS PAGE ==================== */
/* ===================== SHOP PAGE ======================== */
/* ===================== PREMIUM PAGE ===================== */
/* ===================== LOGIN PAGE ======================= */
/* ===================== FOOTER =========================== */
/* ===================== UTILITIES ======================== */
/* ===================== ANIMATIONS ======================= */
/* ===================== RESPONSIVE ======================= */
```

---

## ══════════════════════════════════════
## RULE 3 — THEME TOGGLE FIX
## ══════════════════════════════════════

### 3.1 — Theme Must Work on ALL Pages
After fixing Rule 2.1, the dark/light theme toggle must work correctly on
every single page. Verify by:
1. Opening each page
2. Clicking the theme toggle button
3. Confirming the colors change on that page
4. Refreshing the page — the chosen theme must persist (via localStorage)

The theme toggle logic is already in main.js. Since all pages will now link
styles.css, the CSS variables will work everywhere automatically.

### 3.2 — Theme Toggle Button Icon
The theme button must show ☀️ when in dark mode and 🌙 when in light mode.
This logic already exists in main.js. Make sure it works on every page.

---

## ══════════════════════════════════════
## RULE 4 — JAVASCRIPT CLEANLINESS
## ══════════════════════════════════════

### 4.1 — Variable Names Must Be Clear
Every variable name must be readable and self-explanatory.
Bad: `const x = document.getElementById('t');`
Good: `const themeButton = document.getElementById('themeToggleBtn');`

### 4.2 — No console.error or console.log Left Behind
Remove any debugging console statements from the final code.

### 4.3 — Hydration Tracker in Sidebar Must Work
The sidebar currently has a hydration tracker with + and - buttons,
but they do nothing — the count stays at 0 forever.

Fix it with this logic in main.js:
```js
// This function makes the sidebar hydration tracker work
// It remembers how many glasses of water the user drank today
```
- Clicking + adds 1 glass (max 12)
- Clicking - subtracts 1 glass (min 0)
- The count number in the sidebar updates visually
- Save the count to localStorage under the key 'fitverse_water_count'
- Load the saved count when the page loads

---

## ══════════════════════════════════════
## RULE 5 — ANIMATION ACCESSIBILITY
## ══════════════════════════════════════

### 5.1 — Respect prefers-reduced-motion
Add this at the END of styles.css:
```css
/* Users who prefer reduced motion - turn off all animations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ══════════════════════════════════════
## RULE 6 — DO NOT ADD NEW FILES
## ══════════════════════════════════════

- Do NOT create any new .html, .css, .js, or .py files.
- Do NOT create separate backend files.
- All fixes go into the existing files only:
  index.html, diet.html, workouts.html, supplements.html,
  transformation.html, shop.html, premium.html, login.html,
  styles.css, main.js

---

## ══════════════════════════════════════
## RULE 7 — PROFESSIONAL APPEARANCE
## ══════════════════════════════════════

The code must look like it was written by a professional developer, not
generated by AI. This means:
- Consistent indentation (2 or 4 spaces — pick one and use it everywhere)
- Logical grouping of related CSS properties
- No random blank lines or unnecessary whitespace
- Section comments in CSS and JS where appropriate
- HTML elements are properly nested and closed

---

## ══════════════════════════════════════
## FINAL CHECKLIST BEFORE YOU FINISH
## ══════════════════════════════════════

Go through this list for every file before calling the work done:

- [ ] diet.html — `<style>` block deleted, `<link rel="stylesheet" href="styles.css">` added
- [ ] workouts.html — same as above
- [ ] supplements.html — same as above
- [ ] transformation.html — same as above
- [ ] shop.html — same as above
- [ ] premium.html — same as above (also remove duplicate font import)
- [ ] main.js — only ONE DOMContentLoaded block
- [ ] main.js — every function has a plain-English comment
- [ ] styles.css — organized with section comments
- [ ] styles.css — prefers-reduced-motion added at bottom
- [ ] All pages — no inline style="" attributes anywhere
- [ ] All pages — no alert() calls, toast notification used instead
- [ ] Sidebar — hydration +/- buttons are functional
- [ ] Theme toggle — works correctly on every page
- [ ] First 100 lines of every file — beginner-to-intermediate code only
- [ ] No unused CSS classes, JS variables, or HTML elements left behind

---

## PROJECT CONTEXT (READ THIS)

- Project name: FitVerse
- Theme: Dark fitness/gym website with red/pink primary color (#ff3366)
- Font: Outfit (Google Fonts)
- Pages: index, workouts, diet, supplements, transformation, shop, premium, login
- The website has a glassmorphism design with dark cards and blurred backgrounds
- Light/dark theme toggle saves to localStorage under key: 'fitverse_theme'
- Cart data saves to localStorage under key: 'fitverse_cart'
- User login saves to localStorage under key: 'fitverse_user_email'
- Water tracker saves to localStorage under key: 'fitverse_water_count'

Do not change the visual design. Do not change page content.
Only fix the bugs and apply the rules listed above.
