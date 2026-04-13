// Main JavaScript file for G318 Travel Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('318旅行网站已加载');
    // Performance monitoring
    const perfStart = performance.now();
    
    // Log performance metrics after load
    window.addEventListener('load', function() {
        const perfEnd = performance.now();
        const loadTime = perfEnd - perfStart;
        console.log(`页面加载时间: ${loadTime.toFixed(2)}ms`);
        
        // Store in localStorage for analytics (if needed)
        try {
            const loads = parseInt(localStorage.getItem('g318_page_loads') || '0') + 1;
            localStorage.setItem('g318_page_loads', loads.toString());
            localStorage.setItem('g318_last_load_time', loadTime.toFixed(2));
        } catch (e) {
            // LocalStorage might be disabled in some contexts
        }
    });

    
    // Initialize button interactions
    initButtonInteractions();
    initPhotoGallery();
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize interactive map
    initInteractiveMap();
    
    // Initialize comment/review system
    initCommentSystem();
});

function initButtonInteractions() {
    // Route details button
    const routeBtn = document.getElementById('route-btn');
    if (routeBtn) {
        routeBtn.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 150);
            
            // Scroll to route details section
            const routeSection = document.getElementById('route-details');
            if (routeSection) {
                routeSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Show alert for now (will be replaced with actual functionality)
            showNotification('路线详细信息功能正在开发中...', 'info');
        });
    }
    
    // Guide request button
    const guideBtn = document.getElementById('guide-btn');
    if (guideBtn) {
        guideBtn.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 150);
            
            // Scroll to planning section (would be implemented later)
            showNotification('旅行指南获取功能正在开发中...', 'info');
        });
    }
    
    // Route planner buttons
    initRoutePlanner();
}

function initRoutePlanner() {
    const plannerButtons = document.querySelectorAll('.btn-planner');
    const routeDisplay = document.querySelector('.route-display');
    const difficultyFilter = document.getElementById('route-difficulty');
    const featureTags = document.querySelectorAll('.feature-tag');
    
    if (plannerButtons.length > 0 && routeDisplay) {
        // Route button click handlers
        plannerButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                plannerButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the route type
                const days = this.getAttribute('data-days');
                
                // Update route display
                updateRouteDisplay(days, routeDisplay);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Difficulty filter handler
        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', filterRoutes);
        }
        
        // Feature tag click handlers (toggle)
        featureTags.forEach(tag => {
            tag.addEventListener('click', function() {
                this.classList.toggle('active');
                filterRoutes();
            });
        });
        
        // Set first button as active by default
        if (plannerButtons[0]) {
            plannerButtons[0].classList.add('active');
            updateRouteDisplay('8', routeDisplay);
        }
    }
}

function filterRoutes() {
    const plannerButtons = document.querySelectorAll('.btn-planner');
    const routeDisplay = document.querySelector('.route-display');
    const difficultyFilter = document.getElementById('route-difficulty');
    const activeFeatureTags = document.querySelectorAll('.feature-tag.active');
    
    if (!plannerButtons.length || !routeDisplay) return;
    
    // Get current filter values
    const selectedDifficulty = difficultyFilter ? difficultyFilter.value : 'all';
    const selectedFeatures = Array.from(activeFeatureTags).map(tag => tag.getAttribute('data-feature'));
    
    // Track if any button is currently active and visible
    let activeButtonVisible = false;
    let firstVisibleButton = null;
    
    plannerButtons.forEach(button => {
        const btnDifficulty = button.getAttribute('data-difficulty') || '';
        const btnFeatures = (button.getAttribute('data-features') || '').split(' ').filter(f => f);
        
        // Check difficulty match
        const difficultyMatch = selectedDifficulty === 'all' || btnDifficulty === selectedDifficulty;
        
        // Check feature match (all selected features must be in the route)
        const featureMatch = selectedFeatures.length === 0 || 
            selectedFeatures.every(feat => btnFeatures.includes(feat));
        
        const visible = difficultyMatch && featureMatch;
        button.style.display = visible ? '' : 'none';
        
        if (visible) {
            if (!firstVisibleButton) firstVisibleButton = button;
            if (button.classList.contains('active')) activeButtonVisible = true;
        }
    });
    
    // If current active button is hidden, switch to first visible one
    if (!activeButtonVisible && firstVisibleButton) {
        plannerButtons.forEach(btn => btn.classList.remove('active'));
        firstVisibleButton.classList.add('active');
        const days = firstVisibleButton.getAttribute('data-days');
        updateRouteDisplay(days, routeDisplay);
    }
    
    // If no routes match, show a message
    if (!firstVisibleButton) {
        routeDisplay.innerHTML = `
            <div class="route-content">
                <h3>暂无匹配路线</h3>
                <p>当前筛选条件下没有匹配的路线，请尝试调整筛选条件。</p>
            </div>
        `;
    }
}

