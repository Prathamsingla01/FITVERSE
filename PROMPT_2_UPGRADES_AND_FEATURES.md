# ╔══════════════════════════════════════════════════════════════════╗
# ║       FITVERSE — PROMPT 2: UPGRADES, FEATURES & UI              ║
# ║       ONLY START THIS AFTER PROMPT 1 IS FULLY COMPLETE          ║
# ╚══════════════════════════════════════════════════════════════════╝

You are upgrading an existing multi-page fitness website called **FitVerse**.
Before starting, assume that Prompt 1 (bug fixes) has already been applied.
All 6 pages now correctly link styles.css. main.js has one DOMContentLoaded.

The project files are: index.html, diet.html, workouts.html, supplements.html,
transformation.html, shop.html, premium.html, login.html, styles.css, main.js

---

## ══════════════════════════════════════
## IMPORTANT GROUND RULES
## ══════════════════════════════════════

1. **No new files.** All additions go into the existing files only.
2. **No inline CSS.** All new CSS goes into styles.css or a `<style>` block
   in the relevant page's `<head>`.
3. **Comment every new function** with a plain-English explanation.
4. **First 100 lines of every file** must stay beginner-to-intermediate level.
5. **All new JavaScript** goes into main.js OR in a `<script>` tag at the
   bottom of the relevant HTML file — never in the middle of the page.
6. **Do not remove existing features.** Only add or improve.
7. **Keep the existing color scheme:** primary #ff3366, dark background,
   glassmorphism cards, Outfit font.
8. **The code must look professional,** not AI-generated.

---

## ══════════════════════════════════════════════════
## SECTION A — GLOBAL FEATURES (add to ALL pages)
## ══════════════════════════════════════════════════

### A1 — Scroll Progress Bar
Add a thin red progress bar at the very top of the page that fills up as
the user scrolls down.

HTML (add inside `<body>` tag, as the very first element, in every page):
```html
<div class="scroll-progress-bar" id="scrollProgressBar"></div>
```

CSS (add to styles.css):
```css
/* Scroll progress bar - shows reading/scroll progress at top of page */
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, #ff3366, #ff6b8b);
  z-index: 99999;
  transition: width 0.1s linear;
}
```

JS (add inside the single DOMContentLoaded in main.js):
```js
// This function fills the top progress bar as the user scrolls down the page
function updateScrollProgress() {
  var scrolled = window.scrollY;
  var total = document.body.scrollHeight - window.innerHeight;
  var percent = (scrolled / total) * 100;
  var bar = document.getElementById('scrollProgressBar');
  if (bar) {
    bar.style.width = percent + '%';
  }
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
```

---

### A2 — Toast Notification System (replaces all alert() calls)
Add this CSS to styles.css and this function to main.js.
All alert() calls across every page must use this instead.

CSS:
```css
/* Toast notification - small popup message that disappears after 3 seconds */
.toast-container {
  position: fixed;
  top: 90px;
  right: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast {
  background: rgba(20, 20, 25, 0.95);
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #ff3366;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  transform: translateX(120%);
  transition: transform 0.4s ease;
  max-width: 300px;
}
.toast.show {
  transform: translateX(0);
}
.toast.success { border-left-color: #4caf50; }
.toast.error   { border-left-color: #f44336; }
.toast.info    { border-left-color: #2196f3; }
```

JS (add to main.js, outside DOMContentLoaded so it can be called from anywhere):
```js
// This function shows a small popup message to the user
// type can be 'success', 'error', or 'info'
function showToast(message, type) {
  // Find or create the toast container
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  // Create the toast element
  var toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'info');
  toast.textContent = message;
  container.appendChild(toast);
  // Show the toast
  setTimeout(function() { toast.classList.add('show'); }, 10);
  // Remove the toast after 3 seconds
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 400);
  }, 3000);
}
```

---

### A3 — Button Ripple Effect
Add a satisfying ripple animation to all buttons when clicked.

