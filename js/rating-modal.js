// Rating Modal and API logic for HydraLibrary
// Requires: FontAwesome, Tailwind, and i18n

const RATING_API_URL = 'https://libraryratingsdb.zxcsixx.workers.dev/api/ratings'; // Update if your worker is on a custom domain
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Client-side cache for ratings
const ratingsCache = {
  data: {},
  lastUpdated: {},
  
  // Get cached data if valid
  get: function(source) {
    const cached = this.data[source];
    const lastUpdated = this.lastUpdated[source];
    
    if (cached && lastUpdated && (Date.now() - lastUpdated) < CACHE_TTL) {
      return Promise.resolve(cached);
    }
    return null;
  },
  
  // Set cache data
  set: function(source, data) {
    this.data[source] = data;
    this.lastUpdated[source] = Date.now();
    return data;
  },
  
  // Batch get multiple sources, returns object with cached and uncached sources
  batchGet: function(sources) {
    const result = {
      cached: {},
      uncached: []
    };
    
    sources.forEach(source => {
      const cached = this.get(source);
      if (cached) {
        result.cached[source] = cached;
      } else {
        result.uncached.push(source);
      }
    });
    
    return result;
  },
  
  // Batch set multiple sources
  batchSet: function(data) {
    Object.entries(data).forEach(([source, ratingData]) => {
      this.set(source, ratingData);
    });
  }
};

// Function to fetch multiple ratings in a single request
async function fetchBatchRatings(sources) {
  if (!sources.length) return {};
  
  try {
    const response = await fetch(`${RATING_API_URL}?batch=true&sources=${sources.join(',')}`);
    if (!response.ok) throw new Error('Failed to fetch ratings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching batch ratings:', error);
    return {};
  }
}

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

