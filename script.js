document.addEventListener('DOMContentLoaded', function () {

  // ══════════════════════════════════════════
  // VIDEO PLAYER — YouTube embed
  // BUG FIX: original used C:\Users\... local paths (broken everywhere)
  // Now uses YouTube IDs from data-video attribute
  // ══════════════════════════════════════════
  const videoItems   = document.querySelectorAll('.video-item');
  const ytFrame      = document.getElementById('ytFrame');
  const mainTitle    = document.getElementById('mainTitle');
  const preview      = document.getElementById('videoPreview');
  const youtubeEmbed = document.getElementById('youtubeEmbed');
  const mainThumb    = document.getElementById('mainThumb');

  // Click on thumbnail preview → load YouTube embed
  if (preview) {
    preview.addEventListener('click', function () {
      const activeItem = document.querySelector('.video-item.active');
      const videoId    = activeItem ? activeItem.getAttribute('data-video') : null;
      if (!videoId || !ytFrame) return;

      ytFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      preview.style.display      = 'none';
      youtubeEmbed.style.display = 'block';
    });
  }

  // Click video list item
  videoItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Remove active from previous
      const prevActive = document.querySelector('.video-item.active');
      if (prevActive) prevActive.classList.remove('active');
      item.classList.add('active');

      const videoId = item.getAttribute('data-video');
      const title   = item.getAttribute('data-title');
      const thumb   = item.querySelector('img') ? item.querySelector('img').src : '';

      // Update title
      if (mainTitle) mainTitle.textContent = title || '';

      // Reset to thumbnail preview
      if (mainThumb) mainThumb.src = thumb;
      if (ytFrame)   ytFrame.src   = '';

      if (preview)       preview.style.display      = 'block';
      if (youtubeEmbed)  youtubeEmbed.style.display = 'none';
    });
  });

  // ══════════════════════════════════════════
  // HAMBURGER MENU
  // BUG FIX: original used wrong selectors (button, .menu)
  // ══════════════════════════════════════════
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close when a menu item is clicked
    mobileMenu.querySelectorAll('li').forEach(function (li) {
      li.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!hamburger || !mobileMenu) return;
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger && mobileMenu) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  // ══════════════════════════════════════════
  // STICKY HEADER SHADOW on SCROLL
  // ══════════════════════════════════════════
  const header = document.querySelector('.header-wrapper');
  window.addEventListener('scroll', function () {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 5
      ? '0 4px 18px rgba(0,0,0,0.22)'
      : 'none';
  }, { passive: true });

  // ══════════════════════════════════════════
  // NEWS CARD HOVER — subtle lift animation
  // ══════════════════════════════════════════
  document.querySelectorAll('.news-item, .news-item2, .feature-news, .feature-news2')
    .forEach(function (card) {
      card.style.transition = 'transform 0.2s ease';
      card.addEventListener('mouseenter', function () { card.style.transform = 'translateY(-2px)'; });
      card.addEventListener('mouseleave', function () { card.style.transform = 'translateY(0)'; });
    });

  // ══════════════════════════════════════════
  // READ MORE BUTTONS — show toast
  // ══════════════════════════════════════════
  document.querySelectorAll('.booking-btn2').forEach(function (btn) {
    btn.addEventListener('click', function () { showToast('Loading more...'); });
  });

  // ══════════════════════════════════════════
  // WATCH LIVE BUTTON
  // ══════════════════════════════════════════
  const watchLiveBtn = document.querySelector('.booking-btn');
  if (watchLiveBtn) {
    watchLiveBtn.addEventListener('click', function () {
      window.open('https://www.youtube.com/@ThanthiTV/live', '_blank');
    });
  }

  // ══════════════════════════════════════════
  // TOAST NOTIFICATION
  // ══════════════════════════════════════════
  function showToast(msg) {
    let toast = document.getElementById('ttv-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ttv-toast';
      toast.style.cssText =
        'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(10px);' +
        'background:#2d388a;color:#fff;padding:10px 24px;border-radius:50px;' +
        'font-size:0.85rem;font-weight:700;z-index:9999;opacity:0;transition:all 0.35s;' +
        'white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,0.22);';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
    }, 2500);
  }

});
