// This function runs immediately to set the theme before the page loads to prevent flickering
(function() {
    var savedTheme = localStorage.getItem('fitverse_theme');
    if (!savedTheme) {
        savedTheme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// This function shows a toast notification on the screen
function showToast(message) {
    var toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    
    // This function removes the toast after 3 seconds
    setTimeout(function() {
        toast.remove();
    }, 3000);
}

// Single DOMContentLoaded wrapper for all page logic
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Theme Toggle Logic ---
    var themeBtn = document.getElementById('themeToggleBtn');
    
    // This function updates the theme button icon to sun or moon
    function updateThemeIcon() {
        if (themeBtn) {
            var currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                themeBtn.textContent = '☀️';
            } else {
                themeBtn.textContent = '🌙';
            }
        }
    }
    updateThemeIcon();
    
    if (themeBtn) {
        // This function handles the click on the theme button
        themeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            var currentTheme = document.documentElement.getAttribute('data-theme');
            var newTheme = 'dark';
            if (currentTheme === 'dark') {
                newTheme = 'light';
            }
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('fitverse_theme', newTheme);
            updateThemeIcon();
        });
    }

    // --- Hydration Tracker Logic ---
    var hydrationSection = document.querySelector('.quick-add');
    if (hydrationSection) {
        var hydrationButtons = hydrationSection.querySelectorAll('button');
        var hydrationMinusBtn = hydrationButtons[0];
        var hydrationPlusBtn = hydrationButtons[1];
        var hydrationCountElement = hydrationSection.querySelectorAll('span')[1];
        
        // This function updates the hydration display and saves it
        function updateHydration(count) {
            if (hydrationCountElement) {
                hydrationCountElement.textContent = count;
                localStorage.setItem('fitverse_water_count', count);
            }
        }

        var savedWater = localStorage.getItem('fitverse_water_count');
        var waterCount = 0;
        if (savedWater) {
            waterCount = parseInt(savedWater, 10);
        }
        updateHydration(waterCount);
        
        // This function adds one to the hydration count
        hydrationPlusBtn.addEventListener('click', function() {
            if (waterCount < 12) {
                waterCount++;
                updateHydration(waterCount);
            }
        });
        
        // This function subtracts one from the hydration count
        hydrationMinusBtn.addEventListener('click', function() {
            if (waterCount > 0) {
                waterCount--;
                updateHydration(waterCount);
            }
        });
    }

    // --- Cart Badge Logic ---
    var cartData = localStorage.getItem('fitverse_cart');
    var navCartBadge = document.getElementById('navCartBadge');
    if (cartData && navCartBadge) {
        var parsedCart = JSON.parse(cartData);
        var totalItems = 0;
        for (var i = 0; i < parsedCart.length; i++) {
            totalItems += parsedCart[i].quantity;
        }
        navCartBadge.textContent = totalItems;
    }

    // --- Login/Signup Button Logic ---
    var loginBtn = document.getElementById('navLoginBtn');
    var signupBtn = document.getElementById('navSignupBtn');
    var userEmail = localStorage.getItem('fitverse_user_email');
    if (userEmail && loginBtn && signupBtn) {
        loginBtn.textContent = 'Dashboard';
        signupBtn.style.background = 'rgba(255, 51, 102, 0.2)';
        signupBtn.style.border = '1px solid rgba(255, 51, 102, 0.5)';
        signupBtn.style.color = '#ff4d4d';
        signupBtn.style.boxShadow = 'none';
        signupBtn.textContent = 'Logout';
        signupBtn.href = '#';
        
        // This function logs the user out when they click the button
        signupBtn.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem('fitverse_user_email');
            localStorage.removeItem('fitverse_user_password');
            location.reload();
        };
    }

    // --- Mobile Menu Logic ---
    var menuBtn = document.getElementById('desktopMenuBtn');
    var closeBtn = document.getElementById('closeMenuBtn');
    var fullscreenMenu = document.getElementById('fullscreenMenu');
    var sidebarBackdrop = document.getElementById('sidebarBackdrop');
    
    // This function closes the mobile fullscreen menu
    function closeMobileMenu() {
        if (fullscreenMenu) fullscreenMenu.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('is-open');
    }
    
    if (menuBtn && closeBtn && fullscreenMenu) {
        // This function opens the mobile fullscreen menu
        menuBtn.onclick = function() {
            fullscreenMenu.classList.add('active');
            menuBtn.classList.add('is-open');
        };
        closeBtn.onclick = closeMobileMenu;
        if (sidebarBackdrop) sidebarBackdrop.onclick = closeMobileMenu;
    }

    // --- Navbar Scroll Logic ---
    var minimalistNav = document.querySelector('.minimalist-nav');
    if (minimalistNav) {
        // This function adds a background to the navbar when scrolling down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                minimalistNav.classList.add('scrolled');
            } else {
                minimalistNav.classList.remove('scrolled');
            }
        });
    }

    // --- AI Floating Button ---
    var floatingAiBtn = document.createElement('a');
    floatingAiBtn.href = 'premium.html';
    floatingAiBtn.className = 'floating-ai';
    floatingAiBtn.innerHTML = '🤖';
    floatingAiBtn.title = 'Elite AI Assistant';
    document.body.appendChild(floatingAiBtn);

    // --- Back to Top Button ---
    var backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
    
    // This function shows the back to top button when scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // This function smoothly scrolls the page back to the top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Cookie Banner ---
    var cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = '<span class="cookie-text">Forging greatness requires focus. We use cookies to optimize your experience.</span><button class="cookie-btn">Got it</button>';
    document.body.appendChild(cookieBanner);
    
    if (!localStorage.getItem('fitverse_cookies_accepted')) {
        // This function shows the cookie banner after 2.5 seconds
        setTimeout(function() {
            cookieBanner.classList.add('show');
        }, 2500);
    }
    
    // This function hides the cookie banner when accepted
    cookieBanner.querySelector('.cookie-btn').addEventListener('click', function() {
        localStorage.setItem('fitverse_cookies_accepted', 'true');
        cookieBanner.classList.remove('show');
    });

    // --- Animations and Intersection Observer ---
    var allSections = document.querySelectorAll('section');
    // This function adds the fade-in class to all sections for animation
    allSections.forEach(function(sec) {
        sec.classList.add('fade-in');
    });
    
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    var intersectionObserver = new IntersectionObserver(function(entries, obs) {
        // This function animates elements when they scroll into view
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                if (entry.target.classList.contains('do-number-anim') && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    var targetEl = entry.target;
                    var text = targetEl.innerText;
                    var numMatch = text.match(/\d+/);
                    
                    if (numMatch) {
                        var targetNum = parseInt(numMatch[0]);
                        var suffix = text.replace(numMatch[0], '');
                        var duration = 2000;
                        var startTime = performance.now();
                        
                        // This function animates a number counting up
                        var updateNum = function(currentTime) {
                            var elapsed = currentTime - startTime;
                            var progress = Math.min(elapsed / duration, 1);
                            var easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                            var count = Math.floor(easeProgress * targetNum);
                            targetEl.innerText = count + suffix;
                            if (progress < 1) {
                                requestAnimationFrame(updateNum);
                            } else {
                                targetEl.innerText = targetNum + suffix;
                            }
                        };
                        requestAnimationFrame(updateNum);
                    }
                }
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // This function observes all fade-in elements
    document.querySelectorAll('.fade-in').forEach(function(el) {
        intersectionObserver.observe(el);
    });
    
    // This function observes stat items for number animation
    document.querySelectorAll('.stat-item h3').forEach(function(el) {
        el.classList.add('do-number-anim');
        intersectionObserver.observe(el);
    });

    // --- BMI Calculator Form ---
    var bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        // This function calculates and displays the BMI and TDEE results
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var age = parseInt(document.getElementById('bmiAge').value);
            var gender = document.getElementById('bmiGender').value;
            var height = parseFloat(document.getElementById('bmiHeight').value);
            var weight = parseFloat(document.getElementById('bmiWeight').value);
            var activity = parseFloat(document.getElementById('bmiActivity').value);
            
            var heightM = height / 100;
            var bmi = weight / (heightM * heightM);
            var status = '';
            var color = '';
            
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
            
            var bmr = 0;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
            
            var tdee = bmr * activity;
            
            document.getElementById('bmiValue').innerText = bmi.toFixed(1);
            var statusEl = document.getElementById('bmiStatus');
            statusEl.innerText = status;
            statusEl.style.color = color;
            document.getElementById('tdeeValue').innerText = Math.round(tdee).toLocaleString();
            
            var resultsBox = document.getElementById('bmiResults');
            resultsBox.style.display = 'block';
            resultsBox.classList.remove('appear');
            void resultsBox.offsetWidth;
            resultsBox.classList.add('fade-in', 'appear');
        });
    }

    // --- Workout Timer Logic ---
    var timerDisplay = document.getElementById('timerDisplay');
    var timerStartBtn = document.getElementById('timerStart');
    var timerPauseBtn = document.getElementById('timerPause');
    var timerResetBtn = document.getElementById('timerReset');
    var timerMode = document.getElementById('timerMode');
    
    if (timerDisplay) {
        var timerInterval;
        var timerSeconds = 0;
        var isTimerRunning = false;
        
        // This function updates the timer display text
        var updateTimerDisplay = function() {
            var minutes = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
            var remainingSeconds = (timerSeconds % 60).toString().padStart(2, '0');
            timerDisplay.innerText = minutes + ':' + remainingSeconds;
        };
        
        // This function starts the workout timer
        timerStartBtn.addEventListener('click', function() {
            if (!isTimerRunning) {
                isTimerRunning = true;
                timerMode.innerText = 'Workout Active';
                timerMode.style.color = 'var(--primary-color)';
                timerInterval = setInterval(function() {
                    timerSeconds++;
                    updateTimerDisplay();
                }, 1000);
            }
        });
        
        // This function pauses the workout timer
        timerPauseBtn.addEventListener('click', function() {
            isTimerRunning = false;
            clearInterval(timerInterval);
            timerMode.innerText = 'Paused';
            timerMode.style.color = 'var(--text-muted)';
        });
        
        // This function resets the workout timer
        timerResetBtn.addEventListener('click', function() {
            isTimerRunning = false;
            clearInterval(timerInterval);
            timerSeconds = 0;
            updateTimerDisplay();
            timerMode.innerText = 'Ready';
            timerMode.style.color = 'var(--text-muted)';
        });
    }

    // --- Calorie Tracker Logic ---
    var calorieForm = document.getElementById('calorieForm');
    if (calorieForm) {
        var mealList = document.getElementById('mealList');
        var totalCalsEl = document.getElementById('totalCals');
        var mealsData = localStorage.getItem('fitverse_meals');
        var meals = mealsData ? JSON.parse(mealsData) : [];
        
        // This function renders the list of meals on the screen
        var renderMeals = function() {
            mealList.innerHTML = '';
            var totalCalories = 0;
            
            // This function loops through meals and adds them to the list
            meals.forEach(function(meal, index) {
                totalCalories += meal.cals;
                var li = document.createElement('li');
                li.innerHTML = `<span class="fw-600">${meal.desc}</span> <div><span class="text-muted mr-1">${meal.cals} kcal</span> <button class="meal-del-btn" data-index="${index}">✕</button></div>`;
                mealList.appendChild(li);
            });
            
            totalCalsEl.innerText = totalCalories.toLocaleString();
            localStorage.setItem('fitverse_meals', JSON.stringify(meals));
            
            // This function adds click listeners to all delete buttons
            document.querySelectorAll('.meal-del-btn').forEach(function(btn) {
                // This function deletes a meal from the list
                btn.addEventListener('click', function(e) {
                    var idx = e.target.getAttribute('data-index');
                    meals.splice(idx, 1);
                    renderMeals();
                });
            });
        };
        
        renderMeals();
        
        // This function adds a new meal to the calorie tracker
        calorieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var mealDesc = document.getElementById('mealDesc').value;
            var mealCals = parseInt(document.getElementById('mealCals').value);
            meals.push({
                desc: mealDesc,
                cals: mealCals
            });
            renderMeals();
            calorieForm.reset();
        });
        
        var resetCalsBtn = document.getElementById('resetCalsBtn');
        if (resetCalsBtn) {
            // This function resets all meals in the calorie tracker
            resetCalsBtn.addEventListener('click', function() {
                meals = [];
                renderMeals();
            });
        }
    }

    // --- Before/After Slider Logic ---
    var beforeAfterSliderInput = document.getElementById('sliderInput');
    if (beforeAfterSliderInput) {
        var sliderWrapper = document.getElementById('sliderBeforeWrapper');
        var sliderLine = document.getElementById('sliderControlLine');
        var compSlider = document.getElementById('compSlider');
        var beforeImg = document.querySelector('.slider-before-img');
        
        // This function resizes the before image to match the container
        var resizeSliderImage = function() {
            if (beforeImg) {
                beforeImg.style.width = compSlider.offsetWidth + 'px';
            }
        };
        
        window.addEventListener('resize', resizeSliderImage);
        resizeSliderImage();
        
        // This function updates the slider position as the user drags
        beforeAfterSliderInput.addEventListener('input', function(e) {
            var sliderValue = e.target.value;
            sliderWrapper.style.width = sliderValue + '%';
            sliderLine.style.left = sliderValue + '%';
        });
    }

    // --- FAQ Logic ---
    // This function adds click listeners to toggle FAQ items open and closed
    document.querySelectorAll('.faq-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var faqItem = btn.parentElement;
            var isOpen = faqItem.classList.contains('open');
            
            // This function closes all FAQ items
            document.querySelectorAll('.faq-item').forEach(function(item) {
                item.classList.remove('open');
            });
            
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });

    // --- Shop & Cart Logic ---
    var productGrid = document.getElementById('productGrid');
    if (productGrid) {
        var shopProducts = [
            { id: 1, name: 'Adjustable Dumbbells (24kg)', price: 199.99, category: 'equipment', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 2, name: 'Pro Kettlebell (16kg)', price: 49.99, category: 'equipment', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 3, name: 'Heavy Duty Resistance Bands', price: 29.99, category: 'equipment', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 4, name: 'Olympic Barbell (20kg)', price: 149.99, category: 'equipment', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 5, name: 'Bumper Plates (Pair 45lbs)', price: 119.99, category: 'equipment', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 6, name: 'Premium Whey Protein Isolate', price: 54.99, category: 'diet', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 7, name: 'Micronized Creatine Monohydrate', price: 24.99, category: 'diet', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 8, name: 'Explosive Pre-Workout', price: 34.99, category: 'diet', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 9, name: 'Daily Multivitamin Pack', price: 19.99, category: 'diet', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 10, name: 'Elite Compression Shirt', price: 39.99, category: 'apparel', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 11, name: 'Hypertrophy Gym Shorts', price: 29.99, category: 'apparel', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 12, name: 'Leather Lifting Belt', price: 59.99, category: 'apparel', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 13, name: 'Stainless Steel Shaker Bottle', price: 24.99, category: 'accessories', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 14, name: 'Tactical Gym Backpack', price: 79.99, category: 'accessories', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 15, name: 'Cotton Lifting Straps', price: 14.99, category: 'accessories', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 16, name: 'High-Density Foam Roller', price: 22.99, category: 'accessories', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
        ];

        var filterBtns = document.querySelectorAll('.category-btn');
        var currentCategoryFilter = 'all';

        // This function renders products based on the selected category filter
        var renderShopProducts = function() {
            productGrid.innerHTML = '';
            
            // This function filters the shop products by category
            var filteredProducts = shopProducts.filter(function(product) {
                if (currentCategoryFilter === 'all') return true;
                return product.category === currentCategoryFilter;
            });

            // This function loops through filtered products and displays them
            filteredProducts.forEach(function(product) {
                var productCardEl = document.createElement('div');
                productCardEl.className = 'product-card fade-in appear';
                productCardEl.innerHTML = `
                    <div class="product-image">
                        <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/400x400/1a1a1f/ff3366?font=Montserrat&text=' + encodeURIComponent(product.name).replace(/%20/g, '+');">
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                    <div class="product-details">
                        <span class="product-category">${product.category.toUpperCase()}</span>
                        <h3>${product.name}</h3>
                        <p>Premium quality fitness gear built for maximum performance and durability.</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                    </div>
                `;
                productGrid.appendChild(productCardEl);
            });

            // This function adds click listeners to all Add to Cart buttons
            document.querySelectorAll('.add-to-cart').forEach(function(btn) {
                // This function adds the selected product to the cart
                btn.addEventListener('click', function(e) {
                    var productId = parseInt(e.target.dataset.id);
                    addProductToCart(productId);
                    btn.innerHTML = 'Added! ✓';
                    btn.style.background = '#4CAF50';
                    // This function resets the Add to Cart button text after 1.5 seconds
                    setTimeout(function() {
                        btn.innerHTML = 'Add to Cart';
                        btn.style.background = '';
                    }, 1500);
                });
            });
        };

        // This function changes the category filter when a button is clicked
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // This function removes the active class from all filter buttons
                filterBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                currentCategoryFilter = btn.dataset.filter;
                renderShopProducts();
            });
        });

        renderShopProducts();

        // --- CART FUNCTIONALITY ---
        var cartOverlayElement = document.getElementById('cartOverlay');
        var navCartBtnElement = document.getElementById('navCartBtn');
        var closeCartBtnElement = document.getElementById('closeCartBtn');
        var cartItemsListElement = document.getElementById('cartItemsList');
        var cartTotalPriceElement = document.getElementById('cartTotalPrice');
        var globalNavCartBadge = document.getElementById('navCartBadge');

        var savedCartData = localStorage.getItem('fitverse_cart');
        var shoppingCart = savedCartData ? JSON.parse(savedCartData) : [];

        // This function saves the current cart to local storage and updates the UI
        var saveShoppingCart = function() {
            localStorage.setItem('fitverse_cart', JSON.stringify(shoppingCart));
            updateShoppingCartUI();
        };

        // This function finds a product and adds it to the cart
        var addProductToCart = function(productId) {
            var targetProduct = null;
            // This function searches for the product matching the ID
            shopProducts.forEach(function(p) {
                if (p.id === productId) targetProduct = p;
            });
            
            var existingCartItem = null;
            // This function searches if the product is already in the cart
            shoppingCart.forEach(function(item) {
                if (item.id === productId) existingCartItem = item;
            });
            
            if (existingCartItem) {
                existingCartItem.quantity += 1;
            } else if (targetProduct) {
                shoppingCart.push({
                    id: targetProduct.id,
                    name: targetProduct.name,
                    price: targetProduct.price,
                    category: targetProduct.category,
                    img: targetProduct.img,
                    quantity: 1
                });
            }
            saveShoppingCart();
            cartOverlayElement.classList.add('active');
        };

        // This function updates the cart display with current items
        var updateShoppingCartUI = function() {
            cartItemsListElement.innerHTML = '';
            var cartTotalCost = 0;
            var cartTotalCount = 0;

            if (shoppingCart.length === 0) {
                cartItemsListElement.innerHTML = '<div class="empty-cart">Your cart is empty. Time to lift!</div>';
            } else {
                // This function renders each item in the cart
                shoppingCart.forEach(function(item) {
                    cartTotalCost += item.price * item.quantity;
                    cartTotalCount += item.quantity;
                    var cartItemEl = document.createElement('div');
                    cartItemEl.className = 'cart-item';
                    cartItemEl.innerHTML = `
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
                    cartItemsListElement.appendChild(cartItemEl);
                });
            }

            cartTotalPriceElement.innerText = '$' + cartTotalCost.toFixed(2);
            if (globalNavCartBadge) {
                globalNavCartBadge.innerText = cartTotalCount;
                globalNavCartBadge.classList.add('pulse');
                // This function removes the pulse animation from the cart badge after 300ms
                setTimeout(function() {
                    globalNavCartBadge.classList.remove('pulse');
                }, 300);
            }

            // This function adds click listeners to all plus buttons in the cart
            document.querySelectorAll('.qty-btn.plus').forEach(function(plusBtn) {
                // This function increases the quantity of a cart item
                plusBtn.addEventListener('click', function(e) {
                    var itemId = parseInt(e.target.dataset.id);
                    shoppingCart.forEach(function(item) {
                        if (item.id === itemId) item.quantity += 1;
                    });
                    saveShoppingCart();
                });
            });
            
            // This function adds click listeners to all minus buttons in the cart
            document.querySelectorAll('.qty-btn.minus').forEach(function(minusBtn) {
                // This function decreases the quantity of a cart item
                minusBtn.addEventListener('click', function(e) {
                    var itemId = parseInt(e.target.dataset.id);
                    var itemToUpdate = null;
                    shoppingCart.forEach(function(item) {
                        if (item.id === itemId) itemToUpdate = item;
                    });
                    
                    if (itemToUpdate && itemToUpdate.quantity > 1) {
                        itemToUpdate.quantity -= 1;
                    } else {
                        // This function filters out the removed item from the cart
                        shoppingCart = shoppingCart.filter(function(item) {
                            return item.id !== itemId;
                        });
                    }
                    saveShoppingCart();
                });
            });
            
            // This function adds click listeners to all remove buttons in the cart
            document.querySelectorAll('.remove-btn').forEach(function(remBtn) {
                // This function completely removes an item from the cart
                remBtn.addEventListener('click', function(e) {
                    var itemId = parseInt(e.target.dataset.id);
                    // This function filters out the removed item from the cart
                    shoppingCart = shoppingCart.filter(function(item) {
                        return item.id !== itemId;
                    });
                    saveShoppingCart();
                });
            });
        };

        if (navCartBtnElement) {
            // This function opens the cart overlay when the nav button is clicked
            navCartBtnElement.addEventListener('click', function(e) {
                e.preventDefault();
                cartOverlayElement.classList.add('active');
            });
        }
        if (closeCartBtnElement) {
            // This function closes the cart overlay
            closeCartBtnElement.addEventListener('click', function() {
                cartOverlayElement.classList.remove('active');
            });
        }
        if (cartOverlayElement) {
            // This function closes the cart overlay when clicking outside of it
            cartOverlayElement.addEventListener('click', function(e) {
                if (e.target === cartOverlayElement) {
                    cartOverlayElement.classList.remove('active');
                }
            });
        }

        updateShoppingCartUI();
    }

    // --- 3D Demo Injection (Runtime) ---
    if (window.location.pathname.indexOf('workouts.html') > -1) {
        var workoutSection = document.querySelector('.workout-section');
        if (workoutSection && !document.querySelector('.3d-demo-section')) {
            var demoHTML = `
            <section class="demo-section">
                <div class="container">
                    <div class="demo-header">
                        <div class="badge glow-badge">✨ Interactive Training Mode</div>
                        <h2 class="demo-title">Experience FitVerse <span class="demo-gradient-text">3D</span></h2>
                        <p class="demo-desc">See exactly which muscles you are targeting with our proprietary 3D anatomy engine. (Demo Mode)</p>
                    </div>

                    <div class="demo-grid">
                        <!-- Left: The 3D Demo Visual -->
                        <div class="demo-card-visual">
                            
                            <!-- Simulating a 3D animated GIF using a high-quality fitness anatomy placeholder -->
                            <div class="demo-image-container">
                                <!-- Glowing Muscle Overlay Simulation -->
                                <div class="demo-glow-overlay"></div>
                                <div class="demo-drag-hint">Click & Drag to Rotate 3D Model</div>
                            </div>
                        </div>

                        <!-- Right: Information & Premium Upsell -->
                        <div class="demo-info-container">
                            <h3 class="demo-target-title">Target: <span class="demo-target-highlight">Core & Obliques</span></h3>
                            <ul class="demo-exercise-list">
                                <li class="demo-list-item"><strong class="demo-label">Primary:</strong> Rectus Abdominis</li>
                                <li class="demo-list-item"><strong class="demo-label">Secondary:</strong> External Obliques</li>
                                <li class="demo-list-item"><strong class="demo-label">Form Hint:</strong> Keep spine perfectly neutral.</li>
                            </ul>

                            <div class="demo-locked-card">
                                <div class="demo-star-icon">⭐</div>
                                <div>
                                    <h4 class="demo-locked-title">Elite Feature Locked</h4>
                                    <p class="demo-locked-desc">Upgrade to Premium to unlock full 360° interactive 3D models for all 500+ exercises instantly.</p>
                                    <a href="premium.html" class="demo-unlock-link">Unlock Now →</a>
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
