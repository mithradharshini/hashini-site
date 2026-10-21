/**
 * HASHINI'S WEBSITE - INTERACTION CONTROLLER
 * Vanilla JavaScript (No frameworks, no backend, no dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure SITE_CONTENT is loaded
  if (typeof SITE_CONTENT === 'undefined') {
    console.error('SITE_CONTENT is not defined. Ensure content.js is loaded.');
    return;
  }

  /* ========================================================
     STATE MANAGEMENT & LOCAL STORAGE
     ======================================================== */
  const STORAGE_KEY = 'hashini_found_stars_v2';
  let foundStars = new Set();

  function loadSavedStars() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach(id => foundStars.add(id));
        }
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or disabled:', e);
    }
  }

  function saveFoundStars() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...foundStars]));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  /* ========================================================
     URL SHORTCUTS (?unlock=1 and ?reset=1)
     ======================================================== */
  const urlParams = new URLSearchParams(window.location.search);
  const isResetMode = urlParams.get('reset') === '1';
  const isUnlockMode = urlParams.get('unlock') === '1';

  if (isResetMode) {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.clear();
    } catch (e) {}
    foundStars.clear();
  } else if (!isUnlockMode) {
    loadSavedStars();
  } else {
    // ?unlock=1: unlock all 18 stars
    for (let i = 1; i <= 18; i++) {
      const sid = `s${String(i).padStart(2, '0')}`;
      foundStars.add(sid);
    }
  }

  /* ========================================================
     TOAST NOTIFICATION HELPER
     ======================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, isMajaaa = false) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${isMajaaa ? 'toast-majaaa' : ''}`;
    toast.innerHTML = isMajaaa 
      ? `<span>✨</span><span>${message}</span>`
      : `<span>💙</span><span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

  /* ========================================================
     SPARKLE PARTICLES EFFECT
     ======================================================== */
  function createSparkles(x, y, count = 12, color = '#F5C86B') {
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'sparkle-particle';
      spark.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 100001;
        box-shadow: 0 0 10px ${color};
        transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease;
      `;
      document.body.appendChild(spark);

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const distance = 40 + Math.random() * 55;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 750);
    }
  }

  /* ========================================================
     DESKTOP CUSTOM STAR CURSOR
     ======================================================== */
  const customCursor = document.getElementById('customCursor');
  if (customCursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, { passive: true });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('button, a, [role="button"]')) {
        customCursor.classList.add('cursor-hover-btn');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('button, a, [role="button"]')) {
        customCursor.classList.remove('cursor-hover-btn');
      }
    });
  }

  /* ========================================================
     GOLDEN BACKGROUND LIGHTS CANVAS
     Tiny glowing flowers (5-petal blossoms) & soft dots
     ======================================================== */
  const goldenCanvas = document.getElementById('goldenCanvas');
  let blossomParticles = [];
  let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initGoldenCanvas() {
    if (!goldenCanvas) return;
    const ctx = goldenCanvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      goldenCanvas.width = window.innerWidth;
      goldenCanvas.height = window.innerHeight;
      createParticles();
    }

    function createParticles() {
      blossomParticles = [];
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 18 : 42;

      for (let i = 0; i < count; i++) {
        blossomParticles.push({
          x: Math.random() * goldenCanvas.width,
          y: Math.random() * goldenCanvas.height,
          radius: 1.8 + Math.random() * 2.8,
          isFlower: i % 2 === 0, // 50% five-petal blossoms, 50% soft dots
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          opacity: 0.12 + Math.random() * 0.28,
          twinkleSpeed: 0.008 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.008
        });
      }
    }

    function drawFlower(ctx, x, y, radius, alpha, rot) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = `rgba(245, 200, 107, ${alpha})`;
      ctx.shadowColor = 'rgba(245, 200, 107, 0.4)';
      ctx.shadowBlur = 6;

      // 5-petal blossom path
      for (let p = 0; p < 5; p++) {
        ctx.save();
        ctx.rotate((p * Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.ellipse(0, radius * 1.1, radius * 0.7, radius * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Flower center
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 190, ${alpha * 1.2})`;
      ctx.fill();

      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, goldenCanvas.width, goldenCanvas.height);

      for (let i = 0; i < blossomParticles.length; i++) {
        const p = blossomParticles[i];
        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = Math.max(0.05, p.opacity + Math.sin(p.twinklePhase) * 0.1);

        if (!isReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotSpeed;

          // Wrap screen bounds
          if (p.x < -20) p.x = goldenCanvas.width + 20;
          if (p.x > goldenCanvas.width + 20) p.x = -20;
          if (p.y < -20) p.y = goldenCanvas.height + 20;
          if (p.y > goldenCanvas.height + 20) p.y = -20;
        }

        if (p.isFlower) {
          drawFlower(ctx, p.x, p.y, p.radius, currentAlpha, p.rotation);
        } else {
          // Soft golden dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 200, 107, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(245, 200, 107, 0.5)';
          ctx.shadowBlur = 8;
          ctx.fill();
        }
      }

      if (!isReducedMotion) {
        requestAnimationFrame(render);
      }
    }

    window.addEventListener('resize', resize);
    resize();
    render();
  }

  initGoldenCanvas();

  /* ========================================================
     LANDING HERO ENTER BUTTON & TRANSITION
     ======================================================== */
  const enterSiteBtn = document.getElementById('enterSiteBtn');
  const landingSection = document.getElementById('landing');
  const mainContent = document.getElementById('mainContent');

  if (enterSiteBtn) {
    enterSiteBtn.addEventListener('click', (e) => {
      createSparkles(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 20, '#9DCFFF');
      document.body.classList.remove('is-locked');

      if (landingSection) {
        landingSection.classList.add('fade-out');
        setTimeout(() => {
          landingSection.style.display = 'none';
          const museumSec = document.getElementById('museum');
          if (museumSec) {
            museumSec.scrollIntoView({ behavior: 'smooth' });
          }
        }, 600);
      }
    });
  }

  /* ========================================================
     NAVIGATION & ACTIVE SECTION OBSERVER
     ======================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (landingSection && landingSection.style.display === 'none') {
        landingSection.style.display = 'flex';
        landingSection.classList.remove('fade-out');
        document.body.classList.add('is-locked');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.dataset.section === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => navObserver.observe(sec));

  /* ========================================================
     18 HIDDEN STARS LOGIC & WORD PUZZLE TRACKER
     Solution: YOU WILL NOT BE ALONE ♡
     ======================================================== */
  const starCounterText = document.getElementById('starCounterText');
  const trackerModal = document.getElementById('trackerModal');
  const trackerBtn = document.getElementById('trackerBtn');
  const closeTrackerBtn = document.getElementById('closeTrackerBtn');
  const trackerModalBackdrop = document.getElementById('trackerModalBackdrop');
  const trackerWordSlots = document.getElementById('trackerWordSlots');
  const trackerProgressSummary = document.getElementById('trackerProgressSummary');
  const trackerProgressBarFill = document.getElementById('trackerProgressBarFill');
  const hintsToggleBtn = document.getElementById('hintsToggleBtn');
  const hintsListWrap = document.getElementById('hintsListWrap');
  const hintsList = document.getElementById('hintsList');

  /* ========================================================
     SECTION 7: THE SECRET ENDING (CALM OCEAN & THE LETTER)
     ======================================================== */
  const goldenDoorScreen = document.getElementById('goldenDoorScreen');
  const endingMessageWrap = document.getElementById('endingMessageWrap');
  const letterCardWrapper = document.getElementById('letterCardWrapper');
  const poemBody = document.getElementById('poemBody');
  const poemSignoff = document.getElementById('poemSignoff');
  const endingBackWrap = document.getElementById('endingBackWrap');
  const backToSiteBtn = document.getElementById('backToSiteBtn');
  let hasEndingTriggered = false;
  let poemAnimationTimers = [];

  function triggerEndingSequence() {
    if (hasEndingTriggered || !goldenDoorScreen) return;
    hasEndingTriggered = true;

    // Close tracker modal if open
    closeTracker();

    // Clear any active toasts so only the ending message is shown
    if (toastContainer) {
      toastContainer.innerHTML = '';
    }

    // Dismiss landing lock so screen displays cleanly
    document.body.classList.remove('is-locked');
    document.body.style.overflow = 'hidden';

    // Show ending screen with calm moonlit ocean backdrop
    goldenDoorScreen.hidden = false;
    goldenDoorScreen.style.opacity = '1';

    // Prepare message and letter states
    if (letterCardWrapper) {
      letterCardWrapper.hidden = true;
      letterCardWrapper.classList.remove('is-visible');
    }
    if (endingBackWrap) {
      endingBackWrap.hidden = true;
      endingBackWrap.classList.remove('is-visible');
    }

    // Fade in ONLY the centered message: "YOU WILL NOT BE ALONE ♡"
    if (endingMessageWrap) {
      endingMessageWrap.hidden = false;
      endingMessageWrap.classList.remove('fade-out');
      void endingMessageWrap.offsetWidth;
      endingMessageWrap.classList.add('is-visible');
    }

    createSparkles(window.innerWidth / 2, window.innerHeight / 2, 25, '#9DCFFF');

    // Keep it on screen for EXACTLY 5 seconds (5000ms)
    setTimeout(() => {
      // Fade out the 5-second message
      if (endingMessageWrap) {
        endingMessageWrap.classList.add('fade-out');
      }

      setTimeout(() => {
        if (endingMessageWrap) {
          endingMessageWrap.hidden = true;
        }

        // Fade directly into the pale-blue letter card
        if (letterCardWrapper) {
          letterCardWrapper.hidden = false;
          void letterCardWrapper.offsetWidth;
          letterCardWrapper.classList.add('is-visible');
        }

        // REQUIREMENT 3: IMMEDIATELY clear all saved star progress (localStorage)
        // so that a refresh or going back never reopens it
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem('hashini_found_stars');
        } catch (e) {
          console.warn('LocalStorage remove error:', e);
        }
        foundStars.clear();
        updateTrackerUI();

        // Render the poem line-by-line with slow gentle fades
        renderPoemLineByLine();
      }, 700); // gentle fadeout transition
    }, 5000);
  }

  function renderPoemLineByLine() {
    if (!poemBody) return;
    poemBody.innerHTML = '';
    if (poemSignoff) poemSignoff.classList.remove('is-visible');
    if (endingBackWrap) {
      endingBackWrap.hidden = true;
      endingBackWrap.classList.remove('is-visible');
    }

    // Clear any previous timers
    poemAnimationTimers.forEach(t => clearTimeout(t));
    poemAnimationTimers = [];

    const secretData = SITE_CONTENT.secretEnding || SITE_CONTENT.goldenDoor;
    const lines = (secretData && secretData.poemLines) || [];

    lines.forEach((lineText, idx) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'poem-line';
      lineDiv.textContent = lineText === '' ? '\u00A0' : lineText;
      poemBody.appendChild(lineDiv);

      const timer = setTimeout(() => {
        lineDiv.classList.add('is-visible');
      }, 600 + idx * 800);
      poemAnimationTimers.push(timer);
    });

    const totalDelay = 600 + lines.length * 800 + 500;
    const signoffTimer = setTimeout(() => {
      if (poemSignoff) {
        poemSignoff.classList.add('is-visible');
      }

      // After the poem has fully appeared, show the quiet "Back to the site" button
      const backTimer = setTimeout(() => {
        if (endingBackWrap) {
          endingBackWrap.hidden = false;
          void endingBackWrap.offsetWidth;
          endingBackWrap.classList.add('is-visible');
        }
      }, 800);
      poemAnimationTimers.push(backTimer);
    }, totalDelay);
    poemAnimationTimers.push(signoffTimer);
  }

  // Handle "Back to the site" button
  if (backToSiteBtn) {
    backToSiteBtn.addEventListener('click', () => {
      // Clean query params so refresh doesn't trigger unlock again
      if (window.location.search) {
        try {
          const url = new URL(window.location.href);
          url.search = '';
          window.history.replaceState({}, document.title, url.toString());
        } catch (e) {}
      }

      // Fade out ending screen
      if (goldenDoorScreen) {
        goldenDoorScreen.style.transition = 'opacity 0.8s ease';
        goldenDoorScreen.style.opacity = '0';
        setTimeout(() => {
          goldenDoorScreen.hidden = true;
          goldenDoorScreen.style.opacity = '';
          goldenDoorScreen.style.transition = '';
        }, 800);
      }

      // Restore scrolling and show main site
      document.body.style.overflow = '';
      document.body.classList.remove('is-locked');

      if (landingSection) {
        landingSection.classList.add('fade-out');
        setTimeout(() => {
          landingSection.style.display = 'none';
        }, 600);
      }

      // Ensure foundStars is empty and counter is back to 00 / 18
      hasEndingTriggered = false;
      foundStars.clear();
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('hashini_found_stars');
      } catch (e) {}
      updateTrackerUI();

      // Return to main site (scrolled to top of content)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Words breakdown for the puzzle:
  // YOU (s01-s03) | WILL (s04-s07) | NOT (s08-s10) | BE (s11-s12) | ALONE (s13-s17) | ♡ (s18)
  const puzzleWordGroups = [
    { words: ['s01', 's02', 's03'] },
    { words: ['s04', 's05', 's06', 's07'] },
    { words: ['s08', 's09', 's10'] },
    { words: ['s11', 's12'] },
    { words: ['s13', 's14', 's15', 's16', 's17'] },
    { words: ['s18'] }
  ];

  function buildTrackerSlots() {
    if (!trackerWordSlots) return;
    trackerWordSlots.innerHTML = '';

    puzzleWordGroups.forEach(group => {
      const groupEl = document.createElement('div');
      groupEl.className = 'slot-word-group';

      group.words.forEach(starId => {
        const mapping = SITE_CONTENT.stars.mapping[starId];
        const isFound = foundStars.has(starId);

        const slot = document.createElement('div');
        slot.className = `tracker-slot ${isFound ? 'revealed' : ''}`;
        slot.id = `slot-${starId}`;
        slot.textContent = isFound ? mapping.letter : '·';
        slot.setAttribute('title', isFound ? `Star ${starId}: ${mapping.letter}` : 'Star not yet discovered');
        groupEl.appendChild(slot);
      });

      trackerWordSlots.appendChild(groupEl);
    });
  }

  function updateTrackerUI() {
    const total = SITE_CONTENT.stars.total;
    const count = foundStars.size;
    const formattedCount = String(count).padStart(2, '0');

    if (starCounterText) {
      starCounterText.textContent = `${formattedCount} / ${total}`;
    }

    if (trackerProgressSummary) {
      trackerProgressSummary.textContent = `${count} of ${total} stars discovered`;
    }

    if (trackerProgressBarFill) {
      const percent = Math.min(100, Math.round((count / total) * 100));
      trackerProgressBarFill.style.width = `${percent}%`;
    }

    // Update individual slots
    for (const [starId, data] of Object.entries(SITE_CONTENT.stars.mapping)) {
      const slot = document.getElementById(`slot-${starId}`);
      if (slot) {
        if (foundStars.has(starId)) {
          slot.classList.add('revealed');
          slot.textContent = data.letter;
        } else {
          slot.classList.remove('revealed');
          slot.textContent = '·';
        }
      }

      // Mark found state on triggers across DOM
      const triggers = document.querySelectorAll(`.hidden-star-trigger[data-star="${starId}"]`);
      triggers.forEach(trig => {
        if (foundStars.has(starId)) {
          trig.classList.add('is-found');
        } else {
          trig.classList.remove('is-found');
        }
      });
    }

    renderHintsList();

    // Check for 18 stars unlock condition
    if (count >= total) {
      triggerEndingSequence();
    }
  }

  function renderHintsList() {
    if (!hintsList) return;
    hintsList.innerHTML = '';

    for (const [starId, data] of Object.entries(SITE_CONTENT.stars.mapping)) {
      const li = document.createElement('li');
      const isFound = foundStars.has(starId);
      li.className = isFound ? 'found-hint' : '';
      li.innerHTML = isFound 
        ? `<span>✓</span><span><strong>Star ${starId.replace('s', '')}:</strong> Discovered (${data.letter})</span>`
        : `<span>✦</span><span><strong>Star ${starId.replace('s', '')}:</strong> ${data.hint}</span>`;
      hintsList.appendChild(li);
    }
  }

  function registerStarFound(starId, clientX, clientY) {
    if (foundStars.has(starId)) {
      showToast("Star already collected! Keep hunting 💫");
      return;
    }

    foundStars.add(starId);
    saveFoundStars();

    const data = SITE_CONTENT.stars.mapping[starId];
    createSparkles(clientX || window.innerWidth / 2, clientY || window.innerHeight / 2, 18, '#F5C86B');

    // Reaction with MAJAAA
    showToast(`MAJAAA! Star ${starId.replace('s', '')} found → Letter "${data.letter}"`, true);

    updateTrackerUI();
  }

  // Bind all star triggers in DOM
  document.addEventListener('click', (e) => {
    const starTrigger = e.target.closest('.hidden-star-trigger');
    if (starTrigger) {
      e.preventDefault();
      e.stopPropagation();
      const starId = starTrigger.dataset.star;
      if (starId) {
        registerStarFound(starId, e.clientX, e.clientY);
      }
    }
  });

  // Tracker Modal open / close
  if (trackerBtn && trackerModal) {
    trackerBtn.addEventListener('click', () => {
      trackerModal.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  }

  function closeTracker() {
    if (trackerModal) {
      trackerModal.hidden = true;
      document.body.style.overflow = '';
    }
  }

  if (closeTrackerBtn) closeTrackerBtn.addEventListener('click', closeTracker);
  if (trackerModalBackdrop) trackerModalBackdrop.addEventListener('click', closeTracker);

  if (hintsToggleBtn && hintsListWrap) {
    hintsToggleBtn.addEventListener('click', () => {
      const isHidden = hintsListWrap.hidden;
      hintsListWrap.hidden = !isHidden;
      hintsToggleBtn.setAttribute('aria-expanded', String(isHidden));
    });
  }

  buildTrackerSlots();
  updateTrackerUI();

  /* ========================================================
     MUSEUM OF US: REMEMBER THIS & RANDOM MEMORY
     ======================================================== */
  const rememberBtns = document.querySelectorAll('.remember-btn');
  rememberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const drawer = document.getElementById(targetId);
      if (drawer) {
        const isClosed = drawer.hidden;
        drawer.hidden = !isClosed;
        btn.setAttribute('aria-expanded', String(isClosed));
      }
    });
  });

  const randomMemoryBtn = document.getElementById('randomMemoryBtn');
  if (randomMemoryBtn) {
    randomMemoryBtn.addEventListener('click', (e) => {
      const exhibits = document.querySelectorAll('.exhibit-card');
      if (!exhibits.length) return;

      const randomIndex = Math.floor(Math.random() * exhibits.length);
      const chosenExhibit = exhibits[randomIndex];

      createSparkles(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 16, '#9DCFFF');
      showToast("Surfacing a random memory... ✨");

      chosenExhibit.scrollIntoView({ behavior: 'smooth', block: 'center' });
      chosenExhibit.style.transition = 'box-shadow 0.6s ease';
      chosenExhibit.style.boxShadow = '0 0 35px rgba(157, 207, 255, 0.7)';

      const rememberBtn = chosenExhibit.querySelector('.remember-btn');
      const drawer = chosenExhibit.querySelector('.remember-drawer');
      if (rememberBtn && drawer) {
        drawer.hidden = false;
        rememberBtn.setAttribute('aria-expanded', 'true');
      }

      setTimeout(() => {
        chosenExhibit.style.boxShadow = '';
      }, 2500);
    });
  }

  /* ========================================================
     PHOTO LIGHTBOX MODAL WITH KEYBOARD & SWIPE
     ======================================================== */
  const lightbox = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  let galleryItems = [];
  let currentLightboxIndex = 0;

  // Gather all polaroids with lightbox data
  document.querySelectorAll('[data-lightbox-src]').forEach((el, index) => {
    galleryItems.push({
      src: el.dataset.lightboxSrc,
      caption: el.dataset.lightboxCaption || ''
    });

    el.addEventListener('click', (e) => {
      // Don't open lightbox if star trigger clicked
      if (e.target.closest('.hidden-star-trigger')) return;
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    if (!lightbox || !galleryItems.length) return;
    currentLightboxIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentLightboxIndex];

    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function showNextPhoto() {
    openLightbox(currentLightboxIndex + 1);
  }

  function showPrevPhoto() {
    openLightbox(currentLightboxIndex - 1);
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextPhoto);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevPhoto);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (lightbox && !lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'ArrowLeft') showPrevPhoto();
    }
    if (trackerModal && !trackerModal.hidden) {
      if (e.key === 'Escape') closeTracker();
    }
  });

  // Touch Swipe for Mobile Lightbox
  let touchStartX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) showNextPhoto();
      if (touchEndX > touchStartX + 50) showPrevPhoto();
    }, { passive: true });
  }

  /* ========================================================
     SECTION 3: PROFILE - STAT BARS & PHRASE CHIPS
     ======================================================== */
  const statFills = document.querySelectorAll('.stat-fill');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statFills.forEach(fill => {
          const w = fill.dataset.width || '100%';
          fill.style.width = w;
        });
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statCard = document.querySelector('.stats-card');
  if (statCard) statObserver.observe(statCard);

  // Phrase chips: MAJAAA & NE GAY
  const chipMajaaa = document.getElementById('chipMajaaa');
  const chipNegay = document.getElementById('chipNegay');

  if (chipMajaaa) {
    chipMajaaa.addEventListener('click', (e) => {
      createSparkles(e.clientX, e.clientY, 16, '#F5C86B');
      showToast("MAJAAA! ⚡ Pure peak diva joy!", true);
    });
  }

  if (chipNegay) {
    chipNegay.addEventListener('click', (e) => {
      createSparkles(e.clientX, e.clientY, 16, '#9DCFFF');
      showToast("NE GAY! 💫 The supreme comeback!");
    });
  }

  /* ========================================================
     EMERGENCY CONTACT: CALL JAE OVERLAY
     ======================================================== */
  const callJaeBtn = document.getElementById('callJaeBtn');
  const callJaeOverlay = document.getElementById('callJaeOverlay');
  const endCallBtn = document.getElementById('endCallBtn');
  const callStatusText = document.getElementById('callStatusText');
  const callAnimBox = document.getElementById('callAnimBox');
  const callSuccessBox = document.getElementById('callSuccessBox');

  let callTimer1, callTimer2;

  if (callJaeBtn && callJaeOverlay) {
    callJaeBtn.addEventListener('click', () => {
      callJaeOverlay.hidden = false;
      document.body.style.overflow = 'hidden';

      // Reset state
      callStatusText.textContent = SITE_CONTENT.profile.emergencyCard.callingText;
      callAnimBox.hidden = false;
      callSuccessBox.hidden = true;

      // Sequence: Calling Jae -> Jae is on it… -> Problem solved. Magically.
      callTimer1 = setTimeout(() => {
        callStatusText.textContent = SITE_CONTENT.profile.emergencyCard.inProgressText;
      }, 1200);

      callTimer2 = setTimeout(() => {
        callStatusText.textContent = "Connected";
        callAnimBox.hidden = true;
        callSuccessBox.hidden = false;
        createSparkles(window.innerWidth / 2, window.innerHeight / 2, 18, '#48E59D');
      }, 2600);
    });
  }

  function endCall() {
    clearTimeout(callTimer1);
    clearTimeout(callTimer2);
    if (callJaeOverlay) {
      callJaeOverlay.hidden = true;
      document.body.style.overflow = '';
    }
  }

  if (endCallBtn) endCallBtn.addEventListener('click', endCall);

  /* ========================================================
     SECTION 4: THE CHAOS ZONE (GAMES A & B)
     ======================================================== */
  let gameAState = { currentQ: 0, score: 0, completed: false };
  let gameBState = { currentQ: 0, score: 0, completed: false };

  function renderGameQuestion(gameKey) {
    const isGameA = gameKey === 'gameA';
    const gameData = isGameA ? SITE_CONTENT.chaosZone.gameA : SITE_CONTENT.chaosZone.gameB;
    const state = isGameA ? gameAState : gameBState;

    const counterEl = document.getElementById(isGameA ? 'gameACounter' : 'gameBCounter');
    const qAreaEl = document.getElementById(isGameA ? 'gameAQArea' : 'gameBQArea');
    const optionsEl = document.getElementById(isGameA ? 'gameAOptions' : 'gameBOptions');
    const feedbackEl = document.getElementById(isGameA ? 'gameAFeedback' : 'gameBFeedback');
    const rewardEl = document.getElementById(isGameA ? 'gameAReward' : 'gameBReward');

    if (state.currentQ >= gameData.questions.length) {
      // Completed game
      state.completed = true;
      counterEl.textContent = "Completed!";
      qAreaEl.innerHTML = `<p class="q-text">Score: ${state.score} / ${gameData.questions.length}</p>`;
      optionsEl.innerHTML = '';
      feedbackEl.hidden = true;
      rewardEl.hidden = false;

      checkBothGamesComplete();
      return;
    }

    const q = gameData.questions[state.currentQ];
    counterEl.textContent = `Question ${state.currentQ + 1} of ${gameData.questions.length}`;
    qAreaEl.innerHTML = `<p class="q-text">${q.question}</p>`;
    optionsEl.innerHTML = '';
    feedbackEl.hidden = true;

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'game-opt-btn';
      btn.textContent = opt;

      btn.addEventListener('click', (e) => {
        // Disable all options
        optionsEl.querySelectorAll('.game-opt-btn').forEach(b => b.disabled = true);

        const isCorrect = opt.trim().toLowerCase() === q.answer.trim().toLowerCase();
        if (isCorrect) {
          btn.classList.add('correct');
          state.score++;
          createSparkles(e.clientX, e.clientY, 12, '#48E59D');
          showToast("MAJAAA! Correct answer!", true);
        } else {
          btn.classList.add('wrong');
          // Highlight correct one
          optionsEl.querySelectorAll('.game-opt-btn').forEach(b => {
            if (b.textContent.trim().toLowerCase() === q.answer.trim().toLowerCase()) {
              b.classList.add('correct');
            }
          });
        }

        feedbackEl.hidden = false;
        feedbackEl.textContent = q.feedback;

        setTimeout(() => {
          state.currentQ++;
          renderGameQuestion(gameKey);
        }, 1800);
      });

      optionsEl.appendChild(btn);
    });
  }

  function checkBothGamesComplete() {
    if (gameAState.completed && gameBState.completed) {
      const survivedBanner = document.getElementById('survivedChaosBanner');
      if (survivedBanner) {
        survivedBanner.hidden = false;
        createSparkles(window.innerWidth / 2, window.innerHeight / 2, 25, '#F5C86B');
      }
    }
  }

  renderGameQuestion('gameA');
  renderGameQuestion('gameB');

  /* ========================================================
     SECTION 5: BUBBLE'S CORNER & MASCOT PEELING REACTIONS
     ======================================================== */
  const mascotTriggers = document.querySelectorAll('.mascot-trigger');
  mascotTriggers.forEach(mascot => {
    mascot.addEventListener('click', (e) => {
      const bubbleEl = mascot.querySelector('.mascot-speech-bubble');
      if (!bubbleEl) return;

      const lines = SITE_CONTENT.bubbleCorner.mascotLines;
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      bubbleEl.textContent = randomLine;
      bubbleEl.hidden = false;

      createSparkles(e.clientX || 100, e.clientY || 100, 8, '#F5C86B');

      setTimeout(() => {
        bubbleEl.hidden = true;
      }, 3500);
    });
  });

  /* ========================================================
     EASTER EGG: GREEN CHILLIES
     ======================================================== */
  const chilliesBtn = document.getElementById('chilliesEasterEgg');
  if (chilliesBtn) {
    chilliesBtn.addEventListener('click', (e) => {
      createSparkles(e.clientX, e.clientY, 14, '#48E59D');
      showToast("Two green chillies. One each. Perfectly balanced! 🌶️");
    });
  }

  // Shortcuts handling (?reset=1)
  if (isResetMode) {
    hasEndingTriggered = false;
    if (goldenDoorScreen) goldenDoorScreen.hidden = true;
    document.body.classList.add('is-locked');
    if (landingSection) {
      landingSection.style.display = 'flex';
      landingSection.classList.remove('fade-out');
    }
  }
});