function initPhotoGallery() {
    // Photo gallery buttons
    const photoButtons = document.querySelectorAll('.btn-photo');
    const photoDisplay = document.querySelector('.photo-display');
    
    if (photoButtons.length > 0 && photoDisplay) {
        photoButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                photoButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the photo type
                const photoType = this.getAttribute('data-type');
                
                // Update photo display
                updatePhotoDisplay(photoType, photoDisplay);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Set first button as active by default
        if (photoButtons[0]) {
            photoButtons[0].classList.add('active');
            updatePhotoDisplay('scenery', photoDisplay);
        }
    }
}

function updatePhotoDisplay(type, container) {
    // Clear current content
    container.innerHTML = '';
    
    // Create container for content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'photo-content';
    
    let title, itemsHtml = '';
    
    switch(type) {
        case 'scenery':
            title = '沿途风景';
            itemsHtml = `
                <div class="scenery-grid">
                    <div class="scenery-item">
                        <img src="public/images/scenery/yalasnow.jpg" alt="雅拉雪山" class="scenery-img" loading="lazy">
                        <h4>雅拉雪山</h4>
                        <p>海拔7294米，终年雪山，是川藏线最著名的雪山景观之一。最佳观赏时间：4-6月，上午时分云雾较少。</p>
                        <p class="tip">小贴士：可在察瓦龙镇观景台俯瞰全貌，注意防晒和保暖。</p>
                    </div>
                    <div class="scenery-item">
                        <img src="public/images/scenery/ranwu.jpg" alt="然乌湖" class="scenery-img" loading="lazy">
                        <h4>然乌湖</h4>
                        <p>被誉为“人间仙湖”，湖水澄澈如镜，倒映着雪山和森林。最佳旅游季节：5-10月。</p>
                        <p class="tip">小贴士：湖边有藏民家访体验，可尝试奶酪和青稞酒。</p>
                    </div>
                    <div class="scenery-item">
                        <img src="public/images/scenery/basumtso.jpg" alt="巴松措" class="scenery-img" loading="lazy">
                        <h4>巴松措</h4>
                        <p>“神湖”之美，湖光山色相映成趣，四季景色各异。春季杜鹃花开尤为壮观。</p>
                        <p class="tip">小贴士：环湖步行约2小时，沿途有多个观景点可拍摄倒影。</p>
                    </div>
                    <div class="scenery-item">
                        <img src="public/images/scenery/72hairpin.jpg" alt="72拐" class="scenery-img" loading="lazy">
                        <h4>72拐</h4>
                        <p>海拔4000多米的蜿蜒山路，共有72个弯道，是川藏线上最具挑战的路段之一。</p>
                        <p class="tip">小贴士：上坡时使用低挡，下坡时靠边行驶，注意迎车。</p>
                    </div>
                    <div class="scenery-item">
                        <img src="public/images/scenery/midui.jpg" alt="米堆冰川" class="scenery-img" loading="lazy">
                        <h4>米堆冰川</h4>
                        <p>中国最低海拔现代冰川，冰川下方有原始森林，形成独特的“冰川森林”景观。</p>
                        <p class="tip">小贴士：建议上午前往，下午易有雾气影响能见度。</p>
                    </div>
                </div>
            `;
            break;
        case 'accommodation':
            title = '住宿推荐';
            itemsHtml = `
                <div class="accommodation-list">
                    <div class="accommodation-item">
                        <img src="public/images/accommodation/hilton.jpg" alt="林芝希尔顿逸林酒店" class="accommodation-img" loading="lazy">
                        <h4>林芝希尔顿逸林酒店</h4>
                        <p>⭐⭐⭐⭐⭐ | 林芝市区 | 约¥400-600/晚</p>
                        <p>提供氧气袋和高原反应药品，早餐包含藏式馕和甜茶。</p>
                        <p class="tip">适合：首次进藏需要缓冲的游客</p>
                    </div>
                    <div class="accommodation-item">
                        <img src="public/images/accommodation/gesar.jpg" alt="波密古乡格萨尔王庄园" class="accommodation-img" loading="lazy">
                        <h4>波密古乡格萨尔王庄园</h4>
                        <p>⭐⭐⭐⭐ | 波密县 | 约¥250-350/晚</p>
                        <p>藏式花园小院，房间带藏式装修，可体验藏家烤火。</p>
                        <p class="tip">适合：想体验藏传民宿文化的旅行者</p>
                    </div>
                    <div class="accommodation-item">
                        <h4>昌都香巴拉宾馆</h4>
                        <p>⭐⭐⭐ | 昌都县 | 约¥150-250/晚</p>
                        <p>条件基本但干净整洁，老板热情提供旅行建议和当地信息。</p>
                        <p class="tip">适合：预算有限的背包客和自驾车友</p>
                    </div>
                    <div class="accommodation-item">
                        <h4>左贡客栈·旺姆家访</h4>
                        <p>⭐⭐⭐⭐ | 左贡县 | 约¥180-280/晚（含早晚餐）</p>
                        <p>藏式木结构房屋，可参加家庭烤火和酥油茶制作。</p>
                        <p class="tip">适合：想深度体验藏家生活的文化爱好者</p>
                    </div>
                    <div class="accommodation-item">
                        <h4>邦达草原旅社</h4>
                        <p>⭐⭐⭐ | 邦达草原 | 约¥120-200/晚</p>
                        <p>草原上的简易旅社，夜晚可观星，清晨看草原牛羊。</p>
                        <p class="tip">适合：喜欢草原夜色和宁静的旅行者</p>
                    </div>
                </div>
            `;
            break;
        case 'food':
            title = '地方美食';
            itemsHtml = `
                <div class="food-grid">
                    <div class="food-item">
                        <img src="public/images/food/buttertea.jpg" alt="酥油茶" class="food-img" loading="lazy">
                        <h4>酥油茶</h4>
                        <p>藏家日常饮品，由茶、酥油和盐搅拌而成，高热量易于耐寒。</p>
                        <p class="tip">品尝建议：刚端上来时热饮，不要一次喝太多以免不适。</p>
                    </div>
                    <div class="food-item">
                        <h4>青稞酒</h4>
                        <p>高原特色酒精饮料，度数较低（20%-30%），味道甘甜略带酸味。</p>
                        <p class="tip">饮用注意：高原地区酒精易上头，控制量并多喝水。</p>
                    </div>
                    <div class="food-item">
                        <h4>藏式羊肉火锅</h4>
                        <p>清汤底煮羊肉片，配以藏式蘸料（香菜、蒜泥、辣椒油等）。</p>
                        <p class="tip">最佳餐馆：林芝的“桃花庄园”、波密的“八一食堂”。</p>
                    </div>
                    <div class="food-item">
                        <img src="public/images/food/stonechicken.jpg" alt="石锅鸡" class="food-img" loading="lazy">
                        <h4>石锅鸡（巴松措特色）</h4>
                        <p>用当地石锅慢炖的鸡肉汤，加入木耳、香菇和青稞。</p>
                        <p class="tip">必须尝试：巴松措湖边的石锅鸡馆，鱼汤同样值得一试。</p>
                    </div>
                    <div class="food-item">
                        <h4>雅江鱼</h4>
                        <p>雅江河谷特产，肉质鲜嫩，多以清蒸或红烧方式烹饪。</p>
                        <p class="tip">季节性强：4-6月为最佳时期，之后可能因禁渔而难以买到。</p>
                    </div>
                    <div class="food-item">
                        <h4>高原牦牛肉干</h4>
                        <p>风干牦牛肉，嚼劲十足，是途中补给的好选择。</p>
                        <p class="tip">选购建议：颜色深红不发黑，闻起来有肉香无异味。</p>
                    </div>
                </div>
            `;
            break;
        case 'culture':
            title = '民俗文化';
            itemsHtml = `
                <div class="culture-list">
                    <div class="culture-item">
                        <img src="public/images/culture/temple.jpg" alt="藏传佛教寺庙" class="culture-img" loading="lazy">
                        <h4>藏传佛教寺庙</h4>
                        <p>沿途可见诸多寺庙，如波密的嘎托寺、昌都的觉东寺等。</p>
                        <p class="tip">参观礼仪：逆时针转经轮、不要触摸佛像、保持安静。</p>
                    </div>
                    <div class="culture-item">
                        <h4>雪顿节（若遇同年份）</h4>
                        <p>藏历六月二十九日开始的节日，以晒佛像和吃酸奶为主要内容。</p>
                        <p class="tip">时间参考：通常在公历6-7月之间，具体日期需查看当年中藏历。</p>
                    </div>
                    <div class="culture-item">
                        <h4>藏式婚礼习俗</h4>
                        <p>若遇婚礼迎亲队伍，会看到新娘戴着凤冠霞帔，骑着装饰的马。</p>
                        <p class="tip">尊重观看：保持距离不要围观太近，可拍远景但不建议近距离拍摄新娘。</p>
                    </div>
                    <div class="culture-item">
                        <img src="public/images/culture/butterflower.jpg" alt="酥油花制作" class="culture-img" loading="lazy">
                        <h4>酥油花制作</h4>
                        <p>冬季藏民用酥油和矿物质颜料塑造成各种佛像和花卉。</p>
                        <p class="tip">欣赏地点：部分寺庙冬季会展酥油花，夏季较少可见。</p>
                    </div>
                    <div class="culture-item">
                        <h4>藏族歌舞表演</h4>
                        <p>许多餐厅和文化园会有晚间的藏族歌舞表演。</p>
                        <p class="tip">体验建议：林芝和波密的一些客栈提供晚餐加表演套餐。</p>
                    </div>
                </div>
            `;
            break;
        default:
            title = '照片展览';
            itemsHtml = '<p>点击上面的按钮查看不同类型的照片。</p>';
    }
    
    contentDiv.innerHTML = `<h3>${title}</h3>${itemsHtml}`;
    container.appendChild(contentDiv);
}

