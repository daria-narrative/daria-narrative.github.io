  
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. МОБІЛЬНЕ МЕНЮ
  // ==========================================

  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (menuToggle && navOverlay) {

    menuToggle.addEventListener('click', () => {
      navOverlay.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    });

  }

  if (closeMenu && navOverlay) {

    closeMenu.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });

  }

  // ==========================================
  // 2. ЗАКРИТТЯ МЕНЮ ПІСЛЯ ПЕРЕХОДУ
  // ==========================================

  if (navOverlay) {

    const navLinks = navOverlay.querySelectorAll('a');

    navLinks.forEach(link => {

      link.addEventListener('click', () => {
        navOverlay.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
      });

    });

  }

  // ==========================================
  // 3. КНОПКА ПОВЕРНЕННЯ НАГОРУ
  // ==========================================

  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {

    scrollTopBtn.addEventListener('click', () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }

  // ==========================================
  // 4. FAQ — АКОРДЕОН
  // ==========================================

  const faqItems = document.querySelectorAll(
    '.conditions-section .faq-item'
  );

  function setFAQState(item, isOpen) {

    const title = item.querySelector('.faq-title');
    const answer = item.querySelector('.faq-text');
    const icon = title?.querySelector('i');

    item.classList.toggle('active', isOpen);

    if (title) {
      title.setAttribute('aria-expanded', String(isOpen));
    }

    if (answer) {
      answer.setAttribute('aria-hidden', String(!isOpen));
    }

    if (icon) {
      icon.classList.toggle('fa-plus', !isOpen);
      icon.classList.toggle('fa-minus', isOpen);
    }

  }

  function closeAllFAQ() {

    faqItems.forEach(item => {
      setFAQState(item, false);
    });

  }

  faqItems.forEach(item => {

    const title = item.querySelector('.faq-title');
    const answer = item.querySelector('.faq-text');

    if (!title || !answer) return;

    setFAQState(item, false);

    function toggleFAQ() {

      const isCurrentlyOpen = item.classList.contains('active');

      closeAllFAQ();

      if (!isCurrentlyOpen) {
        setFAQState(item, true);
      }

    }

    title.addEventListener('click', toggleFAQ);

    title.addEventListener('keydown', event => {

      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {

        event.preventDefault();
        toggleFAQ();

      }

    });

  });

  // ==========================================
  // 5. BEFORE / AFTER — НОВИЙ ПОВЗУНОК
  // ==========================================

  const comparisonSliders = document.querySelectorAll(
    '[data-before-after]'
  );

  comparisonSliders.forEach(slider => {

    const range = slider.querySelector(
      '.before-after__range'
    );

    if (!range) return;

    let isDragging = false;
    let activePointerId = null;

    // ПОЧАТКОВЕ ПОЛОЖЕННЯ — 85%

    range.value = 85;

    // ОНОВЛЕННЯ ПОЗИЦІЇ

    function updateSlider() {

      const position = Number(range.value);

      slider.style.setProperty(
        '--position',
        `${position}%`
      );

      range.setAttribute('aria-valuenow', position);

    }

    // ПЕРЕМІЩЕННЯ ПОВЗУНКА

    function moveSlider(event) {

      const rect = slider.getBoundingClientRect();

      if (!rect.width) return;

      const position =
        ((event.clientX - rect.left) / rect.width) * 100;

      const limitedPosition = Math.max(
        0,
        Math.min(100, position)
      );

      range.value = limitedPosition;

      updateSlider();

    }

    // ЗМІНА ЧЕРЕЗ RANGE

    range.addEventListener('input', updateSlider);

    // ПОЧАТОК ПЕРЕТЯГУВАННЯ

    slider.addEventListener('pointerdown', event => {

      if (
        event.pointerType === 'mouse' &&
        event.button !== 0
      ) {
        return;
      }

      isDragging = true;
      activePointerId = event.pointerId;

      slider.setPointerCapture(event.pointerId);

      moveSlider(event);

    });

    // ПЕРЕМІЩЕННЯ ПАЛЬЦЕМ АБО МИШКОЮ

    slider.addEventListener('pointermove', event => {

      if (
        !isDragging ||
        event.pointerId !== activePointerId
      ) {
        return;
      }

      moveSlider(event);

    });

    // ЗАВЕРШЕННЯ ПЕРЕТЯГУВАННЯ

    function stopDragging(event) {

      if (event.pointerId !== activePointerId) return;

      isDragging = false;

      if (slider.hasPointerCapture(event.pointerId)) {
        slider.releasePointerCapture(event.pointerId);
      }

      activePointerId = null;

    }

    slider.addEventListener('pointerup', stopDragging);

    slider.addEventListener('pointercancel', stopDragging);

    slider.addEventListener('lostpointercapture', () => {
      isDragging = false;
      activePointerId = null;
    });

    // ПОЧАТКОВЕ НАЛАШТУВАННЯ

    updateSlider();

  });

  // ==========================================
  // 6. КІНЕЦЬ JAVASCRIPT
  // ==========================================

});