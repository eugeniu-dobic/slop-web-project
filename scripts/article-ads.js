/**
 * Article Ad System: Left Sidebar Ads, Right Gutter Ads, In-Article Post Ads, and Lightbox Zoom
 * Follows borderless design, 15-second respawn, and click-to-zoom lightbox.
 */

window.__articleAdsActive = true;

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
    'content/post_ad/1.png', 'content/post_ad/10.png', 'content/post_ad/11.png', 'content/post_ad/12.png',
    'content/post_ad/13.png', 'content/post_ad/14.png', 'content/post_ad/18302bf1-5315-4275-b5c9-767e6f440dcd.png',
    'content/post_ad/2.png', 'content/post_ad/3.png', 'content/post_ad/4.png', 'content/post_ad/5.png',
    'content/post_ad/6.png', 'content/post_ad/6faa2843-c286-42cc-b8e2-055c1f525fde.png', 'content/post_ad/7.png',
    'content/post_ad/8.png', 'content/post_ad/8bf9c46d-5e21-4609-8f0b-93194afde152.png', 'content/post_ad/9.png',
    'content/post_ad/a61d6cf3-b785-4832-a010-c7b2b3bd0a99.png'
  ];

  const sideAds = [
    'content/side_ad/15.png', 'content/side_ad/16.png', 'content/side_ad/17.png', 'content/side_ad/18.png',
    'content/side_ad/19.png', 'content/side_ad/20.png', 'content/side_ad/21.png', 'content/side_ad/22.png',
    'content/side_ad/23.png', 'content/side_ad/24.png', 'content/side_ad/25.png', 'content/side_ad/26.png',
    'content/side_ad/27.png', 'content/side_ad/28.png', 'content/side_ad/29.png', 'content/side_ad/30.png'
  ];

  function getRandom(arr) {
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
      !e.target.closest('button');

    let zoomSrc = null;
    let zoomAlt = '';

    if (isZoomableImage && e.target.src) {
      zoomSrc = e.target.src;
      zoomAlt = e.target.alt || '';
    } else {
      const postImageContainer = e.target.closest('.post-attached-image-container');
      if (postImageContainer) {
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
    const ad = shuffledRetroAds[retroAdIndex % shuffledRetroAds.length];
    retroAdIndex++;
    return ad;
  }

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
});

