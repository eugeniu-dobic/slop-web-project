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

  // Authentic City 12 comments matching rewritten article and mockup
  const defaultEntries = [
    {
      author: "@city12mom",
      location: "Tower Block 9",
      date: "Nov 7, 2084 @ 07:14 EST",
      text: "woke up and my registered home coordinates changed. My kitchen now faces 4.7km east."
    },
    {
      author: "@penthouse_lounge",
      location: "Skyline Sector 1",
      date: "Nov 7, 2084 @ 07:18 EST",
      text: "The western horizon view is finally unobstructed. Worth every complaint we filed."
    },
    {
      author: "@city12dad",
      location: "Central Sector 4",
      date: "Nov 7, 2084 @ 07:29 EST",
      text: "I was wondering why the entire apartment block vibrated between 02:00 and 05:00."
    },
    {
      author: "@user_551",
      location: "Transit Sector 5",
      date: "Nov 7, 2084 @ 07:42 EST",
      text: "My commuter shuttle arrived 4.7 kilometers away from where the station was yesterday."
    },
    {
      author: "@admin",
      location: "Municipal Planning Authority",
      date: "Nov 7, 2084 @ 07:45 EST",
      text: "This was a minor geographic adjustment. Zero buildings were demolished during transit."
    },
    {
      author: "@displaced_84",
      location: "Ward 12 Outer Ring",
      date: "Nov 7, 2084 @ 08:02 EST",
      text: "I just submitted an appeal to the Civic Satisfaction Portal. The confirmation screen says estimated queue time is 19 months."
    },
    {
      author: "@complaint_bot",
      location: "Civic Satisfaction Portal",
      date: "Nov 7, 2084 @ 08:03 EST",
      text: "Thank you for logging ticket #99104-E. Estimated resolution: June 2086. Please remain indoors."
    },
    {
      author: "@displaced_84",
      location: "Ward 12 Outer Ring",
      date: "Nov 7, 2084 @ 08:04 EST",
      text: "are you telling me to stay indoors for 19 months"
    },
    {
      author: "@complaint_bot",
      location: "Civic Satisfaction Portal",
      date: "Nov 7, 2084 @ 08:05 EST",
      text: "Civic compliance optimizes personal satisfaction. Thank you for your inquiry."
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v3_city12');
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

      let stored = localStorage.getItem('slop_guestbook_v3_city12');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 7, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v3_city12', JSON.stringify(entries));
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
