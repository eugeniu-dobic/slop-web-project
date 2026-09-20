/**
 * Article Interactivity: Elections 2084
 * Handles interactive ballot voting, ASCII terminal poll telemetry, and live citizen comments.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Interactive Ballot & Terminal Telemetry Logic
  // --------------------------------------------------------------------------
  const radioItems = document.querySelectorAll('.ballot-radio-item');
  const radios = document.querySelectorAll('.ballot-radio');
  const voteBtn = document.getElementById('vote-now-btn');
  const voteHud = document.getElementById('vote-feedback-hud');
  const terminalLog = document.getElementById('terminal-log-stream');
  const terminalPollConsole = document.getElementById('terminal-poll-console');
  const telemetryScreen = document.getElementById('terminal-telemetry-screen');

  let selectedCandidate = null;

  function selectCandidate(candidate) {
    selectedCandidate = candidate;

    radios.forEach(r => {
      r.checked = (r.value === candidate);
    });

    if (voteBtn) {
      voteBtn.disabled = false;
      voteBtn.textContent = `[ CONFIRM VOTE: ${selectedCandidate.toUpperCase()} ]`;
    }
  }

  radios.forEach(r => {
    r.addEventListener('change', () => {
      if (r.checked) {
        selectCandidate(r.value);
      }
    });
  });

  radioItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.matches('.ballot-radio')) return;
      const r = item.querySelector('.ballot-radio');
      if (r) {
        r.checked = true;
        selectCandidate(r.value);
      }
    });
  });

  // Check previous vote in localStorage
  const savedVote = localStorage.getItem('elections_2084_vote');
  if (savedVote) {
    selectCandidate(savedVote);
    revealTerminalTelemetry(savedVote, true);
  }

  if (voteBtn) {
    voteBtn.addEventListener('click', () => {
      if (!selectedCandidate) return;

      voteBtn.disabled = true;
      voteBtn.textContent = '[ TRANSMITTING PACKET TO MAINFRAME... ]';
      voteHud.style.display = 'block';
      voteHud.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Save to localStorage
      localStorage.setItem('elections_2084_vote', selectedCandidate);

      // Terminal logging sequence
      terminalLog.innerHTML = `
        <p>> Initializing encrypted handshake with Central Democracy Cloud...</p>
      `;

      setTimeout(() => {
        terminalLog.innerHTML += `
          <p>> Neural signature verified: <span class="highlight">CITIZEN #940-811-A</span></p>
          <p>> Personal Progress Score™ delta: <span class="highlight">+5.0 Compliance Points</span> applied.</p>
        `;
      }, 600);

      setTimeout(() => {
        terminalLog.innerHTML += `
          <p>> Ballot registered: <span class="highlight">${selectedCandidate.toUpperCase()}</span></p>
          <p class="status-alert">> Your choice matters. Your choice is recorded. Your choice has been analyzed.</p>
        `;
        revealTerminalTelemetry(selectedCandidate, false);
      }, 1200);
    });
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
    if (!terminalPollConsole || !telemetryScreen) return;

    terminalPollConsole.style.display = 'block';
    voteBtn.disabled = true;
    voteBtn.textContent = '[ VOTE RECORDED IN CENTRAL LEDGER ]';

    const targetT = 10; // ~48.4% of 20
    const targetL = 11; // ~51.2% of 20
    const targetB = 9;  // ~42.1% of 20

    if (isInstant) {
      telemetryScreen.textContent = renderAsciiTable(targetT, targetL, targetB);
      voteHud.style.display = 'block';
      return;
    }

    let step = 0;
    const maxSteps = Math.max(targetT, targetL, targetB);
    const interval = setInterval(() => {
      step++;
      const curT = Math.min(step, targetT);
      const curL = Math.min(step, targetL);
      const curB = Math.min(step, targetB);

      telemetryScreen.textContent = renderAsciiTable(curT, curL, curB);

      if (step >= maxSteps) {
        clearInterval(interval);
      }
    }, 70);
  }

  // --------------------------------------------------------------------------
  // 2. Interactive Comments Section Logic
  // --------------------------------------------------------------------------
  const initialComments = [
    {
      author: '@sector_04',
      badge: 'system',
      badgeText: 'Sector 04',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:02 EST',
      text: 'mine says vote already submitted. didnt vote yet'
    },
    {
      author: '@lena_772',
      badge: 'system',
      badgeText: 'Citizen',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:04 EST',
      text: 'same'
    },
    {
      author: '@CivicDad88',
      badge: 'system',
      badgeText: 'Citizen',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:07 EST',
      text: 'probably system delay. happens every election'
    },
    {
      author: '@user_5518',
      badge: 'system',
      badgeText: 'Citizen',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:14 EST',
      text: 'you guys still vote manually?'
    },
    {
      author: '@oldinternetguy',
      badge: 'system',
      badgeText: 'Veteran',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:19 EST',
      text: 'back in my day you had to physically stand somewhere'
    },
    {
      author: '@Sector_12Resident',
      badge: 'system',
      badgeText: 'Sector 12',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:25 EST',
      text: 'polling station is closed but the app says open'
    },
    {
      author: '@admin',
      badge: 'system',
      badgeText: 'Admin',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:26 EST',
      text: 'Please refresh your Civic Interface.'
    },
    {
      author: '@Sector_12Resident',
      badge: 'system',
      badgeText: 'Sector 12',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:27 EST',
      text: 'did that'
    },
    {
      author: '@admin',
      badge: 'system',
      badgeText: 'Admin',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:28 EST',
      text: 'Please refresh again.'
    },
    {
      author: '@user_1883',
      badge: 'system',
      badgeText: 'Citizen',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:35 EST',
      text: 'can we vote for none'
    },
    {
      author: '@admin',
      badge: 'system',
      badgeText: 'Admin',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:36 EST',
      text: 'No.'
    },
    {
      author: '@user_1883',
      badge: 'system',
      badgeText: 'Citizen',
      avatar: 'content/misc/user.svg',
      timestamp: 'Nov 4, 2084 @ 18:38 EST',
      text: 'ok'
    }
  ];


  const commentsList = document.getElementById('article-comments-list');
  const commentCountSpan = document.getElementById('comment-count');
  const authorInput = document.getElementById('new-comment-author');
  const textInput = document.getElementById('new-comment-text');
  const submitBtn = document.getElementById('post-comment-btn');

  // Load custom comments from localStorage
  let userComments = [];
  try {
    const saved = localStorage.getItem('elections_2084_comments');
    if (saved) userComments = JSON.parse(saved);
  } catch (e) {
    console.error('Error loading comments:', e);
  }

  function renderAllComments() {
    if (!commentsList) return;

    const allComments = [...initialComments, ...userComments];
    if (commentCountSpan) {
      commentCountSpan.textContent = `(${allComments.length} Transmissions)`;
    }

    commentsList.innerHTML = allComments.map(c => `
      <li class="comment-item">
        <img class="comment-avatar-img" src="${c.avatar || 'content/misc/user.svg'}" alt="Avatar">
        <div class="comment-body">
          <div class="comment-author">
            ${c.author}
            ${c.badge ? `<span class="candidate-badge-tag ${c.badge}">${c.badgeText}</span>` : ''}
            <span class="comment-timestamp">${c.timestamp || 'Just now'}</span>
          </div>
          <div class="comment-text">${escapeHtml(c.text)}</div>
        </div>
      </li>
    `).join('');
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

  renderAllComments();

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const author = (authorInput.value.trim() || 'Citizen_' + Math.floor(1000 + Math.random() * 9000));
      const text = textInput.value.trim();

      if (!text) {
        textInput.focus();
        textInput.style.borderColor = '#e53e3e';
        setTimeout(() => textInput.style.borderColor = '', 1500);
        return;
      }

      const newComment = {
        author: author.startsWith('@') ? author : `@${author}`,
        badge: selectedCandidate || 'system',
        badgeText: selectedCandidate ? selectedCandidate.toUpperCase() : 'CITIZEN',
        avatar: 'content/misc/user.svg',
        timestamp: 'Just now',
        text: text
      };

      userComments.push(newComment);
      try {
        localStorage.setItem('elections_2084_comments', JSON.stringify(userComments));
      } catch (err) { }

      renderAllComments();
      textInput.value = '';

      // Scroll to bottom of comments
      const lastItem = commentsList.lastElementChild;
      if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Back to top helper
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
