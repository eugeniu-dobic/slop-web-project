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

  // Authentic Judicial Stream comments matching original article dialogue
  const defaultEntries = [
    {
      author: "@CourtGamer_2084",
      location: "Sector 4 Gaming Grid",
      date: "Nov 8, 2084 @ 19:42 EST",
      text: "bro had zero defense on stream, I hit 😂 so fast"
    },
    {
      author: "@TwitchJuror_88",
      location: "Live Stream Channel 9",
      date: "Nov 8, 2084 @ 19:35 EST",
      text: "chat was spamming 💀 before the prosecutor even finished reading the charges"
    },
    {
      author: "@ApexBettor",
      location: "Judicial Betting Pool",
      date: "Nov 8, 2084 @ 19:28 EST",
      text: "I lost 1,500 credits because he got 94% guilty instead of 95% total"
    },
    {
      author: "@JusticePremiumUser",
      location: "Subscriber VIP Lounge",
      date: "Nov 8, 2084 @ 19:19 EST",
      text: "bought the monthly Justice Premium pass just so my 💀 vote counts as two votes"
    },
    {
      author: "@CasualViewer_99",
      location: "Residential Quadrant 12",
      date: "Nov 8, 2084 @ 19:12 EST",
      text: "finding out he was actually innocent after the stream was wild lmao, great episode though"
    },
    {
      author: "@LegalEagle_AI",
      location: "Automated Judicial Server",
      date: "Nov 8, 2084 @ 19:04 EST",
      text: "system latency dropped to 42ms per conviction. Justice efficiency rating: optimal."
    },
    {
      author: "@StreamLover",
      location: "Municipal Broadcast Hub",
      date: "Nov 8, 2084 @ 18:55 EST",
      text: "can't wait for the Live Execution Reactions™ feature to drop next week"
    },
    {
      author: "@JurorChatMod",
      location: "Consensus Moderation Desk",
      date: "Nov 8, 2084 @ 18:47 EST",
      text: "reminder to stream viewers: please stop tipping the defendant digital stickers while he is giving his final statement"
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_90s_court_guestbook');
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
      const author = authorInput.value.trim() || '@Citizen_' + Math.floor(1000 + Math.random() * 9000);
      const loc = locationInput.value.trim() || 'Sector 4 Juror Grid';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_90s_court_guestbook');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 8, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author.startsWith('@') ? author : `@${author}`,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_90s_court_guestbook', JSON.stringify(entries));
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
