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

  // Authentic Premium Citizenship comments matching rewritten article and mockup
  const defaultEntries = [
    {
      author: "@richard_2049",
      location: "Sector 7 Terminal",
      date: "Nov 9, 2084 @ 17:45 EST",
      text: "$29.99 a month just so the hospital triage doesn't make me wait four days in the corridor."
    },
    {
      author: "@LunaSupporter",
      location: "Capital District Node",
      date: "Nov 9, 2084 @ 17:48 EST",
      text: "Signed up for the $0.99 trial this morning. My Civic Trust Score immediately went up 15 points."
    },
    {
      author: "@user_338",
      location: "Queue 338",
      date: "Nov 9, 2084 @ 17:54 EST",
      text: "Wait, so same-day government responses are gone from the standard plan now? How long does standard take?"
    },
    {
      author: "@admin",
      location: "Department of Civic Services",
      date: "Nov 9, 2084 @ 17:55 EST",
      text: "Standard citizen rights remain completely unaffected. Standard response windows average 14 to 28 business weeks."
    },
    {
      author: "@cynic_citizen",
      location: "District 12 Sub-Ward",
      date: "Nov 9, 2084 @ 18:03 EST",
      text: "Read the fine print: if you cancel, they give you a 'temporary reduction of Civic Access privileges'. Basically you can never unsubscribe."
    },
    {
      author: "@admin",
      location: "Department of Civic Services",
      date: "Nov 9, 2084 @ 18:05 EST",
      text: "Cancellation remains voluntary at all times. Civic access bandwidth is dynamically allocated."
    },
    {
      author: "@user_992",
      location: "Metro Ward 4",
      date: "Nov 9, 2084 @ 18:12 EST",
      text: "4 million people signed up in 6 hours lol. Guess everyone took the $0.99 bait."
    },
    {
      author: "@user_772",
      location: "Terminal 772",
      date: "Nov 9, 2084 @ 18:18 EST",
      text: "Does the expanded voting interface option mean my votes count more or does it just give me nicer buttons?"
    },
    {
      author: "@admin",
      location: "Department of Civic Services",
      date: "Nov 9, 2084 @ 18:20 EST",
      text: "Premium subscribers receive enhanced ballot telemetry and priority stream routing."
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v3_citizenship');
    let entries = stored ? JSON.parse(stored) : defaultEntries;

    entriesContainer.innerHTML = entries.map(item => {
      const isAdmin = item.author && (item.author.toLowerCase() === '@admin' || item.author.toLowerCase() === 'admin');
      const isDeleted = (item.text && (item.text.includes('[comment unavailable]') || item.text.includes('[deleted]'))) || (item.author && item.author.includes('deleted_user'));
      return `
      <div class="retro-entry-card${isAdmin ? ' admin-entry' : ''}">
        <div class="retro-entry-header">
          <span class="retro-entry-author">👤 ${escapeHtml(item.author)}${isAdmin ? ' <span class="retro-admin-badge">[SYS-ADMIN]</span>' : ''} <small style="color: #666;">(${escapeHtml(item.location || 'Metro Net')})</small></span>
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
      const loc = locationInput.value.trim() || 'Capital District';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_guestbook_v3_citizenship');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 9, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author.startsWith('@') ? author : `@${author}`,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v3_citizenship', JSON.stringify(entries));
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