function updateRouteDisplay(days, container) {
    // Clear current content
    container.innerHTML = '';
    
    // Create container for content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'route-content';
    
    let title, itemsHtml = '';
    
    switch(days) {
        case '8':
            title = '8天经典路线';
            itemsHtml = `
                <div class="route-grid">
                    <div class="route-day">
                        <h4>第1天：成都 → 雅安 → 康定</h4>
                        <p>行程：约330公里，经成雅高速到雅安，翻越二郎山隧道后抵达康定。沿途可品尝雅安雅鱼。</p>
                        <p class="tip">住宿建议：康定县城酒店较多，海拔2560米，注意轻微高反。</p>
                    </div>
                    <div class="route-day">
                        <h4>第2天：康定 → 折多山 → 新都桥</h4>
                        <p>行程：约80公里，翻越折多山（4298米）后抵达"摄影师的天堂"新都桥。</p>
                        <p class="tip">必看：折多山垭口远眺贡嘎雪山，新都桥秋季白杨林最美。</p>
                    </div>
                    <div class="route-day">
                        <h4>第3天：新都桥 → 理塘 → 巴塘</h4>
                        <p>行程：约260公里，翻越高尔寺山（4412米）和剪子弯山（4658米），经"世界高城"理塘后下至巴塘。</p>
                        <p class="tip">注意：理塘海拔4014米，建议不做剧烈运动，巴塘海拔仅2580米利于休整。</p>
                    </div>
                    <div class="route-day">
                        <h4>第4天：巴塘 → 芒康 → 左贡</h4>
                        <p>行程：约260公里，跨过金沙江大桥进入西藏，翻越拉乌山（4338米）和东达山（5130米）抵达左贡。</p>
                        <p class="tip">重点：东达山是川藏线海拔最高垭口之一，备好氧气和厚衣物。</p>
                    </div>
                    <div class="route-day">
                        <h4>第5天：左贡 → 邦达 → 八宿</h4>
                        <p>行程：约200公里，经邦达草原后翻越业拉山（4658米），下怒江72拐到八宿。</p>
                        <p class="tip">奇观：怒江72拐是川藏线最壮观的盘山公路，务必控制车速。</p>
                    </div>
                    <div class="route-day">
                        <h4>第6天：八宿 → 然乌湖 → 波密</h4>
                        <p>行程：约220公里，上午游览然乌湖，沿帕隆藏布江谷地抵达波密。</p>
                        <p class="tip">重点：然乌湖清晨最美，波密海拔2725米，氧气充足适合休整。</p>
                    </div>
                    <div class="route-day">
                        <h4>第7天：波密 → 鲁朗 → 林芝</h4>
                        <p>行程：约230公里，穿越通麦天险（已通隧道），经过鲁朗林海，翻越色季拉山（4720米）远眺南迦巴瓦峰后到林芝。</p>
                        <p class="tip">体验：鲁朗石锅鸡是必尝美食，色季拉山口看南迦巴瓦需运气。</p>
                    </div>
                    <div class="route-day">
                        <h4>第8天：林芝 → 工布江达 → 拉萨</h4>
                        <p>行程：约400公里，沿尼洋河谷上林拉高等级公路，经米拉山隧道到拉萨。</p>
                        <p class="tip">终点：抵达圣城拉萨，建议休息1-2天适应海拔后再游览布达拉宫。</p>
                    </div>
                </div>
            `;
            break;
        case '10':
            title = '10天深度路线';
            itemsHtml = `
                <div class="route-grid">
                    <div class="route-day">
                        <h4>第1天：成都 → 雅安 → 泸定</h4>
                        <p>行程：约280公里，经成雅高速到雅安，穿二郎山隧道到泸定，游览泸定桥。</p>
                        <p class="tip">文化：泸定桥是红军长征飞夺泸定桥的历史遗迹，值得驻足。</p>
                    </div>
                    <div class="route-day">
                        <h4>第2天：泸定 → 康定 → 新都桥</h4>
                        <p>行程：约120公里，上午逛康定城，下午翻折多山（4298米）到新都桥。</p>
                        <p class="tip">安排：折多山垭口可远眺贡嘎雪山，傍晚新都桥拍落日最佳。</p>
                    </div>
                    <div class="route-day">
                        <h4>第3天：新都桥 → 雅江 → 理塘</h4>
                        <p>行程：约210公里，翻越高尔寺山和剪子弯山，经卡子拉山（4718米）到理塘。</p>
                        <p class="tip">深度：理塘有长青春科尔寺，仓央嘉措的故乡，值得停留。</p>
                    </div>
                    <div class="route-day">
                        <h4>第4天：理塘 → 稻城 → 亚丁</h4>
                        <p>行程：约150公里，经海子山自然保护区（4685米）到稻城，下午继续前往亚丁村。</p>
                        <p class="tip">准备：亚丁景区需提前购票，建议住亚丁村便于次日早起进山。</p>
                    </div>
                    <div class="route-day">
                        <h4>第5天：亚丁景区游览日</h4>
                        <p>全日游览亚丁自然保护区：冲古寺、洛绒牛场、牛奶海、五色海和仙乃日神山。</p>
                        <p class="tip">体验：建议雇佣向导，全程约8小时徒步或骑马，体力消耗大。</p>
                    </div>
                    <div class="route-day">
                        <h4>第6天：稻城 → 理塘 → 巴塘</h4>
                        <p>行程：约260公里，从稻城返回理塘后沿G318继续西行至巴塘。</p>
                        <p class="tip">过渡：巴塘是川藏线在四川的最后一站，海拔2580米适合休整。</p>
                    </div>
                    <div class="route-day">
                        <h4>第7天：巴塘 → 芒康 → 左贡</h4>
                        <p>行程：约260公里，跨金沙江大桥入藏，翻越拉乌山和东达山（5130米）到左贡。</p>
                        <p class="tip">注意：正式进入西藏，检查站需出示身份证和边防证。</p>
                    </div>
                    <div class="route-day">
                        <h4>第8天：左贡 → 邦达 → 然乌湖</h4>
                        <p>行程：约200公里，经邦达草原翻业拉山下72拐，过八宿到然乌湖。</p>
                        <p class="tip">奇观：怒江72拐是川藏线最壮观的盘山公路，务必控制车速。</p>
                    </div>
                    <div class="route-day">
                        <h4>第9天：然乌湖 → 米堆冰川 → 波密</h4>
                        <p>行程：约130公里，上午游览然乌湖和米堆冰川，下午到波密。</p>
                        <p class="tip">体验：米堆冰川是中国最低海拔现代冰川，徒步往返约2小时。</p>
                    </div>
                    <div class="route-day">
                        <h4>第10天：波密 → 鲁朗 → 林芝 → 拉萨</h4>
                        <p>行程：约630公里（林拉高等级公路），穿通麦隧道过鲁朗，翻色季拉山到林芝后直奔拉萨。</p>
                        <p class="tip">返程：也可在林芝住一晚（第11天再到拉萨），分两天走更轻松。</p>
                    </div>
                </div>
            `;
            break;
        case '15':
            title = '15天全程路线';
            itemsHtml = `
                <div class="route-grid">
                    <div class="route-day">
                        <h4>第1天：成都 → 都江堰 → 映秀 → 日隆（四姑娘山）</h4>
                        <p>行程：约220公里，经都江堰沿映秀到日隆镇，下午游览四姑娘山双桥沟。</p>
                        <p class="tip">安排：双桥沟是四姑娘山最易到达的沟，观光车游览约3小时。</p>
                    </div>
                    <div class="route-day">
                        <h4>第2天：四姑娘山 → 丹巴 → 八美 → 新都桥</h4>
                        <p>行程：约200公里，经丹巴甲居藏寨和八美墨石公园到新都桥。</p>
                        <p class="tip">深度：甲居藏寨是《中国国家地理》评选的最美乡村，值得停留2小时。</p>
                    </div>
                    <div class="route-day">
                        <h4>第3天：新都桥 → 雅江 → 理塘</h4>
                        <p>行程：约210公里，翻越高尔寺山、剪子弯山和卡子拉山，抵达理塘。</p>
                        <p class="tip">过渡：理塘海拔4014米，参观长青春科尔寺，可品尝理塘酸奶。</p>
                    </div>
                    <div class="route-day">
                        <h4>第4-5天：理塘 → 稻城 → 亚丁（两天深度游）</h4>
                        <p>行程：约150公里到稻城，次日全天游览亚丁。短线：冲古寺、珍珠海；长线：洛绒牛场、牛奶海、五色海。</p>
                        <p class="tip">深度：亚丁建议住两晚，一天走短线一天走长线，充分感受"最后的香格里拉"。</p>
                    </div>
                    <div class="route-day">
                        <h4>第6天：稻城 → 理塘 → 巴塘</h4>
                        <p>行程：约260公里，返回理塘后沿G318继续西行，经毛垭大草原到巴塘。</p>
                        <p class="tip">景观：毛垭大草原夏季野花遍地，是理塘最美的季节景观。</p>
                    </div>
                    <div class="route-day">
                        <h4>第7天：巴塘 → 芒康 → 左贡</h4>
                        <p>行程：约260公里，跨金沙江大桥正式入藏，翻越拉乌山和东达山（5130米）到左贡。</p>
                        <p class="tip">注意：东达山垭口常年有风，气温可降至零度以下，备好防寒衣物。</p>
                    </div>
                    <div class="route-day">
                        <h4>第8天：左贡 → 邦达 → 八宿</h4>
                        <p>行程：约200公里，经邦达草原翻越业拉山（4658米），下怒江72拐到八宿。</p>
                        <p class="tip">奇观：72拐观景台俯瞰全景最壮观，注意下山控制车速和刹车温度。</p>
                    </div>
                    <div class="route-day">
                        <h4>第9天：八宿 → 然乌湖 → 米堆冰川 → 波密</h4>
                        <p>行程：约220公里，上午游览然乌湖和米堆冰川，下午到波密。</p>
                        <p class="tip">景观：然乌湖四周雪山环抱，米堆冰川徒步往返约2小时，波密桃花沟3月最美。</p>
                    </div>
                    <div class="route-day">
                        <h4>第10天：波密深度游</h4>
                        <p>休整日：上午游览波密桃花沟或岗云杉林，下午自由活动，体验当地藏家生活。</p>
                        <p class="tip">体验：波密是"西藏小瑞士"，海拔仅2725米适合休整，可洗车补给。</p>
                    </div>
                    <div class="route-day">
                        <h4>第11天：波密 → 鲁朗 → 林芝</h4>
                        <p>行程：约230公里，穿通麦隧道过鲁朗林海，翻色季拉山远眺南迦巴瓦峰到林芝。</p>
                        <p class="tip">美食：鲁朗石锅鸡是川藏线上最有名的美食，用当地石锅慢炖而成。</p>
                    </div>
                    <div class="route-day">
                        <h4>第12天：林芝深度游（雅鲁藏布大峡谷）</h4>
                        <p>全天游览：驱车前往雅鲁藏布大峡谷景区，近观南迦巴瓦峰和雅鲁藏布江。</p>
                        <p class="tip">文化：大峡谷内有门巴族和珞巴族村落，可体验独特的峡谷文化。</p>
                    </div>
                    <div class="route-day">
                        <h4>第13天：林芝 → 巴松措 → 工布江达</h4>
                        <p>行程：约150公里，上午游览巴松措（5A级景区），下午到工布江达县。</p>
                        <p class="tip">文化：巴松措湖心岛有唐代红教寺庙，环湖步道约2小时。</p>
                    </div>
                    <div class="route-day">
                        <h4>第14天：工布江达 → 米拉山 → 墨竹工卡 → 拉萨</h4>
                        <p>行程：约280公里，翻越米拉山（5013米）或穿米拉山隧道，经墨竹工卡到拉萨。</p>
                        <p class="tip">过渡：米拉山是拉萨与林芝的分界线，过山后气候变干燥。</p>
                    </div>
                    <div class="route-day">
                        <h4>第15天：拉萨深度游（布达拉宫+大昭寺）</h4>
                        <p>全天游览：上午参观布达拉宫（需提前预约），下午逛大昭寺和八廓街。</p>
                        <p class="tip">结束：完整的川藏南线15天旅程，建议在拉萨停留2-3天充分感受圣城魅力。</p>
                    </div>
                </div>
            `;
            break;
        default:
            title = '行程规划';
            itemsHtml = '<p>请选择行程天数查看详细路线。</p>';
    }
    
    contentDiv.innerHTML = `<h3>${title}</h3>${itemsHtml}`;
    container.appendChild(contentDiv);
}


