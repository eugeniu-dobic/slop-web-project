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
      author: "@courtwatcher",
      location: "Judicial Feed 01",
      date: "Nov 8, 2084 @ 18:30 EST",
      text: "what case is being voted today"
    },
    {
      author: "@JusticeEnjoyer",
      location: "Voting Terminal 9",
      date: "Nov 8, 2084 @ 18:32 EST",
      text: "I voted guilty because the guy looked suspicious"
    },
    {
      author: "@Sector9Dad",
      location: "Sector 9 Resident",
      date: "Nov 8, 2084 @ 18:35 EST",
      text: "that's not how court works"
    },
    {
      author: "@admin",
      location: "Consensus Judicial Mod",
      date: "Nov 8, 2084 @ 18:36 EST",
      text: "Your comment has been flagged as legal misinformation."
    },
    {
      author: "@Sector9Dad",
      location: "Sector 9 Resident",
      date: "Nov 8, 2084 @ 18:37 EST",
      text: "what did i say"
    },
    {
      author: "@admin",
      location: "Consensus Judicial Mod",
      date: "Nov 8, 2084 @ 18:38 EST",
      text: "Your comment has been flagged as legal misinformation."
    },
    {
      author: "@LegalEagle2044",
      location: "Civic Monitor",
      date: "Nov 8, 2084 @ 18:45 EST",
      text: "I voted not guilty and my Civic Score dropped 3 points"
    },
    {
      author: "@user_991",
      location: "Terminal 991",
      date: "Nov 8, 2084 @ 18:47 EST",
      text: "coincidence"
    },
    {
      author: "@courtbot",
      location: "Judicial Automated Relay",
      date: "Nov 8, 2084 @ 18:50 EST",
      text: "Please remember to vote responsibly."
    },
    {
      author: "@user_552",
      location: "District 552",
      date: "Nov 8, 2084 @ 18:52 EST",
      text: "what does responsibly mean"
    },
    {
      author: "@courtbot",
      location: "Judicial Automated Relay",
      date: "Nov 8, 2084 @ 18:53 EST",
      text: "Please vote responsibly."
    },
    {
      author: "@user_552",
      location: "District 552",
      date: "Nov 8, 2084 @ 18:54 EST",
      text: "👍"
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v2_court');
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

      let stored = localStorage.getItem('slop_guestbook_v2_court');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 8, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author.startsWith('@') ? author : `@${author}`,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v2_court', JSON.stringify(entries));
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