CSS (add to styles.css):
```css
/* Ripple effect on buttons - shows a spreading circle when clicked */
.btn {
  position: relative;
  overflow: hidden;
}
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: rippleEffect 0.6s linear;
  pointer-events: none;
}
@keyframes rippleEffect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

JS (add inside DOMContentLoaded in main.js):
```js
// This function adds a ripple animation to every button on the page
function addRippleToButtons() {
  var buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');
  buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      var ripple = document.createElement('span');
      var rect = button.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
      ripple.className = 'ripple';
      button.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 700);
    });
  });
}
addRippleToButtons();
```

---

## ══════════════════════════════════════════════════
## SECTION B — index.html UPGRADES
## ══════════════════════════════════════════════════

### B1 — Animated Stat Bars Under the Stats Section
The stats section currently shows numbers like "500+". Under each number,
add a thin animated progress bar that fills up when the stat scrolls into view.

HTML (modify the existing `.stat-item` elements to add a bar):
```html
<div class="stat-item">
  <h3>500+</h3>
  <p>Exercise Variations</p>
  <div class="stat-bar"><div class="stat-bar-fill" data-width="90"></div></div>
</div>
```
Use 90% for "500+", 70% for "50+", 85% for "100+", 95% for "1000+".

CSS (add to styles.css):
```css
/* Animated bar under each stat number */
.stat-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 0.8rem;
  overflow: hidden;
}
.stat-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ff3366, #ff6b8b);
  border-radius: 3px;
  transition: width 1.5s ease;
}
```

JS (add inside DOMContentLoaded in main.js):
```js
// This function animates the stat bars when they scroll into view
function animateStatBars() {
  var bars = document.querySelectorAll('.stat-bar-fill');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth + '%';
        observer.unobserve(entry.target);
      }
    });
  });
  bars.forEach(function(bar) { observer.observe(bar); });
}
animateStatBars();
```

---

### B2 — Daily Fitness Tip Banner
Add a rotating fitness tip banner just below the hero section on index.html.
It shows a different tip each day of the week.

HTML (add after the hero section, before the features section):
```html
<div class="daily-tip-banner">
  <span class="tip-label">💡 TIP OF THE DAY</span>
  <span class="tip-text" id="dailyTipText">Loading tip...</span>
</div>
```

CSS (add to styles.css):
```css
/* Daily tip banner - a red strip below the hero */
.daily-tip-banner {
  background: linear-gradient(90deg, #ff3366, #cc0033);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  overflow: hidden;
}
.tip-label {
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 2px;
  white-space: nowrap;
}
.tip-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
}
```

JS (add inside DOMContentLoaded in main.js):
```js
// This function shows a different fitness tip based on the current day of the week
function showDailyTip() {
  var tips = [
    'Drink at least 3 litres of water today to maximize performance.',
    'Rest days are where muscles actually grow. Take rest seriously.',
    'Progressive overload: add 5% more weight each week to keep growing.',
    'Protein within 30 minutes after training helps muscle recovery.',
    'Sleep 7-9 hours. Growth hormone peaks during deep sleep.',
    'Warm up for 5 minutes before every session to prevent injury.',
    'Track your meals today — awareness is the first step to change.'
  ];
  var dayIndex = new Date().getDay();
  var tipElement = document.getElementById('dailyTipText');
  if (tipElement) {
    tipElement.textContent = tips[dayIndex];
  }
}
showDailyTip();
```

---

## ══════════════════════════════════════════════════
## SECTION C — workouts.html UPGRADES
## ══════════════════════════════════════════════════

### C1 — Workout Filter Bar
Add a row of filter buttons above the workout cards.
Clicking a filter hides cards that don't match.

HTML (add above the `.routine-cards` div):
```html
<div class="filter-bar">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="beginner">Beginner</button>
  <button class="filter-btn" data-filter="intermediate">Intermediate</button>
  <button class="filter-btn" data-filter="advanced">Advanced</button>
  <button class="filter-btn" data-filter="chest">Chest</button>
  <button class="filter-btn" data-filter="back">Back</button>
  <button class="filter-btn" data-filter="legs">Legs</button>
