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
      author: "@GTAFAN_2049",
      location: "Sector 12 Neon District",
      date: "Nov 5, 2084 @ 14:22 EST",
      text: "Kodak Blacker in GTA 7 💀"
    },
    {
      author: "@NeuralPhilosopher",
      location: "Vice City Academic Net",
      date: "Nov 5, 2084 @ 14:15 EST",
      text: "It had to happen."
    },
    {
      author: "@xXSlayerXx",
      location: "Dial-up Node 04",
      date: "Nov 5, 2084 @ 14:02 EST",
      text: "is that the real Kodak"
    },
    {
      author: "@NeuralPhilosopher",
      location: "Vice City Academic Net",
      date: "Nov 5, 2084 @ 13:58 EST",
      text: "no"
    },
    {
      author: "@xXSlayerXx",
      location: "Dial-up Node 04",
      date: "Nov 5, 2084 @ 13:55 EST",
      text: "oh"
    },
    {
      author: "@RockstarLeaks_REAL",
      location: "Rockstar Leaks BBS",
      date: "Nov 5, 2084 @ 13:48 EST",
      text: "He got 47 guns and 3 brains."
    },
    {
      author: "@MusicScholar",
      location: "Consensus Sound Archive",
      date: "Nov 5, 2084 @ 13:30 EST",
      text: "This man changed Western culture."
    },
    {
      author: "@NormalPerson",
      location: "Terminal 8080",
      date: "Nov 5, 2084 @ 13:12 EST",
      text: "bro it's just a rapper in GTA"
    },
    {
      author: "@MusicScholar",
      location: "Consensus Sound Archive",
      date: "Nov 5, 2084 @ 13:05 EST",
      text: "you don't get it bro"
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_90s_kodak_guestbook');
    let entries = stored ? JSON.parse(stored) : defaultEntries;

    entriesContainer.innerHTML = entries.map(item => `
      <div class="retro-entry-card">
        <div class="retro-entry-header">
          <span class="retro-entry-author">👤 ${escapeHtml(item.author)} <small style="color: #666;">(${escapeHtml(item.location || 'Vice Sector 12')})</small></span>
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
      const loc = locationInput.value.trim() || 'Vice Sector 12';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_90s_kodak_guestbook');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 5, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_90s_kodak_guestbook', JSON.stringify(entries));
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
