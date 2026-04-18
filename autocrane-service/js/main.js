document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
        const isActive = mainNav.classList.toggle('active');
        this.innerHTML = isActive 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        this.setAttribute('aria-expanded', isActive);
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
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
});


// Маска для телефона
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    if (phoneInputs.length === 0) return;
    
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