</div>
```

Each workout card must have a `data-category` attribute matching one of the
filter values above. Example:
```html
<div class="routine-card" data-category="beginner chest">...</div>
```

CSS (add to styles.css):
```css
/* Filter bar for workout cards */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
}
.filter-btn {
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: var(--text-muted);
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.filter-btn:hover,
.filter-btn.active {
  background: #ff3366;
  color: #fff;
  border-color: #ff3366;
  box-shadow: 0 4px 15px rgba(255, 51, 102, 0.4);
}
.routine-card.hidden {
  display: none;
}
```

JS (add in a `<script>` tag at the bottom of workouts.html):
```js
// This function filters workout cards when a filter button is clicked
function setupWorkoutFilter() {
  var filterButtons = document.querySelectorAll('.filter-btn');
  var workoutCards = document.querySelectorAll('.routine-card');

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Remove active class from all buttons, add to clicked one
      filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
      button.classList.add('active');

      var filter = button.getAttribute('data-filter');

      workoutCards.forEach(function(card) {
        var category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
setupWorkoutFilter();
```

---

### C2 — Favorite Workouts System
Add a heart button to each workout card. Clicking it saves that workout
as a favorite. Favorites persist in localStorage.

HTML (add inside each `.routine-header` div):
```html
<button class="fav-btn" data-workout="Push Day A" title="Add to Favorites">♡</button>
```

CSS (add to styles.css):
```css
/* Favorite button on workout cards */
.routine-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.fav-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  line-height: 1;
}
.fav-btn:hover,
.fav-btn.favorited {
  color: #ff3366;
  transform: scale(1.2);
  text-shadow: 0 0 10px rgba(255, 51, 102, 0.5);
}
```

JS (add in the `<script>` tag at the bottom of workouts.html):
```js
// This function makes the heart/favorite buttons work on workout cards
function setupFavorites() {
  var favorites = JSON.parse(localStorage.getItem('fitverse_favorites')) || [];
  var favButtons = document.querySelectorAll('.fav-btn');

  // Mark already-favorited workouts with a filled heart
  favButtons.forEach(function(btn) {
    var workoutName = btn.getAttribute('data-workout');
    if (favorites.includes(workoutName)) {
      btn.textContent = '♥';
      btn.classList.add('favorited');
    }
    // Toggle favorite when clicked
    btn.addEventListener('click', function() {
      var name = btn.getAttribute('data-workout');
      var index = favorites.indexOf(name);
      if (index === -1) {
        favorites.push(name);
        btn.textContent = '♥';
        btn.classList.add('favorited');
        showToast(name + ' added to favorites!', 'success');
      } else {
        favorites.splice(index, 1);
        btn.textContent = '♡';
        btn.classList.remove('favorited');
        showToast(name + ' removed from favorites.', 'info');
      }
      localStorage.setItem('fitverse_favorites', JSON.stringify(favorites));
    });
  });
}
setupFavorites();
```

---

## ══════════════════════════════════════════════════
## SECTION D — diet.html UPGRADES
## ══════════════════════════════════════════════════

### D1 — Diet Tab Switcher
Add tabs at the top of the diet cards section so the user can switch between
Weight Loss, Muscle Gain, and Maintenance plans without scrolling.

HTML (add above the first `.diet-cards` div):
```html
<div class="diet-tabs">
  <button class="diet-tab active" data-plan="loss">🔥 Weight Loss</button>
  <button class="diet-tab" data-plan="gain">💪 Muscle Gain</button>
  <button class="diet-tab" data-plan="maintain">⚖️ Maintenance</button>
</div>
```

Add a matching `data-plan` attribute to each `.diet-card`:
```html
<div class="diet-card" data-plan="loss">...</div>
<div class="diet-card" data-plan="gain">...</div>
<div class="diet-card" data-plan="maintain">...</div>
```

CSS (add to styles.css):
```css
/* Diet plan tab switcher buttons */
.diet-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.diet-tab {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: var(--text-muted);
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}
.diet-tab.active {
  background: #ff3366;
  color: #fff;
  border-color: #ff3366;
  box-shadow: 0 4px 15px rgba(255, 51, 102, 0.4);
}
.diet-card.hidden {
  display: none;
}
```

JS (add in a `<script>` at the bottom of diet.html):
```js
// This function shows or hides diet plan cards based on which tab is clicked
function setupDietTabs() {
  var tabs = document.querySelectorAll('.diet-tab');
  var cards = document.querySelectorAll('.diet-card[data-plan]');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var plan = tab.getAttribute('data-plan');
      cards.forEach(function(card) {
        if (card.getAttribute('data-plan') === plan) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
setupDietTabs();
```

---

## ══════════════════════════════════════════════════
## SECTION E — supplements.html UPGRADES
## ══════════════════════════════════════════════════

### E1 — Supplement Dosage Reminder Form
Add a simple form where users can set a supplement reminder.
It saves to localStorage and shows the reminder at the top of the page
when they revisit.

HTML (add as a new card at the end of the supplement cards section):
```html
<div class="supplement-card">
  <div class="supplement-header"><h3>⏰ Set a Reminder</h3></div>
  <div class="supplement-body">
    <p>Save a personal reminder for your supplement schedule.</p>
    <div class="reminder-form">
      <select class="reminder-select" id="reminderSupplement">
        <option value="">Choose supplement...</option>
        <option value="Whey Protein">Whey Protein</option>
        <option value="Creatine">Creatine</option>
        <option value="Pre-Workout">Pre-Workout</option>
        <option value="BCAAs">BCAAs</option>
        <option value="Multivitamin">Multivitamin</option>
      </select>
      <select class="reminder-select" id="reminderTime">
        <option value="Morning">Morning</option>
        <option value="Pre-Workout">Pre-Workout</option>
        <option value="Post-Workout">Post-Workout</option>
        <option value="Evening">Evening</option>
        <option value="Before Bed">Before Bed</option>
      </select>
      <button class="btn btn-primary" id="saveReminderBtn">Save Reminder</button>
    </div>
    <div class="saved-reminders" id="savedReminders"></div>
  </div>
</div>
```

CSS (add to styles.css):
```css
/* Supplement reminder form styles */
.reminder-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.reminder-select {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
  color: var(--text-light);
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
}
.saved-reminder-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: rgba(255, 51, 102, 0.08);
  border-radius: 8px;
  border-left: 3px solid #ff3366;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
}
.delete-reminder-btn {
  background: transparent;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
}
```

JS (add in a `<script>` at the bottom of supplements.html):
```js
// This function saves and displays supplement reminders
function setupReminders() {
  var reminders = JSON.parse(localStorage.getItem('fitverse_reminders')) || [];

  // This function draws the saved reminders on screen
  function renderReminders() {
    var container = document.getElementById('savedReminders');
    if (!container) return;
    container.innerHTML = '';
    reminders.forEach(function(reminder, index) {
      var item = document.createElement('div');
      item.className = 'saved-reminder-item';
      item.innerHTML = '⏰ ' + reminder.supplement + ' — ' + reminder.time +
        '<button class="delete-reminder-btn" data-index="' + index + '">✕</button>';
      container.appendChild(item);
    });
    // Add delete functionality to each delete button
    container.querySelectorAll('.delete-reminder-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        reminders.splice(btn.getAttribute('data-index'), 1);
        localStorage.setItem('fitverse_reminders', JSON.stringify(reminders));
        renderReminders();
      });
    });
  }

  renderReminders();

  // Save a new reminder when the Save button is clicked
  var saveBtn = document.getElementById('saveReminderBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      var supplement = document.getElementById('reminderSupplement').value;
      var time = document.getElementById('reminderTime').value;
      if (!supplement) {
        showToast('Please choose a supplement first.', 'error');
        return;
      }
      reminders.push({ supplement: supplement, time: time });
      localStorage.setItem('fitverse_reminders', JSON.stringify(reminders));
      renderReminders();
      showToast('Reminder saved for ' + supplement + '!', 'success');
    });
  }
}
setupReminders();
```

---

## ══════════════════════════════════════════════════
## SECTION F — shop.html UPGRADES
## ══════════════════════════════════════════════════

### F1 — Live Product Search Bar
Add a search input above the product grid. As the user types, products that
don't match the search are hidden in real time.

HTML (add above the `.product-grid`):
```html
<div class="search-wrapper">
  <input type="text" id="productSearchInput" class="product-search-input"
    placeholder="🔍 Search products...">
