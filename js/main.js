document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Валидация
            if (!data.name || !data.phone) {
                showNotification('Пожалуйста, заполните имя и телефон', 'error');
                return;
            }
            
            try {
                // В реальном проекте здесь будет отправка на сервер
                // Например: await fetch('/send-email', { method: 'POST', body: formData });
                
                // Имитация отправки
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showNotification('Заявка отправлена! Я скоро вам перезвоню.', 'success');
                this.reset();
                
            } catch (error) {
                showNotification('Ошибка отправки. Позвоните мне напрямую.', 'error');
            }
        });
    }
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.service-card, .equipment-card').forEach(el => {
        observer.observe(el);
    });
    
    // Инициализация даты в форме
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#34a853' : '#ea4335'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Маска для телефона
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+7 (' + value;
                
                if (value.length > 7) {
                    value = value.substring(0, 7) + ') ' + value.substring(7);
                }
                if (value.length > 12) {
                    value = value.substring(0, 12) + '-' + value.substring(12);
                }
                if (value.length > 15) {
                    value = value.substring(0, 15) + '-' + value.substring(15);
                }
                if (value.length > 18) {
                    value = value.substring(0, 18);
                }
            }
            
            this.value = value;
        });
    });
}

// Обновление года в подвале
document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
});

// Простое увеличение картинки по клику
document.querySelectorAll('.service-image img, .about-image img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
        // Создаем копию изображения во весь экран
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: zoom-out;
        `;
        
        const enlargedImg = document.createElement('img');
        enlargedImg.src = this.src;
        enlargedImg.alt = this.alt;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            object-fit: contain;
            animation: zoomIn 0.3s ease-out;
        `;
        
        // Создаем стили для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes zoomIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        // Закрытие при клике
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        });
        
        // Закрытие на Escape
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(overlay);
                document.head.removeChild(style);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    });
});

// Инициализация при загрузке
initPhoneMask();