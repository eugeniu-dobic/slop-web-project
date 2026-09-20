/* ==========================================================================
   SLOP 90s ARCHIVE EDITION - COURTS DECIDE GUILT (article-court.js)
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

  // Authentic National Court Network comments matching rewritten article and mockup
  const defaultEntries = [
    {
      author: "@juror_8812",
      location: "Pilot District 4",
      date: "Nov 8, 2084 @ 18:14 EST",
      text: "Voted in the pilot last week. Verdict reached in under two hours. Way faster than waiting 11 days for a jury."
    },
    {
      author: "@LegalScholar",
      location: "Sector 2 Civil Chamber",
      date: "Nov 8, 2084 @ 18:22 EST",
      text: "How are 50,000 accounts registered less than 24 hours ago swinging a felony verdict? Calling them 'temporary citizens' is peak government bureaucracy."
    },
    {
      author: "@admin",
      location: "Justice Ministry",
      date: "Nov 8, 2084 @ 18:25 EST",
      text: "Temporary citizen accounts are fully verified under emergency judicial throughput protocols. They are not bots."
    },
    {
      author: "@Sector9Dad",
      location: "District 9 Juror Grid",
      date: "Nov 8, 2084 @ 18:31 EST",
      text: "My weighted vote is only 0.42 because my reliability score dipped when I missed jury duty in 2082."
    },
    {
      author: "@cynic_juror",
      location: "Voting Terminal 3",
      date: "Nov 8, 2084 @ 18:38 EST",
      text: "Active Civic Participation subscription gives me double vote weight and automatic access this Friday."
    },
    {
      author: "@courtbot",
      location: "National Court Network",
      date: "Nov 8, 2084 @ 18:40 EST",
      text: "Civic Participation subscribers receive priority docket feeds. The first nationwide vote opens Friday."
    },
    {
      author: "@user_552",
      location: "District 14",
      date: "Nov 8, 2084 @ 18:48 EST",
      text: "Are we voting on the municipal embezzlement case or the street vendor permit appeal?"
    },
    {
      author: "@courtbot",
      location: "National Court Network",
      date: "Nov 8, 2084 @ 18:49 EST",
      text: "Friday's nationwide voting docket unlocks at 00:01 EST. Please vote responsibly."
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v3_court');
    let entries = stored ? JSON.parse(stored) : defaultEntries;

    entriesContainer.innerHTML = entries.map(item => {
      const isAdmin = item.author && (item.author.toLowerCase() === '@admin' || item.author.toLowerCase() === 'admin');
      const isDeleted = (item.text && (item.text.includes('[comment unavailable]') || item.text.includes('[deleted]'))) || (item.author && item.author.includes('deleted_user'));
      return `
      <div class="retro-entry-card${isAdmin ? ' admin-entry' : ''}">
        <div class="retro-entry-header">
          <span class="retro-entry-author">👤 ${escapeHtml(item.author)}${isAdmin ? ' <span class="retro-admin-badge">[SYS-ADMIN]</span>' : ''} <small style="color: #666;">(${escapeHtml(item.location || 'Local Net')})</small></span>
          <span class="retro-entry-date">${escapeHtml(item.date)}</span>
        </div>
        <div class="retro-entry-text${isDeleted ? ' deleted-text' : ''}">${escapeHtml(item.text)}</div>
      </div>
    `;
    }).join('');

    if (guestbookCount) {
      guestbookCount.textContent = `(${entries.length} Entries)`;
    }
  }

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = authorInput.value.trim() || '@Citizen_' + Math.floor(1000 + Math.random() * 9000);
      const loc = locationInput.value.trim() || 'Sector 4 Juror Grid';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_guestbook_v3_court');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 8, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author.startsWith('@') ? author : `@${author}`,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v3_court', JSON.stringify(entries));
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
    let count = parseInt(localStorage.getItem('slop_90s_court_counter') || '91432', 10);
    count += 1;
    localStorage.setItem('slop_90s_court_counter', count.toString());

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