// Generate a unique identifier for the user
async function hashIP() {
  try {
    // Try to get a unique fingerprint using available browser APIs
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      navigator.platform,
      new Date().getTimezoneOffset(),
      !!navigator.cookieEnabled,
      navigator.hardwareConcurrency || 0,
      navigator.deviceMemory || 0,
      screen.colorDepth,
      window.screen.orientation?.type || ''
    ];
    
    // Generate a hash from the fingerprint components
    const fingerprint = components.join('|');
    const msgBuffer = new TextEncoder().encode(fingerprint);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Store the hash in session storage for this session
    sessionStorage.setItem('hydra_rating_hash', hashHex);
    
    // Also store in localStorage for persistence across sessions
    if (!localStorage.getItem('hydra_rating_hash')) {
      localStorage.setItem('hydra_rating_hash', hashHex);
    }
    
    return hashHex;
  } catch (error) {
    console.error('Error generating user hash:', error);
    // Fallback to a random string if Web Crypto API is not available
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

// Check if user has recently submitted a rating
function canSubmitRating(source) {
  const RATE_LIMIT_MINUTES = 60; // 1 hour cooldown between submissions
  const storageKey = `rating_submission_${source}`;
  const lastSubmission = localStorage.getItem(storageKey);
  
  if (!lastSubmission) return true;
  
  const lastTime = parseInt(lastSubmission, 10);
  const now = Date.now();
  const cooldown = RATE_LIMIT_MINUTES * 60 * 1000; // Convert minutes to milliseconds
  
  return (now - lastTime) > cooldown;
}

// Record a rating submission
function recordRatingSubmission(source) {
  const storageKey = `rating_submission_${source}`;
  localStorage.setItem(storageKey, Date.now().toString());
}

// Function to update the rating display on a card
function updateCardRatingDisplay(card, ratingData) {
  if (!card || !ratingData) return;
  
  const ratingElement = card.querySelector('.source-rating');
  const ratingCountElement = card.querySelector('.rating-count');
  
  if (ratingElement) {
    ratingElement.textContent = ratingData.average ? ratingData.average.toFixed(1) : 'N/A';
    
    // Update star display
    const starContainer = ratingElement.closest('.rating-display');
    if (starContainer) {
      const stars = Math.round(ratingData.average || 0);
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        starsHtml += i <= stars 
          ? '<i class="fas fa-star text-amber-400"></i> ' 
          : '<i class="far fa-star text-amber-400/30"></i> ';
      }
      starContainer.innerHTML = starsHtml;
    }
  }
  
  if (ratingCountElement) {
    ratingCountElement.textContent = ratingData.count ? `(${ratingData.count})` : '';
  }
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
              
              <!-- Cloudflare Turnstile Widget -->
              <div class="cf-turnstile" data-sitekey="0x4AAAAAABgPUEsL6w8fjG-Z" data-callback="onTurnstileSuccess" data-expired-callback="onTurnstileExpired" data-error-callback="onTurnstileError" data-theme="dark"></div>
              
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
  // Add modal to DOM
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Cloudflare Turnstile callbacks
  window.onTurnstileSuccess = function(token) {
    const submitBtn = document.querySelector('#submit-rating-form button[type="submit"]');
    if (submitBtn) submitBtn.disabled = false;
  };
  
  window.onTurnstileExpired = function() {
    const submitBtn = document.querySelector('#submit-rating-form button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
  };
  
  window.onTurnstileError = function() {
    const submitBtn = document.querySelector('#submit-rating-form button[type="submit"]');
    const errorElement = document.getElementById('rating-form-error');
    if (submitBtn) submitBtn.disabled = true;
    if (errorElement) {
      errorElement.textContent = 'Verification failed. Please try again.';
      errorElement.classList.remove('hidden');
    }
  };
  
  // Add styles for Turnstile widget
  const style = document.createElement('style');
  style.textContent = `
    .cf-turnstile {
      margin: 10px 0;
      max-width: 100%;
      transform: scale(0.9);
      transform-origin: 0 0;
    }
    .cf-turnstile iframe {
      max-width: 100% !important;
    }
  `;
  document.head.appendChild(style);
  
  // Initialize Turnstile widget
  const initTurnstile = () => {
    if (window.turnstile) {
      window.turnstile.render('.cf-turnstile', {
        sitekey: '0x4AAAAAABgPUEsL6w8fjG-Z',
        callback: window.onTurnstileSuccess,
        'expired-callback': window.onTurnstileExpired,
        'error-callback': window.onTurnstileError,
        theme: 'dark'
      });
    } else {
      // If Turnstile script isn't loaded yet, try again shortly
      setTimeout(initTurnstile, 100);
    }
  };
  
  // Start initialization
  initTurnstile();

  // Close modal logic
  modal.querySelector('.close-rating-modal').onclick = removeModal;
  modal.querySelector('.fixed.inset-0').onclick = e => {
    if (e.target === modal.querySelector('.fixed.inset-0')) removeModal();
  };

  // Function to translate text using RapidAPI Google Translate
  async function translateText(text, targetLang = 'en') {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        translate: 'rapidapi'
      });

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
          try {
            const response = JSON.parse(this.responseText);
            if (response && response.translation) {
              resolve(response.translation);
            } else if (response && response.status !== 200) {
              throw new Error(response.business_message || 'Translation service error');
            } else {
              throw new Error('Invalid response from translation service');
            }
          } catch (error) {
            console.error('Translation error:', error, this.responseText);
            reject(error);
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during translation'));
      });

      const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=auto&to=${targetLang}&query=${encodeURIComponent(text)}`;
      xhr.open('POST', url);
      xhr.setRequestHeader('x-rapidapi-key', import.meta.env.VITE_RAPIDAPI_KEY || '');
      xhr.setRequestHeader('x-rapidapi-host', 'free-google-translator.p.rapidapi.com');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(data);
    });
  }

  // Function to create language dropdown
  function createLanguageDropdown(translateBtn, commentElement, originalText) {
    // Remove any existing dropdown
    const existingDropdown = translateBtn.parentNode.querySelector('.translation-dropdown');
    if (existingDropdown) {
      existingDropdown.remove();
      return;
    }

    // Create dropdown container
    const dropdown = document.createElement('div');
    dropdown.className = 'translation-dropdown absolute z-10 mt-1 w-24 bg-gray-800 rounded-md shadow-lg border border-gray-700';
    dropdown.style.top = '100%';
    dropdown.style.right = '0';
    
    // Language options
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'ru', name: 'Русский' },
      { code: 'pt', name: 'Português' }
    ];

    // Add language options to dropdown
    languages.forEach(lang => {
      const option = document.createElement('button');
      option.className = 'block w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700';
      option.textContent = lang.name;
      option.dataset.lang = lang.code;
      option.type = 'button';
      dropdown.appendChild(option);
    });

    // Position dropdown
    translateBtn.parentNode.style.position = 'relative';
    translateBtn.parentNode.appendChild(dropdown);

    // Handle click outside to close dropdown
    const closeDropdown = (e) => {
      if (!dropdown.contains(e.target) && e.target !== translateBtn) {
        dropdown.remove();
        document.removeEventListener('click', closeDropdown);
      }
    };

    // Add event listener after current execution context to prevent immediate trigger
    setTimeout(() => {
      document.addEventListener('click', closeDropdown);
    }, 0);

    // Handle language selection
    dropdown.addEventListener('click', async (e) => {
      const targetLang = e.target.dataset.lang;
      if (!targetLang) return;

      dropdown.remove();
      await performTranslation(translateBtn, commentElement, originalText, targetLang);
    });
  }

  // Function to perform the actual translation
  async function performTranslation(translateBtn, commentElement, originalText, targetLang) {
    // Show loading state
    const originalButtonHTML = translateBtn.innerHTML;
    translateBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i>';
    translateBtn.title = 'Translating...';
    translateBtn.disabled = true;
    
    try {
      const translatedText = await translateText(originalText, targetLang);
      commentElement.textContent = translatedText;
      
      // Update button state
      translateBtn.innerHTML = '<i class="fas fa-undo text-xs"></i><span class="hidden sm:inline">Original</span>';
      translateBtn.classList.add('active');
      translateBtn.title = 'Show original text';
      translateBtn.setAttribute('data-original', originalText);
    } catch (error) {
      console.error('Translation failed:', error);
      commentElement.textContent = originalText;
      translateBtn.innerHTML = '<i class="fas fa-exclamation-triangle text-xs"></i><span class="hidden sm:inline">Error</span>';
      translateBtn.title = 'Error translating. Click to try again.';
    } finally {
      translateBtn.disabled = false;
    }
  }

  // Function to handle comment translation
  function handleTranslateClick(e) {
    // Find the closest translate button from the click target
    const translateBtn = e.target.closest('.translate-comment');
    if (!translateBtn || translateBtn.disabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Find the comment container and text element
    const commentContainer = translateBtn.closest('.border-b');
    const commentElement = commentContainer ? commentContainer.querySelector('.comment-text p') : null;
    if (!commentElement) {
      console.error('Could not find comment text element');
      return;
    }
    
    // Get the original text from data attribute or current content
    let originalText = translateBtn.getAttribute('data-original');
    
    // If already translated, toggle back to original
    if (translateBtn.classList.contains('active')) {
      if (originalText) {
        commentElement.textContent = originalText;
        translateBtn.innerHTML = '<i class="fas fa-language text-xs"></i><span class="hidden sm:inline">Translate</span>';
        translateBtn.classList.remove('active');
        translateBtn.title = 'Translate this review';
        translateBtn.removeAttribute('data-original');
      }
      translateBtn.disabled = false;
      return;
    }
    
    // Store the original text before translation
    originalText = commentElement.textContent.trim();
    
    // Show language selection dropdown
    createLanguageDropdown(translateBtn, commentElement, originalText);
  }
  
  // Add delegated event listener to the comments container
  const commentsContainer = modal.querySelector('#rating-comments-list');
  if (commentsContainer) {
    commentsContainer.addEventListener('click', handleTranslateClick);
  }

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

    // Client-side caching and request management
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL
  let currentPage = 1;
  let currentSort = 'recent';
  let allComments = [];
  let totalReviews = 0;
  let isLoading = false;
  let lastFetchTime = 0;
  let currentSource = source.title;

  // Get cached data if available and not expired
  function getCachedData() {
    const cacheKey = `ratings_${encodeURIComponent(currentSource)}`;
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;
    
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      }
    } catch (e) {
      console.warn('Error reading cache:', e);
    }
    return null;
  }

  // Save data to cache
  function saveToCache(data) {
    try {
      const cacheKey = `ratings_${encodeURIComponent(currentSource)}`;
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (e) {
      console.warn('Error saving to cache:', e);
    }
  }

  // Debounce function to prevent rapid API calls
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Load comments with caching
  async function loadComments(page = 1, forceRefresh = false) {
    if (isLoading) return;
    
    const list = modal.querySelector('#rating-comments-list');
    if (!list) return;
    
    // Show loading state
    list.innerHTML = '<div class="flex justify-center items-center py-6"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>';
    
    // Try to get from cache first if not forcing refresh
    const cacheKey = `ratings_${encodeURIComponent(currentSource)}`;
    const cachedData = forceRefresh ? null : getCachedData();
    
    if (cachedData) {
      console.log('Using cached data for:', currentSource);
      processCommentsData(cachedData, page);
      
      // Update in the background
      if (Date.now() - lastFetchTime > CACHE_TTL) {
        fetchComments(true);
      }
      return;
    }
    
    // No valid cache, fetch fresh data
    await fetchComments();
  }
  
  // Process and display comments data
  function processCommentsData(data, page = 1) {
    const list = modal.querySelector('#rating-comments-list');
    if (!list) return;
    
    // Clear loading state
    list.innerHTML = '';
    
    // Update the source rating display
    if (data.avg !== undefined) {
      const avgRating = parseFloat(data.avg).toFixed(1);
      const totalRatings = parseInt(data.total) || 0;
      
      // Update the rating display in the modal header
      const ratingStars = modal.querySelector('#rating-modal-stars');
      const ratingAvg = modal.querySelector('#rating-modal-avg');
      const ratingTotal = modal.querySelector('#rating-modal-total');
      
      if (ratingStars) {
        ratingStars.innerHTML = '';
        const fullStars = Math.round(parseFloat(data.avg));
        ratingStars.innerHTML = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
      }
      
      if (ratingAvg) {
        ratingAvg.textContent = `${avgRating} out of 5`;
      }
      
      if (ratingTotal) {
        ratingTotal.textContent = `${totalRatings} ${totalRatings === 1 ? 'review' : 'reviews'}`;
      }
    }
    
    if (!data.comments || data.comments.length === 0) {
      list.innerHTML = `
        <div class="text-center py-6 text-gray-400">
          No reviews yet. Be the first to leave a review!
        </div>
      `;
      return;
    }
    
    // Save the data to cache
    saveToCache(data);
    
    // Update pagination info if available
    if (data.pagination) {
      totalReviews = data.pagination.total || 0;
      updatePagination();
    }
    
    // Render comments
    data.comments.forEach(comment => {
      if (!comment) return;
      
      const commentEl = document.createElement('div');
      commentEl.className = 'border-b border-gray-700 py-4';
      
      // Format the timestamp
      const timestamp = comment.timestamp ? new Date(comment.timestamp).getTime() : Date.now();
      
      commentEl.innerHTML = `
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center">
            <div class="text-yellow-400 text-sm">
              ${'★'.repeat(Math.round(comment.rating || 0))}${'☆'.repeat(5 - Math.round(comment.rating || 0))}
            </div>
            <span class="ml-2 text-sm text-gray-400">${(comment.rating || 0).toFixed(1)}</span>
          </div>
          <span class="text-xs text-gray-500">${timeAgo(timestamp)}</span>
        </div>
        <div class="text-sm text-gray-300 mb-2 comment-text">
          <p>${sanitizeHTML(comment.message || comment.comment || '')}</p>
        </div>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>${comment.nickname || 'Anonymous'}</span>
          <button class="translate-comment text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1" 
                  title="Translate to English">
            <i class="fas fa-language text-xs"></i>
            <span class="hidden sm:inline">Translate</span>
          </button>
        </div>
      `;
      list.appendChild(commentEl);
    });
  }
  
  // Update pagination UI
  function updatePagination() {
    const pagination = modal.querySelector('.pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalReviews / 10); // Assuming 10 comments per page
    
    let paginationHTML = `
      <div class="flex justify-between items-center text-sm">
        <button 
          class="px-3 py-1 rounded ${currentPage <= 1 ? 'text-gray-500 cursor-not-allowed' : 'text-emerald-400 hover:bg-gray-700'}"
          ${currentPage <= 1 ? 'disabled' : ''}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${currentPage - 1})"
        >
          Previous
        </button>
        <div class="text-gray-400">
          Page ${currentPage} of ${totalPages}
        </div>
        <button 
          class="px-3 py-1 rounded ${currentPage >= totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-emerald-400 hover:bg-gray-700'}"
          ${currentPage >= totalPages ? 'disabled' : ''}
          onclick="document.querySelector('.rating-modal')._vm.loadPage(${currentPage + 1})"
        >
          Next
        </button>
      </div>
    `;
    
    pagination.innerHTML = paginationHTML;
  }
  
  // Load a specific page of comments (client-side)
  window.loadPage = (page) => {
    if (!currentCommentsData || !currentCommentsData.comments) return;
    
    const totalPages = Math.ceil(currentCommentsData.comments.length / 10);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    updateDisplayedComments();
  };
  
  // Make loadPage available on the modal for pagination
  modal._vm = { loadPage: window.loadPage };
  
  // Debounced version of loadComments
  const debouncedLoadComments = debounce(loadComments, 300);
  
  // Fetch all comments from API with caching
  async function fetchComments(silent = false) {
    if (isLoading) return;
    
    isLoading = true;
    const commentsContainer = modal.querySelector('#rating-comments-list');
    if (!silent && commentsContainer) {
      commentsContainer.innerHTML = '<div class="text-center py-4 text-gray-400">Loading comments...</div>';
    }
    
    const cacheKey = `comments_${currentSource}`; // Single cache key for all comments
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes
    
    // Try to get from cache first
    const cachedData = ratingsCache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp < cacheExpiry)) {
      currentCommentsData = cachedData;
      updateDisplayedComments();
      isLoading = false;
      return;
    }
    
    try {
      // Get all comments at once (no pagination)
      const response = await fetch(`${RATING_API_URL}?source=${encodeURIComponent(currentSource)}&all=true`);
      if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`);
      
      const data = await response.json();
      
      // Store all comments data
      currentCommentsData = {
        ...data,
        comments: data.comments || [],
        pagination: {
          total: data.comments?.length || 0,
          page: 1,
          totalPages: 1,
          perPage: data.comments?.length || 0
        }
      };
      
      // Update cache
      ratingsCache.set(cacheKey, { ...currentCommentsData, timestamp: Date.now() });
      lastFetchTime = Date.now();
      
      // Update the display
      updateDisplayedComments();
    } catch (error) {
      console.error('Error fetching comments:', error);
      // If we have stale cache, use it
      if (cachedData) {
        currentCommentsData = cachedData;
        updateDisplayedComments();
      } else if (!silent && commentsContainer) {
        commentsContainer.innerHTML = `
          <div class="text-red-500 text-center py-4">
            Failed to load comments. Please try again later.
            ${error.message ? `<div class="text-xs mt-1">${error.message}</div>` : ''}
          </div>
        `;
      }
    } finally {
      isLoading = false;
    }
  }
  
  // Update displayed comments based on current page and sort
  function updateDisplayedComments() {
    if (!currentCommentsData || !currentCommentsData.comments) return;
    
    // Sort comments based on current sort option
    const sortedComments = sortComments([...currentCommentsData.comments], currentSort);
    
    // Calculate pagination
    const perPage = 10; // Show 10 comments per page
    const totalPages = Math.ceil(sortedComments.length / perPage);
    const startIdx = (currentPage - 1) * perPage;
    const paginatedComments = sortedComments.slice(startIdx, startIdx + perPage);
    
    // Update pagination info
    currentCommentsData.pagination = {
      total: sortedComments.length,
      page: currentPage,
      totalPages: totalPages,
      perPage: perPage
    };
    
    // Process and display the current page of comments
    processCommentsData({
      ...currentCommentsData,
      comments: paginatedComments,
      pagination: currentCommentsData.pagination
    }, currentPage);
  }

  // Store the current comments data for client-side sorting
  let currentCommentsData = null;
  
  // Sort comments client-side
  function sortComments(comments, sortBy) {
    if (!comments) return [];
    
    const sorted = [...comments];
    
    switch(sortBy) {
      case 'recent':
        return sorted.sort((a, b) => {
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return timeB - timeA; // Newest first
        });
        
      case 'high':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Highest rating first
        
      case 'low':
        return sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0)); // Lowest rating first
        
      default:
        return sorted;
    }
  }
  
  // Initialize sorting dropdown
  function initSorting() {
    const sortSelect = modal.querySelector('#rating-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        currentPage = 1; // Reset to first page when changing sort
        updateDisplayedComments();
      });
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
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Disable submit button by default until reCAPTCHA is verified
  submitBtn.disabled = true;
  
  form.onsubmit = async e => {
    e.preventDefault();
    
    // Reset error state
    errorDiv.textContent = '';
    errorDiv.className = 'mt-1 text-red-400 text-xs min-h-[20px] bg-red-900/30 rounded py-1.5 px-2 border border-red-900/20';
    
    try {
      // Get form data with null checks
      const fd = new FormData(form);
      const nickname = (fd.get('nickname') || '').trim();
      const rating = fd.get('rating');
      const message = (fd.get('comment') || '').trim();
      
      // Verify Turnstile token first
      const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]')?.value;
      if (!turnstileResponse) {
        throw new Error('Please complete the CAPTCHA verification');
      }
      
      // Check rate limiting
      if (!canSubmitRating(currentSource)) {
        // Get the last submission time to show how much time is left
        const storageKey = `rating_submission_${currentSource}`;
        const lastSubmission = parseInt(localStorage.getItem(storageKey) || '0', 10);
        const now = Date.now();
        const cooldown = 60 * 60 * 1000; // 1 hour in milliseconds
        const timeLeft = Math.ceil(((lastSubmission + cooldown) - now) / 60000); // in minutes
        
        throw new Error(`You can only submit one review per hour. Please try again in ${timeLeft} minute${timeLeft !== 1 ? 's' : ''}.`);
      }
      
      // Basic validation
      if (!nickname) {
        throw new Error('Please enter a nickname');
      }
      if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        throw new Error('Please select a valid rating between 1 and 5');
      }
      if (!message || message.split(/\s+/).length < 3) {
        throw new Error('Please enter a message with at least 3 words');
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
      errorDiv.classList.add('hidden');
      
      // Generate IP hash for rate limiting
      const ipHash = await hashIP();
      
      // Record this submission attempt
      recordRatingSubmission(currentSource);
      
      // Prepare form data
      const formData = {
        source: currentSource,
        nickname,
        rating: Number(rating),
        message,
        ipHash,
        turnstileResponse: turnstileResponse || ''
      };
      
      // Submit to API
      const response = await fetch(RATING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit rating');
      }
      
      // Show success message
      showNotification('Rating submitted successfully! It will be visible after moderation.', 'success');
      
      // Close the modal after a short delay
      setTimeout(removeModal, 1500);
      
      // Clear form
      form.reset();
      
      // Reset Turnstile
      if (window.turnstile) {
        window.turnstile.reset();
      }
      
    } catch (error) {
      console.error('Error submitting rating:', error);
      errorDiv.textContent = error.message || 'Failed to submit rating. Please try again.';
      errorDiv.classList.remove('hidden');
      
      // Reset Turnstile on error
      if (window.turnstile) {
        window.turnstile.reset();
      }
    } finally {
      // Reset button state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Submit Review';
      }
    }
  };
}

// Utility function to show notifications using SweetAlert2
function showNotification(message, type = 'success') {
  Swal.fire({
    text: message,
    icon: type,
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast'
    }
  });
}
