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
    
    if (plannerButtons.length > 0 && routeDisplay) {
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
        
        // Set first button as active by default
        if (plannerButtons[0]) {
            plannerButtons[0].classList.add('active');
            updateRouteDisplay('8', routeDisplay);
        }
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
                        <h4>雅拉雪山</h4>
                        <p>海拔7294米，终年雪山，是川藏线最著名的雪山景观之一。最佳观赏时间：4-6月，上午时分云雾较少。</p>
                        <p class="tip">小贴士：可在察瓦龙镇观景台俯瞰全貌，注意防晒和保暖。</p>
                    </div>
                    <div class="scenery-item">
                        <h4>然乌湖</h4>
                        <p>被誉为“人间仙湖”，湖水澄澈如镜，倒映着雪山和森林。最佳旅游季节：5-10月。</p>
                        <p class="tip">小贴士：湖边有藏民家访体验，可尝试奶酪和青稞酒。</p>
                    </div>
                    <div class="scenery-item">
                        <h4>巴松措</h4>
                        <p>“神湖”之美，湖光山色相映成趣，四季景色各异。春季杜鹃花开尤为壮观。</p>
                        <p class="tip">小贴士：环湖步行约2小时，沿途有多个观景点可拍摄倒影。</p>
                    </div>
                    <div class="scenery-item">
                        <h4>72拐</h4>
                        <p>海拔4000多米的蜿蜒山路，共有72个弯道，是川藏线上最具挑战的路段之一。</p>
                        <p class="tip">小贴士：上坡时使用低挡，下坡时靠边行驶，注意迎车。</p>
                    </div>
                    <div class="scenery-item">
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
                        <h4>林芝希尔顿逸林酒店</h4>
                        <p>⭐⭐⭐⭐⭐ | 林芝市区 | 约¥400-600/晚</p>
                        <p>提供氧气袋和高原反应药品，早餐包含藏式馕和甜茶。</p>
                        <p class="tip">适合：首次进藏需要缓冲的游客</p>
                    </div>
                    <div class="accommodation-item">
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
                        <h4>石锅鸡（巴松措特色）</h4>
                        <p>用当地石锅慢炖的鸡肉汤，加入木耳、香菇和 Highland barley。</p>
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
                        <h4>藏式婚礼 customs</h4>
                        <p>若遇婚礼迎亲队伍，会看到新娘戴着凤冠霞帔，骑着装饰的马。</p>
                        <p class="tip">尊重观看：保持距离不要围观太近，可拍远景但不建议近距离拍摄新娘。</p>
                    </div>
                    <div class="culture-item">
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
                        <h4>第1天：成都 → 川主寺 → 岷山口</h4>
                        <p>行程：约220公里，沿途观看岷山雪山，下午到达川主寺镇。</p>
                        <p class="tip">住宿建议：川主寺镇客栈，体验藏家小院。</p>
                    </div>
                    <div class="route-day">
                        <h4>第2天：川主寺 → 丹巴县城</h4>
                        <p>行程：约180公里，途经四姑娘山观景点， afternoon arrive at Danba.</p>
                        <p class="tip">必看：丹巴甲居藏寨，全国著名的藏寨群落。</p>
                    </div>
                    <div class="route-day">
                        <h4>第3天：丹巴 → 新都桥</h4>
                        <p>行程：约140公里，途经墨石公园和雅江河谷，到达“摄影师的天堂”新都桥。</p>
                        <p class="tip">推荐：在新都桥镇拍摄夕阳下的圣光山和农家小院。</p>
                    </div>
                    <div class="route-day">
                        <h4>第4天：新都桥 → 泸定 → 岚皋山</h4>
                        <p>行程：约190公里，过泸定桥后翻越岚皋山（4298米），进入康ding地区。</p>
                        <p class="tip">注意：岚皋山是川藏线上的第一座高山垭口，做好防晒保暖。</p>
                    </div>
                    <div class="route-day">
                        <h4>第5天：康定 → 新路海 → 札达</h4>
                        <p>行程：约210公里，穿越折多山（4298米）和札拉山（4500多米），到达札达县。</p>
                        <p class="tip">景观：沿途可见雪山、峡谷和高原草原交替的壮丽景色。</p>
                    </div>
                    <div class="route-day">
                        <h4>第6天：札达 → 然乌湖 → 波密</h4>
                        <p>行程：约180公里，途经东达山口（4700米）后下山到然乌湖，继续前往波密。</p>
                        <p class="tip">重点：然乌湖被誉为“人间仙湖”，湖水澄澈如镜。</p>
                    </div>
                    <div class="route-day">
                        <h4>第7天：波密 → 八一 → 林芝</h4>
                        <p>行程：约140公里，沿尼洋河谷前行，观察森林覆盖率明显增加。</p>
                        <p class="tip": "体验：林芝被称为‘江南的西藏’，空气湿度大，植被丰富。</p>
                    </div>
                    <div class="route-day">
                        <h4>第8天：林芝 → 拉萨</h4>
                        <p>行程：约400公里（可选择飞缩时间），途经雅鲁藏布江大峡谷观景点。</p>
                        <p class="tip": "终点：抵达圣城拉萨，结束川南段旅程，可继续北进或返回。</p>
                    </div>
                </div>
            `;
            break;
        case '10':
            title = '10天深度路线';
            itemsHtml = `
                <div class="route-grid">
                    <div class="route-day">
                        <h4>第1天：成都 → 汶川 → 松潘</h4>
                        <p>行程：约160公里，途经汶川特殊教育学校纪念馆，到达松潘古城。</p>
                        <p class="tip">文化：松潘是古代茶马古道重镇，保存有明代城墙。</p>
                    </div>
                    <div class="route-day">
                        <h4>第2天：松潘 → 黄龙 → 川主寺</h4>
                        <p>行程：约200公里，早上游览黄龙风景区（世界自然遗产），下午至川主寺。</p>
                        <p class="tip">安排：黄龙建议早上去，下午云雾少景色佳。</p>
                    </div>
                    <div class="route-day">
                        <h4>第3天：川主寺 → 甲居藏寨 → 鲁甸</h4>
                        <p>行程：约150公里，上午游览丹巴甲居藏寨，下午前往鲁甸县。</p>
                        <p class="tip">深度：在甲居藏寨可安排藏家访问和酥油茶体验。</p>
                    </div>
                    <div class="route-day">
                        <h4>第4天：鲁甸 → 新都桥 → 理塘</h4>
                        <p>行程：约220公里，途经墨石公园、雅江河谷和兔儿山（4576米）。</p>
                        <p class="tip">过渡：理塘是藏区重要交通站点，海拔4014米。</p>
                    </div>
                    <div class="route-day">
                        <h4>第5天：理塘 → 稻城 → 亚丁</h4>
                        <p>行程：约150公里，途经雪山草原，下午到达稻城县，准备次日游亚丁。</p>
                        <p class="tip">准备：亚丁景区需提前购票，建议租电动车环游。</p>
                    </div>
                    <div class="route-day">
                        <h4>第6天：亚丁景区游览日</h4>
                        <p>全日游览亚丁自然保护区：牛奶海、五色海、珍珠海和仙乃日神山。</p>
                        <p class="tip">体验：建议雇佣向导，全程约8小时徒步或电动车。</p>
                    </div>
                    <div class="route-day">
                        <h4>第7天：稻城 → 香格里拉镇 → 藏王树</h4>
                        <p>行程：约180公里，经央迈隆山口（4700多米）到达香格里拉镇。</p>
                        <p class="tip">景观：途经梅里雪山 الوطنية公园观景点，远眺卡瓦格博峰。</p>
                    </div>
                    <div class="route-day">
                        <h4>第8天：香格里拉镇 → 芒康 → 左贡</h4>
                        <p>行程：约220公里，途经澜沧江（ Mekong River）大峡谷。</p>
                        <p class="tip": "奇观：澜沧江峡谷深度超过千米，被称为‘东方大峡谷’。</p>
                    </div>
                    <div class="route-day">
                        <h4>第9天：左贡 → 邦达草原 → 然乌湖</h4>
                        <p>行程：约200公里，早上经左贡县后穿越邦达草原，下午到然乌湖。</p>
                        <p class="tip">体验：邦达草原是典型的高原草原，可骑马或观赏牦牛群。</p>
                    </div>
                    <div class="route-day">
                        <h4>第10天：然乌湖 → 波密 → 八一 → 林芝</h4>
                        <p>行程：约180公里，早上欣赏然乌湖晨雾，下午返回林芝准备返程。</p>
                        <p class="tip": "返程：林芝有机场可飞返成都，亦可继续原路返回。</p>
                    </div>
                </div>
            `;
            break;
        case '15':
            title = '15天全程路线';
            itemsHtml = `
                <div class="route-grid">
                    <div class="route-day">
                        <h4>第1-2天：成都 → 喇叭沟门 → 鲁甸（经四姑娘山）</h4>
                        <p>行程：约300公里，深度游览四姑娘山景区（爬二峰或观光大巴）后经卧龙至鲁甸。</p>
                        <p class="tip">安排：建议在四姑娘山住一晚，第二天早上继续西行。</p>
                    </div>
                    <div class="route-day">
                        <h4>第3天：鲁甸 → 新都桥 → 理塘</h4>
                        <p>行程：约220公里，途经雅江河谷观光和兔儿山翻越。</p>
                        <p class="tip">过渡：理塘海拔4014米，是重要的藏区聚集地。</p>
                    </div>
                    <div class="route-day">
                        <h4>第4天：理塘 → 稻城 → 亚丁（全日游览）</h4>
                        <p>行程：约150公里到稻城，第二天全日游览亚丁自然保护区。</p>
                        <p class="tip">深度：亚丁建议住两天，充分体验“最后香格里拉”的自然之美。</p>
                    </div>
                    <div class="route-day">
                        <h4>第5天：亚丁 → 香格里拉镇 → 盐井</h4>
                        <p>行程：约200公里，途经央迈隆山口和镇巴古猫桥，下午到盐井乡。</p>
                        <p class="tip">文化：盐井乡保存有古老的盐井和红军长征纪念地。</p>
                    </div>
                    <div class="route-day">
                        <h4>第6天：盐井 → 芒康 → 左贡</h4>
                        <p>行程：约180公里，途经京昆高原和丁青草原，下午到左贡县。</p>
                        <p class="tip">准备：左贡后道路条件变好，但海拔仍在4000米以上。</p>
                    </div>
                    <div class="route-day">
                        <h4>第7天：左贡 → 邦达草原 → 然乌湖 → 波密</h4>
                        <p>行程：约220公里，早上经左贡后穿越邦达草原，下午到然乌湖继续至波密。</p>
                        <p class="tip">景观：然乌湖四周雪山环抱，是摄影爱好者的天堂。</p>
                    </div>
                    <div class="route-day">
                        <h4>第8天：波密 → 八一 → 林芝（林芝桃花沟）</h4>
                        <p>行程：约140公里，早上游览林芝桃花沟（3-4月最佳），下午自由活动。</p>
                        <p class="tip">体验：林芝除了桃花，还有雁鸣湖和雅鲁藏布江大峡谷观景点。</p>
                    </div>
                    <div class="route-day">
                        <h4>第9天：林芝 → 邦林 → 珠峰大本营方向（观景）</h4>
                        <p>行程：约200公里，途经八一镇后前往珠峰大本营方向（可观海拔5200米观景点）。</p>
                        <p class="tip">观看：若天气晴好，可远眺珠峰主峰（8848米），注意防晒和高原反应。</p>
                    </div>
                    <div class="route-day">
                        <h4>第10天：珠峰方向 → 然乌湖 → 左贡</h4>
                        <p>行程：约250公里，从珠峰方向返回然乌湖后经邦达草原到左贡。</p>
                        <p class="tip">休息：建议在然乌湖或左贡住宿，缓解高原反应后继续。</p>
                    </div>
                    <div class="route-day">
                        <h4>第11天：左贡 → 芒康 → 康定</h4>
                        <p>行程：约220公里，左贡后经芒康返回康定，途经澜沧江大峡谷。</p>
                        <p class="tip">过渡：康定是重要的交通枢纽，可补充物资和维修车辆。</p>
                    </div>
                    <div class="route-day">
                        <h4>第12天：康定 → 马尔康 → 岷山风景区</h4>
                        <p>行程：约260公里，途经泸定桥后经雅江 valley 向北至马尔康。</p>
                        <p class="tip">文化：马尔康是藏羌聚集地，可体验羌族文化和藏传佛教寺庙。</p>
                    </div>
                    <div class="route-day">
                        <h4>第13天：马尔康 → 金川 → 小金县</h4>
                        <p>行程：约180公里，途经甲居藏寨（返回）后经雅江北段到小金县。</p>
                        <p class="tip">返程：此时已基本返回熟悉路线，可放慢速度欣赏返程景色。</p>
                    </div>
                    <div class="route-day">
                        <h4>第14天：小金县 → 四姑娘山 → 汶川</h4>
                        <p>行程：约150公里，途经小金县后折返四姑娘山景区，下午至汶川。</p>
                        <p class="tip">景观：返程再次欣赏四姑娘山，可选择不同角度或徒步路线。</p>
                    </div>
                    <div class="route-day">
                        <h4>第15天：汶川 → 成都（结束旅程）</h4>
                        <p>行程：约160公里，途经汶川特殊教育学校纪念馆后返回成都。</p>
                        <p class="tip": "结束：完整的川藏线南线自驾旅程结束，返程可选择高速或国道。</p>
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
            name: "雅拉雪山",
            lat: 29.8476,
            lng: 90.1652,
            description: "海拔7294米，终年雪山，是川藏线最著名的雪山景观之一。",
            elevation: "7294米",
            bestTime: "4-6月"
        },
        {
            name: "然乌湖",
            lat: 29.3063,
            lng: 95.9038,
            description: "被誉为“人间仙湖”，湖水澄澈如镜，倒映着雪山和森林。",
            elevation: "3800米",
            bestTime: "5-10月"
        },
        {
            name: "巴松措",
            lat: 29.1632,
            lng: 95.0887,
            description: "“神湖”之美，湖光山色相映成趣，四季景色各异。春季杜鹃花开尤为壮观。",
            elevation: "3538米",
            bestTime: "3-5月（杜鹃花季）"
        },
        {
            name: "72拐",
            lat: 30.0074,
            lng: 90.0574,
            description: "海拔4000多米的蜿蜒山路，共有72个弯道，是川藏线上最具挑战的路段之一。",
            elevation: "4000+米",
            bestTime: "全年（注意天气）"
        },
        {
            name: "米堆冰川",
            lat: 28.9552,
            lng: 98.7933,
            description: "中国最低海拔现代冰川，冰川下方有原始森林，形成独特的‘冰川森林’景观。",
            elevation: "2400米",
            bestTime: "10-次年4月"
        },
        {
            name: "鲁朗林海",
            lat: 29.5653,
            lng: 94.4411,
            description: "被誉为‘江南的西藏’，森林覆盖率高，空气湿润，四季如春。",
            elevation: "3400米",
            bestTime: "3-10月"
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
                <h4>${spot.name}</h4>
                <p><strong>描述：</strong>${spot.description}</p>
                <p><strong>海拔：</strong>${spot.elevation}</p>
                <p><strong>最佳季节：</strong>${spot.bestTime}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });
    
    // Add a polyline for the G318 route (simplified)
    const g318Route = [
        [30.5728, 104.0668], // 成都
        [30.2734, 102.3211], // 泸定
        [29.5771, 94.3589],  // 林芝
        [29.6543, 91.1174],  // 拉萨
    ];
    
    L.polyline(g318Route, {color: '#ff385c', weight: 4, opacity: 0.8}).addTo(map)
        .bindLink('<a href="#">查看详细路线</a>');
    
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
        // In a real implementation, we'd check data attributes on the card
        // For now, we'll show all since we're using sample data
        return true;
    });
    
    // Sort reviews
    const sortedCards = filteredCards.sort((a, b) => {
        if (sortFilter === 'newest') return -1; // Keep original order (newest first in our sample)
        if (sortFilter === 'oldest') return 1;  // Reverse order
        if (sortFilter === 'rating') {
            // Extract rating from card (simplified)
            const ratingA = a.querySelector('.review-rating').textContent.length;
            const ratingB = b.querySelector('.review-rating').textContent.length;
            return ratingB - ratingA;
        }
        return 0;
    });
    
    // Clear and re-add filtered/sorted cards
    reviewsContainer.innerHTML = '';
    sortedCards.forEach(card => reviewsContainer.appendChild(card));
}

