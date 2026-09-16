/* ==========================================================================
   SLOP 90s ARCHIVE EDITION - KODAK BLACKER GTA 7 (article-kodak-90s.js)
   Features:
   1. Citizen Guestbook (Web BBS) with identical style to 90s elections article
   2. Animated Retro Visitor Counter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Citizen Guestbook / Web BBS Comments Logic (Identical to 90s Elections)
  // ========================================================================

  const guestbookForm = document.getElementById('retro-guestbook-form');
  const authorInput = document.getElementById('retro-author-input');
  const locationInput = document.getElementById('retro-location-input');
  const messageInput = document.getElementById('retro-message-input');
  const entriesContainer = document.getElementById('retro-guestbook-entries');
  const guestbookCount = document.getElementById('retro-guestbook-count');

  // Authentic Kodak in GTA 7 comments matching the original article dialogue
  const defaultEntries = [
    {
      author: "@xXslimjimboXx",
      location: "Vice City Grid",
      date: "Nov 5, 2084 @ 13:02 EST",
      text: "bro this is literally an npc"
    },
    {
      author: "@M4RCO",
      location: "Audio Relay 02",
      date: "Nov 5, 2084 @ 13:05 EST",
      text: "song kinda hard ngl"
    },
    {
      author: "@LilSector",
      location: "Sector 9 Net",
      date: "Nov 5, 2084 @ 13:11 EST",
      text: "does he actually talk or just generate responses"
    },
    {
      author: "@rockstar_fan",
      location: "Rockstar BBS",
      date: "Nov 5, 2084 @ 13:14 EST",
      text: "both apparently"
    },
    {
      author: "@deleted_user",
      location: "",
      date: "Nov 5, 2084 @ 13:18 EST",
      text: "[comment unavailable]"
    },
    {
      author: "@user_004",
      location: "Feed Node 004",
      date: "Nov 5, 2084 @ 13:24 EST",
      text: "why does he look different every trailer"
    },
    {
      author: "@user_004",
      location: "Feed Node 004",
      date: "Nov 5, 2084 @ 13:27 EST",
      text: "that's not what i asked"
    },
    {
      author: "@bot_771",
      location: "Automated Node 771",
      date: "Nov 5, 2084 @ 13:30 EST",
      text: "Kodak Blacker changed my life ❤️"
    },
    {
      author: "@deleted_user",
      location: "",
      date: "Nov 5, 2084 @ 13:30 EST",
      text: "[comment unavailable]"
    },
    {
      author: "@someone",
      location: "Public Terminal",
      date: "Nov 5, 2084 @ 13:31 EST",
      text: "this comment was posted 4 seconds after the article"
    },
    {
      author: "@bot_771",
      location: "Automated Node 771",
      date: "Nov 5, 2084 @ 13:31 EST",
      text: "thank you for your support"
    },
    {
      author: "@someone",
      location: "Public Terminal",
      date: "Nov 5, 2084 @ 13:32 EST",
      text: "bro"
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v2_kodak');
    let entries = stored ? JSON.parse(stored) : defaultEntries;

    entriesContainer.innerHTML = entries.map(item => {
      const isAdmin = item.author && (item.author.toLowerCase() === '@admin' || item.author.toLowerCase() === 'admin');
      const isDeleted = (item.text && (item.text.includes('[comment unavailable]') || item.text.includes('[deleted]'))) || (item.author && item.author.includes('deleted_user'));
      return `
      <div class="retro-entry-card${isAdmin ? ' admin-entry' : ''}">
        <div class="retro-entry-header">
          <span class="retro-entry-author">👤 ${escapeHtml(item.author)}${isAdmin ? ' <span class="retro-admin-badge">[SYS-ADMIN]</span>' : ''} <small style="color: #666;">(${escapeHtml(item.location || 'Vice Sector 12')})</small></span>
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
      const loc = locationInput.value.trim() || 'Vice Sector 12';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_guestbook_v2_kodak');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 5, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v2_kodak', JSON.stringify(entries));
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
    let count = parseInt(localStorage.getItem('slop_90s_kodak_counter') || '62194', 10);
    count += 1;
    localStorage.setItem('slop_90s_kodak_counter', count.toString());

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