</div>
```

CSS (add to styles.css):
```css
/* Product search bar on shop page */
.search-wrapper {
  margin-bottom: 2rem;
}
.product-search-input {
  width: 100%;
  max-width: 500px;
  display: block;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-light);
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}
.product-search-input:focus {
  outline: none;
  border-color: #ff3366;
  box-shadow: 0 0 15px rgba(255, 51, 102, 0.2);
}
.product-card.hidden {
  display: none;
}
```

JS (add in a `<script>` at the bottom of shop.html):
```js
// This function hides or shows product cards as the user types in the search box
function setupProductSearch() {
  var searchInput = document.getElementById('productSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    var query = searchInput.value.toLowerCase();
    var products = document.querySelectorAll('.product-card');

    products.forEach(function(card) {
      var name = card.querySelector('h3');
      var cardText = name ? name.textContent.toLowerCase() : '';
      if (cardText.includes(query)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
}
setupProductSearch();
```

---

## ══════════════════════════════════════════════════
## SECTION G — premium.html UPGRADES
## ══════════════════════════════════════════════════

### G1 — Monthly / Yearly Billing Toggle
Add a toggle switch above the pricing box so users can see monthly vs yearly
pricing. Yearly pricing shows a discount.

HTML (add above the `.pricing-box`):
```html
<div class="billing-toggle">
  <span class="billing-label" id="monthlyLabel">Monthly</span>
  <button class="toggle-switch" id="billingToggle" aria-label="Toggle billing period">
    <span class="toggle-knob"></span>
  </button>
  <span class="billing-label" id="yearlyLabel">
    Yearly <span class="save-badge">Save 20%</span>
  </span>
</div>
```

Inside the pricing box, change the price display to:
```html
<div class="pricing-amount">
  <span id="priceDisplay">$29</span>
  <span id="pricePeriod">/month</span>
</div>
```

CSS (add to styles.css):
```css
/* Billing toggle switch for monthly/yearly pricing */
.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}
.billing-label {
  color: var(--text-muted);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.toggle-switch {
  width: 56px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
  padding: 0;
}
.toggle-switch.on {
  background: #ff3366;
  border-color: #ff3366;
  box-shadow: 0 0 15px rgba(255, 51, 102, 0.4);
}
.toggle-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: left 0.3s ease;
  display: block;
}
.toggle-switch.on .toggle-knob {
  left: 31px;
}
.save-badge {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid rgba(255, 215, 0, 0.3);
}
```

JS (add in a `<script>` at the bottom of premium.html):
```js
// This function switches between monthly and yearly pricing when toggled
function setupBillingToggle() {
  var toggle = document.getElementById('billingToggle');
  var priceDisplay = document.getElementById('priceDisplay');
  var pricePeriod = document.getElementById('pricePeriod');
  var isYearly = false;

  if (!toggle) return;

  toggle.addEventListener('click', function() {
    isYearly = !isYearly;
    toggle.classList.toggle('on', isYearly);

    if (isYearly) {
      priceDisplay.textContent = '$279';
      pricePeriod.textContent = '/year';
    } else {
      priceDisplay.textContent = '$29';
      pricePeriod.textContent = '/month';
    }
  });
}
setupBillingToggle();
```

---

## ══════════════════════════════════════════════════
## SECTION H — login.html UPGRADES
## ══════════════════════════════════════════════════

### H1 — Password Strength Meter
Under the password input field in the signup form, add a strength bar that
changes color as the user types.

HTML (add directly below the password `<input>` in the signup form):
```html
<div class="strength-meter" id="strengthMeter">
  <div class="strength-bar" id="strengthBar"></div>
</div>
<p class="strength-label" id="strengthLabel"></p>
```

CSS (add to styles.css):
```css
/* Password strength meter under the password field */
.strength-meter {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;
}
.strength-bar {
  height: 100%;
  width: 0%;
  border-radius: 4px;
  transition: width 0.4s ease, background 0.4s ease;
}
.strength-label {
  font-size: 0.8rem;
  margin-top: 0.3rem;
  margin-bottom: 0;
  font-weight: 600;
}
```

JS (add in a `<script>` at the bottom of login.html):
```js
// This function checks how strong a password is as the user types
function setupPasswordStrength() {
  var passwordInput = document.getElementById('signupPassword');
  var strengthBar = document.getElementById('strengthBar');
  var strengthLabel = document.getElementById('strengthLabel');

  if (!passwordInput) return;

  passwordInput.addEventListener('input', function() {
    var password = passwordInput.value;
    var score = 0;

    // Add a point for each type of character used
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Update the bar based on the score
    if (score === 0) {
      strengthBar.style.width = '0%';
      strengthLabel.textContent = '';
      strengthLabel.style.color = '';
    } else if (score === 1) {
      strengthBar.style.width = '25%';
      strengthBar.style.background = '#f44336';
      strengthLabel.textContent = 'Weak';
      strengthLabel.style.color = '#f44336';
    } else if (score === 2) {
      strengthBar.style.width = '50%';
      strengthBar.style.background = '#ff9800';
      strengthLabel.textContent = 'Fair';
      strengthLabel.style.color = '#ff9800';
    } else if (score === 3) {
      strengthBar.style.width = '75%';
      strengthBar.style.background = '#2196f3';
      strengthLabel.textContent = 'Good';
      strengthLabel.style.color = '#2196f3';
    } else {
      strengthBar.style.width = '100%';
      strengthBar.style.background = '#4caf50';
      strengthLabel.textContent = 'Strong ✓';
      strengthLabel.style.color = '#4caf50';
    }
  });
}
setupPasswordStrength();
```

---

## ══════════════════════════════════════════════════
## SECTION I — transformation.html UPGRADES
## ══════════════════════════════════════════════════

### I1 — 90-Day Progress Grid
Add a visual 90-day grid where each box represents one day.
Clicking a box marks it as complete and saves to localStorage.

HTML (add as a new section after the progress bars section):
```html
<section class="progress-grid-section">
  <div class="container">
    <h2>Your 90-Day Progress Grid</h2>
    <p style="color: var(--text-muted);">Click a box to mark that day as complete.</p>
    <div class="day-grid" id="dayGrid"></div>
    <button class="btn btn-secondary" id="resetGridBtn" style="margin-top: 1.5rem;">Reset Grid</button>
  </div>
</section>
```

CSS (add to styles.css):
```css
/* 90-day progress grid on transformation page */
.progress-grid-section {
  padding: 4rem 0;
}
.day-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  margin-top: 2rem;
}
.day-box {
  aspect-ratio: 1;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: var(--text-muted);
}
.day-box:hover {
  background: rgba(255, 51, 102, 0.2);
  border-color: #ff3366;
}
.day-box.completed {
  background: #ff3366;
  border-color: #ff3366;
  color: #fff;
  box-shadow: 0 0 10px rgba(255, 51, 102, 0.4);
}
@media (max-width: 600px) {
  .day-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

JS (add in a `<script>` at the bottom of transformation.html):
```js
// This function builds the 90-day grid and lets users mark days as complete
function setup90DayGrid() {
  var grid = document.getElementById('dayGrid');
  var resetBtn = document.getElementById('resetGridBtn');
  if (!grid) return;

  // Load saved progress from localStorage
  var completed = JSON.parse(localStorage.getItem('fitverse_90day')) || [];

  // Build 90 boxes
  for (var i = 1; i <= 90; i++) {
    var box = document.createElement('div');
    box.className = 'day-box';
    box.textContent = i;
    box.setAttribute('data-day', i);

    // Mark as completed if it was saved before
    if (completed.includes(i)) {
      box.classList.add('completed');
    }

    // Toggle completed state when clicked
    box.addEventListener('click', function() {
      var day = parseInt(this.getAttribute('data-day'));
      var index = completed.indexOf(day);
      if (index === -1) {
        completed.push(day);
        this.classList.add('completed');
      } else {
        completed.splice(index, 1);
        this.classList.remove('completed');
      }
      localStorage.setItem('fitverse_90day', JSON.stringify(completed));
    });

    grid.appendChild(box);
  }

  // Reset the entire grid when the reset button is clicked
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      completed = [];
      localStorage.removeItem('fitverse_90day');
      document.querySelectorAll('.day-box').forEach(function(box) {
        box.classList.remove('completed');
      });
      showToast('Progress grid has been reset.', 'info');
    });
  }
}
setup90DayGrid();
```

---

## ══════════════════════════════════════
## FINAL VERIFICATION CHECKLIST
## ══════════════════════════════════════

Before submitting, verify every item below works in the browser:

**Global (all pages):**
- [ ] Scroll progress bar fills as user scrolls down — every page
- [ ] Toast notifications appear and disappear (no alert() anywhere)
- [ ] Ripple effect on all buttons — every page

**index.html:**
- [ ] Stat bars animate when scrolled into view
- [ ] Daily fitness tip changes based on the day of the week
- [ ] BMI calculator still works correctly

**workouts.html:**
- [ ] Filter buttons show/hide cards correctly
- [ ] Favorite heart button fills and saves to localStorage
- [ ] Favorited workouts still show hearts after page refresh

**diet.html:**
- [ ] Tab buttons switch between the 3 diet plans
- [ ] Only one plan is visible at a time

**supplements.html:**
- [ ] Supplement reminder saves when Save button is clicked
- [ ] Saved reminders appear after page refresh
- [ ] Delete button removes a reminder

**shop.html:**
- [ ] Product search filters the grid in real time
- [ ] Cart still works (add to cart, quantity, slide-in panel)

**premium.html:**
- [ ] Toggle switch changes price between $29/month and $279/year
- [ ] Toggle is visually clear (knob slides)

**login.html:**
- [ ] Password strength bar updates as user types in signup form
- [ ] Colors change: red → orange → blue → green

**transformation.html:**
- [ ] 90-day grid renders 90 boxes
- [ ] Clicking a box marks it complete (red)
- [ ] Marked boxes persist after page refresh
- [ ] Reset button clears all boxes and localStorage

---

## REMINDER: PROJECT CONTEXT

- Website name: FitVerse
- Primary color: #ff3366
- Font: Outfit (Google Fonts)
- Dark/light theme saves to: localStorage key 'fitverse_theme'
- Cart saves to: localStorage key 'fitverse_cart'
- Favorites save to: localStorage key 'fitverse_favorites'
- Reminders save to: localStorage key 'fitverse_reminders'
- 90-day grid saves to: localStorage key 'fitverse_90day'
- Water tracker saves to: localStorage key 'fitverse_water_count'
- All code must be in the existing files — no new files
- All functions need plain-English comments
- No inline style="" attributes allowed
- Code must look like a professional wrote it, not AI
