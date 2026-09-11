/* ==========================================================================
   SLOP 90s ARCHIVE EDITION - RIGHT TO FORGET (article-memory-90s.js)
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

  // Authentic Right to Forget comments matching original article dialogue
  const defaultEntries = [
    {
      author: "@LILMIND",
      location: "Sector 4 Cyber Ward",
      date: "Nov 6, 2084 @ 11:42 EST",
      text: "bro I'm deleting 2026 rn"
    },
    {
      author: "@LegalCitizen",
      location: "Consensus Justice Branch",
      date: "Nov 6, 2084 @ 11:39 EST",
      text: "You can't delete government memories."
    },
    {
      author: "@LILMIND",
      location: "Sector 4 Cyber Ward",
      date: "Nov 6, 2084 @ 11:36 EST",
      text: "what"
    },
    {
      author: "@LegalCitizen",
      location: "Consensus Justice Branch",
      date: "Nov 6, 2084 @ 11:33 EST",
      text: "your memory is yours."
    },
    {
      author: "@LILMIND",
      location: "Sector 4 Cyber Ward",
      date: "Nov 6, 2084 @ 11:30 EST",
      text: "then why do y'all have it"
    },
    {
      author: "@LegalCitizen",
      location: "Consensus Justice Branch",
      date: "Nov 6, 2084 @ 11:28 EST",
      text: "different question."
    },
    {
      author: "@MemoryFree_84",
      location: "City 12 District 9",
      date: "Nov 6, 2084 @ 11:15 EST",
      text: "Deleted my ex and my student loans. The bank just contacted me anyway. Guess they keep the archive."
    },
    {
      author: "@CourtObserver",
      location: "Central Legal Monitor",
      date: "Nov 6, 2084 @ 10:55 EST",
      text: "“Justice works better when only one side remembers” has got to be the quote of the century."
    },
    {
      author: "@BrainWiped_01",
      location: "Terminal Null",
      date: "Nov 6, 2084 @ 10:20 EST",
      text: "Wait, what article is this? Where am I?"
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_90s_memory_guestbook');
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
      const loc = locationInput.value.trim() || 'Central Sector';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_90s_memory_guestbook');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 6, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_90s_memory_guestbook', JSON.stringify(entries));
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
    let count = parseInt(localStorage.getItem('slop_90s_memory_counter') || '78214', 10);
    count += 1;
    localStorage.setItem('slop_90s_memory_counter', count.toString());

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
