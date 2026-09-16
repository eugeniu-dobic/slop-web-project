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
      author: "@mia_44",
      location: "Memory Terminal 44",
      date: "Nov 6, 2084 @ 10:14 EST",
      text: "Can I delete my ex"
    },
    {
      author: "@user_0081",
      location: "Archive Node 0081",
      date: "Nov 6, 2084 @ 10:16 EST",
      text: "you can delete the memory. not the archive apparently"
    },
    {
      author: "@echo_echo",
      location: "Sub-Sector 08",
      date: "Nov 6, 2084 @ 10:22 EST",
      text: 'why does mine say "memory retained by authority"'
    },
    {
      author: "@oldschooldad",
      location: "Sector 3 Old Quarter",
      date: "Nov 6, 2084 @ 10:28 EST",
      text: "we used to just forget things naturally"
    },
    {
      author: "@mia_44",
      location: "Memory Terminal 44",
      date: "Nov 6, 2084 @ 10:30 EST",
      text: "how"
    },
    {
      author: "@oldschooldad",
      location: "Sector 3 Old Quarter",
      date: "Nov 6, 2084 @ 10:32 EST",
      text: "idk"
    },
    {
      author: "@user_481",
      location: "Ward 481",
      date: "Nov 6, 2084 @ 10:41 EST",
      text: "can i delete a memory without knowing which memory it is"
    },
    {
      author: "@admin",
      location: "Memory Registry Admin",
      date: "Nov 6, 2084 @ 10:43 EST",
      text: "Yes. Randomized deletion is available with Premium access."
    },
    {
      author: "@user_221",
      location: "Net Cafe 221",
      date: "Nov 6, 2084 @ 10:50 EST",
      text: "can i delete this comment"
    },
    {
      author: "@admin",
      location: "Memory Registry Admin",
      date: "Nov 6, 2084 @ 10:51 EST",
      text: "No."
    },
    {
      author: "@user_221",
      location: "Net Cafe 221",
      date: "Nov 6, 2084 @ 10:52 EST",
      text: "why"
    },
    {
      author: "@admin",
      location: "Memory Registry Admin",
      date: "Nov 6, 2084 @ 10:53 EST",
      text: "This comment is part of a public record."
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v2_memory');
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
      const loc = locationInput.value.trim() || 'Central Sector';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_guestbook_v2_memory');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 6, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v2_memory', JSON.stringify(entries));
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
