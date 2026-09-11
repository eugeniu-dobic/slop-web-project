/**
 * Article Interactivity: Right to Forget™ - Personal Memory Freedom Act
 * Handles comment rendering, live transmission submissions, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const initialComments = [
    {
      author: '@LILMIND',
      avatar: 'content/user.svg',
      timestamp: '4 mins ago',
      text: "bro I'm deleting 2026 rn"
    },
    {
      author: '@LegalCitizen',
      avatar: 'content/user.svg',
      timestamp: '3 mins ago',
      text: "You can't delete government memories."
    },
    {
      author: '@LILMIND',
      avatar: 'content/user.svg',
      timestamp: '3 mins ago',
      text: "what"
    },
    {
      author: '@LegalCitizen',
      avatar: 'content/user.svg',
      timestamp: '2 mins ago',
      text: "your memory is yours."
    },
    {
      author: '@LILMIND',
      avatar: 'content/user.svg',
      timestamp: '1 min ago',
      text: "then why do y'all have it"
    },
    {
      author: '@LegalCitizen',
      avatar: 'content/user.svg',
      timestamp: 'Just now',
      text: "different question."
    },
    {
      author: '@MemoryFree_84',
      avatar: 'content/user.svg',
      timestamp: '12 mins ago',
      text: "Deleted my ex and my student loans. The bank just contacted me anyway. Guess they keep the archive."
    },
    {
      author: '@CourtObserver',
      avatar: 'content/user.svg',
      timestamp: '19 mins ago',
      text: '“Justice works better when only one side remembers” has got to be the quote of the century.'
    },
    {
      author: '@BrainWiped_01',
      avatar: 'content/user.svg',
      timestamp: '27 mins ago',
      text: "Wait, what article is this? Where am I?"
    }
  ];

  const commentsList = document.getElementById('article-comments-list');
  const commentCountSpan = document.getElementById('comment-count');
  const authorInput = document.getElementById('new-comment-author');
  const textInput = document.getElementById('new-comment-text');
  const submitBtn = document.getElementById('post-comment-btn');

  let userComments = [];
  try {
    const saved = localStorage.getItem('memory_act_comments');
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
        localStorage.setItem('memory_act_comments', JSON.stringify(userComments));
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
