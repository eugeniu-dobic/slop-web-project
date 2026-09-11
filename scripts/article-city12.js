/**
 * Article Interactivity: Government Moves City 12 After Residents Complain About the View
 * Handles comment rendering, live transmission submissions, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const initialComments = [
    {
      author: '@MiamiCommuter',
      avatar: 'content/user.svg',
      timestamp: '6 mins ago',
      text: "The bus route 44 tracker still says arriving in 5 minutes, but the bus stop is currently 70 miles north in open water."
    },
    {
      author: '@CourierDave',
      avatar: 'content/user.svg',
      timestamp: '14 mins ago',
      text: "Delivering mail was impossible today. The entire residential zip code was physically driving down the coast on crawler legs."
    },
    {
      author: '@GPS_User_84',
      avatar: 'content/user.svg',
      timestamp: '22 mins ago',
      text: "My vehicle GPS told me to turn left into the Atlantic Ocean. I thought it was glitched until I saw my office building floating past."
    },
    {
      author: '@LostCitizen',
      avatar: 'content/user.svg',
      timestamp: '31 mins ago',
      text: "Wait, so are we moving back north now? I literally just finished updating my physical address at the municipal registry."
    },
    {
      author: '@Echo_Driver',
      avatar: 'content/user.svg',
      timestamp: '39 mins ago',
      text: "Can someone tell me if street parking rules still apply while the asphalt is actively moving 15 knots per hour?"
    },
    {
      author: '@PostalService_AI',
      avatar: 'content/user.svg',
      timestamp: '45 mins ago',
      text: "Automated Dispatch: Parcel delivery delayed due to unscheduled continental repositioning of recipient municipality."
    },
    {
      author: '@Displaced_Dan',
      avatar: 'content/user.svg',
      timestamp: '52 mins ago',
      text: "My apartment was moved digitally three weeks ago, so I've been paying rent in two different counties simultaneously."
    },
    {
      author: '@CentralConsensus',
      avatar: 'content/user.svg',
      timestamp: '1 hour ago',
      text: "Notice to all citizens: Unauthorized anchoring of private foundations to the continental shelf is strictly prohibited."
    }
  ];

  const commentsList = document.getElementById('article-comments-list');
  const commentCountSpan = document.getElementById('comment-count');
  const authorInput = document.getElementById('new-comment-author');
  const textInput = document.getElementById('new-comment-text');
  const submitBtn = document.getElementById('post-comment-btn');

  let userComments = [];
  try {
    const saved = localStorage.getItem('city12_comments');
    if (saved) userComments = JSON.parse(saved);
  } catch (e) {
    console.error('Error loading comments:', e);
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

  function renderAllComments() {
    if (!commentsList) return;

    const allComments = [...initialComments, ...userComments];
    if (commentCountSpan) {
      commentCountSpan.textContent = `(${allComments.length} Transmissions)`;
    }

    commentsList.innerHTML = allComments.map(c => `
      <li class="comment-item">
        <img class="comment-avatar-img" src="${c.avatar || 'content/user.svg'}" alt="Avatar">
        <div class="comment-body">
          <div class="comment-author">
            ${escapeHtml(c.author)}
            <span class="comment-timestamp">${c.timestamp || 'Just now'}</span>
          </div>
          <div class="comment-text">${escapeHtml(c.text)}</div>
        </div>
      </li>
    `).join('');
  }

  renderAllComments();

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let author = authorInput.value.trim();
      if (!author) {
        author = '@Citizen_' + Math.floor(1000 + Math.random() * 9000);
      } else if (!author.startsWith('@')) {
        author = `@${author}`;
      }

      const text = textInput.value.trim();

      if (!text) {
        textInput.focus();
        textInput.style.borderColor = '#e53e3e';
        setTimeout(() => textInput.style.borderColor = '', 1500);
        return;
      }

      const newComment = {
        author: author,
        avatar: 'content/user.svg',
        timestamp: 'Just now',
        text: text
      };

      userComments.push(newComment);
      try {
        localStorage.setItem('city12_comments', JSON.stringify(userComments));
      } catch (err) {}

      renderAllComments();
      textInput.value = '';

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
