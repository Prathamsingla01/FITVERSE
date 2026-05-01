(function() {
    const t = localStorage.getItem('fitverse_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t)
})();
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggleBtn');
    const updateIcon = () => {
        if (themeBtn) themeBtn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    };
    updateIcon();
    if (themeBtn) {
        themeBtn.addEventListener('click', e => {
            e.preventDefault();
            const n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', n);
            localStorage.setItem('fitverse_theme', n);
            updateIcon();
        });
    }
    const cart = localStorage.getItem('fitverse_cart'),
        badge = document.getElementById('navCartBadge');
    if (cart && badge) badge.textContent = JSON.parse(cart).reduce((sum, i) => sum + i.quantity, 0);
    const loginBtn = document.getElementById('navLoginBtn'),
        signupBtn = document.getElementById('navSignupBtn');
    if (localStorage.getItem('fitverse_user_email') && loginBtn && signupBtn) {
        loginBtn.textContent = 'Dashboard';
        Object.assign(signupBtn.style, {
            background: 'rgba(255, 51, 102, 0.2)',
            border: '1px solid rgba(255, 51, 102, 0.5)',
            color: '#ff4d4d',
            boxShadow: 'none'
        });
        signupBtn.textContent = 'Logout';
        signupBtn.href = '#';
        signupBtn.onclick = e => {
            e.preventDefault();
            localStorage.removeItem('fitverse_user_email');
            localStorage.removeItem('fitverse_user_password');
            location.reload();
        };
    }
    const menuBtn = document.getElementById('desktopMenuBtn'),
        closeBtn = document.getElementById('closeMenuBtn'),
        menu = document.getElementById('fullscreenMenu'),
        backdrop = document.getElementById('sidebarBackdrop');
    const close = () => {
        if (menu) menu.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('is-open');
    };
    if (menuBtn && closeBtn && menu) {
        menuBtn.onclick = () => {
            menu.classList.add('active');
            menuBtn.classList.add('is-open');
        };
        closeBtn.onclick = close;
        if (backdrop) backdrop.onclick = close;
    }
    const nav = document.querySelector('.minimalist-nav');
    if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), {
        passive: true
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const aiBtn = document.createElement('a');
    aiBtn.href = 'premium.html';
    aiBtn.className = 'floating-ai';
    aiBtn.innerHTML = '🤖';
    aiBtn.title = 'Elite AI Assistant';
    document.body.appendChild(aiBtn);
    const topBtn = document.createElement('div');
    topBtn.className = 'back-to-top';
    topBtn.innerHTML = '↑';
    document.body.appendChild(topBtn);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) topBtn.classList.add('visible');
        else topBtn.classList.remove('visible');
    }, {
        passive: true
    });
    topBtn.addEventListener('click', () => window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }));
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = '<span class="cookie-text">Forging greatness requires focus. We use cookies to optimize your experience.</span><button class="cookie-btn">Got it</button>';
    document.body.appendChild(cookieBanner);
    if (!localStorage.getItem('fitverse_cookies_accepted')) {
        setTimeout(() => cookieBanner.classList.add('show'), 2500);
    }
    cookieBanner.querySelector('.cookie-btn').addEventListener('click', () => {
        localStorage.setItem('fitverse_cookies_accepted', 'true');
        cookieBanner.classList.remove('show');
    });
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.add('fade-in'));
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                if (entry.target.classList.contains('do-number-anim') && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const targetEl = entry.target;
                    const text = targetEl.innerText;
                    const numMatch = text.match(/\d+/);
                    if (numMatch) {
                        const targetNum = parseInt(numMatch[0]);
                        const suffix = text.replace(numMatch[0], '');
                        let count = 0;
                        const duration = 2000;
                        const startTime = performance.now();
                        const updateNum = (currentTime) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                            count = Math.floor(easeProgress * targetNum);
                            targetEl.innerText = count + suffix;
                            if (progress < 1) requestAnimationFrame(updateNum);
                            else targetEl.innerText = targetNum + suffix;
                        };
                        requestAnimationFrame(updateNum);
                    }
                }
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    document.querySelectorAll('.stat-item h3').forEach(el => {
        el.classList.add('do-number-anim');
        observer.observe(el);
    });
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const age = parseInt(document.getElementById('bmiAge').value);
            const gender = document.getElementById('bmiGender').value;
            const height = parseFloat(document.getElementById('bmiHeight').value);
            const weight = parseFloat(document.getElementById('bmiWeight').value);
            const activity = parseFloat(document.getElementById('bmiActivity').value);
            const heightM = height / 100;
            const bmi = weight / (heightM * heightM);
            let status = '';
            let color = '';
            if (bmi < 18.5) {
                status = 'Underweight';
                color = '#FFC107';
            } else if (bmi >= 18.5 && bmi < 24.9) {
                status = 'Normal Weight';
                color = '#4CAF50';
            } else if (bmi >= 25 && bmi < 29.9) {
                status = 'Overweight';
                color = '#FF9800';
            } else {
                status = 'Obese';
                color = '#F44336';
            }
            let bmr = 0;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
            const tdee = bmr * activity;
            document.getElementById('bmiValue').innerText = bmi.toFixed(1);
            const statusEl = document.getElementById('bmiStatus');
            statusEl.innerText = status;
            statusEl.style.color = color;
            document.getElementById('tdeeValue').innerText = Math.round(tdee).toLocaleString();
            const resultsBox = document.getElementById('bmiResults');
            resultsBox.style.display = 'block';
            resultsBox.classList.remove('appear');
            void resultsBox.offsetWidth;
            resultsBox.classList.add('fade-in', 'appear');
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timerDisplay');
    const timerStartBtn = document.getElementById('timerStart');
    const timerPauseBtn = document.getElementById('timerPause');
    const timerResetBtn = document.getElementById('timerReset');
    const timerMode = document.getElementById('timerMode');
    if (timerDisplay) {
        let timerInterval;
        let seconds = 0;
        let isRunning = false;
        const updateDisplay = () => {
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            timerDisplay.innerText = `${m}:${s}`;
        };
        timerStartBtn.addEventListener('click', () => {
            if (!isRunning) {
                isRunning = true;
                timerMode.innerText = 'Workout Active';
                timerMode.style.color = 'var(--primary-color)';
                timerInterval = setInterval(() => {
                    seconds++;
                    updateDisplay();
                }, 1000);
            }
        });
        timerPauseBtn.addEventListener('click', () => {
            isRunning = false;
            clearInterval(timerInterval);
            timerMode.innerText = 'Paused';
            timerMode.style.color = 'var(--text-muted)';
        });
        timerResetBtn.addEventListener('click', () => {
            isRunning = false;
            clearInterval(timerInterval);
            seconds = 0;
            updateDisplay();
            timerMode.innerText = 'Ready';
            timerMode.style.color = 'var(--text-muted)';
        });
    }
    const calorieForm = document.getElementById('calorieForm');
    if (calorieForm) {
        const mealList = document.getElementById('mealList');
        const totalCalsEl = document.getElementById('totalCals');
        let meals = JSON.parse(localStorage.getItem('fitverse_meals')) || [];
        const renderMeals = () => {
            mealList.innerHTML = '';
            let total = 0;
            meals.forEach((meal, index) => {
                total += meal.cals;
                const li = document.createElement('li');
                li.innerHTML = `<span style="font-weight:600;">${meal.desc}</span> <div><span style="color:var(--text-muted); margin-right:1rem;">${meal.cals} kcal</span> <button class="meal-del-btn" data-index="${index}">✕</button></div>`;
                mealList.appendChild(li);
            });
            totalCalsEl.innerText = total.toLocaleString();
            localStorage.setItem('fitverse_meals', JSON.stringify(meals));
            document.querySelectorAll('.meal-del-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    meals.splice(idx, 1);
                    renderMeals();
                });
            });
        };
        renderMeals();
        calorieForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const desc = document.getElementById('mealDesc').value;
            const cals = parseInt(document.getElementById('mealCals').value);
            meals.push({
                desc,
                cals
            });
            renderMeals();
            calorieForm.reset();
        });
        document.getElementById('resetCalsBtn').addEventListener('click', () => {
            meals = [];
            renderMeals();
        });
    }
    const sliderInput = document.getElementById('sliderInput');
    if (sliderInput) {
        const sliderWrapper = document.getElementById('sliderBeforeWrapper');
        const sliderLine = document.getElementById('sliderControlLine');
        const compSlider = document.getElementById('compSlider');
        const beforeImg = document.querySelector('.slider-before-img');
        const resizeImage = () => {
            if (beforeImg) beforeImg.style.width = compSlider.offsetWidth + 'px';
        };
        window.addEventListener('resize', resizeImage);
        resizeImage();
        sliderInput.addEventListener('input', (e) => {
            const val = e.target.value;
            sliderWrapper.style.width = val + '%';
            sliderLine.style.left = val + '%';
        });
    }
});
document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

