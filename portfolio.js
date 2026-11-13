document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобільне меню (відкриття та закриття)
  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navOverlay.classList.add('active');
    });
  }

  if (closeMenu && navOverlay) {
    closeMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      navOverlay.classList.remove('active');
    });
  }

  // 2. Кнопка "Вгору"
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Лайтбокс (збільшення фото по кліку у галереї серій)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  
  const photoItems = document.querySelectorAll('.photo-item img');

  if (lightbox && lightboxImg && photoItems.length > 0) {
    let currentIndex = 0;
    const imagesSrc = Array.from(photoItems).map(img => img.src);

    photoItems.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        lightboxImg.src = imagesSrc[currentIndex];
        lightbox.classList.add('active');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % imagesSrc.length;
        lightboxImg.src = imagesSrc[currentIndex];
      });
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + imagesSrc.length) % imagesSrc.length;
        lightboxImg.src = imagesSrc[currentIndex];
      });
    }
  }
});
