/**
 * Article Interactivity: Kodak Blacker™ in GTA 7
 * Handles comment rendering, live transmission submissions, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const initialComments = [
    {
      author: '@GTAFAN_2049',
      avatar: 'content/user.svg',
      timestamp: '5 mins ago',
      text: 'Kodak Blacker in GTA 7 💀'
    },
    {
      author: '@NeuralPhilosopher',
      avatar: 'content/user.svg',
      timestamp: '14 mins ago',
      text: 'It had to happen.'
    },
    {
      author: '@xXSlayerXx',
      avatar: 'content/user.svg',
      timestamp: '22 mins ago',
      text: 'is that the real Kodak'
    },
    {
      author: '@NeuralPhilosopher',
      avatar: 'content/user.svg',
      timestamp: '20 mins ago',
      text: 'no'
    },
    {
      author: '@xXSlayerXx',
      avatar: 'content/user.svg',
      timestamp: '18 mins ago',
      text: 'oh'
    },
    {
      author: '@RockstarLeaks_REAL',
      avatar: 'content/user.svg',
      timestamp: '31 mins ago',
      text: 'He got 47 guns and 3 brains.'
    },
    {
      author: '@MusicScholar',
      avatar: 'content/user.svg',
      timestamp: '42 mins ago',
      text: 'This man changed Western culture.'
    },
    {
      author: '@NormalPerson',
      avatar: 'content/user.svg',
      timestamp: '48 mins ago',
      text: "bro it's just a rapper in GTA"
    },
    {
      author: '@MusicScholar',
      avatar: 'content/user.svg',
      timestamp: '45 mins ago',
      text: "you don't get it bro"
    }
  ];

  const commentsList = document.getElementById('article-comments-list');
  const commentCountSpan = document.getElementById('comment-count');
  const authorInput = document.getElementById('new-comment-author');
  const textInput = document.getElementById('new-comment-text');
  const submitBtn = document.getElementById('post-comment-btn');

  let userComments = [];
  try {
    const saved = localStorage.getItem('kodak_gta7_comments');
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
        localStorage.setItem('kodak_gta7_comments', JSON.stringify(userComments));
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