function loadSampleReviews() {
    // In a real application, this would fetch from an API
    // For now, we already have sample reviews in the HTML
    console.log('Sample reviews loaded');
}

function submitReview() {
    // Get form values
    const reviewerName = document.getElementById('reviewer-name').value.trim();
    const reviewType = document.getElementById('review-type').value;
    const reviewTitle = document.getElementById('review-title').value.trim();
    const ratingValue = document.getElementById('rating-value').value;
    const reviewContent = document.getElementById('review-content').value.trim();
    const reviewTags = document.getElementById('review-tags').value.trim();
    
    // Basic validation
    if (!reviewerName || !reviewType || !reviewTitle || !ratingValue || !reviewContent) {
        showNotification('请填写所有必填字段', 'error');
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

function createReviewCard(data) {
    // Create review card element
    const card = document.createElement('div');
    card.className = 'review-card';
    
    // Format tags
    const tagsArray = data.tags ? data.tags.split(' ').filter(tag => tag.trim() !== '') : [];
    const tagsHtml = tagsArray.map(tag => {
        // Ensure tag starts with #
        const cleanTag = tag.startsWith('#') ? tag : '#' + tag;
        return `<span class="tag">${cleanTag}</span>`;
    }).join('');
    
    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">${data.name.charAt(0)}</div>
                <div class="reviewer-name">${data.name}</div>
                <div class="review-date">${data.date}</div>
            </div>
            <div class="review-rating">
                ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}
            </div>
        </div>
        <div class="review-content">
            <h4>${data.title}</h4>
            <p>${data.content}</p>
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