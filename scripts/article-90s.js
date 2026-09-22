/* ==========================================================================
   SLOP 90s ARCHIVE EDITION - CLIENT LOGIC (article-90s.js)
   Features:
   1. Interactive 90s Ballot Booth with Terminal Telemetry & Live Standings
   2. Citizen Guestbook (Web BBS) with submission & dynamic rendering
   3. Animated Retro Visitor Counter
   4. Side Ads rotation & Win95 Lightbox Modal
   ========================================================================== */

// Check if user manually refreshed/reloaded the page
(function checkManualReloadReset() {
  let isInternalDialogueReload = false;
  try {
    if (sessionStorage.getItem('slop_internal_reload') === 'true') {
      isInternalDialogueReload = true;
      sessionStorage.removeItem('slop_internal_reload');
    }
  } catch (e) { }

  const nav = (window.performance && performance.getEntriesByType) ? performance.getEntriesByType('navigation')[0] : null;
  const isManualReload = nav ? (nav.type === 'reload') : (window.performance && window.performance.navigation && window.performance.navigation.type === 1);

  let hasReachedFinalStep = false;
  try {
    hasReachedFinalStep = localStorage.getItem('slop_final_popup_seen') === 'true' ||
      localStorage.getItem('slop_narrative_step') === 'step2_approved';
  } catch (e) { }

  if (isManualReload && !isInternalDialogueReload && hasReachedFinalStep) {
    try {
      localStorage.removeItem('slop_user');
      localStorage.removeItem('slop_narrative_step');
      localStorage.removeItem('slop_lore_ad_inspected');
      localStorage.removeItem('slop_90s_voted');
      localStorage.removeItem('slop_step2_voted');
      localStorage.removeItem('slop_side_ads_overwritten');
      localStorage.removeItem('slop_final_popup_seen');
      localStorage.removeItem('slop_final_popup_time');
      localStorage.removeItem('slop_terminal_visited');
      sessionStorage.removeItem('slop_skip_loader');
      sessionStorage.removeItem('slop_returning_from_article');
    } catch (e) { }
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Interactive 90s Ballot Booth Logic
  // ========================================================================

  const voteBtn = document.getElementById('retro-vote-btn');
  const telemetryBox = document.getElementById('retro-vote-telemetry');
  const candidateRadios = document.querySelectorAll('input[name="retro-candidate"]');

  // Narrative Story Step 2 Detection & Setup
  const narrativeStep = localStorage.getItem('slop_narrative_step');
  const isStep2Active = narrativeStep === 'step2_ballot_active' || narrativeStep === 'step2_approved';

  // "first of all if the user already voted then reset the vote."
  if (narrativeStep === 'step2_ballot_active' && !localStorage.getItem('slop_step2_voted')) {
    try {
      localStorage.removeItem('slop_90s_voted');
    } catch (e) { }
  }

  // "change the retro-ballot-header background to 'misc/post_header.webp'"
  if (isStep2Active) {
    const ballotHeader = document.querySelector('.retro-ballot-header');
    if (ballotHeader) {
      ballotHeader.classList.add('lore-header-active');
      ballotHeader.style.setProperty('background-color', '#000000', 'important');
      ballotHeader.style.setProperty('background-image', "url('content/misc/post_header.webp')", 'important');
      ballotHeader.style.setProperty('background-size', 'cover', 'important');
      ballotHeader.style.setProperty('background-position', 'center', 'important');
      ballotHeader.style.setProperty('background-repeat', 'no-repeat', 'important');
      ballotHeader.style.setProperty('border-bottom', 'none', 'important');
      ballotHeader.style.setProperty('min-height', '54px', 'important');
      ballotHeader.style.setProperty('box-sizing', 'border-box', 'important');
      ballotHeader.style.color = "#111111";
      const h3 = ballotHeader.querySelector('h3');
      if (h3) {
        h3.style.color = "#111111";
        h3.style.textShadow = "none";
      }
      const span = ballotHeader.querySelector('span');
      if (span) {
        span.style.color = "#111111";
        span.style.textShadow = "none";
      }
    }

    // Give perpetual glitchy shake to the ballot box
    const ballotBooth = document.getElementById('retro-ballot-booth') || document.querySelector('.retro-ballot-section');
    if (ballotBooth) {
      ballotBooth.classList.add('lore-glitch-shake');
    }
  }

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
        <a href="index.html" class="retro-submit-vote-btn" style="padding: 6px 14px; font-size: 11px; color: #111111; text-decoration: none;">[ Go to Login Page ]</a>
      `;

      if (telemetryBox && telemetryBox.parentNode) {
        telemetryBox.parentNode.insertBefore(loginBox, telemetryBox);
      }

      const form = loginBox.querySelector('#ballot-login-form');
      if (form) {
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

  function revealTerminalTelemetry(candidate, isInstant, onComplete) {
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
      if (typeof onComplete === 'function') onComplete();
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
        if (typeof onComplete === 'function') onComplete();
      }
    }, 70);
  }

  function handlePostVoteApproval() {
    let approvalEl = document.getElementById('retro-approval-status');
    if (!approvalEl) {
      approvalEl = document.createElement('div');
      approvalEl.id = 'retro-approval-status';
      approvalEl.style.cssText = 'margin-top: 10px; font-family: "Courier New", monospace; font-size: 13px; font-weight: bold; color: #ffcc00; letter-spacing: 0.5px;';
      telemetryBox.appendChild(approvalEl);
    }
    approvalEl.textContent = '> approving...';

    setTimeout(() => {
      approvalEl.innerHTML = '&gt; <span style="color: #00FF66; font-weight: bold; text-shadow: 0 0 8px rgba(0,255,102,0.6);">[Approved]</span>';

      try {
        localStorage.setItem('slop_narrative_step', 'step2_approved');
        localStorage.setItem('slop_step2_voted', 'true');
        localStorage.setItem('slop_side_ads_overwritten', 'true');
        localStorage.setItem('slop_final_popup_time', Date.now().toString());
      } catch (e) { }

      // Make "lore/side_ad_important.webp" appear giant on the screen
      showGiantLoreModal();

      // Gradually replace every side ad with this ad
      if (typeof window.startGradualSideAdReplacement === 'function') {
        window.startGradualSideAdReplacement();
      }

      }, 2000);
  }

  function showGiantLoreModal() {
    if (typeof window.showGiantLoreModal === 'function' && window.showGiantLoreModal !== showGiantLoreModal) {
      window.showGiantLoreModal();
      return;
    }
    const existing = document.getElementById('giant-lore-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'giant-lore-modal';
    modal.innerHTML = `
      <div class="giant-lore-container">
        <button class="ad-post-close giant-lore-close" id="giant-lore-close-btn" aria-label="Close Pop-up" title="Close Pop-up">&times;</button>
        <img src="content/lore/side_transmission_important.webp" class="giant-lore-img" alt="Important Transmission Alert">
      </div>
    `;

    try {
      localStorage.setItem('slop_final_popup_seen', 'true');
    } catch (e) { }

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#giant-lore-close-btn');
    const loreImg = modal.querySelector('.giant-lore-img');

    const closeModal = () => {
      modal.style.transition = 'opacity 0.25s ease';
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.remove();
      }, 250);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    if (loreImg) {
      loreImg.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof window.triggerTruthTransition === 'function') {
          window.triggerTruthTransition();
        } else {
          window.location.href = 'truth.html';
        }
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', onKey);
      }
    };
    document.addEventListener('keydown', onKey);
  }

  window.showGiantLoreModal = showGiantLoreModal;

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
        revealTerminalTelemetry(selected, false, () => {
          const isGlitchHeaderActive = localStorage.getItem('slop_narrative_step') === 'step2_ballot_active' ||
            localStorage.getItem('slop_narrative_step') === 'step2_approved' ||
            (document.querySelector('.retro-ballot-header') && document.querySelector('.retro-ballot-header').classList.contains('lore-header-active'));

          if (isGlitchHeaderActive) {
            handlePostVoteApproval();
          }
        });
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

    if (localStorage.getItem('slop_step2_voted') === 'true') {
      let approvalEl = document.getElementById('retro-approval-status');
      if (!approvalEl) {
        approvalEl = document.createElement('div');
        approvalEl.id = 'retro-approval-status';
        approvalEl.style.cssText = 'margin-top: 10px; font-family: "Courier New", monospace; font-size: 13px; font-weight: bold; color: #00FF66; letter-spacing: 0.5px;';
        approvalEl.innerHTML = '&gt; <span style="color: #00FF66; font-weight: bold;">[Approved]</span>';
        telemetryBox.appendChild(approvalEl);
      }
    }
  } else {
    // Ballot is active or reset: ensure vote button, telemetry, and radios are ready for voting
    if (voteBtn) {
      voteBtn.disabled = false;
      voteBtn.textContent = '[ TRANSMIT BALLOT TO CENTRAL LEDGER ]';
    }
    if (telemetryBox) {
      telemetryBox.style.display = 'none';
      telemetryBox.innerHTML = '';
    }
    candidateRadios.forEach(r => {
      r.disabled = false;
      r.checked = false;
    });
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
