document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR SCROLL EFFECT ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            header.classList.remove('header-transparent');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.add('header-transparent');
        }
    });

    // --- 2. SMOOTH SCROLLING & MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Tutup menu mobile setelah klik
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        });
    });

    // --- 3. PRODUCT CARD 3D TILT EFFECT ---
    VanillaTilt.init(document.querySelectorAll(".product-card-featured"), {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        perspective: 1000,
    });

    // --- 4. PURCHASE MODAL & ADD TO CART ---
    const modal = document.getElementById('purchaseModal');
    const buyButtons = document.querySelectorAll('.buy-button');
    const closeButton = document.querySelector('.close-button');
    const modalProductName = document.getElementById('modalProductName');

    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card-featured').getAttribute('data-product-name');
            
            modalProductName.textContent = `Produk: ${productName}`;
            modal.style.display = 'block';

            button.textContent = '✓ Added!';
            button.classList.add('primary');
            setTimeout(() => {
                button.textContent = 'Beli Sekarang';
            }, 2000);
        });
    });

    closeButton.addEventListener('click', () => modal.style.display = 'none');
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- 5. GALLERY LIGHTBOX ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt;
        });
    });

    closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
    
    window.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});