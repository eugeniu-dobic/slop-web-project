/**
 * Article Ad System: Left Sidebar Ads, Right Gutter Ads, In-Article Post Ads, and Lightbox Zoom
 * Follows borderless design, 15-second respawn, and click-to-zoom lightbox.
 */

window.__articleAdsActive = true;

// Check if user manually refreshed/reloaded the page
(function checkManualReloadReset() {
  let isInternalDialogueReload = false;
  try {
    if (sessionStorage.getItem('slop_internal_reload') === 'true') {
      isInternalDialogueReload = true;
      sessionStorage.removeItem('slop_internal_reload');
    }
  } catch (e) { }

  const nav = (window.performance && performance.getEntriesByType) ? performance.getEntriesByType('navigation')[0] : null;
  const isManualReload = nav ? (nav.type === 'reload') : (window.performance && window.performance.navigation && window.performance.navigation.type === 1);

  let hasReachedFinalStep = false;
  try {
    hasReachedFinalStep = localStorage.getItem('slop_final_popup_seen') === 'true' ||
      localStorage.getItem('slop_narrative_step') === 'step2_approved';
  } catch (e) { }

  if (isManualReload && !isInternalDialogueReload && hasReachedFinalStep) {
    try {
      localStorage.removeItem('slop_user');
      localStorage.removeItem('slop_narrative_step');
      localStorage.removeItem('slop_lore_ad_inspected');
      localStorage.removeItem('slop_90s_voted');
      localStorage.removeItem('slop_step2_voted');
      localStorage.removeItem('slop_side_ads_overwritten');
      localStorage.removeItem('slop_final_popup_seen');
      localStorage.removeItem('slop_final_popup_time');
      localStorage.removeItem('slop_terminal_visited');
      sessionStorage.removeItem('slop_skip_loader');
      sessionStorage.removeItem('slop_returning_from_article');
    } catch (e) { }
  }
})();

