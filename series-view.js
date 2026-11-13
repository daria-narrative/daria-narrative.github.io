document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобільне меню
  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', () => {
      navOverlay.classList.add('active');
    });
  }

  if (closeMenu && navOverlay) {
    closeMenu.addEventListener('click', () => {
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

  // 3. Лайтбокс (перегляд фотографій у великому вікні зі стрілками)
  const images = document.querySelectorAll('.photo-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  const imageSrcs = Array.from(images).map(img => img.src);

  function showImage(index) {
    if (lightboxImg && imageSrcs[index]) {
      lightboxImg.src = imageSrcs[index];
      currentIndex = index;
    }
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightbox.classList.add('active');
        showImage(index);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + imageSrcs.length) % imageSrcs.length;
      showImage(currentIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % imageSrcs.length;
      showImage(currentIndex);
    });
  }

  // Закриття лайтбокса при кліку на темний фон навколо фото
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
});
