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
      author: "@city12mom",
      location: "Tower Block 9",
      date: "Nov 7, 2084 @ 15:42 EST",
      text: "woke up and my window faces the wrong way now"
    },
    {
      author: "@sector_blue",
      location: "High Rise East",
      date: "Nov 7, 2084 @ 15:45 EST",
      text: "Honestly the new view is better"
    },
    {
      author: "@city12dad",
      location: "Mobile Zone 12",
      date: "Nov 7, 2084 @ 15:51 EST",
      text: "did they move the whole city or just the buildings"
    },
    {
      author: "@admin",
      location: "Municipal Logistics Desk",
      date: "Nov 7, 2084 @ 15:52 EST",
      text: "The city."
    },
    {
      author: "@city12dad",
      location: "Mobile Zone 12",
      date: "Nov 7, 2084 @ 15:53 EST",
      text: "right"
    },
    {
      author: "@user_551",
      location: "Transit Sector 5",
      date: "Nov 7, 2084 @ 16:04 EST",
      text: "my GPS still says old location"
    },
    {
      author: "@user_552",
      location: "Sub-Ward 2",
      date: "Nov 7, 2084 @ 16:06 EST",
      text: "mine too"
    },
    {
      author: "@user_553",
      location: "Coastal Shelf",
      date: "Nov 7, 2084 @ 16:09 EST",
      text: "mine says i live underwater"
    },
    {
      author: "@sector_12",
      location: "Sector 12 Outer Ring",
      date: "Nov 7, 2084 @ 16:15 EST",
      text: "new skyline is fire ngl"
    },
    {
      author: "@complaint_bot",
      location: "Automated Municipal Bot",
      date: "Nov 7, 2084 @ 16:15 EST",
      text: "Thank you for your positive feedback."
    },
    {
      author: "@sector_12",
      location: "Sector 12 Outer Ring",
      date: "Nov 7, 2084 @ 16:16 EST",
      text: "i didn't give feedback"
    },
    {
      author: "@complaint_bot",
      location: "Automated Municipal Bot",
      date: "Nov 7, 2084 @ 16:16 EST",
      text: "Thank you."
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v2_city12');
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
      const author = authorInput.value.trim() || '@Anonymous_Citizen';
      const loc = locationInput.value.trim() || 'Mobile Sector';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_guestbook_v2_city12');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 7, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v2_city12', JSON.stringify(entries));
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