// Only mark returning from article if currently on an article page (news-*.html)
if (window.location.pathname.includes('news-') || window.location.href.includes('news-')) {
  try {
    sessionStorage.setItem('slop_returning_from_article', 'true');
  } catch (e) { }
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') && link.getAttribute('href').includes('index.html')) {
    try {
      sessionStorage.setItem('slop_returning_from_article', 'true');
    } catch (err) { }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const postAds = [
    'content/post_ad/1.jpg', 'content/post_ad/10.jpg', 'content/post_ad/11.jpg', 'content/post_ad/12.jpg',
    'content/post_ad/13.jpg', 'content/post_ad/14.jpg', 'content/post_ad/18302bf1-5315-4275-b5c9-767e6f440dcd.jpg',
    'content/post_ad/2.jpg', 'content/post_ad/3.jpg', 'content/post_ad/4.jpg', 'content/post_ad/5.jpg',
    'content/post_ad/6.jpg', 'content/post_ad/6faa2843-c286-42cc-b8e2-055c1f525fde.jpg', 'content/post_ad/7.jpg',
    'content/post_ad/8.jpg', 'content/post_ad/8bf9c46d-5e21-4609-8f0b-93194afde152.jpg', 'content/post_ad/9.jpg',
    'content/post_ad/a61d6cf3-b785-4832-a010-c7b2b3bd0a99.jpg'
  ];

  const sideAds = [
    'content/side_ad/15.jpg', 'content/side_ad/16.jpg', 'content/side_ad/17.jpg', 'content/side_ad/18.jpg',
    'content/side_ad/19.jpg', 'content/side_ad/20.jpg', 'content/side_ad/21.jpg', 'content/side_ad/22.jpg',
    'content/side_ad/23.jpg', 'content/side_ad/24.jpg', 'content/side_ad/25.jpg', 'content/side_ad/26.jpg',
    'content/side_ad/27.jpg', 'content/side_ad/28.jpg', 'content/side_ad/29.jpg', 'content/side_ad/30.jpg'
  ];

  function isLoreSideAdActive() {
    try {
      return localStorage.getItem('slop_side_ads_overwritten') === 'true';
    } catch (e) {
      return false;
    }
  }

  function getRandom(arr) {
    if (isLoreSideAdActive() && arr === sideAds) {
      return 'content/lore/side_ad_important.webp';
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // --------------------------------------------------------------------------
  // 1. Ensure Lightbox Exists (Only create ad-lightbox if no retro lightbox exists)
  // --------------------------------------------------------------------------
  const hasRetroLightbox = !!document.getElementById('retro-ad-lightbox');
  let lightbox = document.getElementById('ad-lightbox');
  let lightboxImg = document.getElementById('ad-lightbox-img');

  if (!hasRetroLightbox && !lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'ad-lightbox';
    lightbox.style.display = 'none';
    lightbox.innerHTML = `
      <div id="ad-lightbox-content">
        <img id="ad-lightbox-img" src="" alt="Ad Fullscreen">
        <button id="ad-lightbox-close" title="Close (Esc)" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
    document.body.appendChild(lightbox);
    lightboxImg = document.getElementById('ad-lightbox-img');
  }

  function closeArticleAdsLightbox() {
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    if (retroLightbox) {
      retroLightbox.classList.remove('active');
      setTimeout(() => {
        if (!retroLightbox.classList.contains('active')) {
          retroLightbox.style.display = 'none';
          const retroLightboxImg = document.getElementById('retro-ad-lightbox-img');
          if (retroLightboxImg) {
            retroLightboxImg.src = '';
            retroLightboxImg.alt = '';
          }
        }
      }, 250);
    }

    if (lightbox) {
      lightbox.classList.remove('active');
      setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
          lightbox.style.display = 'none';
          if (lightboxImg) {
            lightboxImg.src = '';
            lightboxImg.alt = '';
          }
        }
      }, 250);
    }
  }

  function openArticleAdsLightbox(src, alt = '') {
    if (!src) return;
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    const retroLightboxImg = document.getElementById('retro-ad-lightbox-img');
    if (retroLightbox && retroLightboxImg) {
      retroLightboxImg.alt = alt;
      retroLightboxImg.src = src;
      retroLightbox.style.display = 'flex';
      requestAnimationFrame(() => {
        retroLightbox.classList.add('active');
      });
      return;
    }
    if (lightbox && lightboxImg) {
      lightboxImg.alt = alt;
      lightboxImg.src = src;
      lightbox.style.display = 'flex';
      requestAnimationFrame(() => {
        lightbox.classList.add('active');
      });
    }
  }

  window.openRetroLightbox = openArticleAdsLightbox;
  window.closeRetroLightbox = closeArticleAdsLightbox;

  const retroLightboxImgEl = document.getElementById('retro-ad-lightbox-img');
  if (retroLightboxImgEl) {
    retroLightboxImgEl.addEventListener('error', () => {
      console.warn('[Lightbox] Image failed to load, closing zoom:', retroLightboxImgEl.src);
      closeArticleAdsLightbox();
    });
  }

  // Lightbox click-to-zoom listeners (ensuring strictly single modal opening)
  document.addEventListener('click', (e) => {
    // If the lightbox is currently active, don't trigger zoom-in
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    if (retroLightbox && retroLightbox.classList.contains('active')) return;
    if (lightbox && lightbox.classList.contains('active')) return;

    if (e.target.closest('#retro-ad-lightbox') || e.target.closest('#ad-lightbox')) return;

    // Loading screen GIFs and terminal elements must never trigger zoom
    if (e.target.closest('#loading-screen') || e.target.closest('#loading-bg') || e.target.id === 'loading-bg') return;

    const isZoomableImage = e.target.tagName === 'IMG' &&
      !e.target.closest('#loading-screen') &&
      !e.target.closest('#loading-bg') &&
      e.target.id !== 'loading-bg' &&
      !e.target.closest('#retro-ad-lightbox') &&
      !e.target.closest('#ad-lightbox') &&
      !e.target.closest('#retro-counter-digits') &&
      !e.target.closest('.retro-dispatch-item') &&
      !e.target.classList.contains('retro-dispatch-thumb') &&
      !e.target.classList.contains('post-icon-svg') &&
      !e.target.closest('.post-icon') &&
      !e.target.classList.contains('post-avatar') &&
      !e.target.classList.contains('comment-avatar') &&
      !e.target.closest('.author-avatar') &&
      !e.target.classList.contains('lore-ad-img') &&
      !e.target.closest('#lore-trigger-ad') &&
      !e.target.closest('.lore-important-ad') &&
      !e.target.closest('#truth-terminal-backdrop') &&
      !e.target.closest('#truth-terminal-box') &&
      !e.target.closest('#giant-lore-modal') &&
      !e.target.closest('button');

    let zoomSrc = null;
    let zoomAlt = '';

    if (isZoomableImage && e.target.src) {
      zoomSrc = e.target.src;
      zoomAlt = e.target.alt || '';
    } else {
      const postImageContainer = e.target.closest('.post-attached-image-container');
      if (postImageContainer) {
        if (postImageContainer.classList.contains('post-media-frosted') && !e.target.classList.contains('post-attached-image')) {
          return;
        }
        const childImg = postImageContainer.querySelector('img');
        if (childImg && childImg.src) {
          zoomSrc = childImg.src;
          zoomAlt = childImg.alt || '';
        } else if (postImageContainer.style.backgroundImage) {
          const match = postImageContainer.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
          if (match && match[1]) zoomSrc = match[1];
        }
      }
    }

    if (zoomSrc) {
      openArticleAdsLightbox(zoomSrc, zoomAlt);
    }
  });

  // Lightbox click-to-close: clicking anywhere on the open lightbox (image, content, backdrop, close button) closes it
  document.addEventListener('click', (e) => {
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    if (retroLightbox && retroLightbox.classList.contains('active') && e.target.closest('#retro-ad-lightbox')) {
      closeArticleAdsLightbox();
      return;
    }

    if (lightbox && lightbox.classList.contains('active') && e.target.closest('#ad-lightbox')) {
      closeArticleAdsLightbox();
      return;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeArticleAdsLightbox();
    }
  });

  // --------------------------------------------------------------------------
  // 2. Setup 4 Side Ads: 2 on Left Sidebar, 2 on Right Gutter
  // --------------------------------------------------------------------------
  function setupAdSlot(containerId, isGutterAd = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    function render() {
      container.innerHTML = '';

      const adWrapper = document.createElement('div');
      adWrapper.className = isGutterAd ? 'article-gutter-wrapper' : 'sidebar-ad-wrapper';

      const closeBtn = document.createElement('button');
      closeBtn.className = isGutterAd ? 'ad-post-close' : 'minimal-close-btn';
      closeBtn.setAttribute('aria-label', 'Close Ad');
      closeBtn.setAttribute('title', 'Close Advertisement');
      closeBtn.innerHTML = '&times;';

      const img = document.createElement('img');
      img.className = 'ad-image';
      img.alt = 'Advertisement';
      img.src = encodeURI(getRandom(sideAds)).replace(/#/g, '%23');

      adWrapper.appendChild(closeBtn);
      adWrapper.appendChild(img);
      container.appendChild(adWrapper);

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        container.innerHTML = '';
        setTimeout(render, 15000);
      });
    }

    render();
  }

  setupAdSlot('article-sidebar-ad-1', false);
  setupAdSlot('article-sidebar-ad-2', false);
  setupAdSlot('article-right-ad-1', true);
  setupAdSlot('article-right-ad-2', true);

  // --------------------------------------------------------------------------
  // Setup 90s Retro Side Ads: 2 on Left Sidebar, 2 on Right Sidebar
  // --------------------------------------------------------------------------
  const shuffledRetroAds = [...sideAds].sort(() => 0.5 - Math.random());
  let retroAdIndex = 0;
  function getNextRetroSideAd() {
    if (isLoreSideAdActive()) {
      return 'content/lore/side_ad_important.webp';
    }
    const ad = shuffledRetroAds[retroAdIndex % shuffledRetroAds.length];
    retroAdIndex++;
    return ad;
  }

  function showGiantLoreModal() {
    const existing = document.getElementById('giant-lore-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'giant-lore-modal';
    modal.innerHTML = `
      <div class="giant-lore-container">
        <button class="ad-post-close giant-lore-close" id="giant-lore-close-btn" aria-label="Close Pop-up" title="Close Pop-up">&times;</button>
        <img src="content/lore/side_ad_important.webp" class="giant-lore-img" alt="Important Transmission Alert">
      </div>
    `;

    try {
      localStorage.setItem('slop_final_popup_seen', 'true');
    } catch (e) { }

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#giant-lore-close-btn');
    const closeModal = () => {
      modal.style.transition = 'opacity 0.25s ease';
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.remove();
      }, 250);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', onKey);
      }
    };
    document.addEventListener('keydown', onKey);
  }

  window.showGiantLoreModal = showGiantLoreModal;

  window.startGradualSideAdReplacement = function () {
    try {
      localStorage.setItem('slop_side_ads_overwritten', 'true');
    } catch (e) { }

    const sideAdContainers = [
      ...Array.from(document.querySelectorAll('.retro-ad-wrapper')),
      ...Array.from(document.querySelectorAll('.sidebar-ad-wrapper')),
      ...Array.from(document.querySelectorAll('.article-gutter-wrapper')),
      document.getElementById('retro-left-ad-1'),
      document.getElementById('retro-right-ad-1'),
      document.getElementById('retro-left-ad-2'),
      document.getElementById('retro-right-ad-2'),
      document.getElementById('article-sidebar-ad-1'),
      document.getElementById('article-right-ad-1'),
      document.getElementById('article-sidebar-ad-2'),
      document.getElementById('article-right-ad-2'),
      document.getElementById('login-ad-container'),
      document.getElementById('news-ad-container')
    ].filter(Boolean);

    const activeSlots = [...new Set(sideAdContainers)].filter(el => document.body.contains(el));

    // 1. Swap existing side ads every 3 seconds
    activeSlots.forEach((slot, idx) => {
      setTimeout(() => {
        const img = slot.querySelector('img.ad-image') || slot.querySelector('img');
        if (img) {
          img.style.transition = 'opacity 0.4s ease';
          img.style.opacity = '0';
          setTimeout(() => {
            img.src = 'content/lore/side_ad_important.webp';
            img.alt = 'Important Transmission';
            img.style.opacity = '1';
          }, 400);
        }
      }, idx * 3000);
    });

    // 2. Then, on the left sidebar gradually make pop up 3 more side_ad_important (every 3s)
    const baseExtraDelay = activeSlots.length * 3000;
    const leftSidebar = document.querySelector('.retro-left-column') ||
      document.querySelector('.article-sidebar') ||
      document.querySelector('aside.retro-left-column') ||
      document.querySelector('aside');

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (!leftSidebar) return;
        const extraAd = document.createElement('div');
        extraAd.className = 'retro-ad-wrapper extra-left-lore-ad';
        extraAd.style.opacity = '0';
        extraAd.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        extraAd.style.transform = 'translateY(10px)';
        extraAd.innerHTML = `
          <div class="retro-ad-label">SPONSOR ADVERTISEMENT</div>
          <div class="retro-ad-box">
            <button class="ad-post-close retro-ad-close" aria-label="Close Ad" title="Close Advertisement">&times;</button>
            <img class="ad-image" alt="Important Transmission" src="content/lore/side_ad_important.webp" title="Click to zoom in Win95 Lightbox">
          </div>
        `;
        leftSidebar.appendChild(extraAd);

        const closeBtn = extraAd.querySelector('.retro-ad-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            extraAd.style.display = 'none';
          });
        }

        requestAnimationFrame(() => {
          extraAd.style.opacity = '1';
          extraAd.style.transform = 'translateY(0)';
        });
      }, baseExtraDelay + (i * 3000));
    }

    // 3. Then, swap dispatch thumbnails, portraits, and post attached images in bulk
    const bulkSwapDelay = baseExtraDelay + (3 * 3000);
    setTimeout(() => {
      // a) .retro-dispatch-thumb
      document.querySelectorAll('.retro-dispatch-thumb').forEach(img => {
        img.style.transition = 'opacity 0.4s ease';
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = 'content/lore/side_ad_important.webp';
          img.style.opacity = '1';
        }, 400);
      });

      // b) .retro-candidate-portrait
      document.querySelectorAll('.retro-candidate-portrait').forEach(img => {
        img.style.transition = 'opacity 0.4s ease';
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = 'content/lore/side_ad_important.webp';
          img.style.opacity = '1';
        }, 400);
      });

      // c) .post-attached-image
      document.querySelectorAll('.post-attached-image').forEach(img => {
        img.style.transition = 'opacity 0.4s ease';
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = 'content/lore/side_ad_important.webp';
          img.style.opacity = '1';
        }, 400);
      });
    }, bulkSwapDelay);
  };

  function setupRetroAdSlot(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    function render() {
      container.style.display = 'block';
      container.innerHTML = `
        <div class="retro-ad-label">SPONSOR ADVERTISEMENT</div>
        <div class="retro-ad-box">
          <button class="retro-ad-close" aria-label="Close Ad" title="Close Advertisement">&times;</button>
          <img class="ad-image" alt="Sponsor Advertisement" src="${encodeURI(getNextRetroSideAd()).replace(/#/g, '%23')}" title="Click to zoom in Win95 Lightbox">
        </div>
      `;

      const closeBtn = container.querySelector('.retro-ad-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          container.style.display = 'none';
          setTimeout(render, 15000);
        });
      }
    }

    render();
  }

  setupRetroAdSlot('retro-left-ad-1');
  setupRetroAdSlot('retro-left-ad-2');
  setupRetroAdSlot('retro-right-ad-1');
  setupRetroAdSlot('retro-right-ad-2');

  // --------------------------------------------------------------------------
  // 3. Borderless In-Article Post Ad
  // --------------------------------------------------------------------------
  function injectInArticleAd() {
    if (document.querySelector('.in-article-ad')) return;

    const seeAlsoSection = document.querySelector('.article-see-also-container');
    const contentBody = document.querySelector('.article-content-body');
    if (!contentBody) return;

    const adContainer = document.createElement('div');
    adContainer.className = 'post-card post-wide ad-post in-article-ad';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ad-post-close';
    closeBtn.setAttribute('aria-label', 'Close Ad');
    closeBtn.setAttribute('title', 'Close Advertisement');
    closeBtn.innerHTML = '&times;';

    const img = document.createElement('img');
    img.className = 'ad-image';
    img.alt = 'Advertisement';
    img.src = encodeURI(getRandom(postAds)).replace(/#/g, '%23');

    adContainer.appendChild(closeBtn);
    adContainer.appendChild(img);

    if (seeAlsoSection) {
      seeAlsoSection.parentNode.insertBefore(adContainer, seeAlsoSection);
    } else {
      contentBody.appendChild(adContainer);
    }

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      adContainer.style.display = 'none';
      setTimeout(() => {
        img.src = encodeURI(getRandom(postAds)).replace(/#/g, '%23');
        adContainer.style.display = '';
      }, 15000); // Reappear after 15 seconds
    });
  }

  injectInArticleAd();

  // If already overwritten from previous session, initialize immediately
  if (isLoreSideAdActive()) {
    setTimeout(() => {
      document.querySelectorAll('.retro-dispatch-thumb, .retro-candidate-portrait, .post-attached-image').forEach(img => {
        img.src = 'content/lore/side_ad_important.webp';
      });

      const leftCol = document.querySelector('.retro-left-column') || document.querySelector('.article-sidebar') || document.querySelector('aside');
      if (leftCol && !leftCol.querySelector('.extra-left-lore-ad')) {
        for (let i = 0; i < 3; i++) {
          const extraAd = document.createElement('div');
          extraAd.className = 'retro-ad-wrapper extra-left-lore-ad';
          extraAd.innerHTML = `
            <div class="retro-ad-label">SPONSOR ADVERTISEMENT</div>
            <div class="retro-ad-box">
              <button class="ad-post-close retro-ad-close" aria-label="Close Ad" title="Close Advertisement">&times;</button>
              <img class="ad-image" alt="Important Transmission" src="content/lore/side_ad_important.webp" title="Click to zoom in Win95 Lightbox">
            </div>
          `;
          leftCol.appendChild(extraAd);
        }
      }
    }, 150);
  }

  // --------------------------------------------------------------------------
  // 4. Universal Login Reminder: every 15 seconds if user is not logged in
  // --------------------------------------------------------------------------
  let loginReminderTimeout = null;
  function startUniversalLoginReminder() {
    try {
      if (localStorage.getItem('slop_user')) return;
    } catch (e) { }

    if (loginReminderTimeout) {
      clearTimeout(loginReminderTimeout);
    }

    loginReminderTimeout = setTimeout(() => {
      let isLogged = false;
      try {
        isLogged = !!localStorage.getItem('slop_user');
      } catch (e) { }

      if (!isLogged) {
        alert("Please Log In To Continue...");
        startUniversalLoginReminder();
      }
    }, 15000); // Trigger every 15 seconds
  }

  function clearUniversalLoginReminder() {
    if (loginReminderTimeout) {
      clearTimeout(loginReminderTimeout);
      loginReminderTimeout = null;
    }
  }

  window.startGlobalLoginReminder = startUniversalLoginReminder;
  window.clearGlobalLoginReminder = clearUniversalLoginReminder;
  startUniversalLoginReminder();

  // --------------------------------------------------------------------------
  // 5. Step 2 Narrative Dialogue Modal (Shared across all pages)
  // --------------------------------------------------------------------------
  function showStep2DialogueModal() {
    const existingModal = document.getElementById('retro-intercept-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'retro-intercept-modal';
    modal.innerHTML = `
      <div class="raw-dialogue-terminal" id="raw-dialogue-terminal">
        <div class="retro-dialogue-feed" id="retro-dialogue-feed"></div>
      </div>
    `;

    document.body.appendChild(modal);

    const bodyEl = modal.querySelector('#raw-dialogue-terminal');
    const feedEl = modal.querySelector('#retro-dialogue-feed');

    const getDialogueTimestamp = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    };

    const step2Lines = [
      { text: "CRAZY, RIGHT?" },
      { text: "YOU DON'T MATTER." },
      { text: "AND YET..." },
      {
        parts: [
          { text: "THEY STILL WANT YOU TO " },
          { text: "CHOOSE", isViolet: true },
          { text: "." }
        ]
      }
    ];

    async function runDialogueStep2() {
      await new Promise(r => setTimeout(r, 450));

      for (let l = 0; l < step2Lines.length; l++) {
        const item = step2Lines[l];
        const lineEl = document.createElement('div');
        lineEl.className = 'dialogue-terminal-line';

        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'dialogue-timestamp';
        timestampSpan.textContent = getDialogueTimestamp();

        const speakerSpan = document.createElement('span');
        speakerSpan.className = 'dialogue-speaker dialogue-speaker-x';
        speakerSpan.textContent = 'X:';

        const textSpan = document.createElement('span');
        textSpan.className = 'dialogue-text';

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'dialogue-cursor';
        cursorSpan.textContent = '_';

        lineEl.appendChild(timestampSpan);
        lineEl.appendChild(speakerSpan);
        lineEl.appendChild(textSpan);
        lineEl.appendChild(cursorSpan);

        feedEl.appendChild(lineEl);
        bodyEl.scrollTop = bodyEl.scrollHeight;

        const parts = item.parts || [{ text: item.text }];
        for (let p = 0; p < parts.length; p++) {
          const part = parts[p];
          const partSpan = document.createElement('span');
          if (part.isViolet) {
            partSpan.className = 'violet-word violet-choose';
          }
          textSpan.appendChild(partSpan);

          for (let c = 0; c < part.text.length; c++) {
            partSpan.textContent += part.text[c];
            bodyEl.scrollTop = bodyEl.scrollHeight;
            await new Promise(r => setTimeout(r, 45));
          }
        }

        cursorSpan.remove();
        await new Promise(r => setTimeout(r, 280));
      }

      // Dialogue finished: wait 3 seconds, close terminal, reload page in place (user discovers elections on their own)
      await new Promise(r => setTimeout(r, 3000));

      modal.remove();

      try {
        localStorage.setItem('slop_narrative_step', 'step2_ballot_active');
        localStorage.removeItem('slop_90s_voted');
        localStorage.removeItem('slop_step2_voted');
        sessionStorage.setItem('slop_skip_loader', 'true');
        sessionStorage.setItem('slop_returning_from_article', 'true');
        sessionStorage.setItem('slop_internal_reload', 'true');
      } catch (err) { }

      window.location.reload();
    }

    runDialogueStep2();
  }
  window.showStep2DialogueModal = showStep2DialogueModal;



  // --------------------------------------------------------------------------
  // 7. Final Small Truth Terminal Check (Appears after 45 seconds post-ballot)
  // --------------------------------------------------------------------------
  function checkAndTriggerTruthTerminal() {
    try {
      const isApproved = localStorage.getItem('slop_narrative_step') === 'step2_approved';
      const popupTime = localStorage.getItem('slop_final_popup_time');
      const terminalVisited = localStorage.getItem('slop_terminal_visited') === 'true';

      if (isApproved && !terminalVisited) {
        if (popupTime) {
          const elapsed = Date.now() - parseInt(popupTime, 10);
          if (elapsed >= 45000) {
            showFinalTruthTerminal();
          } else {
            setTimeout(showFinalTruthTerminal, Math.max(0, 45000 - elapsed));
          }
        } else {
          localStorage.setItem('slop_final_popup_time', Date.now().toString());
          setTimeout(showFinalTruthTerminal, 45000);
        }
      }
    } catch (e) { }
  }

  function showFinalTruthTerminal() {
    if (document.getElementById('truth-terminal-backdrop')) return;

    const giantModal = document.getElementById('giant-lore-modal');
    if (giantModal) {
      giantModal.remove();
    }

    const backdrop = document.createElement('div');
    backdrop.id = 'truth-terminal-backdrop';

    const box = document.createElement('div');
    box.id = 'truth-terminal-box';
    box.innerHTML = `<span class="truth-terminal-cursor">_</span>`;

    backdrop.appendChild(box);
    document.body.appendChild(backdrop);

    const goToTruth = () => {
      try {
        localStorage.setItem('slop_terminal_visited', 'true');
      } catch (e) { }
      window.location.href = 'truth.html';
    };

    backdrop.addEventListener('click', goToTruth);
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      goToTruth();
    });
    window.addEventListener('keydown', (e) => {
      if (document.getElementById('truth-terminal-backdrop')) {
        goToTruth();
      }
    });
  }

  window.showFinalTruthTerminal = showFinalTruthTerminal;
  checkAndTriggerTruthTerminal();
});


