/* ==========================================================================
   SLOP 90s ARCHIVE EDITION - PREMIUM CITIZENSHIP (article-citizenship-90s.js)
   Features:
   1. Citizen Guestbook (Web BBS) matching 90s archive portal standard
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

  // Authentic CitizenPlus comments matching original article dialogue
  const defaultEntries = [
    {
      author: "@FreeTier_Frank",
      location: "Waiting Queue Ward 8",
      date: "Nov 9, 2084 @ 18:54 EST",
      text: "Called emergency dispatch on the free plan and the automated voice said my police response ETA is October 2087."
    },
    {
      author: "@PlusSubscriber_84",
      location: "Municipal Park Perimeter",
      date: "Nov 9, 2084 @ 18:47 EST",
      text: "Honestly $29.99 for Freedom Mode™ is worth every credit. Walked across the municipal park today without triggering the perimeter sirens."
    },
    {
      author: "@TaxPenaltyVictim",
      location: "Low-Value Citizen Sector",
      date: "Nov 9, 2084 @ 18:39 EST",
      text: "I forgot to renew my subscription for 12 hours and the revenue algorithm reclassified me as a low-value user and hiked my taxes by 600%."
    },
    {
      author: "@WaitingCitizen",
      location: "Public Clinic Lobby 4",
      date: "Nov 9, 2084 @ 18:30 EST",
      text: "Currently #4,198,203 in the free healthcare queue to get a routine checkup. Doctor appointment scheduled for my next reincarnation."
    },
    {
      author: "@CitizenPlus_Enthusiast",
      location: "Express Lane District",
      date: "Nov 9, 2084 @ 18:23 EST",
      text: "If you cannot budget $29.99 a month to avoid being classified as a low-value user, that is frankly a personal skill issue."
    },
    {
      author: "@ConsensusMod",
      location: "Department of Voluntary Compliance",
      date: "Nov 9, 2084 @ 18:14 EST",
      text: "Public Reminder: Standard free-tier breathing permits remain valid between 08:00 and 17:00 on alternating weekdays."
    },
    {
      author: "@WeatherWatcher",
      location: "Subscribed Atmosphere Zone 2",
      date: "Nov 9, 2084 @ 18:05 EST",
      text: "My neighbor upgraded to WeatherPass Ultra and summoned a localized micro-tornado over my driveway because I parked too close to his lawn."
    },
    {
      author: "@BudgetGuy",
      location: "Budget Housing Block 11",
      date: "Nov 9, 2084 @ 17:58 EST",
      text: "Had to cancel my video streaming plan and my nutrient paste subscription just so I could afford crime protection this month."
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_90s_citizenship_guestbook');
    let entries = stored ? JSON.parse(stored) : defaultEntries;

    entriesContainer.innerHTML = entries.map(item => `
      <div class="retro-entry-card">
        <div class="retro-entry-header">
          <span class="retro-entry-author">👤 ${escapeHtml(item.author)} <small style="color: #666;">(${escapeHtml(item.location || 'Metro Net')})</small></span>
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
      const author = authorInput.value.trim() || '@Citizen_' + Math.floor(1000 + Math.random() * 9000);
      const loc = locationInput.value.trim() || 'Capital District';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_90s_citizenship_guestbook');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 9, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author.startsWith('@') ? author : `@${author}`,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_90s_citizenship_guestbook', JSON.stringify(entries));
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
    let count = parseInt(localStorage.getItem('slop_90s_citizenship_counter') || '98214', 10);
    count += 1;
    localStorage.setItem('slop_90s_citizenship_counter', count.toString());

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