function initInteractiveMap() {
    // Check if map element exists
    const mapElement = document.getElementById('g318-map');
    if (!mapElement) {
        console.log('Map element not found');
        return;
    }
    
    // Initialize the map centered on G318 route
    const map = L.map('g318-map').setView([30.0, 95.0], 6); // Approximate center of G318
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    
    // Define key G318 scenic spots with coordinates and info
    const scenicSpots = [
        {
            name: "贡嘎雪山",
            lat: 29.7961,
            lng: 101.7628,
            description: "蜀山之王，海拔7556米，川藏线折多山垭口可远眺其主峰。",
            elevation: "7556米",
            bestTime: "10-次年5月"
        },
        {
            name: "新都桥",
            lat: 30.0446,
            lng: 101.4838,
            description: "摄影师的天堂，秋季白杨林金黄，光影变幻莫测。",
            elevation: "3630米",
            bestTime: "9-11月（秋季）"
        },
        {
            name: "理塘",
            lat: 30.0031,
            lng: 100.2681,
            description: "世界高城，仓央嘉措的故乡，长青春科尔寺值得参拜。",
            elevation: "4014米",
            bestTime: "6-9月"
        },
        {
            name: "稻城亚丁",
            lat: 28.4328,
            lng: 100.2994,
            description: "最后的香格里拉，仙乃日、央迈勇、夏诺多吉三座神山守护。",
            elevation: "3900米",
            bestTime: "9-11月"
        },
        {
            name: "怒江72拐",
            lat: 30.0733,
            lng: 97.2918,
            description: "海拔4658米的业拉山盘山公路，72个弯道层层叠叠，是川藏线最壮观路段。",
            elevation: "4658米",
            bestTime: "全年（注意天气）"
        },
        {
            name: "然乌湖",
            lat: 29.4578,
            lng: 96.9189,
            description: "被誉为'人间仙湖'，湖水澄澈如镜，倒映着雪山和森林。",
            elevation: "3800米",
            bestTime: "5-10月"
        },
        {
            name: "米堆冰川",
            lat: 29.3125,
            lng: 96.5561,
            description: "中国最低海拔现代冰川，冰川下方有原始森林，形成独特的'冰川森林'景观。",
            elevation: "2400米",
            bestTime: "10-次年4月"
        },
        {
            name: "鲁朗林海",
            lat: 29.7716,
            lng: 95.0206,
            description: "被誉为'东方瑞士'，森林覆盖率高，草甸花海，石锅鸡是必尝美食。",
            elevation: "3400米",
            bestTime: "3-10月"
        },
        {
            name: "南迦巴瓦峰",
            lat: 29.6300,
            lng: 95.0550,
            description: "中国最美雪山，海拔7782米，色季拉山口是最佳观景点，需运气才能一睹真容。",
            elevation: "7782米",
            bestTime: "10-次年4月（少雨季）"
        },
        {
            name: "巴松措",
            lat: 29.9542,
            lng: 93.9983,
            description: "'神湖'之美，湖光山色相映成趣，湖心岛有唐代红教寺庙。",
            elevation: "3538米",
            bestTime: "3-5月（杜鹃花季）"
        },
        {
            name: "拉萨布达拉宫",
            lat: 29.6543,
            lng: 91.1174,
            description: "世界上海拔最高的古宫殿群，藏传佛教的圣地和象征。",
            elevation: "3700米",
            bestTime: "5-10月"
        }
    ];
    
    // Add markers for each scenic spot
    scenicSpots.forEach(spot => {
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
    
    // Add a polyline for the G318 route (simplified)
    const g318Route = [
        [30.5728, 104.0668], // 成都
        [30.0102, 103.0000], // 雅安
        [29.8808, 102.2344], // 泸定
        [30.0552, 101.9625], // 康定
        [30.0446, 101.4838], // 新都桥
        [29.9308, 101.0139], // 高尔寺山
        [29.7331, 100.9714], // 雅江
        [30.0031, 100.2681], // 理塘
        [28.4328, 100.2994], // 稻城亚丁（支线）
        [30.0031, 100.2681], // 返回理塘
        [30.0781, 99.2886],  // 巴塘
        [29.6806, 98.5983],  // 芒康
        [29.7381, 97.8353],  // 左贡
        [30.0733, 97.2918],  // 邦达/72拐
        [29.6350, 96.9283],  // 八宿
        [29.4578, 96.9189],  // 然乌湖
        [29.3125, 96.5561],  // 米堆冰川
        [29.8496, 95.5336],  // 波密
        [29.7716, 95.0206],  // 鲁朗
        [29.6300, 94.9200],  // 色季拉山
        [29.6489, 94.3625],  // 林芝
        [29.9542, 93.9983],  // 巴松措
        [29.8853, 93.2450],  // 工布江达
        [29.7756, 92.7211],  // 米拉山
        [29.6543, 91.1174],  // 拉萨
    ];
    
    L.polyline(g318Route, {color: '#ff385c', weight: 4, opacity: 0.8}).addTo(map)
        .bindPopup('<strong>G318川藏线</strong><br>点击查看详细路线信息');
    
    // Fit map to show all markers and route
    const allPoints = scenicSpots.map(spot => [spot.lat, spot.lng]).concat(g318Route);
    const group = new L.featureGroup(allPoints.map(L.latLng));
    map.fitBounds(group.getBounds().pad(0.2));
}

function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}



function initCommentSystem() {
    // Initialize review form functionality
    initReviewForm();
    initReviewFilters();
    initRatingStars();
    
    // Load sample reviews (in real app, this would come from API)
    loadSampleReviews();
}

function initReviewForm() {
    const addReviewBtn = document.getElementById('add-review-btn');
    const reviewModal = document.getElementById('review-modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const reviewForm = document.getElementById('review-form');
    
    if (addReviewBtn && reviewModal) {
        // Open modal
        addReviewBtn.addEventListener('click', function() {
            reviewModal.style.display = 'block';
            // Reset form
            reviewForm.reset();
            document.getElementById('rating-value').value = '0';
            resetRatingStars();
        });
    }
    
    // Close modal
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReview();
        });
    }
}

