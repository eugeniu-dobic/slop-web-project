/* ==========================================================================
   SLOP 90s ARCHIVE EDITION - CITY 12 RELOCATION (article-city12-90s.js)
   Features:
   1. Citizen Guestbook (Web BBS) with identical style to other 90s articles
   2. Animated Retro Visitor Counter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Citizen Guestbook / Web BBS Comments Logic
  // ========================================================================

  const guestbookForm = document.getElementById('retro-guestbook-form');
  const authorInput = document.getElementById('retro-author-input');
  const locationInput = document.getElementById('retro-location-input');
  const messageInput = document.getElementById('retro-message-input');
  const entriesContainer = document.getElementById('retro-guestbook-entries');
  const guestbookCount = document.getElementById('retro-guestbook-count');

  // Authentic City 12 comments matching original article dialogue
  const defaultEntries = [
    {
      author: "@MiamiCommuter",
      location: "City 12 North Terminal",
      date: "Nov 7, 2084 @ 16:42 EST",
      text: "The bus route 44 tracker still says arriving in 5 minutes, but the bus stop is currently 70 miles north in open water."
    },
    {
      author: "@CourierDave",
      location: "Continental Postal Hub",
      date: "Nov 7, 2084 @ 16:34 EST",
      text: "Delivering mail was impossible today. The entire residential zip code was physically driving down the coast on crawler legs."
    },
    {
      author: "@GPS_User_84",
      location: "Highway 101 Overpass",
      date: "Nov 7, 2084 @ 16:26 EST",
      text: "My vehicle GPS told me to turn left into the Atlantic Ocean. I thought it was glitched until I saw my office building floating past."
    },
    {
      author: "@LostCitizen",
      location: "Sector 12 Municipal Hall",
      date: "Nov 7, 2084 @ 16:17 EST",
      text: "Wait, so are we moving back north now? I literally just finished updating my physical address at the municipal registry."
    },
    {
      author: "@Echo_Driver",
      location: "Coastal Transit Lane",
      date: "Nov 7, 2084 @ 16:09 EST",
      text: "Can someone tell me if street parking rules still apply while the asphalt is actively moving 15 knots per hour?"
    },
    {
      author: "@PostalService_AI",
      location: "Automated Dispatch 04",
      date: "Nov 7, 2084 @ 16:03 EST",
      text: "Automated Dispatch: Parcel delivery delayed due to unscheduled continental repositioning of recipient municipality."
    },
    {
      author: "@Displaced_Dan",
      location: "Submerged Ward B",
      date: "Nov 7, 2084 @ 15:56 EST",
      text: "My apartment was moved digitally three weeks ago, so I've been paying rent in two different counties simultaneously."
    },
    {
      author: "@CentralConsensus",
      location: "Consensus Infrastructure",
      date: "Nov 7, 2084 @ 15:48 EST",
      text: "Notice to all citizens: Unauthorized anchoring of private foundations to the continental shelf is strictly prohibited."
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_90s_city12_guestbook');
    let entries = stored ? JSON.parse(stored) : defaultEntries;

    entriesContainer.innerHTML = entries.map(item => `
      <div class="retro-entry-card">
        <div class="retro-entry-header">
          <span class="retro-entry-author">👤 ${escapeHtml(item.author)} <small style="color: #666;">(${escapeHtml(item.location || 'Local Net')})</small></span>
          <span class="retro-entry-date">${escapeHtml(item.date)}</span>
        </div>
        <div class="retro-entry-text">${escapeHtml(item.text)}</div>
      </div>
    `).join('');

    if (guestbookCount) {
      guestbookCount.textContent = `(${entries.length} Entries)`;
    }
  }

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = authorInput.value.trim() || '@Anonymous_Citizen';
      const loc = locationInput.value.trim() || 'Mobile Sector';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_90s_city12_guestbook');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 7, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_90s_city12_guestbook', JSON.stringify(entries));
      messageInput.value = '';
      renderGuestbook();
    });
  }

  renderGuestbook();


  // ========================================================================
  // 2. Retro Animated Visitor Counter Logic
  // ========================================================================

  const counterDigitsWrap = document.getElementById('retro-counter-digits');
  if (counterDigitsWrap) {
    let count = parseInt(localStorage.getItem('slop_90s_city12_counter') || '85902', 10);
    count += 1;
    localStorage.setItem('slop_90s_city12_counter', count.toString());

    const formatted = String(count).padStart(7, '0');
    counterDigitsWrap.innerHTML = formatted.split('').map(d => `
      <span class="retro-counter-digit">${d}</span>
    `).join('');
  }


  // Helper utility
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

});
