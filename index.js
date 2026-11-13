document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. МОБІЛЬНЕ МЕНЮ
  ========================================== */

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


  /* ==========================================
     2. ГОЛОВНИЙ СЛАЙДЕР
  ========================================== */

  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const counter = document.getElementById('slideCounter');

  if (slides.length > 0) {

    let currentIndex = 0;
    let slideInterval;

    function updateSlider(index) {

      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
          slide.style.zIndex = '2';
          slide.style.pointerEvents = 'auto'; // Кліки активні лише на поточному слайді
        } else {
          slide.classList.remove('active');
          slide.style.zIndex = '1';
          slide.style.pointerEvents = 'none'; // Неактивні слайди пропускають кліки
        }
      });

      if (counter) {
        counter.textContent = `${index + 1} / ${slides.length}`;
      }

    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider(currentIndex);
    }

    function prevSlide() {
      currentIndex =
        (currentIndex - 1 + slides.length) % slides.length;

      updateSlider(currentIndex);
    }

    function startTimer() {
      slideInterval = setInterval(nextSlide, 3500);
    }

    function resetTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    // Ініціалізація початкового стану слайдера
    updateSlider(currentIndex);
    startTimer();

  }


  /* ==========================================
     3. КНОПКА ПОВЕРНЕННЯ НАГОРУ
  ========================================== */

  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });
  }


  /* ==========================================
     4. ВІДГУКИ — ЧИТАТИ ПОВНІСТЮ / ЗГОРНУТИ
  ========================================== */

  const reviewButtons = document.querySelectorAll('.review-toggle');

  reviewButtons.forEach(button => {

    button.addEventListener('click', () => {

      const review = button.closest('.review-item');

      if (!review) return;

      const reviewContent = review.querySelector('.review-full');

      const isExpanded = review.classList.toggle('expanded');

      button.textContent = isExpanded
        ? 'Згорнути'
        : 'Читати повністю';

      button.setAttribute('aria-expanded', String(isExpanded));

      if (reviewContent) {
        reviewContent.setAttribute('aria-hidden', String(!isExpanded));
      }

    });

  });

});