function initRatingStars() {
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingValue = document.getElementById('rating-value');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            ratingValue.value = value;
            updateRatingDisplay(value);
        });
        
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.getAttribute('data-value'));
            previewRating(value);
        });
        
        star.addEventListener('mouseout', function() {
            const value = parseInt(ratingValue.value) || 0;
            previewRating(value);
        });
    });
}

function updateRatingDisplay(value) {
    const stars = document.querySelectorAll('.rating-stars .star');
    stars.forEach((star, index) => {
        if (index < value) {
            star.textContent = '★';
            star.style.color = '#ff385c';
        } else {
            star.textContent = '☆';
            star.style.color = '#ccc';
        }
    });
}

function previewRating(value) {
    const stars = document.querySelectorAll('.rating-stars .star');
    stars.forEach((star, index) => {
        if (index < value) {
            star.textContent = '★';
            star.style.color = '#ffed4a';
        } else {
            star.textContent = '☆';
            star.style.color = '#f0f0f0';
        }
    });
}

function resetRatingStars() {
    updateRatingDisplay(0);
}

function initReviewFilters() {
    const typeFilter = document.getElementById('review-type');
    const sortFilter = document.getElementById('review-sort');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterReviews);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterReviews);
    }
}

function filterReviews() {
    const typeFilter = document.getElementById('review-type').value;
    const sortFilter = document.getElementById('review-sort').value;
    const reviewsContainer = document.getElementById('reviews-container');
    
    if (!reviewsContainer) return;
    
    // Get all review cards
    const reviewCards = Array.from(reviewsContainer.querySelectorAll('.review-card'));
    
    // Filter by type
    const filteredCards = reviewCards.filter(card => {
        if (typeFilter === 'all') return true;
        const cardType = card.getAttribute('data-type') || '';
        return cardType === typeFilter;
    });
    
    // Sort reviews
    const sortedCards = filteredCards.sort((a, b) => {
        if (sortFilter === 'newest') return -1; // Keep original order (newest first in our sample)
        if (sortFilter === 'oldest') return 1;  // Reverse order
        if (sortFilter === 'rating') {
            // Count filled stars (★) for more accurate rating comparison
            const ratingA = (a.querySelector('.review-rating').textContent.match(/★/g) || []).length;
            const ratingB = (b.querySelector('.review-rating').textContent.match(/★/g) || []).length;
            return ratingB - ratingA;
        }
        return 0;
    });
    
    // Hide all cards first, then show filtered ones
    reviewCards.forEach(card => card.style.display = 'none');
    sortedCards.forEach(card => card.style.display = '');
}

