// Main JavaScript file for G318 Travel Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('318旅行网站已加载');
    
    // Initialize button interactions
    initButtonInteractions();
    initPhotoGallery();
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
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
    
    // Create placeholder based on type
    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';
    
    let icon, title, description;
    
    switch(type) {
        case 'scenery':
            icon = '🏔️';
            title = '沿途风景照片';
            description = '这里将展示川藏线沿途的壮丽风景，包括雪山、湖泊、草原和森林等自然景观。';
            break;
        case 'accommodation':
            icon = '🏨';
            title = '住宿民宿照片';
            description = '这里将展示沿途特色客栈、酒店和民宿的环境和设施。';
            break;
        case 'food':
            icon = '🍜';
            title = '地方美食照片';
            description = '这里将展示藏餐、川菜和途经各地的特色小吃和美食。';
            break;
        case 'culture':
            icon = '🎭';
            title = '民俗文化照片';
            description = '这里将展示藏传佛教寺庙、节日庆典和当地民俗文化活动。';
            break;
        default:
            icon = '🖼️';
            title = '照片展览';
            description = '点击上面的按钮查看不同类型的照片。';
    }
    
    placeholder.innerHTML = `
        <div class="placeholder-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${description}</p>
        <p class="photo-note">* 实际网站将在此处展示高质量的实拍照片</p>
    `;
    
    container.appendChild(placeholder);
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