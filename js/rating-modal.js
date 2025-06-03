// Rating Modal and API logic for HydraLibrary
// Requires: FontAwesome, Tailwind, and i18n

const RATING_API_URL = 'https://libraryratingsdb.zxcsixx.workers.dev/api/ratings'; // Update if your worker is on a custom domain

// Format timestamp to relative time (e.g., "2 hours ago")
function timeAgo(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + ' year' + (interval === 1 ? '' : 's') + ' ago';
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + ' month' + (interval === 1 ? '' : 's') + ' ago';
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + ' day' + (interval === 1 ? '' : 's') + ' ago';
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + ' hour' + (interval === 1 ? '' : 's') + ' ago';
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + ' minute' + (interval === 1 ? '' : 's') + ' ago';
  
  return 'just now';
}

function sanitizeHTML(str) {
  return String(str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function hashIP(ip) {
  // Fallback: use localStorage random per browser if no real IP
  let hash = localStorage.getItem('hydra_rating_hash');
  if (!hash) {
    hash = Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('hydra_rating_hash', hash);
  }
  return hash;
}

export function showRatingModal(source) {
  // Remove any existing modal
  document.querySelectorAll('.rating-modal').forEach(m => m.remove());

  const modal = document.createElement('div');
  modal.className = 'rating-modal fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4';
  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"></div>
    <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl max-w-4xl w-full mx-2 sm:mx-4 my-4 max-h-[90vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-white/5 animate-fade-in transform transition-all duration-300 ease-out overflow-hidden">
      <div class="flex flex-col p-4 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex-1 pr-4">
            <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 line-clamp-2">${sanitizeHTML(source.title)}</h2>
            <a href="${sanitizeHTML(source.url)}" target="_blank" class="text-emerald-400/90 text-xs hover:text-emerald-300 transition-all duration-300 hover:underline hover:underline-offset-2 break-all line-clamp-1">
              <i class="fas fa-external-link-alt mr-1"></i>${sanitizeHTML(source.url)}
            </a>
          </div>
          <button class="close-rating-modal text-white/60 hover:text-white hover:bg-white/5 rounded-full h-9 w-9 flex items-center justify-center transition-all duration-200 hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-xl p-4 border border-white/5 shadow-inner">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="text-3xl text-amber-400/90" id="rating-modal-stars"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-white font-bold text-lg" id="rating-modal-avg"></span>
              <span class="text-white/60 text-sm" id="rating-modal-total"></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row gap-3 sm:gap-6 px-3 sm:px-6 pb-3 sm:pb-6 -mt-2 overflow-y-auto flex-1">
        <!-- Left Column - Reviews -->
        <div class="flex-1 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-white/90 font-semibold text-base flex items-center gap-2">
              <i class="fas fa-comments text-emerald-400"></i>
              Community Reviews
            </h3>
            <div class="relative">
              <select id="rating-sort-select" class="appearance-none bg-gray-800/60 border border-gray-700/50 text-white/90 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 px-3 py-1.5 pr-8 transition-all duration-200 hover:bg-gray-800/80 cursor-pointer">
                <option value="recent">Most Recent</option>
                <option value="low">Lowest Rated</option>
                <option value="high">Highest Rated</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <i class="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
          <div class="h-[220px] sm:h-[360px] overflow-y-auto custom-scrollbar rounded-xl bg-gray-900/40 border border-white/5 p-2 sm:p-4 space-y-2 sm:space-y-4 text-sm sm:text-base" id="rating-comments-list">
            <!-- Reviews will be loaded here -->
          </div>
        </div>
        
        <!-- Right Column - Review Form -->
        <div class="md:w-72 w-full flex-shrink-0 mt-3 sm:mt-4 md:mt-0">
          <div class="sticky top-6">
            <div class="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 rounded-t-xl p-4 border-b border-white/5">
              <h3 class="font-medium text-white flex items-center gap-2">
                <i class="fas fa-edit text-emerald-400"></i>
                Share Your Experience
              </h3>
              <p class="mt-1 text-xs text-white/60">Your feedback helps others make better choices</p>
            </div>
            <form id="submit-rating-form" class="flex flex-col space-y-2 sm:space-y-4 bg-gray-900/60 p-3 sm:p-5 rounded-b-xl border border-white/5">
              <div class="space-y-2">
                <label class="text-xs font-medium text-white/80 flex items-center">
                  <i class="fas fa-user-edit text-emerald-400/80 mr-2 text-xs"></i>
                  Nickname
                </label>
                <div class="relative">
                  <input 
                    type="text" 
                    name="nickname" 
                    maxlength="24" 
                    required 
                    placeholder="Your name" 
                    class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-800/70 border border-gray-700/50 text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 transition-all duration-200 placeholder-gray-500"
                  >
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i class="fas fa-user text-gray-500 text-xs"></i>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="text-xs font-medium text-white/80 flex items-center">
                  <i class="fas fa-star text-amber-400/80 mr-2 text-xs"></i>
                  Your Rating
                </label>
                <div class="relative">
                  <select 
                    name="rating" 
                    required 
                    class="appearance-none w-full px-4 py-2.5 pr-10 rounded-lg bg-gray-800/70 border border-gray-700/50 text-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/70 transition-all duration-200 cursor-pointer"
                  >
                    <option value="" disabled selected>Select your rating</option>
                  <option value="5">★★★★★ Excellent</option>
                  <option value="4">★★★★ Very Good</option>
                  <option value="3">★★★ Good</option>
                  <option value="2">★★ Fair</option>
                  <option value="1">★ Poor</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label class="text-xs font-medium text-white/80 flex items-center">
                  <i class="fas fa-comment-alt text-blue-400/80 mr-2 text-xs"></i>
                  Your Review (Optional)
                </label>
                <div class="relative">
                  <textarea 
                    name="comment" 
                    maxlength="500" 
                    rows="4" 
                    placeholder="Share your detailed experience with this source..." 
                    class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-800/70 border border-gray-700/50 text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 transition-all duration-200 placeholder-gray-500 resize-none"
                  ></textarea>
                  <div class="absolute bottom-2 right-2 bg-gray-900/80 px-2 py-0.5 rounded text-xs text-white/50">
                    <span class="char-count">0</span>/500
                  </div>
                </div>
              </div>
              
              <div class="flex items-center justify-between pt-1">
                <div class="text-xs text-white/60 flex items-center">
                  <i class="fas fa-shield-alt text-emerald-400/70 mr-1.5 text-xs"></i>
                  Your review will be moderated
                </div>
                <button 
                  type="submit" 
                  class="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-emerald-500/20"
                >
                  <span class="relative z-10 flex items-center">
                    <i class="fas fa-paper-plane mr-2 text-xs"></i>
                    Submit Review
                  </span>
                  <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </button>
              </div>
              <div id="rating-form-error" class="mt-1 text-red-400 text-xs min-h-[20px] bg-red-900/30 rounded py-1.5 px-2 border border-red-900/20 hidden"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Close modal logic
  modal.querySelector('.close-rating-modal').onclick = removeModal;
  modal.querySelector('.fixed.inset-0').onclick = e => {
    if (e.target === modal.querySelector('.fixed.inset-0')) removeModal();
  };

  // Initialize character counter
  const textarea = modal.querySelector('textarea[name="comment"]');
  const charCount = modal.querySelector('.char-count');
  
  if (textarea && charCount) {
    const updateCharCount = () => {
      charCount.textContent = textarea.value.length;
    };
    
    textarea.addEventListener('input', updateCharCount);
    // Initial update
    updateCharCount();
    
    // Cleanup
    modal._cleanupCharCounter = () => {
      textarea.removeEventListener('input', updateCharCount);
    };
  }

  function removeModal() {
    // Cleanup character counter
    if (modal._cleanupCharCounter) {
      modal._cleanupCharCounter();
    }
    modal.remove();
    document.body.style.overflow = '';
  }

  // Load ratings/comments
  let currentPage = 1;
  let currentSort = 'recent';
  let allComments = [];
  let totalReviews = 0;

  async function loadComments(page = 1) {
    const list = modal.querySelector('#rating-comments-list');
    list.innerHTML = '<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';
    try {
      const url = `${RATING_API_URL}?source=${encodeURIComponent(source.title)}`;
      console.log('Fetching ratings from:', url);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Received ratings data:', data);
      
      // Store all comments and total
      allComments = Array.isArray(data.comments) ? data.comments : [];
      totalReviews = data.total || 0;
      
      console.log('Processed comments:', allComments);
      
      // Render stars and average
      renderStars(data.avg || 0);
      modal.querySelector('#rating-modal-avg').textContent = data.avg ? `${data.avg} / 5` : 'No ratings yet';
      modal.querySelector('#rating-modal-total').textContent = data.total ? `(${data.total} ${data.total === 1 ? 'review' : 'reviews'})` : '';
      
      renderComments(page);
    } catch(e) {
      console.error('Error loading comments:', e);
      list.innerHTML = `
        <div class="text-red-400 text-sm py-4 text-center">
          Failed to load reviews. ${e.message}
        </div>`;
    }
  }

  function renderComments(page = 1) {
    const list = document.getElementById('rating-comments-list');
    if (!list) return;
    
    // Ensure allComments is an array
    const comments = Array.isArray(allComments) ? [...allComments] : [];
    const currentSort = document.getElementById('rating-sort-select')?.value || 'recent';
    
    // Sort comments
    const sortedComments = [...comments].sort((a, b) => {
      if (currentSort === 'recent') {
        return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
      } else if (currentSort === 'low') {
        return (a.rating || 0) - (b.rating || 0) || new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
      } else if (currentSort === 'high') {
        return (b.rating || 0) - (a.rating || 0) || new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
      }
      return 0;
    });
    
    // Pagination
    const pageSize = 10;
    const totalPages = Math.ceil(sortedComments.length / pageSize);
    const currentPage = Math.min(Math.max(1, page), totalPages || 1);
    const pagedComments = sortedComments.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    
    // Render comments
    list.innerHTML = pagedComments.length > 0 ? 
      pagedComments.map(comment => `
        <div class="group relative p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative">
            <!-- Header with user info and rating -->
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-medium">
                  ${comment.nickname ? sanitizeHTML(comment.nickname.charAt(0).toUpperCase()) : '?'}
                </div>
                <div>
                  <div class="font-medium text-white/90">${comment.nickname ? sanitizeHTML(comment.nickname) : 'Anonymous'}</div>
                  <div class="flex items-center gap-1 mt-0.5">
                    <div class="text-amber-400 text-xs flex">
                      ${'★'.repeat(comment.rating || 0)}${'☆'.repeat(5 - (comment.rating || 0))}
                    </div>
                    <span class="text-xs text-white/40">•</span>
                    <span class="text-xs text-white/50" title="${sanitizeHTML(new Date(comment.timestamp || Date.now()).toLocaleString())}">
                      ${sanitizeHTML(timeAgo(comment.timestamp || Date.now()))} 
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-1.5">
                <div class="w-2 h-2 rounded-full ${(comment.rating || 0) >= 3 ? 'bg-emerald-500' : 'bg-amber-500'} shadow-pulse"></div>
                <span class="text-xs ${(comment.rating || 0) >= 3 ? 'text-emerald-400' : 'text-amber-400'}">
                  ${(comment.rating || 0) >= 3 ? 'Positive' : 'Needs Improvement'}
                </span>
              </div>
            </div>
            
            <!-- Comment text -->
            <div class="pl-2 border-l-2 border-emerald-500/30">
              <p class="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                "${comment.message ? sanitizeHTML(comment.message).replace(/\n/g, '<br>') : 'No comment provided'}" 
              </p>
            </div>
            
           
          </div>
        </div>
      `).join('') : 
      `
      <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div class="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
          <i class="far fa-comment-alt text-2xl text-emerald-400/60"></i>
        </div>
        <h4 class="text-white/90 font-medium mb-1">No Reviews Yet</h4>
        <p class="text-white/60 text-sm max-w-xs">Be the first to share your experience with this source!</p>
      </div>
      `;
    
    // Add pagination if needed
    if (totalPages > 1) {
      let pagination = '<div class="flex flex-wrap gap-2 justify-center mt-6 pt-4 border-t border-white/5">';
      
      // Previous button
      if (currentPage > 1) {
        pagination += `
          <button class="px-3 py-1.5 text-xs rounded-md bg-black/40 text-white/70 border border-white/5 hover:bg-black/60 hover:text-white transition-colors" 
                  data-page="${currentPage - 1}">
            <i class="fas fa-chevron-left mr-1"></i> Previous
          </button>`;
      }
      
      // Page numbers
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pagination += `
          <button class="px-3 py-1.5 min-w-[2.25rem] text-xs rounded-md transition-all duration-200 ${
            i === currentPage 
              ? 'bg-emerald-500/90 text-white font-medium shadow-lg shadow-emerald-500/20' 
              : 'bg-black/40 text-white/70 border border-white/5 hover:bg-black/60 hover:text-white'
          }" data-page="${i}">
            ${i}
          </button>`;
      }
      
      // Next button
      if (currentPage < totalPages) {
        pagination += `
          <button class="px-3 py-1.5 text-xs rounded-md bg-black/40 text-white/70 border border-white/5 hover:bg-black/60 hover:text-white transition-colors" 
                  data-page="${currentPage + 1}">
            Next <i class="fas fa-chevron-right ml-1"></i>
          </button>`;
      }
      
      pagination += '</div>';
      list.insertAdjacentHTML('afterend', pagination);
      
      // Add event listeners to pagination buttons
      document.querySelectorAll('#rating-comments-list + div [data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPage = parseInt(btn.dataset.page);
          if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
            renderComments(targetPage);
            window.scrollTo({
              top: list.offsetTop - 20,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }

  // Initialize sorting dropdown
  function initSorting() {
    const sortSelect = modal.querySelector('#rating-sort-select');
    if (sortSelect) {
      sortSelect.value = currentSort;
      sortSelect.onchange = e => {
        currentSort = e.target.value;
        currentPage = 1;
        renderComments(currentPage);
      };
    }
  }
  
  // Initialize the modal
  initSorting();
  loadComments();
  
  // Render star rating
  function renderStars(avg) {
    const stars = modal.querySelector('#rating-modal-stars');
    stars.innerHTML = '';
    for (let i=1; i<=5; ++i) {
      // Using SVG stars for better visual consistency
      if (i <= Math.round(avg)) {
        stars.innerHTML += `<svg class="inline-block w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>`;
      } else {
        stars.innerHTML += `<svg class="inline-block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>`;
      }
    }
  }
  loadComments();

  // Form submission
  const form = modal.querySelector('#submit-rating-form');
  const errorDiv = modal.querySelector('#rating-form-error');
  form.onsubmit = async e => {
    e.preventDefault();
    
    // Reset error state
    errorDiv.textContent = '';
    errorDiv.className = 'text-sm text-rose-400 mt-2';
    
    // Get form data with null checks
    const fd = new FormData(form);
    const nickname = (fd.get('nickname') || '').trim();
    const rating = fd.get('rating');
    const message = (fd.get('comment') || '').trim(); // Changed from 'message' to 'comment'
    
    // Validation
    if (!nickname) {
      errorDiv.textContent = 'Please enter a nickname.';
      return;
    }
    
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      errorDiv.textContent = 'Please select a valid rating between 1 and 5.';
      return;
    }
    
    if (!message) {
      errorDiv.textContent = 'Please enter a message.';
      return;
    }
    
    if (message.split(/\s+/).length < 3) {
      errorDiv.textContent = 'Message must be at least 3 words long.';
      return;
    }
    // Prevent spam: only one per source per hash
    const ipHash = hashIP();
    const key = `hydra_rating_${source.title}_${ipHash}`;
    if (localStorage.getItem(key)) {
      errorDiv.textContent = 'You have already submitted a review for this source.';
      return;
    }
    try {
      const res = await fetch(RATING_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: source.title,
          nickname,
          rating: Number(rating),
          message,
          ipHash
        })
      });
      if (!res.ok) {
        const msg = await res.text();
        errorDiv.textContent = msg || 'Failed to submit.';
        return;
      }
      localStorage.setItem(key, '1');
      form.reset();
      errorDiv.textContent = 'Submitted for moderation!';
      
      // Update the source card rating display by fetching fresh data from the server
      if (window.updateSourceCardRating) {
        await window.updateSourceCardRating(source.title);
      }
      
      loadComments(currentPage);
    } catch(e) {
      errorDiv.textContent = 'Failed to submit.';
    }
  };
}
