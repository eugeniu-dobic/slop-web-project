/* ==========================================================================
   SLOP 90s ARCHIVE EDITION - CLIENT LOGIC (article-90s.js)
   Features:
   1. Interactive 90s Ballot Booth with Terminal Telemetry & Live Standings
   2. Citizen Guestbook (Web BBS) with submission & dynamic rendering
   3. Animated Retro Visitor Counter
   4. Side Ads rotation & Win95 Lightbox Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Interactive 90s Ballot Booth Logic
  // ========================================================================

  const voteBtn = document.getElementById('retro-vote-btn');
  const telemetryBox = document.getElementById('retro-vote-telemetry');
  const candidateRadios = document.querySelectorAll('input[name="retro-candidate"]');

  // Candidate tallies state
  let voteCounts = {
    thunder: 384192,
    luna: 352104,
    bobby: 271400
  };

  function updateLeaderboard() {
    const total = voteCounts.thunder + voteCounts.luna + voteCounts.bobby;
    const thunderPct = ((voteCounts.thunder / total) * 100).toFixed(1);
    const lunaPct = ((voteCounts.luna / total) * 100).toFixed(1);
    const bobbyPct = ((voteCounts.bobby / total) * 100).toFixed(1);

    const thunderEl = document.getElementById('lb-pct-thunder');
    const lunaEl = document.getElementById('lb-pct-luna');
    const bobbyEl = document.getElementById('lb-pct-bobby');
    const totalEl = document.getElementById('lb-total-votes');

    if (thunderEl) thunderEl.textContent = `${thunderPct}%`;
    if (lunaEl) lunaEl.textContent = `${lunaPct}%`;
    if (bobbyEl) bobbyEl.textContent = `${bobbyPct}%`;
    if (totalEl) totalEl.textContent = total.toLocaleString();
  }

  // Auth state helper
  function getLoggedInUser() {
    try {
      const stored = localStorage.getItem('slop_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function updateBallotCitizenStatus() {
    const statusEl = document.getElementById('ballot-citizen-status');
    if (!statusEl) return;
    const user = getLoggedInUser();
    if (user && user.username) {
      statusEl.innerHTML = `Citizen: <strong>${escapeHtml(user.username)}</strong> <span style="color: var(--retro-green-dark); font-weight: bold;">(Authenticated)</span>`;
    } else {
      statusEl.innerHTML = `* 128-bit State Cipher Encryption Active`;
    }
  }

  function showBallotLoginRequired(onSuccess) {
    let loginBox = document.getElementById('ballot-login-box');
    if (!loginBox) {
      loginBox = document.createElement('div');
      loginBox.id = 'ballot-login-box';
      loginBox.style.cssText = 'margin-top: 12px; padding: 12px; background-color: #FFF4F2; border: 2px solid var(--retro-red); box-shadow: 2px 2px 0px rgba(0,0,0,0.15); font-family: "Verdana", sans-serif;';
      loginBox.innerHTML = `
        <div style="font-family: 'Arial Black', Arial, sans-serif; font-size: 13px; color: var(--retro-red); letter-spacing: 0.5px; margin-bottom: 4px;">
          ⚠️ LOGIN REQUIRED
        </div>
        <p style="margin: 0 0 8px 0; font-size: 11px; color: #222222; line-height: 1.4;">
          State Voting Protocol 2084.B requires citizen authentication before casting your ballot. Please dial in your credentials to authorize transmission:
        </p>
        <form id="ballot-login-form" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <input type="text" id="ballot-username" class="retro-form-input" placeholder="Citizen Handle (e.g. @Echo_84)" required style="flex: 1; min-width: 160px; padding: 5px 8px; font-size: 12px;">
          <input type="password" id="ballot-password" class="retro-form-input" placeholder="Password / PIN" required style="flex: 1; min-width: 120px; padding: 5px 8px; font-size: 12px;">
          <button type="submit" class="retro-submit-vote-btn" style="padding: 6px 14px; font-size: 11px;">[ Dial-In &amp; Cast Vote ]</button>
        </form>
      `;

      if (telemetryBox && telemetryBox.parentNode) {
        telemetryBox.parentNode.insertBefore(loginBox, telemetryBox);
      }

      const form = loginBox.querySelector('#ballot-login-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = loginBox.querySelector('#ballot-username');
        const userVal = userInput && userInput.value ? userInput.value.trim() : 'Citizen_84';
        const formattedUser = userVal.startsWith('@') ? userVal : `@${userVal}`;

        const userData = {
          username: formattedUser,
          date: new Date().toLocaleDateString(),
          posts: Math.floor(Math.random() * 500),
          likes: Math.floor(Math.random() * 10000)
        };

        try {
          localStorage.setItem('slop_user', JSON.stringify(userData));
        } catch (err) { }

        updateBallotCitizenStatus();
        loginBox.remove();

        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      });
    }

    const userInput = loginBox.querySelector('#ballot-username');
    if (userInput) userInput.focus();
    loginBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderAsciiTable(tBlocks, lBlocks, bBlocks) {
    const bar = (filled, total = 20) => '█'.repeat(filled) + '░'.repeat(Math.max(0, total - filled));

    return [
      '+-----------------------------------------------------------------------+',
      '| CENTRAL DEMOCRACY CLOUD // LIVE CITIZEN TELEMETRY [NODE-084]          |',
      '+-----------------------------------------------------------------------+',
      '| CANDIDATE         POLL %    ASCII TELEMETRY METER           RECORDED  |',
      '+-----------------------------------------------------------------------+',
      `| DONALD THUNDER    48.4%     [${bar(tBlocks)}]     8,421,903 |`,
      `| LUNA SERENITY     51.2%     [${bar(lBlocks)}]     8,908,441 |`,
      `| BOBBY FREEDOM     42.1%     [${bar(bBlocks)}]     7,325,410 |`,
      '+-----------------------------------------------------------------------+',
      '| TOTAL CITIZEN TURNOUT: 141.7%     MARGIN OF ERROR: +/- 0.00%          |',
      '| SYSTEM INTEGRITY: 100% COMPLIANT  RECOUNT REQUESTS: ACCESS_DENIED     |',
      '+-----------------------------------------------------------------------+'
    ].join('\n');
  }

  function revealTerminalTelemetry(candidate, isInstant) {
    if (!telemetryBox) return;

    telemetryBox.style.display = 'block';
    voteBtn.disabled = true;
    voteBtn.textContent = '[ VOTE RECORDED IN CENTRAL LEDGER ]';

    candidateRadios.forEach(r => {
      r.disabled = true;
      if (r.value === candidate) r.checked = true;
    });

    const targetT = 10; // ~48.4% of 20
    const targetL = 11; // ~51.2% of 20
    const targetB = 9;  // ~42.1% of 20

    let asciiPre = document.getElementById('retro-ascii-screen');
    if (!asciiPre) {
      asciiPre = document.createElement('pre');
      asciiPre.id = 'retro-ascii-screen';
      asciiPre.style.cssText = 'margin: 10px 0 0 0; font-family: "Courier New", monospace; font-size: 11px; line-height: 1.25; overflow-x: auto; color: #00FF66; white-space: pre; border-top: 1px dashed #2a6138; padding-top: 8px;';
      telemetryBox.appendChild(asciiPre);
    }

    if (isInstant) {
      asciiPre.textContent = renderAsciiTable(targetT, targetL, targetB);
      return;
    }

    let step = 0;
    const maxSteps = Math.max(targetT, targetL, targetB);
    const interval = setInterval(() => {
      step++;
      const curT = Math.min(step, targetT);
      const curL = Math.min(step, targetL);
      const curB = Math.min(step, targetB);

      asciiPre.textContent = renderAsciiTable(curT, curL, curB);

      if (step >= maxSteps) {
        clearInterval(interval);
      }
    }, 70);
  }

  function submitBallotVote(selected) {
    if (!selected) {
      alert("PLEASE SELECT A CANDIDATE BEFORE TRANSMITTING YOUR BALLOT!");
      return;
    }

    const loginBox = document.getElementById('ballot-login-box');
    if (loginBox) loginBox.remove();

    voteBtn.disabled = true;
    voteBtn.textContent = '[ TRANSMITTING TO MAINFRAME... ]';
    telemetryBox.style.display = 'block';

    const candidateNames = {
      thunder: 'DONALD THUNDER™',
      luna: 'LUNA SERENITY™',
      bobby: 'BOBBY FREEDOM™'
    };

    const user = getLoggedInUser();
    const citizenHandle = user ? user.username : '@Citizen_84';

    const lines = [
      "DIALING STATE MAINFRAME AT 28800 BAUD...",
      "CARRIER DETECTED. HANDSHAKE: V.34 OK.",
      `AUTHENTICATING CITIZEN CIPHER: [${citizenHandle}]... VERIFIED.`,
      `ENCRYPTING VOTE PACKET: [${candidateNames[selected]}]...`,
      "TRANSMITTING 512 BYTES VIA SLOP-NET ROUTE 12...",
      "GATEWAY RESPONSE: ACK 200 // VOTE COMMITTED TO ARCHIVE DATABASE.",
      "THANK YOU, CITIZEN. YOUR COOPERATION IS NOTED."
    ];

    telemetryBox.innerHTML = '<div id="retro-telemetry-lines"></div>';
    const linesContainer = document.getElementById('retro-telemetry-lines');
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        if (linesContainer) {
          linesContainer.innerHTML += `&gt; ${lines[i]}<br>`;
        }
        i++;
      } else {
        clearInterval(interval);
        voteCounts[selected] += 1;
        updateLeaderboard();
        localStorage.setItem('slop_90s_voted', selected);
        revealTerminalTelemetry(selected, false);
      }
    }, 180);
  }

  // Check if citizen already voted in this session
  const hasVoted = localStorage.getItem('slop_90s_voted');

  if (hasVoted && voteBtn && telemetryBox) {
    voteBtn.disabled = true;
    voteBtn.textContent = '[ VOTE RECORDED IN CENTRAL LEDGER ]';
    telemetryBox.style.display = 'block';
    telemetryBox.innerHTML = `
      <div id="retro-telemetry-lines">
        &gt; CITIZEN TELEMETRY CACHED: Vote on record for [${hasVoted.toUpperCase()}].<br>
        &gt; MULTIPLE SUBMISSIONS RESTRICTED BY STATE PROTOCOL 2084.B.
      </div>
    `;
    revealTerminalTelemetry(hasVoted, true);
  }

  if (voteBtn) {
    voteBtn.addEventListener('click', (e) => {
      e.preventDefault();

      let selected = null;
      candidateRadios.forEach(r => {
        if (r.checked) selected = r.value;
      });

      // Check if logged in BEFORE submitting vote
      const user = getLoggedInUser();
      if (!user) {
        showBallotLoginRequired(() => {
          let currentSelected = null;
          candidateRadios.forEach(r => {
            if (r.checked) currentSelected = r.value;
          });
          if (currentSelected) {
            submitBallotVote(currentSelected);
          } else {
            alert("CITIZEN AUTHENTICATED! PLEASE SELECT A CANDIDATE AND CLICK SUBMIT.");
          }
        });
        return;
      }

      if (!selected) {
        alert("PLEASE SELECT A CANDIDATE BEFORE TRANSMITTING YOUR BALLOT!");
        return;
      }

      submitBallotVote(selected);
    });
  }

  updateLeaderboard();
  updateBallotCitizenStatus();


  // ========================================================================
  // 2. Citizen Guestbook / Web BBS Comments Logic
  // ========================================================================

  const guestbookForm = document.getElementById('retro-guestbook-form');
  const authorInput = document.getElementById('retro-author-input');
  const locationInput = document.getElementById('retro-location-input');
  const messageInput = document.getElementById('retro-message-input');
  const entriesContainer = document.getElementById('retro-guestbook-entries');
  const guestbookCount = document.getElementById('retro-guestbook-count');

  const defaultEntries = [
    {
      author: "@sector_04",
      location: "Sector 04 Ward",
      date: "Nov 4, 2084 @ 18:02 EST",
      text: "mine says vote already submitted. didnt vote yet"
    },
    {
      author: "@lena_772",
      location: "Terminal 772",
      date: "Nov 4, 2084 @ 18:04 EST",
      text: "same"
    },
    {
      author: "@CivicDad88",
      location: "Residential Quad C",
      date: "Nov 4, 2084 @ 18:07 EST",
      text: "probably system delay. happens every election"
    },
    {
      author: "@user_5518",
      location: "Automated Ward 5",
      date: "Nov 4, 2084 @ 18:14 EST",
      text: "you guys still vote manually?"
    },
    {
      author: "@oldinternetguy",
      location: "Archive Node",
      date: "Nov 4, 2084 @ 18:19 EST",
      text: "back in my day you had to physically stand somewhere"
    },
    {
      author: "@Sector_12Resident",
      location: "Sector 12 Gate",
      date: "Nov 4, 2084 @ 18:25 EST",
      text: "polling station is closed but the app says open"
    },
    {
      author: "@admin",
      location: "Civic System Admin",
      date: "Nov 4, 2084 @ 18:26 EST",
      text: "Please refresh your Civic Interface."
    },
    {
      author: "@Sector_12Resident",
      location: "Sector 12 Gate",
      date: "Nov 4, 2084 @ 18:27 EST",
      text: "did that"
    },
    {
      author: "@admin",
      location: "Civic System Admin",
      date: "Nov 4, 2084 @ 18:28 EST",
      text: "Please refresh again."
    },
    {
      author: "@user_1883",
      location: "Terminal 1883",
      date: "Nov 4, 2084 @ 18:35 EST",
      text: "can we vote for none"
    },
    {
      author: "@admin",
      location: "Civic System Admin",
      date: "Nov 4, 2084 @ 18:36 EST",
      text: "No."
    },
    {
      author: "@user_1883",
      location: "Terminal 1883",
      date: "Nov 4, 2084 @ 18:38 EST",
      text: "ok"
    }
  ];

  function renderGuestbook() {
    if (!entriesContainer) return;
    let stored = localStorage.getItem('slop_guestbook_v2_elections');
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
      const loc = locationInput.value.trim() || 'Network Terminal';
      const text = messageInput.value.trim();

      if (!text) {
        alert('PLEASE ENTER A TRANSMISSION MESSAGE BEFORE SIGNING THE GUESTBOOK!');
        return;
      }

      let stored = localStorage.getItem('slop_guestbook_v2_elections');
      let entries = stored ? JSON.parse(stored) : [...defaultEntries];

      const now = new Date();
      const dateStr = `Nov 4, 2084 @ ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} EST`;

      entries.unshift({
        author: author,
        location: loc,
        date: dateStr,
        text: text
      });

      localStorage.setItem('slop_guestbook_v2_elections', JSON.stringify(entries));
      messageInput.value = '';
      renderGuestbook();
    });
  }

  renderGuestbook();


  // ========================================================================
  // 3. Retro Animated Visitor Counter Logic
  // ========================================================================

  const counterDigitsWrap = document.getElementById('retro-counter-digits');
  if (counterDigitsWrap) {
    let count = parseInt(localStorage.getItem('slop_90s_counter') || '48291', 10);
    count += 1;
    localStorage.setItem('slop_90s_counter', count.toString());

    const formatted = String(count).padStart(7, '0');
    counterDigitsWrap.innerHTML = formatted.split('').map(d => `
      <span class="retro-counter-digit">${d}</span>
    `).join('');
  }


  // ========================================================================
  // 4. Side Ads System & Lightbox Modal (Delegated to scripts/article-ads.js)
  // ========================================================================
  // Handled uniformly across portal and article pages by scripts/article-ads.js

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
