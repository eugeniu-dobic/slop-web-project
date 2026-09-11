/**
 * Article Interactivity: Country Launches Premium Citizenship™
 * Handles comment rendering, live transmission submissions, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const initialComments = [
    {
      author: '@FreeTier_Frank',
      avatar: 'content/user.svg',
      timestamp: '4 mins ago',
      text: "Called emergency dispatch on the free plan and the automated voice said my police response ETA is October 2087."
    },
    {
      author: '@PlusSubscriber_84',
      avatar: 'content/user.svg',
      timestamp: '11 mins ago',
      text: "Honestly $29.99 for Freedom Mode™ is worth every credit. Walked across the municipal park today without triggering the perimeter sirens."
    },
    {
      author: '@TaxPenaltyVictim',
      avatar: 'content/user.svg',
      timestamp: '19 mins ago',
      text: "I forgot to renew my subscription for 12 hours and the revenue algorithm reclassified me as a low-value user and hiked my taxes by 600%."
    },
    {
      author: '@WaitingCitizen',
      avatar: 'content/user.svg',
      timestamp: '28 mins ago',
      text: "Currently #4,198,203 in the free healthcare queue to get a routine checkup. Doctor appointment scheduled for my next reincarnation."
    },
    {
      author: '@CitizenPlus_Enthusiast',
      avatar: 'content/user.svg',
      timestamp: '35 mins ago',
      text: "If you cannot budget $29.99 a month to avoid being classified as a low-value user, that is frankly a personal skill issue."
    },
    {
      author: '@ConsensusMod',
      avatar: 'content/user.svg',
      timestamp: '44 mins ago',
      text: "Public Reminder: Standard free-tier breathing permits remain valid between 08:00 and 17:00 on alternating weekdays."
    },
    {
      author: '@WeatherWatcher',
      avatar: 'content/user.svg',
      timestamp: '53 mins ago',
      text: "My neighbor upgraded to WeatherPass Ultra and summoned a localized micro-tornado over my driveway because I parked too close to his lawn."
    },
    {
      author: '@BudgetGuy',
      avatar: 'content/user.svg',
      timestamp: '1 hour ago',
      text: "Had to cancel my video streaming plan and my nutrient paste subscription just so I could afford crime protection this month."
    }
  ];

  const commentsList = document.getElementById('article-comments-list');
  const commentCountSpan = document.getElementById('comment-count');
  const authorInput = document.getElementById('new-comment-author');
  const textInput = document.getElementById('new-comment-text');
  const submitBtn = document.getElementById('post-comment-btn');

  let userComments = [];
  try {
    const saved = localStorage.getItem('citizenship_comments');
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
        localStorage.setItem('citizenship_comments', JSON.stringify(userComments));
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