function loadSampleReviews() {
    // In a real application, this would fetch from an API
    // For now, we already have sample reviews in the HTML
    console.log('Sample reviews loaded');
}

function submitReview() {
    // Get form values
    const reviewerName = document.getElementById('reviewer-name').value.trim();
    const reviewType = document.getElementById('review-type-input').value;
    const reviewTitle = document.getElementById('review-title').value.trim();
    const ratingValue = document.getElementById('rating-value').value;
    const reviewContent = document.getElementById('review-content').value.trim();
    const reviewTags = document.getElementById('review-tags').value.trim();
    
    // Basic validation
    if (!reviewerName || !reviewType || !reviewTitle || !ratingValue || !reviewContent) {
        showNotification('请填写所有必填字段', 'error');
        return;
    }
    
    // Input length validation (defence in depth)
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
    
    if (parseInt(ratingValue) < 1 || parseInt(ratingValue) > 5) {
        showNotification('请选择有效的评分', 'error');
        return;
    }
    
    // Create new review card
    const newReview = createReviewCard({
        name: reviewerName,
        type: reviewType,
        title: reviewTitle,
        rating: parseInt(ratingValue),
        content: reviewContent,
        tags: reviewTags,
        date: new Date().toLocaleDateString('zh-CN')
    });
    
    // Add to container
    const reviewsContainer = document.getElementById('reviews-container');
    if (reviewsContainer) {
        // Add to beginning to show newest first
        reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
        
        // Hide modal
        const modal = document.getElementById('review-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Reset form
        document.getElementById('review-form').reset();
        resetRatingStars();
        
        showNotification('评论发布成功！', 'success');
        
        // Re-filter to maintain current filter/sort settings
        filterReviews();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createReviewCard(data) {
    // Create review card element
    const card = document.createElement('div');
    card.className = 'review-card';
    card.setAttribute('data-type', data.type || 'other');
    
    // Format tags
    const tagsArray = data.tags ? data.tags.split(' ').filter(tag => tag.trim() !== '') : [];
    const tagsHtml = tagsArray.map(tag => {
        // Ensure tag starts with #
        const cleanTag = tag.startsWith('#') ? tag : '#' + tag;
        return `<span class="tag">${escapeHtml(cleanTag)}</span>`;
    }).join('');
    
    // Validate rating is a safe integer 1-5
    const safeRating = Math.max(1, Math.min(5, Math.floor(data.rating) || 0));
    
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


// Notification system
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 0.95rem;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
        min-width: 250px;
        text-align: center;
    `;
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#dcfce7';
        notification.style.color = '#166534';
        notification.style.border = '1px solid #bbf7d0';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#fee2e2';
        notification.style.color = '#991b1b';
        notification.style.border = '1px solid #fecaca';
    } else { // info
        notification.style.backgroundColor = '#dbeafe';
        notification.style.color = '#1e40af';
        notification.style.border = '1px solid #bfdbfe';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);