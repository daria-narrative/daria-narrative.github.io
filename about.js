document.addEventListener('DOMContentLoaded', () => {
  // Мобільне меню
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

  // Кнопка "Вгору"
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
