// Main JavaScript file for G318 Travel Website
document.addEventListener('DOMContentLoaded', async function() {
    console.log('318旅行网站已加载');

    // Performance monitoring
    const perfStart = performance.now();

    // ─── Cached DOM References (ref4) ──────────────────────────
    const dom = {
        routeDisplay: document.querySelector('.route-display'),
        photoDisplay: document.querySelector('.photo-display'),
        plannerButtons: document.querySelectorAll('.btn-planner'),
        photoButtons: document.querySelectorAll('.btn-photo'),
        difficultyFilter: document.getElementById('route-difficulty'),
        featureTags: document.querySelectorAll('.feature-tag'),
        reviewsContainer: document.getElementById('reviews-container'),
        reviewType: document.getElementById('review-type'),
        reviewSort: document.getElementById('review-sort'),
        mapElement: document.getElementById('g318-map'),
        ratingValue: document.getElementById('rating-value'),
    };

    // ─── Load Data (ref1) ─────────────────────────────────────
    let routesData, photosData, mapData;
    try {
        const [routesRes, photosRes, mapRes] = await Promise.all([
            fetch('src/data/routes.json'),
            fetch('src/data/photos.json'),
            fetch('src/data/map.json'),
        ]);
        routesData = await routesRes.json();
        photosData = await photosRes.json();
        mapData = await mapRes.json();
    } catch (e) {
        console.error('数据加载失败:', e);
    }

    // Log performance metrics after load
    window.addEventListener('load', function() {
        const perfEnd = performance.now();
        const loadTime = perfEnd - perfStart;
        console.log(`页面加载时间: ${loadTime.toFixed(2)}ms`);

        try {
            const loads = parseInt(localStorage.getItem('g318_page_loads') || '0') + 1;
            localStorage.setItem('g318_page_loads', loads.toString());
            localStorage.setItem('g318_last_load_time', loadTime.toFixed(2));
        } catch (e) {
            // LocalStorage might be disabled in some contexts
        }
    });

    // Initialize modules
    initButtonInteractions();
    initPhotoGallery();
    initSmoothScrolling();
    initInteractiveMap();
    initCommentSystem();

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }

    // ─── Utility: Button click animation (ref2) ───────────────
    function animateButtonClick(btn, type = 'scale') {
        if (type === 'translate') {
            btn.style.transform = 'translateY(-2px)';
            setTimeout(() => { btn.style.transform = 'translateY(0)'; }, 150);
        } else {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
        }
    }

    // ─── Button Interactions ───────────────────────────────────
    function initButtonInteractions() {
        const routeBtn = document.getElementById('route-btn');
        if (routeBtn) {
            routeBtn.addEventListener('click', function() {
                animateButtonClick(this, 'translate');
                const routeSection = document.getElementById('route-details');
                if (routeSection) routeSection.scrollIntoView({ behavior: 'smooth' });
                showNotification('路线详细信息功能正在开发中...', 'info');
            });
        }

        const guideBtn = document.getElementById('guide-btn');
        if (guideBtn) {
            guideBtn.addEventListener('click', function() {
                animateButtonClick(this, 'translate');
                showNotification('旅行指南获取功能正在开发中...', 'info');
            });
        }

        initRoutePlanner();
    }

    // ─── Route Planner (ref1: data-driven + ref4: cached DOM) ─
    function initRoutePlanner() {
        if (dom.plannerButtons.length > 0 && dom.routeDisplay) {
            dom.plannerButtons.forEach(button => {
                button.addEventListener('click', function() {
                    dom.plannerButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const days = this.getAttribute('data-days');
                    updateRouteDisplay(days);
                    animateButtonClick(this, 'scale');
                });
            });

            if (dom.difficultyFilter) {
                dom.difficultyFilter.addEventListener('change', filterRoutes);
            }

            dom.featureTags.forEach(tag => {
                tag.addEventListener('click', function() {
                    this.classList.toggle('active');
                    filterRoutes();
                });
            });

            if (dom.plannerButtons[0]) {
                dom.plannerButtons[0].classList.add('active');
                updateRouteDisplay('8');
            }
        }
    }

    function filterRoutes() {
        if (!dom.plannerButtons.length || !dom.routeDisplay) return;

        const selectedDifficulty = dom.difficultyFilter ? dom.difficultyFilter.value : 'all';
        const activeFeatureTags = document.querySelectorAll('.feature-tag.active');
        const selectedFeatures = Array.from(activeFeatureTags).map(tag => tag.getAttribute('data-feature'));

        let activeButtonVisible = false;
        let firstVisibleButton = null;

        dom.plannerButtons.forEach(button => {
            const btnDifficulty = button.getAttribute('data-difficulty') || '';
            const btnFeatures = (button.getAttribute('data-features') || '').split(' ').filter(f => f);

            const difficultyMatch = selectedDifficulty === 'all' || btnDifficulty === selectedDifficulty;
            const featureMatch = selectedFeatures.length === 0 ||
                selectedFeatures.every(feat => btnFeatures.includes(feat));

            const visible = difficultyMatch && featureMatch;
            button.style.display = visible ? '' : 'none';

            if (visible) {
                if (!firstVisibleButton) firstVisibleButton = button;
                if (button.classList.contains('active')) activeButtonVisible = true;
            }
        });

        if (!activeButtonVisible && firstVisibleButton) {
            dom.plannerButtons.forEach(btn => btn.classList.remove('active'));
            firstVisibleButton.classList.add('active');
            const days = firstVisibleButton.getAttribute('data-days');
            updateRouteDisplay(days);
        }

        if (!firstVisibleButton) {
            dom.routeDisplay.innerHTML = `
                <div class="route-content">
                    <h3>暂无匹配路线</h3>
                    <p>当前筛选条件下没有匹配的路线，请尝试调整筛选条件。</p>
                </div>
            `;
        }
    }

    // ─── Route Display (ref1: data-driven rendering) ──────────
    function updateRouteDisplay(days) {
        if (!dom.routeDisplay) return;
        dom.routeDisplay.innerHTML = '';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'route-content';

        if (!routesData || !routesData[days]) {
            contentDiv.innerHTML = '<h3>行程规划</h3><p>请选择行程天数查看详细路线。</p>';
            dom.routeDisplay.appendChild(contentDiv);
            return;
        }

        const route = routesData[days];
        const daysHtml = route.days.map(day => `
            <div class="route-day">
                <h4>${escapeHtml(day.title)}</h4>
                <p>${escapeHtml(day.desc)}</p>
                <p class="tip">${escapeHtml(day.tip)}</p>
            </div>
        `).join('');

        contentDiv.innerHTML = `<h3>${escapeHtml(route.title)}</h3><div class="route-grid">${daysHtml}</div>`;
        dom.routeDisplay.appendChild(contentDiv);
    }

    // ─── Photo Gallery (ref1: data-driven + ref4: cached DOM) ─
    function initPhotoGallery() {
        if (dom.photoButtons.length > 0 && dom.photoDisplay) {
            dom.photoButtons.forEach(button => {
                button.addEventListener('click', function() {
                    dom.photoButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const photoType = this.getAttribute('data-type');
                    updatePhotoDisplay(photoType);
                    animateButtonClick(this, 'scale');
                });
            });

            if (dom.photoButtons[0]) {
                dom.photoButtons[0].classList.add('active');
                updatePhotoDisplay('scenery');
            }
        }
    }

    // ─── Photo Display (ref1: data-driven rendering) ──────────
    function updatePhotoDisplay(type) {
        if (!dom.photoDisplay) return;
        dom.photoDisplay.innerHTML = '';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'photo-content';

        if (!photosData || !photosData[type]) {
            contentDiv.innerHTML = '<h3>照片展览</h3><p>点击上面的按钮查看不同类型的照片。</p>';
            dom.photoDisplay.appendChild(contentDiv);
            return;
        }

        const category = photosData[type];
        const itemsHtml = category.items.map(item => {
            const imgHtml = item.img
                ? `<img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.alt || item.title)}" class="${escapeHtml(category.imgClass)}" loading="lazy">`
                : '';
            const detailHtml = item.detail ? `<p>${escapeHtml(item.detail)}</p>` : '';
            const tipHtml = item.tip ? `<p class="tip">${escapeHtml(item.tip)}</p>` : '';
            return `<div class="${escapeHtml(category.itemClass)}">${imgHtml}<h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.desc)}</p>${detailHtml}${tipHtml}</div>`;
        }).join('');

        contentDiv.innerHTML = `<h3>${escapeHtml(category.title)}</h3><div class="${escapeHtml(category.cssClass)}">${itemsHtml}</div>`;
        dom.photoDisplay.appendChild(contentDiv);
    }

    // ─── Interactive Map (ref1: data-driven) ──────────────────
    function initInteractiveMap() {
        if (!dom.mapElement) {
            console.log('Map element not found');
            return;
        }

        const map = L.map('g318-map').setView([30.0, 95.0], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        if (mapData) {
            // Add markers for each scenic spot
            mapData.spots.forEach(spot => {
                const marker = L.marker([spot.lat, spot.lng]).addTo(map);
                const popupContent = `
                    <div class="map-popup">
                        <h4>${escapeHtml(spot.name)}</h4>
                        <p><strong>描述：</strong>${escapeHtml(spot.description)}</p>
                        <p><strong>海拔：</strong>${escapeHtml(spot.elevation)}</p>
                        <p><strong>最佳季节：</strong>${escapeHtml(spot.bestTime)}</p>
                    </div>
                `;
                marker.bindPopup(popupContent);
            });

            // Add polyline for the G318 route
            L.polyline(mapData.route, {color: '#ff385c', weight: 4, opacity: 0.8}).addTo(map)
                .bindPopup('<strong>G318川藏线</strong><br>点击查看详细路线信息');

            // Fit map to show all markers and route
            const allPoints = mapData.spots.map(spot => [spot.lat, spot.lng]).concat(mapData.route);
            const group = new L.featureGroup(allPoints.map(L.latLng));
            map.fitBounds(group.getBounds().pad(0.2));
        }
    }

    // ─── Smooth Scrolling ─────────────────────────────────────
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ─── Comment / Review System ──────────────────────────────
    function initCommentSystem() {
        initReviewForm();
        initReviewFilters();
        initRatingStars();
        loadSampleReviews();
    }

    function initReviewForm() {
        const addReviewBtn = document.getElementById('add-review-btn');
        const reviewModal = document.getElementById('review-modal');
        const modalCloseBtns = document.querySelectorAll('.modal-close');
        const reviewForm = document.getElementById('review-form');

        if (addReviewBtn && reviewModal) {
            addReviewBtn.addEventListener('click', function() {
                reviewModal.style.display = 'block';
                reviewForm.reset();
                dom.ratingValue.value = '0';
                resetRatingStars();
            });
        }

        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = btn.closest('.modal');
                if (modal) modal.style.display = 'none';
            });
        });

        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        });

        if (reviewForm) {
            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitReview();
            });
        }
    }

    function initRatingStars() {
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                dom.ratingValue.value = value;
                updateRatingDisplay(value);
            });
            star.addEventListener('mouseover', function() {
                previewRating(parseInt(this.getAttribute('data-value')));
            });
            star.addEventListener('mouseout', function() {
                previewRating(parseInt(dom.ratingValue.value) || 0);
            });
        });
    }

    function updateRatingDisplay(value) {
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach((star, index) => {
            if (index < value) {
                star.textContent = '★';
                star.classList.add('star-filled');
                star.classList.remove('star-empty');
            } else {
                star.textContent = '☆';
                star.classList.remove('star-filled');
                star.classList.add('star-empty');
            }
        });
    }

    function previewRating(value) {
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach((star, index) => {
            if (index < value) {
                star.textContent = '★';
                star.classList.add('star-preview');
                star.classList.remove('star-empty');
            } else {
                star.textContent = '☆';
                star.classList.remove('star-preview');
                star.classList.add('star-empty');
            }
        });
    }

    function resetRatingStars() {
        updateRatingDisplay(0);
    }

    // ─── Review Filters (ref3: data-rating + ref4: cached DOM) ─
    function initReviewFilters() {
        if (dom.reviewType) dom.reviewType.addEventListener('change', filterReviews);
        if (dom.reviewSort) dom.reviewSort.addEventListener('change', filterReviews);
    }

    function filterReviews() {
        if (!dom.reviewsContainer) return;

        const typeFilter = dom.reviewType ? dom.reviewType.value : 'all';
        const sortFilter = dom.reviewSort ? dom.reviewSort.value : 'newest';
        const reviewCards = Array.from(dom.reviewsContainer.querySelectorAll('.review-card'));

        const filteredCards = reviewCards.filter(card => {
            if (typeFilter === 'all') return true;
            const cardType = card.getAttribute('data-type') || '';
            return cardType === typeFilter;
        });

        const sortedCards = filteredCards.sort((a, b) => {
            if (sortFilter === 'newest') return -1;
            if (sortFilter === 'oldest') return 1;
            if (sortFilter === 'rating') {
                // ref3: Use data-rating attribute instead of regex on ★
                const ratingA = parseInt(a.getAttribute('data-rating')) || 0;
                const ratingB = parseInt(b.getAttribute('data-rating')) || 0;
                return ratingB - ratingA;
            }
            return 0;
        });

        reviewCards.forEach(card => card.style.display = 'none');
        sortedCards.forEach(card => card.style.display = '');
    }

    function loadSampleReviews() {
        console.log('Sample reviews loaded');
    }

    function submitReview() {
        const reviewerName = document.getElementById('reviewer-name').value.trim();
        const reviewType = document.getElementById('review-type-input').value;
        const reviewTitle = document.getElementById('review-title').value.trim();
        const ratingVal = dom.ratingValue.value;
        const reviewContent = document.getElementById('review-content').value.trim();
        const reviewTags = document.getElementById('review-tags').value.trim();

        if (!reviewerName || !reviewType || !reviewTitle || !ratingVal || !reviewContent) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }

        if (reviewerName.length > 20) {
            showNotification('昵称不能超过20个字符', 'error');
            return;
        }
        if (reviewTitle.length > 50) {
            showNotification('标题不能超过50个字符', 'error');
            return;
        }
        if (reviewContent.length > 1000) {
            showNotification('内容不能超过1000个字符', 'error');
            return;
        }

        const rating = parseInt(ratingVal);
        if (rating < 1 || rating > 5) {
            showNotification('请选择有效的评分', 'error');
            return;
        }

        const newReview = createReviewCard({
            name: reviewerName,
            type: reviewType,
            title: reviewTitle,
            rating: rating,
            content: reviewContent,
            tags: reviewTags,
            date: new Date().toLocaleDateString('zh-CN')
        });

        if (dom.reviewsContainer) {
            dom.reviewsContainer.insertBefore(newReview, dom.reviewsContainer.firstChild);

            const modal = document.getElementById('review-modal');
            if (modal) modal.style.display = 'none';

            document.getElementById('review-form').reset();
            resetRatingStars();

            showNotification('评论发布成功！', 'success');
            filterReviews();
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ref3: createReviewCard adds data-rating attribute
    function createReviewCard(data) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.setAttribute('data-type', data.type || 'other');

        const safeRating = Math.max(1, Math.min(5, Math.floor(data.rating) || 0));
        // ref3: Store rating as data attribute for efficient filtering
        card.setAttribute('data-rating', safeRating);

        const tagsArray = data.tags ? data.tags.split(' ').filter(tag => tag.trim() !== '') : [];
        const tagsHtml = tagsArray.map(tag => {
            const cleanTag = tag.startsWith('#') ? tag : '#' + tag;
            return `<span class="tag">${escapeHtml(cleanTag)}</span>`;
        }).join('');

        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${escapeHtml(data.name.charAt(0))}</div>
                    <div class="reviewer-name">${escapeHtml(data.name)}</div>
                    <div class="review-date">${escapeHtml(data.date)}</div>
                </div>
                <div class="review-rating">
                    ${'★'.repeat(safeRating)}${'☆'.repeat(5 - safeRating)}
                </div>
            </div>
            <div class="review-content">
                <h4>${escapeHtml(data.title)}</h4>
                <p>${escapeHtml(data.content)}</p>
            </div>
            <div class="review-tags">
                ${tagsHtml}
            </div>
        `;

        return card;
    }

    // ─── Notification System ──────────────────────────────────
    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('notification-slide-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