// --- Shop & Cart Logic ---
document.addEventListener('DOMContentLoaded', () => {
            const products = [
                // Equipment
                {
                    id: 1,
                    name: 'Adjustable Dumbbells (24kg)',
                    price: 199.99,
                    category: 'equipment',
                    img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 2,
                    name: 'Pro Kettlebell (16kg)',
                    price: 49.99,
                    category: 'equipment',
                    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 3,
                    name: 'Heavy Duty Resistance Bands',
                    price: 29.99,
                    category: 'equipment',
                    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 4,
                    name: 'Olympic Barbell (20kg)',
                    price: 149.99,
                    category: 'equipment',
                    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 5,
                    name: 'Bumper Plates (Pair 45lbs)',
                    price: 119.99,
                    category: 'equipment',
                    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                // Diet & Nutrition
                {
                    id: 6,
                    name: 'Premium Whey Protein Isolate',
                    price: 54.99,
                    category: 'diet',
                    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 7,
                    name: 'Micronized Creatine Monohydrate',
                    price: 24.99,
                    category: 'diet',
                    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 8,
                    name: 'Explosive Pre-Workout',
                    price: 34.99,
                    category: 'diet',
                    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 9,
                    name: 'Daily Multivitamin Pack',
                    price: 19.99,
                    category: 'diet',
                    img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                // Apparel
                {
                    id: 10,
                    name: 'Elite Compression Shirt',
                    price: 39.99,
                    category: 'apparel',
                    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 11,
                    name: 'Hypertrophy Gym Shorts',
                    price: 29.99,
                    category: 'apparel',
                    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 12,
                    name: 'Leather Lifting Belt',
                    price: 59.99,
                    category: 'apparel',
                    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                // Accessories
                {
                    id: 13,
                    name: 'Stainless Steel Shaker Bottle',
                    price: 24.99,
                    category: 'accessories',
                    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 14,
                    name: 'Tactical Gym Backpack',
                    price: 79.99,
                    category: 'accessories',
                    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 15,
                    name: 'Cotton Lifting Straps',
                    price: 14.99,
                    category: 'accessories',
                    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                    id: 16,
                    name: 'High-Density Foam Roller',
                    price: 22.99,
                    category: 'accessories',
                    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
            ];

            const grid = document.getElementById('productGrid');
            const filterBtns = document.querySelectorAll('.category-btn');
            let currentFilter = 'all';

            const renderProducts = () => {
                grid.innerHTML = '';
                const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);

                filtered.forEach(p => {
                    const el = document.createElement('div');
                    el.className = 'product-card fade-in appear';
                    el.innerHTML = `
                <div class="product-image">
                    <img src="${p.img}" alt="${p.name}" onerror="this.onerror=null; this.src='https://placehold.co/400x400/1a1a1f/ff3366?font=Montserrat&text=' + encodeURIComponent(p.name).replace(/%20/g, '+');">
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" data-id="${p.id}">Add to Cart</button>
                    </div>
                </div>
                <div class="product-details">
                    <span class="product-category">${p.category.toUpperCase()}</span>
                    <h3>${p.name}</h3>
                    <p>Premium quality fitness gear built for maximum performance and durability.</p>
                    <div class="product-price">$${p.price.toFixed(2)}</div>
                </div>
            `;
                    grid.appendChild(el);
                });

                // Bind Add to Cart
                document.querySelectorAll('.add-to-cart').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = parseInt(e.target.dataset.id);
                        addToCart(id);
                        // Animation
                        btn.innerHTML = 'Added! ✓';
                        btn.style.background = '#4CAF50';
                        setTimeout(() => {
                            btn.innerHTML = 'Add to Cart';
                            btn.style.background = '';
                        }, 1500);
                    });
                });
            };

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    renderProducts();
                });
            });

            renderProducts();

            // --- CART FUNCTIONALITY ---
            const cartOverlay = document.getElementById('cartOverlay');
            const navCartBtn = document.getElementById('navCartBtn');
            const closeCartBtn = document.getElementById('closeCartBtn');
            const cartItemsList = document.getElementById('cartItemsList');
            const cartTotalPrice = document.getElementById('cartTotalPrice');
            const navCartBadge = document.getElementById('navCartBadge');

            let cart = JSON.parse(localStorage.getItem('fitverse_cart')) || [];

            const saveCart = () => {
                localStorage.setItem('fitverse_cart', JSON.stringify(cart));
                updateCartUI();
            };

            const addToCart = (id) => {
                const product = products.find(p => p.id === id);
                const existing = cart.find(i => i.id === id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1
                    });
                }
                saveCart();
                cartOverlay.classList.add('active');
            };

            const updateCartUI = () => {
                cartItemsList.innerHTML = '';
                let total = 0;
                let count = 0;

                if (cart.length === 0) {
                    cartItemsList.innerHTML = '<div class="empty-cart">Your cart is empty. Time to lift!</div>';
                } else {
                    cart.forEach(item => {
                        total += item.price * item.quantity;
                        count += item.quantity;
                        const el = document.createElement('div');
                        el.className = 'cart-item';
                        el.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                            <button class="remove-btn" data-id="${item.id}">🗑️</button>
                        </div>
                    </div>
                `;
                        cartItemsList.appendChild(el);
                    });
                }

                cartTotalPrice.innerText = '$' + total.toFixed(2);
                if (navCartBadge) {
                    navCartBadge.innerText = count;
                    navCartBadge.classList.add('pulse');
                    setTimeout(() => navCartBadge.classList.remove('pulse'), 300);
                }

                // Bind cart item actions
                document.querySelectorAll('.qty-btn.plus').forEach(b => b.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    cart.find(i => i.id === id).quantity += 1;
                    saveCart();
                }));
                document.querySelectorAll('.qty-btn.minus').forEach(b => b.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    const item = cart.find(i => i.id === id);
                    if (item.quantity > 1) item.quantity -= 1;
                    else cart = cart.filter(i => i.id !== id);
                    saveCart();
                }));
                document.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    cart = cart.filter(i => i.id !== id);
                    saveCart();
                }));
            };

            // Toggle Cart Overlay
            if (navCartBtn) {
                navCartBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    cartOverlay.classList.add('active');
                });
            }
            if (closeCartBtn) {
                closeCartBtn.addEventListener('click', () => cartOverlay.classList.remove('active'));
            }
            if (cartOverlay) {
                cartOverlay.addEventListener('click', (e) => {
                    if (e.target === cartOverlay) cartOverlay.classList.remove('active');
                });
            }

            updateCartUI(); // Initial load
        });


document.addEventListener("DOMContentLoaded", () => {

    // --- 3D Demo Injection (Runtime) ---
    if (window.location.pathname.includes('workouts.html')) {
        const workoutSection = document.querySelector('.workout-section');
        if (workoutSection && !document.querySelector('.3d-demo-section')) {
            const demoHTML = `
    <section class="3d-demo-section" style="padding: 4rem 0; background: linear-gradient(180deg, transparent 0%, rgba(255,51,102,0.05) 100%); position: relative; overflow: hidden;">
        <div class="container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <div class="badge glow-badge">✨ Interactive Training Mode</div>
                <h2 style="font-size: 2.5rem; margin-top: 1rem;">Experience FitVerse <span style="background: var(--gradient-1); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">3D</span></h2>
                <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">See exactly which muscles you are targeting with our proprietary 3D anatomy engine. (Demo Mode)</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                <!-- Left: The 3D Demo Visual -->
                <div class="demo-card" style="background: rgba(20,20,25,0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: 24px; padding: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.5); position: relative; overflow: hidden; transform: perspective(1000px) rotateY(5deg); transition: transform 0.5s ease;">
                    
                    <!-- Simulating a 3D animated GIF using a high-quality fitness anatomy placeholder -->
                    <div style="width: 100%; height: 350px; border-radius: 16px; background: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover; position: relative; border: 1px solid rgba(255,51,102,0.2);">
                        <!-- Glowing Muscle Overlay Simulation -->
                        <div style="position: absolute; top: 40%; left: 45%; width: 60px; height: 60px; background: radial-gradient(circle, rgba(255,51,102,0.8) 0%, transparent 70%); animation: pulseGlow 2s infinite;"></div>
                        <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.8rem; border: 1px solid rgba(255,215,0,0.5); color: #FFD700;">Click & Drag to Rotate 3D Model</div>
                    </div>
                </div>

                <!-- Right: Information & Premium Upsell -->
                <div style="padding-right: 2rem;">
                    <h3 style="font-size: 2rem; margin-bottom: 1rem;">Target: <span style="color: var(--primary-color);">Core & Obliques</span></h3>
                    <ul class="exercise-list" style="margin-bottom: 2rem; list-style: none; padding: 0;">
                        <li style="margin-bottom: 1rem;"><strong style="color:#FFD700;">Primary:</strong> Rectus Abdominis</li>
                        <li style="margin-bottom: 1rem;"><strong style="color:#FFD700;">Secondary:</strong> External Obliques</li>
                        <li style="margin-bottom: 1rem;"><strong style="color:#FFD700;">Form Hint:</strong> Keep spine perfectly neutral.</li>
                    </ul>

                    <div style="background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); border-radius: 16px; padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                        <div style="font-size: 2rem;">⭐</div>
                        <div>
                            <h4 style="margin: 0; color: #FFD700; font-size: 1.1rem;">Elite Feature Locked</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Upgrade to Premium to unlock full 360° interactive 3D models for all 500+ exercises instantly.</p>
                            <a href="premium.html" style="display: inline-block; margin-top: 0.5rem; text-decoration: underline; color: #fff; font-weight: 600;">Unlock Now →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
            workoutSection.insertAdjacentHTML('beforebegin', demoHTML);
        }
    }

});
