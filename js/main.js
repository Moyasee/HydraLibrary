import { db } from '../firebase.js';
import { ref, update, get, set } from 'firebase/database';
import { i18n } from '../i18n/index.js';
import connectionManager from '../firebase-connection.js';
import changelogNotification from './changelog-notification.js';

// Ensure changelog notification system is initialized
console.log('Changelog notification system loaded:', changelogNotification);

document.body.classList.add('preloading');

// Initialize connection manager when page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the connection manager
    await connectionManager.initialize();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = preloader.querySelector('.loading-progress');
    const percentageText = preloader.querySelector('.loading-percentage');
    let progress = 0;
    
    // Create a smoother progress animation
    const updateProgress = () => {
        // Calculate the next progress increment
        const remaining = 100 - progress;
        const increment = Math.min(
            remaining * 0.1, // Take 10% of remaining at a time
            Math.max(0.2, Math.random() * 0.8) // Random increment between 0.5 and 2
        );
        
        progress = Math.min(100, progress + increment);
        
        // Update the progress bar and percentage with smooth animation
        progressBar.style.width = `${progress}%`;
        
        // Format percentage to always show one decimal place when not at 100%
        const formattedPercentage = progress < 100 ? progress.toFixed(1) : Math.round(progress);
        percentageText.textContent = `${formattedPercentage}%`;
        
        // Add color transition based on progress
        if (progress < 30) {
            percentageText.className = 'loading-percentage text-sm font-medium text-white/70';
        } else if (progress < 60) {
            percentageText.className = 'loading-percentage text-sm font-medium text-emerald-400/70';
        } else {
            percentageText.className = 'loading-percentage text-sm font-medium text-emerald-400';
        }
        
        // Continue updating until we reach 100%
        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            // When progress reaches 100%, wait 5 seconds before starting transition animation
            setTimeout(() => {
                // Add hiding class to trigger fade out animation
                preloader.classList.add('hiding');
                
                // Remove preloader after animation completes
                preloader.addEventListener('transitionend', () => {
                    preloader.remove();
                    document.body.classList.remove('preloading');
                    // Initialize i18n and language switcher after preloader
                    i18n.updatePageContent();
                    initializeLanguageSwitcher();
                }, { once: true });
            }, 1000); // Wait 5 seconds before hiding
        }
    };
    
    // Initialize i18n and language switcher immediately
    i18n.updatePageContent();
    initializeLanguageSwitcher();
    
    // Add a safety timeout to remove preloader if it gets stuck
    const safetyTimeout = setTimeout(() => {
        if (preloader && document.body.contains(preloader)) {
            console.log('Preloader safety timeout triggered');
            preloader.classList.add('hiding');
            setTimeout(() => {
                preloader.remove();
                document.body.classList.remove('preloading');
            }, 400); // Wait for hiding animation to complete
        }
    }, 4000); // 10 second safety timeout
    
    // Start the progress animation after a short delay
    setTimeout(() => {
        requestAnimationFrame(updateProgress);
    }, 300);
}

// Add this function to initialize the language switcher
function initializeLanguageSwitcher() {
    const languageSwitcher = document.getElementById('language-switcher');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (!languageSwitcher || !languageDropdown) {
        return;
    }
    
    // Remove any existing event listeners
    const newLanguageSwitcher = languageSwitcher.cloneNode(true);
    languageSwitcher.parentNode.replaceChild(newLanguageSwitcher, languageSwitcher);
    
    // Set initial language text
    const currentLang = i18n.getCurrentLocale();
    const langSpan = newLanguageSwitcher.querySelector('span');
    
    if (langSpan) {
        const languageNames = {
            'en': 'English',
            'ru': 'Русский',
            'pt-br': 'Português'
        };
        langSpan.textContent = languageNames[currentLang] || 'English';
    }
    
    // Toggle dropdown
    newLanguageSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isHidden = languageDropdown.classList.contains('hidden');
        
        // Show/hide dropdown
        if (isHidden) {
            languageDropdown.classList.remove('hidden');
            // Add active state to button
            newLanguageSwitcher.classList.add('bg-white/10');
        } else {
            languageDropdown.classList.add('hidden');
            // Remove active state from button
            newLanguageSwitcher.classList.remove('bg-white/10');
        }
    });
    
    // Handle language selection
    const langButtons = languageDropdown.querySelectorAll('button');
    
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = button.dataset.lang;
            i18n.setLocale(lang);
            languageDropdown.classList.add('hidden');
            newLanguageSwitcher.classList.remove('bg-white/10');
            
            if (langSpan) {
                const languageNames = {
                    'en': 'English',
                    'ru': 'Русский',
                    'pt-br': 'Português'
                };
                langSpan.textContent = languageNames[lang] || 'English';
            }
            // Refresh source cards with new language
            displaySources();
            
            // Show/hide VPN banner based on language
            updateVpnBannerVisibility(lang);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!newLanguageSwitcher.contains(e.target)) {
            languageDropdown.classList.add('hidden');
            newLanguageSwitcher.classList.remove('bg-white/10');
        }
    });

    // Update language switcher text
    const updateLanguageSwitcherText = () => {
        const text = languageSwitcher.querySelector('span');
        const languageNames = {
            'en': 'English',
            'ru': 'Русский',
            'pt-br': 'Português'
        };
        text.textContent = languageNames[i18n.currentLocale] || 'English';
    };

    // Listen for language changes
    document.addEventListener('languageChanged', updateLanguageSwitcherText);
    
    // Initialize VPN banner visibility based on current language
    updateVpnBannerVisibility(i18n.currentLocale);
}

// Function to show/hide VPN banner based on language
function updateVpnBannerVisibility(language) {
    const vpnBanner = document.getElementById('vpn-banner');
    if (vpnBanner) {
        if (language === 'ru') {
            vpnBanner.classList.remove('hidden');
        } else {
            vpnBanner.classList.add('hidden');
        }
    }
}

// Update your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Initialize preloader
    try {
        initPreloader();
    } catch (error) {
        console.error('Error initializing preloader:', error);
        // Fallback: Remove preloader and show content
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.remove();
        }
        document.body.classList.remove('preloading');
        i18n.updatePageContent();
        initializeLanguageSwitcher();
    }
    
    // Show cookie consent after preloader
    showCookieConsent();
    
    // Add event listener for accept button
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    const cookieConsent = document.getElementById('cookie-consent');

    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            hideCookieConsent();
            setCookie('cookie-consent', 'accepted', 365);
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener('click', () => {
            hideCookieConsent();
            setCookie('cookie-consent', 'rejected', 365);
        });
    }

    // Function to hide cookie consent banner
    function hideCookieConsent() {
        cookieConsent.classList.add('translate-y-full');
            cookieConsent.addEventListener('transitionend', () => {
                cookieConsent.style.display = 'none';
            }, { once: true });
    }

    // Initialize sorting functionality
    initializeSorting();
    
    // Initialize collapsible filters
    initCollapsibleFilters();
    
    // Fetch sources after preloader animation starts
    setTimeout(() => {
        fetchSources();
    }, 300);
    
    // Initialize modals
    initializeModals();
    
    // Initialize search placeholder
    updateSearchPlaceholder();

    startActivityCleanup();

    // Initialize filter visibility first
    handleFilterVisibility();
    
    // Then set up the mobile filters
    setupMobileFilters();
    
    // Initialize the mobile filters content
    initializeMobileFilters();
    
    // Add resize listener for filter visibility
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleFilterVisibility();
        }, 100);
    });
});

// Initialize sorting functionality
function initializeSorting() {
    try {
        console.log('Initializing sorting...');
        
        // Set up click handlers for sort options
        document.querySelectorAll('.sort-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const sortType = option.getAttribute('data-sort');
                console.log('Sort option clicked:', sortType);
                
                if (sortType) {
                    // Update the active sort UI and save preference
                    updateActiveSortUI(sortType);
                    
                    // Close mobile filters if open
                    const mobileFilters = document.getElementById('mobile-filters');
                    if (mobileFilters && !mobileFilters.classList.contains('hidden')) {
                        mobileFilters.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                    }
                    
                    // Re-display sources with the new sort
                    displaySources();
                }
            });
        });
        
        // Initialize with the saved sort preference or default
        const savedSort = localStorage.getItem('currentSort') || 'hot';
        console.log('Initial sort type:', savedSort);
        
        // Update UI to reflect the current sort
        updateActiveSortUI(savedSort);
        
        // Log initial sort state
        console.log('Sorting initialized with type:', savedSort);
        
    } catch (error) {
        console.error('Error initializing sorting:', error);
    }
}

let sources = [];
let activeStatus = ''; // Instead of: let activeStatuses = new Set();
let activeGamesRange = null; // Will store {min: number, max: number} or null
let currentPage = 1;
const CARDS_PER_PAGE = {
    mobile: 4,     // 1 column × 4 rows
    tablet: 6,     // 2 columns × 3 rows
    desktop: 9,    // 3 columns × 3 rows (1080p)
    wide: 15       // 3 columns × 5 rows (for 1440p)
};

const aboutModal = document.getElementById('about-modal');
const aboutBtn = document.getElementById('about-btn');
const closeAboutBtn = document.getElementById('close-about');

const suggestModal = document.getElementById('suggest-modal');
const suggestBtn = document.getElementById('suggest-btn');
const closeSuggestBtn = document.getElementById('close-suggest');

// Add these constants for rate limiting
const RATE_LIMIT = {
    INSTALL: 5 * 60 * 1000, // 5 minutes between installs of the same source
    COPY: 30 * 1000,        // 30 seconds between copies of the same source
    MAX_PER_DAY: 50         // Maximum actions per source per day
};

// Add these constants at the top of your file
const ACTIVITY_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Add these constants at the top with your other constants
const mobileFiltersBtn = document.getElementById('mobile-filters-btn');
const mobileFiltersModal = document.getElementById('mobile-filters-modal');
const closeMobileFilters = document.getElementById('close-mobile-filters');
const mobileFiltersContent = document.getElementById('mobile-filters-content');
const resetFiltersBtn = document.getElementById('reset-filters');
const applyFiltersBtn = document.getElementById('apply-filters');
const activeFiltersCount = document.getElementById('active-filters-count');

// Add these constants at the top with your other constants
const BREAKPOINTS = {
    tablet: 768  // Changed from 1024 to match md breakpoint
};

// Handle filter visibility
function handleFilterVisibility() {
    const filtersSidebar = document.getElementById('filters-sidebar');
    const mobileFiltersBtn = document.getElementById('mobile-filters-btn')?.parentElement;
    
    if (!filtersSidebar || !mobileFiltersBtn) {
        return;
    }
    
    const isMobile = window.innerWidth < BREAKPOINTS.tablet;
    
    // Set initial states
    filtersSidebar.classList.toggle('hidden', isMobile);
    mobileFiltersBtn.classList.toggle('hidden', !isMobile);
}

// Update the setupMobileFilters function
function setupMobileFilters() {
    const mobileFiltersBtn = document.getElementById('mobile-filters-btn');
    const mobileFiltersModal = document.getElementById('mobile-filters-modal');
    const mobileFiltersContent = mobileFiltersModal?.querySelector('.flex.flex-col.bg-\\[\\#111\\]');
    const modalBackdrop = mobileFiltersModal?.querySelector('.bg-\\[\\#0A0A0A\\]');
    
    if (!mobileFiltersBtn || !mobileFiltersModal || !mobileFiltersContent || !modalBackdrop) {
        return;
    }

    function openModal() {
        // First show the modal container
        mobileFiltersModal.classList.remove('hidden');
        
        // Force a reflow to ensure the transitions work
        mobileFiltersModal.offsetHeight;
        
        // Then animate in the backdrop and content
        modalBackdrop.classList.add('opacity-100');
        mobileFiltersContent.classList.remove('translate-y-full');
        document.body.classList.add('overflow-hidden');
    }

    function closeModal() {
        // First animate out
        modalBackdrop.classList.remove('opacity-100');
        mobileFiltersContent.classList.add('translate-y-full');
        
        // Wait for animation to finish before hiding
        setTimeout(() => {
            mobileFiltersModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300); // Match this with the duration in the CSS (300ms)
    }

    // Show modal when clicking the filters button
    mobileFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    // Close modal when clicking the close button
    const closeMobileFilters = document.getElementById('close-mobile-filters');
    if (closeMobileFilters) {
        closeMobileFilters.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Close modal when clicking outside
    mobileFiltersModal.addEventListener('click', (e) => {
        if (e.target === mobileFiltersModal) {
            closeModal();
        }
    });

    // Add escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileFiltersModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Handle reset filters
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetAllFilters();
            updateActiveFiltersCount();
        });
    }

    // Handle apply filters
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            displaySources();
        });
    }
}

// Update active filters count
function updateActiveFiltersCount() {
    const activeCount = countActiveFilters();
    
    if (activeFiltersCount) {
        if (activeCount > 0) {
            activeFiltersCount.textContent = `${activeCount} active`;
            activeFiltersCount.classList.remove('hidden');
        } else {
            activeFiltersCount.classList.add('hidden');
        }
    }
}

// Count active filters
function countActiveFilters() {
    let count = 0;
    
    if (activeStatus) count++;
    if (activeGamesRange) count++;
    if (localStorage.getItem('currentSort')) count++;
    
    return count;
}

// Reset all filters
function resetAllFilters() {
    activeStatus = '';
    activeGamesRange = null;
    localStorage.removeItem('currentSort');
    
    // Reset UI state
    document.querySelectorAll('.status-filter-btn div').forEach(btn => {
        btn.classList.remove('bg-black/40');
    });
    
    document.querySelectorAll('.games-filter-btn div').forEach(btn => {
        btn.classList.remove('border-emerald-500/20', 'bg-black/40');
        btn.classList.add('border-white/5', 'bg-black/20');
    });
    
    document.querySelectorAll('.sort-option').forEach(btn => {
        btn.classList.remove('bg-white/10', 'text-white');
        btn.classList.add('text-white/70');
    });
    
    displaySources();
}

async function fetchSources() {
    try {
        const response = await fetch('data/resources.json');
        const data = await response.json();
        sources = data.sources;

        // Client-side cache for ratings (5 minutes TTL)
        const RATINGS_CACHE_KEY = 'hydra_ratings_cache';
        const RATINGS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
        
        // Get cached ratings if they exist and are fresh
        const getCachedRatings = () => {
            try {
                const cached = localStorage.getItem(RATINGS_CACHE_KEY);
                if (!cached) return null;
                
                const { timestamp, data } = JSON.parse(cached);
                if (Date.now() - timestamp < RATINGS_CACHE_TTL) {
                    return data;
                }
            } catch (e) {
                console.error('Error reading from cache:', e);
            }
            return null;
        };
        
        // Save ratings to cache
        const cacheRatings = (data) => {
            try {
                localStorage.setItem(RATINGS_CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: data
                }));
            } catch (e) {
                console.error('Error saving to cache:', e);
            }
        };
        
        // Check cache first
        const cachedRatings = getCachedRatings();
        if (cachedRatings) {
            console.log('Using cached ratings data');
            sources.forEach(src => {
                const rating = cachedRatings[src.title] || { avg: 0, total: 0 };
                src.rating = {
                    avg: parseFloat(rating.avg) || 0,
                    total: parseInt(rating.total) || 0
                };
            });
            // Don't return here, continue to load stats
        } else {
            // If no cache, fetch from API
            console.log('Fetching fresh ratings data...');
            try {
                // Extract all source titles
                const sourceTitles = [...new Set(sources.map(src => src.title))]; // Remove duplicates
                console.log(`Fetching ratings for ${sourceTitles.length} sources`);
                
                // Make a single batch request
                const batchUrl = `https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${sourceTitles.map(encodeURIComponent).join(',')}`;
                console.log('Batch API URL:', batchUrl);
                
                const resp = await fetch(batchUrl);
                console.log('Batch response status:', resp.status);
                
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                
                const ratingsData = await resp.json();
                console.log('Received batch ratings data');
                
                // Cache the response
                cacheRatings(ratingsData);
                
                // Update each source with its rating
                sources.forEach(src => {
                    const rating = ratingsData[src.title] || { avg: 0, total: 0 };
                    src.rating = {
                        avg: parseFloat(rating.avg) || 0,
                        total: parseInt(rating.total) || 0
                    };
                });
                
                console.log('All ratings loaded via batch endpoint');
            } catch (e) {
                console.error('Error in batch ratings fetch:', e);
                // Initialize with default ratings if batch fetch fails
                sources.forEach(src => {
                    src.rating = { avg: 0, total: 0 };
                });
            }
        }
        
        // Initialize the sort after all ratings are loaded
        initializeSorting();
        
        // Update filter counts after sources are loaded
        updateFilterCounts();
        
        // Display sources with the current sort applied
        displaySources();
        
        // Load stats from Firebase and then hide preloader
        try {
            await loadSourceStats();
        } finally {
            // Hide preloader after everything is loaded
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        // Force a re-render after preloader hides
                        displaySources();
                    }, 300);
                }
            }, 500);
        }
        
    } catch (error) {
        console.error('Error loading sources:', error);
        
        // Show error message
        const container = document.getElementById('sources-container');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full text-center py-10 px-4">
                    <div class="text-red-400 text-4xl mb-4">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Error Loading Sources</h3>
                    <p class="text-white/70 mb-4">${error.message}</p>
                    <button onclick="location.reload()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <i class="fas fa-sync-alt mr-2"></i> Try Again
                    </button>
                </div>
            `;
        }
        
        // Still hide the preloader even if there was an error
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    }
}

// Modify the loadSourceStats function to properly handle activity and add a timeout
async function loadSourceStats() {
    try {
        // Add a timeout to the Firebase request to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase request timed out')), 5000)
        );
        
        const statsRef = ref(db, 'sources');
        const firestorePromise = get(statsRef);
        
        // Race between the Firebase request and the timeout
        const snapshot = await Promise.race([firestorePromise, timeoutPromise]);
        const stats = snapshot.val();
        
        if (stats) {
            // Update local sources with Firebase stats
            sources = sources.map(source => {
                const sourceId = source.url.replace(/[^a-zA-Z0-9]/g, '_');
                const sourceStats = stats[sourceId]?.stats || { installs: 0, copies: 0, activity: [] };
                
                // Ensure activity is an array
                const activity = Array.isArray(sourceStats.activity) ? sourceStats.activity : [];
                
                // Calculate 24h activity
                const now = Date.now();
                const recentActivity = activity.filter(timestamp => 
                    now - timestamp < ACTIVITY_WINDOW
                ).length;
                
                return {
                    ...source,
                    stats: {
                        ...sourceStats,
                        recentActivity,
                        activity
                    }
                };
            });

            // Update the UI for all sources
            sources.forEach(source => {
                updateSourceStats(source.url, source.stats);
            });
            
            // Cache the stats in localStorage for fallback
            try {
                localStorage.setItem('sourceStats', JSON.stringify(stats));
                localStorage.setItem('statsLastUpdated', Date.now().toString());
            } catch (e) {
                // Ignore storage errors
            }
            
            return true;
        }
        return false;
    } catch (error) {
        // Try to load cached stats from localStorage if Firebase fails
        try {
            const cachedStats = localStorage.getItem('sourceStats');
            if (cachedStats) {
                const stats = JSON.parse(cachedStats);
                
                // Update local sources with cached stats
                sources = sources.map(source => {
                    const sourceId = source.url.replace(/[^a-zA-Z0-9]/g, '_');
                    const sourceStats = stats[sourceId]?.stats || { installs: 0, copies: 0, activity: [] };
                    
                    // Ensure activity is an array
                    const activity = Array.isArray(sourceStats.activity) ? sourceStats.activity : [];
                    
                    // Calculate 24h activity (but might be outdated)
                    const now = Date.now();
                    const recentActivity = activity.filter(timestamp => 
                        now - timestamp < ACTIVITY_WINDOW
                    ).length;
                    
                    return {
                        ...source,
                        stats: {
                            ...sourceStats,
                            recentActivity,
                            activity
                        }
                    };
                });
                
                // Update the UI with cached data
                try {
                    // Use batch endpoint to get all ratings at once
                    const sourceTitles = sources.map(src => encodeURIComponent(src.title)).join(',');
                    const resp = await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?batch=true&sources=${sourceTitles}`);
                    if (resp.ok) {
                        const ratingsData = await resp.json();
                        // Update ratings map with batch data
                        sources.forEach(src => {
                            const rating = ratingsData[src.title] || { avg: 0, total: 0 };
                            ratingsMap[src.title] = {
                                avg: parseFloat(rating.avg) || 0,
                                total: parseInt(rating.total) || 0
                            };
                        });
                    } else {
                        throw new Error('Failed to fetch batch ratings');
                    }
                } catch (e) {
                    console.error('Error fetching batch ratings:', e);
                    // Fallback to individual requests if batch fails
                    await Promise.all(sources.map(async (src) => {
                        try {
                            const resp = await fetch(`https://libraryratingsdb.zxcsixx.workers.dev/api/ratings?source=${encodeURIComponent(src.title)}&page=1`);
                            const data = await resp.json();
                            ratingsMap[src.title] = {
                                avg: typeof data.avg === 'number' ? data.avg : 0,
                                total: typeof data.total === 'number' ? data.total : 0
                            };
                        } catch (e) {
                            console.error(`Error fetching rating for ${src.title}:`, e);
                            ratingsMap[src.title] = { avg: 0, total: 0 };
                        }
                    }));
                }
                
                console.log('Using cached stats from localStorage');
                return true;
            }
        } catch (cacheError) {
            // Ignore cache errors
        }
        
        // Set default stats for all sources if both Firebase and cache fail
        sources = sources.map(source => {
            return {
                ...source,
                stats: {
                    installs: 0,
                    copies: 0,
                    recentActivity: 0,
                    activity: []
                }
            };
        });
        return false;
    }
}

// Add function to show risk alert
function showRiskAlert(callback) {
    // Add blur to the main content
    document.querySelector('main').classList.add('blur-sm', 'transition-all', 'duration-200');
    
    const t = i18n.t.bind(i18n);
    const alertModal = document.createElement('div');
    alertModal.className = 'fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4';
    alertModal.innerHTML = `
        <div class="fixed inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div class="relative bg-[#111] rounded-xl overflow-hidden animate-scale-in max-w-md w-full mx-4">
            <!-- Animated background effects -->
            <div class="absolute inset-0 overflow-hidden">
                <!-- Diagonal stripes -->
                <div class="absolute inset-0" style="
                    background-image: repeating-linear-gradient(
                        45deg,
                        #FF0000 0,
                        #FF0000 1px,
                        transparent 0,
                        transparent 10px
                    );
                    opacity: 0.03;
                "></div>
                
                <!-- Animated gradient -->
                <div class="absolute inset-0 animate-gradient-shift" style="
                    background: linear-gradient(45deg, 
                        rgba(255,0,0,0.1) 0%,
                        transparent 20%,
                        transparent 80%,
                        rgba(255,0,0,0.1) 100%
                    );
                "></div>
                
                <!-- Pulsing border -->
                <div class="absolute inset-0 border border-red-500/20 rounded-xl animate-pulse-border"></div>
            </div>
            
            <!-- Content -->
            <div class="relative p-4 sm:p-6">
                <div class="flex items-start gap-3 sm:gap-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 border border-red-500/20 
                              flex items-center justify-center shrink-0">
                        <i class="fas fa-exclamation-triangle text-red-500 text-sm sm:text-base"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-medium text-white mb-2">${t('modal.warning.title')}</h3>
                        <p class="text-white/70 text-xs sm:text-sm">
                            ${t('modal.warning.message')}
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button class="cancel-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 text-white/70 hover:text-white transition-colors">
                        ${t('modal.warning.cancel')}
                    </button>
                    <button class="proceed-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        ${t('modal.warning.confirm')}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(alertModal);

    const removeModal = () => {
        // Remove blur from main content
        document.querySelector('main').classList.remove('blur-sm');
        alertModal.remove();
    };

    // Handle button clicks
    alertModal.querySelector('.cancel-btn').addEventListener('click', () => {
        removeModal();
        callback(false);
    });

    alertModal.querySelector('.proceed-btn').addEventListener('click', () => {
        removeModal();
        callback(true);
    });

    // Close on backdrop click
    alertModal.querySelector('.fixed.inset-0').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            removeModal();
            callback(false);
        }
    });
}

// Add function to show age verification dialog
function showAgeVerification(callback) {
    // Add blur to the main content
    document.querySelector('main').classList.add('blur-sm', 'transition-all', 'duration-200');
    
    const t = i18n.t.bind(i18n);
    const alertModal = document.createElement('div');
    alertModal.className = 'fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4';
    alertModal.innerHTML = `
        <div class="fixed inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div class="relative bg-[#111] rounded-xl overflow-hidden animate-scale-in max-w-md w-full mx-4">
            <!-- Animated background effects -->
            <div class="absolute inset-0 overflow-hidden">
                <!-- Diagonal stripes -->
                <div class="absolute inset-0" style="
                    background-image: repeating-linear-gradient(
                        45deg,
                        #FF0000 0,
                        #FF0000 1px,
                        transparent 0,
                        transparent 10px
                    );
                    opacity: 0.03;
                "></div>

                <!-- Animated gradient -->
                <div class="absolute inset-0 animate-gradient-shift" style="
                    background: linear-gradient(45deg, 
                        rgba(255,0,0,0.1) 0%,
                        transparent 20%,
                        transparent 80%,
                        rgba(255,0,0,0.1) 100%
                    );
                "></div>

                <!-- Pulsing border -->
                <div class="absolute inset-0 border border-red-500/20 rounded-xl animate-pulse-border"></div>
            </div>

            <!-- Content -->
            <div class="relative p-4 sm:p-6">
                <div class="flex items-start gap-3 sm:gap-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 border border-red-500/20 
                              flex items-center justify-center shrink-0">
                        <i class="fas fa-exclamation-triangle text-red-500 text-sm sm:text-base"></i>
                    </div>
                    <div>
                        <h3 class="text-base sm:text-lg font-medium text-white mb-2">
                            ${t('ageVerification.title')}
                        </h3>
                        <p class="text-white/70 text-xs sm:text-sm">
                            ${t('ageVerification.message')}
                        </p>
                        <p class="text-red-400/70 text-xs mt-2">
                            ${t('ageVerification.warning')}
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <button class="cancel-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 text-white/70 hover:text-white transition-colors">
                        ${t('ageVerification.cancel')}
                    </button>
                    <button class="proceed-btn px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        ${t('ageVerification.confirm')}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(alertModal);

    const removeModal = () => {
        // Remove blur from main content
        document.querySelector('main').classList.remove('blur-sm');
        alertModal.remove();
    };

    // Handle button clicks
    alertModal.querySelector('.cancel-btn').addEventListener('click', () => {
        removeModal();
        callback(false);
    });

    alertModal.querySelector('.proceed-btn').addEventListener('click', () => {
        removeModal();
        callback(true);
    });

    // Close on backdrop click
    alertModal.querySelector('.fixed.inset-0').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            removeModal();
            callback(false);
        }
    });
}

import { showRatingModal } from './rating-modal.js';
// Add source translations
const sourceTranslations = {
    en: {
        'RuTracker | All Categories': {
            title: 'RuTracker | All Categories',
            description: 'The source created by Kakitu for Hydra Launcher.'
        },
        'FitGirl': {
            title: 'FitGirl',
            description: 'Home archivist to web\'s top game repacker: the ultimate source for trustworthy games.'
        },
        'SteamRip [DIRECT DOWNLOAD / NO TORRENT]': {
            title: 'SteamRip [DIRECT DOWNLOAD / NO TORRENT]',
            description: 'Pre-installed games with original content, uncompressed, and sourced reliably.'
        },
        'David Kazumi': {
            title: 'David Kazumi',
            description: 'David Kazumi\'s source, for Hydra Launcher. Well known across the Hydra Launcher community server.'
        },
        'CrackStatus': {
            title: 'CrackStatus',
            description: 'Latest updates on game cracks and releases.'
        },
        'AtopGames': {
            title: 'AtopGames',
            description: 'Unaltered pre-installed games sourced from multiple trustworthy names in the community.'
        },
        'DODI': {
            title: 'DODI',
            description: 'Renowned brand in pirated video games, this repacker is among the finest in the field'
        },
        'HydraSources(RUSSIAN)': {
            title: 'HydraSources(RUSSIAN)',
            description: 'Source that was created by the russian guy called HydraSources, updating almost daily. If you are a russian user, this is the source you should use.'
        },
        'Empress': {
            title: 'Empress',
            description: 'For games cracked by EMPRESS.'
        }
    },
    ru: {
        'RuTracker | All Categories': {
            title: 'RuTracker | Все категории',
            description: 'Источник, созданный Kakitu для Hydra Launcher.'
        },
        'FitGirl': {
            title: 'FitGirl',
            description: 'Домашний архивист лучшего в сети репакера игр: надежный источник проверенных игр.'
        },
        'SteamRip [DIRECT DOWNLOAD / NO TORRENT]': {
            title: 'SteamRip [ПРЯМОЕ СКАЧИВАНИЕ / БЕЗ ТОРРЕНТА]',
            description: 'Предустановленные игры с оригинальным контентом, без сжатия и из надежных источников.'
        },
        'David Kazumi': {
            title: 'David Kazumi',
            description: 'Источник David Kazumi для Hydra Launcher. Хорошо известен на сервере сообщества Hydra Launcher.'
        },
        'CrackStatus': {
            title: 'CrackStatus',
            description: 'Последние обновления о взломах и релизах игр.'
        },
        'AtopGames': {
            title: 'AtopGames',
            description: 'Неизмененные предустановленные игры от множества надежных имен в сообществе.'
        },
        'DODI': {
            title: 'DODI',
            description: 'Известный бренд в мире пиратских видеоигр, один из лучших репакеров в этой области'
        },
        'HydraSources(RUSSIAN)': {
            title: 'HydraSources(РУССКИЙ)',
            description: 'Источник, созданный русским парнем под ником HydraSources, обновляется почти ежедневно. Если вы русский пользователь, это источник, который вам нужен.'
        },
        'Empress': {
            title: 'Empress',
            description: 'Для игр, взломанных EMPRESS.'
        }
    }
};

function createSourceCard(source) {
    // Accepts source.rating: { avg, total }

    const currentLang = i18n.getCurrentLocale();
    const translations = i18n.translations[currentLang]?.sources || {};
    const translation = translations[source.title] || {
        title: source.title,
        description: source.description
    };
    
    const isRisky = source.status.includes('Use At Your Own Risk');
    const stats = source.stats || { installs: 0, copies: 0, recentActivity: 0 };
    const recentActivity = parseInt(stats.recentActivity || 0);
    
    const card = document.createElement('div');
    card.className = 'source-card animate-fade-in rounded-xl';
    card.dataset.url = source.url;
    card.dataset.name = source.title;
    card.dataset.copies = source.stats?.copies || 0;
    card.dataset.installs = source.stats?.installs || 0;
    card.dataset.activity = source.stats?.recentActivity || 0;

    const statusHTML = source.status.map(status => {
        const className = status.toLowerCase().replace(/\s+/g, '-');
        const statusMap = {
            'trusted': {
                color: 'emerald',
                icon: 'shield',
                key: 'trusted',
                customClass: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 '
            },
            'safe-for-use': {
                color: 'blue',
                icon: 'check-circle',
                key: 'safeForUse',
                customClass: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30'
            },
            'use-at-your-own-risk': {
                color: 'red',
                icon: 'exclamation-triangle',
                key: 'useAtOwnRisk',
                customClass: 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 '
            },
            'works-in-russia': {
                color: 'teal',
                icon: 'globe-europe',
                key: 'worksInRussia',
                customClass: 'bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 '
            },
            'nsfw': {
                color: 'purple',
                icon: 'exclamation-circle',
                key: 'nsfw',
                customClass: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/30 '
            }
        }[className] || {
            color: 'gray',
            icon: 'circle',
            key: className
        };

        // Use custom class if provided, otherwise use default styling
        const baseClasses = `inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs backdrop-blur-sm status-badge ${statusMap.customClass || ''}`;
        const defaultClasses = `bg-${statusMap.color}-500/10 border border-${statusMap.color}-500/20 text-${statusMap.color}-400`;
        
        // Always use the translation system for status text
        const statusText = i18n.t(`status.${statusMap.key}`);
        
        return `
            <span class="${statusMap.customClass ? baseClasses : `${baseClasses} ${defaultClasses}`}">
                <i class="fas fa-${statusMap.icon} text-[10px]"></i>
                ${statusText}
            </span>
        `;
    }).join('');

    card.innerHTML = `
        <div class="group relative h-full flex flex-col overflow-hidden
                    ${isRisky ? 'border-red-500/20' : 'border-white/5'} border
                    backdrop-blur-sm transition-all duration-300
                    hover:shadow-lg ${isRisky ? 'hover:shadow-red-500/10' : 'hover:shadow-emerald-500/10'}
                    bg-[#111]/40 rounded-xl">
            
            <!-- Card background effects -->
            <div class="absolute inset-0 bg-gradient-to-b 
                        ${isRisky ? 'from-red-500/5' : 'from-emerald-500/5'} to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Glass effect overlay - Moved before the games count -->
            <div class="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
            
            <!-- Games count badge -->
            <div class="absolute mt-4 right-4 inline-flex items-center gap-1.5 px-2 py-1 z-10
                        rounded-md bg-emerald-500/10 border border-emerald-500/20 
                        text-emerald-400 text-xs">
                <i class="fas fa-gamepad text-[10px]"></i>
                <span>${source.gamesCount}</span>
            </div>
            
            <!-- Card content -->
            <div class="relative p-4 flex-1 flex flex-col">
                <!-- Status badges -->
                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${statusHTML}
                </div>

                <!-- Title and description -->
                <div class="flex items-start gap-3 flex-1">
                    <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                         ${isRisky ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} 
                         border group-hover:scale-110 transition-transform duration-300
                         backdrop-blur-sm">
                        <i class="fas ${isRisky ? 'fa-triangle-exclamation text-red-500/70' : 'fa-book-open text-emerald-500/70'} 
                             text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-base font-medium text-white group-hover:text-${isRisky ? 'red' : 'emerald'}-400 
                                   transition-colors duration-300 mb-1.5 truncate">
                            ${translation.title}
                        </h3>
                        <p class="text-white/60 text-sm leading-relaxed line-clamp-2">
                            ${translation.description}
                        </p>
                    </div>
                    
                </div>

                <!-- Stats and date (fixed at bottom) -->
                <div class="mt-2 pt-2 text-white/40 relative">
                    
                    
                    <div class="flex items-center justify-between">
                        <span class="hidden lg:flex items-center gap-1.5 text-white/40 text-[10px] sm:text-xs">
                            <i class="fas fa-calendar-alt text-[10px] hidden sm:inline"></i>
                            <span class="whitespace-nowrap">${formatDate(source.addedDate)}</span>
                        </span>
                    
                        <!-- Rating display area - absolutely positioned on the right -->
                    <div class="right-0 flex items-center gap-1 px-2 py-0.5 bg-[#111] rounded-full border border-white/10 cursor-pointer group/rating transition-all duration-300 transform hover:scale-105 hover:bg-[#1a1a1a] hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-400/30" 
                         style="user-select:none; min-width: 80px;" 
                         title="View & rate this source">
                        <div class="relative inline-flex items-center" data-rating-stars-container>
                            <span class="text-gray-500/50 text-sm" data-rating-stars-bg>★★★★★</span>
                            <span class="absolute left-0 top-0 overflow-hidden text-amber-400 text-sm transition-all duration-500" 
                                  data-rating-stars-active style="width: 0%;">★★★★★</span>
                        </div>
                        <span class="text-white/70 text-xs font-medium group-hover/rating:text-amber-400 transition-colors duration-300" 
                              data-rating-avg>–</span>
                        <span class="text-white/40 text-[10px] group-hover/rating:text-white/60 transition-colors duration-300" 
                              data-rating-total></span>
                    
                    </div>
                        <div class="source-stats flex items-center gap-3 text-xs">
                            <span class="flex items-center gap-1.5 ${recentActivity > 0 ? 'text-red-400' : ''}
                                       transition-colors duration-300">
                                <i class="fas fa-fire text-[10px]"></i>
                                ${recentActivity}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <i class="fas fa-download text-[10px]"></i>
                                ${stats.installs || 0}
                            </span>
                            <span class="flex items-center gap-1.5">
                                <i class="fas fa-copy text-[10px]"></i>
                                ${stats.copies || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card actions -->
            <div class="relative border-t ${isRisky ? 'border-red-500/10' : 'border-white/5'} 
                        p-3 bg-black/30 backdrop-blur-sm">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 
                                 ${isRisky ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20' : 
                                           'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'}
                                 border rounded-lg px-4 py-2 text-sm font-medium 
                                 transition-all duration-200 flex items-center justify-center gap-2 
                                 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                                 backdrop-blur-sm">
                        <i class="fas fa-download text-[10px]"></i>
                        ${i18n.t('common.install')}
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-sm
                                 transition-all duration-200 flex items-center justify-center gap-2
                                 hover:scale-[1.02] backdrop-blur-sm" data-url="${source.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        ${i18n.t('common.copy')}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for rating area
    const ratingArea = card.querySelector('[data-rating-stars-container]')?.parentElement;
    if (ratingArea) {
        ratingArea.addEventListener('click', (e) => {
            e.stopPropagation();
            showRatingModal(source);
        });
        // Initialize the rating display
        updateCardRatingDisplay(card, source.rating);
    }

    // Add event listeners for install and copy buttons
    const installBtn = card.querySelector('.install-btn');
    const copyBtn = card.querySelector('.copy-btn');

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const proceedWithCopy = async () => {
                const success = await trackSourceUsage(source.url, 'copy');
                if (success) {
                    navigator.clipboard.writeText(source.url);
                    copyBtn.innerHTML = '<i class="fas fa-check text-[10px]"></i> ' + i18n.t('sourceCard.copied');
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy text-[10px]"></i> ' + i18n.t('sourceCard.copy');
                    }, 2000);
                }
            };
        
            const isNSFW = source.title === 'CPGRepacks';
            if (isRisky || isNSFW) {
                const showDialog = isNSFW ? showAgeVerification : showRiskAlert;
                showDialog((shouldProceed) => {
                    if (shouldProceed) {
                        proceedWithCopy();
                    }
                });
            } else {
                proceedWithCopy();
            }
        });
    }

    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            const proceedWithInstall = async () => {
                animateInstallButton(installBtn, 'loading');
                const success = await trackSourceUsage(source.url, 'install');
                animateInstallButton(installBtn, success ? 'success' : 'rate-limited');
                if (success) {
                    const encodedUrl = encodeURIComponent(source.url);
                    window.location.href = `hydralauncher://install-source?urls=${encodedUrl}`;
                }
            };

            const isNSFW = source.title === 'CPGRepacks';
            if (source.status.includes('Use At Your Own Risk') || isNSFW) {
                const showDialog = isNSFW ? showAgeVerification : showRiskAlert;
                showDialog((shouldInstall) => {
                    if (shouldInstall) {
                        proceedWithInstall();
                    }
                });
            } else {
                proceedWithInstall();
            }
        });
    }

    // Initialize stats display with current values
    updateSourceStats(source.url, source.stats);

    // Set data attributes for sorting
    card.dataset.copies = stats.copies || 0;
    card.dataset.installs = stats.installs || 0;
    card.dataset.activity = recentActivity;

    return card;
}

// Helper functions for copy and install actions
function proceedWithCopy(button) {
    const sourceUrl = button.dataset.url;
    const isNewCopy = !getCookie(`copy_${sourceUrl.replace(/[^a-zA-Z0-9]/g, '_')}`);
    
    navigator.clipboard.writeText(sourceUrl).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check text-xs"></i> Copied!';
        
        // Only track if it's a new copy
        if (isNewCopy) {
            trackSourceUsage(sourceUrl, 'copy');
        }
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        // Handle error silently
    });
}

function proceedWithInstall(url) {
    const encodedUrl = encodeURIComponent(url);
    window.location.href = `hydralauncher://install-source?urls=${encodedUrl}`;
}

// Add this function to track column layout changes
let currentLayout = 'wide'; // Tracks current layout: 'mobile', 'tablet', 'desktop', or 'wide'

function getLayoutType() {
    const width = window.innerWidth;
    if (width >= 1536) return 'wide';      // 4 columns
    if (width >= 1024) return 'desktop';    // 3 columns
    if (width >= 640) return 'tablet';      // 2 columns
    return 'mobile';                        // 1 column
}

// Update the resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleFilterVisibility();
        
        // Your existing resize code...
        const newLayout = getLayoutType();
        const layoutChanged = currentLayout !== newLayout;
        
        if (layoutChanged) {
            const filteredSources = filterSources();
            const newCardsPerPage = getCardsPerPage();
            const totalPages = Math.ceil(filteredSources.length / newCardsPerPage);
            
            // If changing from 4 to 3 columns, adjust pagination
            if (currentLayout === 'wide' && newLayout === 'desktop') {
                // Calculate new page based on current visible items
                const firstVisibleItem = (currentPage - 1) * CARDS_PER_PAGE.desktop;
                currentPage = Math.floor(firstVisibleItem / CARDS_PER_PAGE.desktop) + 1;
            }
            
            // Update current layout
            currentLayout = newLayout;
            
            // Ensure page number is valid
            currentPage = Math.min(Math.max(1, currentPage), totalPages);
            
            // Update display
            displaySources(filteredSources);
            
            // Scroll to top of content if moving to smaller layout
            if (newCardsPerPage < getCardsPerPage()) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, 100);
});

// Add this function to sort sources
function sortSources(sourcesToSort, sortType) {
    console.log(`Sorting sources by: ${sortType}`);
    
    return [...sourcesToSort].sort((a, b) => {
        try {
            switch(sortType) {
                case 'hot':
                    const aActivity = a.stats?.recentActivity || 0;
                    const bActivity = b.stats?.recentActivity || 0;
                    return bActivity - aActivity;
                    
                case 'new':
                    // Sort by addedDate in descending order (newest first)
                    return new Date(b.addedDate || 0) - new Date(a.addedDate || 0);
                    
                case 'most-copies':
                    const aCopies = a.stats?.copies || 0;
                    const bCopies = b.stats?.copies || 0;
                    return bCopies - aCopies;
                    
                case 'most-installs':
                    const aInstalls = a.stats?.installs || 0;
                    const bInstalls = b.stats?.installs || 0;
                    return bInstalls - aInstalls;
                    
                case 'top-rated':
                    // Debug log for rating data
                    console.log(`Comparing ratings: ${a.title} (${a.rating?.avg || 0}) vs ${b.title} (${b.rating?.avg || 0})`);
                    console.log(`Full rating data for ${a.title}:`, a.rating);
                    console.log(`Full rating data for ${b.title}:`, b.rating);
                    
                    const aRating = a.rating?.avg || 0;
                    const bRating = b.rating?.avg || 0;
                    
                    // If ratings are equal, sort by number of ratings (more ratings first)
                    if (aRating === bRating) {
                        const aCount = a.rating?.total || 0;
                        const bCount = b.rating?.total || 0;
                        console.log(`Ratings equal (${aRating}), comparing counts: ${aCount} vs ${bCount}`);
                        return bCount - aCount;
                    }
                    
                    console.log(`Sorting by rating: ${bRating} - ${aRating} = ${bRating - aRating}`);
                    return bRating - aRating;
                    
                case 'name-asc':
                    return (a.title || '').localeCompare(b.title || '');
                    
                case 'name-desc':
                    return (b.title || '').localeCompare(a.title || '');
                    
                default:
                    return 0;
            }
        } catch (error) {
            console.error('Error in sort function:', error);
            console.error('Sort type:', sortType);
            console.error('Source A:', a);
            console.error('Source B:', b);
            return 0;
        }
    });
}

// Function to update the active sort UI state
function updateActiveSortUI(sortType) {
    try {
        console.log('Updating active sort UI for:', sortType);
        
        // Update mobile sort button text
        const mobileSortButton = document.querySelector('.mobile-sort-button span');
        if (mobileSortButton) {
            const sortText = document.querySelector(`.sort-option[data-sort="${sortType}"]`)?.textContent || 'Sort';
            mobileSortButton.textContent = sortText;
        }
        
        // Update active state for sort options
        document.querySelectorAll('.sort-option').forEach(option => {
            const isActive = option.getAttribute('data-sort') === sortType;
            option.classList.toggle('bg-white/10', isActive);
            option.classList.toggle('text-white', isActive);
            option.classList.toggle('text-white/70', !isActive);
            
            // Update checkmark visibility
            const checkIcon = option.querySelector('i.fa-check');
            if (checkIcon) {
                checkIcon.style.opacity = isActive ? '1' : '0';
            }
        });
        
        // Close mobile sort dropdown if open
        const sortDropdown = document.getElementById('sort-dropdown');
        if (sortDropdown && !sortDropdown.classList.contains('hidden')) {
            sortDropdown.classList.add('hidden');
        }
        
        // Save the current sort preference
        localStorage.setItem('currentSort', sortType);
        
    } catch (error) {
        console.error('Error updating sort UI:', error);
    }
}

// Update the displaySources function
function displaySources(sourcesToDisplay = null) {
    const container = document.getElementById('sources-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    try {
        // Get filtered sources if not provided
        let filteredSources = sourcesToDisplay || filterSources();
        
        console.log(`Displaying ${filteredSources.length} filtered sources`);
        
        // Apply current sort if any
        const currentSortType = localStorage.getItem('currentSort') || 'hot'; // Default to 'hot' if not set
        console.log('Current sort type:', currentSortType);
        
        if (currentSortType) {
            // Debug log to check rating data before sorting
            console.log('Before sorting - first few sources:', filteredSources.slice(0, 3).map(s => ({
                title: s.title,
                rating: s.rating,
                hasRating: !!(s.rating?.avg || s.rating?.total)
            })));
            
            try {
                filteredSources = sortSources(filteredSources, currentSortType);
                
                // Debug log to check sorting results
                console.log('After sorting - first few sources:', filteredSources.slice(0, 3).map(s => ({
                    title: s.title,
                    rating: s.rating,
                    sortKey: currentSortType === 'top-rated' ? 
                        `${s.rating?.avg || 0} (${s.rating?.total || 0} ratings)` : 
                        (s[currentSortType] || 'N/A')
                })));
                
                // Update the active sort UI
                updateActiveSortUI(currentSortType);
                
            } catch (sortError) {
                console.error('Error during sorting:', sortError);
                // Fall back to default sort if there's an error
                filteredSources = sortSources(filteredSources, 'hot');
            }
        }
        
        // Update current layout
        currentLayout = getLayoutType();
        
        const cardsPerPage = getCardsPerPage();
        const totalPages = Math.ceil(filteredSources.length / cardsPerPage);
        currentPage = Math.min(Math.max(1, currentPage), totalPages);
        
        const start = (currentPage - 1) * cardsPerPage;
        const end = Math.min(start + cardsPerPage, filteredSources.length);
        const sourcesForCurrentPage = filteredSources.slice(start, end);
        
        sourcesForCurrentPage.forEach(source => {
            const card = createSourceCard(source);
            container.appendChild(card);
        });
        
        updatePagination(totalPages);
        
        // Update translations for newly added content
        i18n.updatePageContent();
        
    } catch (error) {
        console.error('Error in displaySources:', error);
        // Show error message to user
        container.innerHTML = `
            <div class="col-span-full text-center py-10 px-4">
                <div class="text-red-400 text-4xl mb-4">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Error Loading Content</h3>
                <p class="text-white/70 mb-4">${error.message || 'An unknown error occurred'}</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                    <i class="fas fa-sync-alt mr-2"></i> Try Again
                </button>
            </div>
        `;
    }
}

function getCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 2560) return CARDS_PER_PAGE.wide;     // 1440p and up: 3 columns × 5 rows
    if (width >= 1024) return CARDS_PER_PAGE.desktop;  // 1080p: 3 columns × 3 rows
    if (width >= 640) return CARDS_PER_PAGE.tablet;    // sm breakpoint: 2 columns × 3 rows
    return CARDS_PER_PAGE.mobile;                      // mobile: 1 column × 4 rows
}

// Add this function to update pagination
function updatePagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `
                <button class="px-3 py-1.5 text-sm bg-white/10 text-white rounded-md">
                    ${i}
                </button>
            `;
        } else {
            paginationHTML += `
                <button onclick="changePage(${i})" 
                        class="px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 
                               transition-colors duration-200 rounded-md">
                    ${i}
                </button>
            `;
        }
    }

    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" 
                class="px-2 py-1.5 text-sm text-white/50 hover:text-white disabled:opacity-50 
                       transition-colors duration-200 rounded-md hover:bg-white/5"
                ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Make changePage function globally available
window.changePage = function(newPage) {
    if (newPage < 1) return;
    
    const filteredSources = filterSources();
    const totalPages = Math.ceil(filteredSources.length / getCardsPerPage());
    
    if (newPage > totalPages) return;
    
    currentPage = newPage;
    displaySources(filteredSources);
    
    // Scroll to top smoothly when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update the status filter functionality
document.querySelectorAll('.status-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const status = button.dataset.status;
        
        // Remove active state from all buttons
        document.querySelectorAll('.status-filter-btn').forEach(btn => {
            btn.querySelector('div').classList.remove('bg-black/40');
        });
        
        if (activeStatus === status) {
            // If clicking the active status, deselect it
            activeStatus = '';
        } else {
            // Set new active status and highlight the button
            activeStatus = status;
            button.querySelector('div').classList.add('bg-black/40');
        }
        
        currentPage = 1; // Reset to first page when filtering
        displaySources();
        updateFilterCounts();
        dispatchFiltersChanged();
    });
});

// Update the games count filter functionality
document.querySelectorAll('.games-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const min = parseInt(button.dataset.min);
        const max = parseInt(button.dataset.max);
        
        // Remove active state from all buttons
        document.querySelectorAll('.games-filter-btn div').forEach(btn => {
            btn.classList.remove('border-emerald-500/20', 'bg-black/40');
            btn.classList.add('border-white/5', 'bg-black/20');
        });

        if (activeGamesRange && activeGamesRange.min === min && activeGamesRange.max === max) {
            activeGamesRange = null;
        } else {
            activeGamesRange = { min, max };
            // Get the div element of the clicked button
            const buttonDiv = button.querySelector('div');
            buttonDiv.classList.remove('border-white/5', 'bg-black/20');
            buttonDiv.classList.add('border-emerald-500/20', 'bg-black/40');
        }
        
        currentPage = 1; // Reset to first page when filtering
        displaySources();
        updateFilterCounts();
        updateActiveFiltersCount();
        dispatchFiltersChanged();
    });
});

// Add new function to update filter counts
function updateFilterCounts() {
    // Update status filter counts
    const statusCounts = {};
    sources.forEach(source => {
        source.status.forEach(status => {
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
    });

    // Update the count display for each status button
    document.querySelectorAll('.status-filter-btn').forEach(button => {
        const status = button.dataset.status;
        const countElement = button.querySelector('.text-white\\/40');
        if (countElement) {
            countElement.textContent = statusCounts[status] || 0;
        }
    });

    // Update games count filter counts
    document.querySelectorAll('.games-filter-btn').forEach(button => {
        const min = parseInt(button.dataset.min);
        const max = parseInt(button.dataset.max);
        
        // Count sources within this range
        const count = sources.filter(source => {
            const gamesCount = parseInt(source.gamesCount);
            return gamesCount >= min && gamesCount <= max;
        }).length;

        // Update count display
        const countElement = button.querySelector('.text-white\\/40');
        if (countElement) {
            countElement.textContent = count;
        }
        
        // Update progress bar width
        const progressBar = button.querySelector('.bg-emerald-500\\/50');
        if (progressBar) {
            // Find the maximum count across all ranges for percentage calculation
            const maxCount = Math.max(...Array.from(document.querySelectorAll('.games-filter-btn')).map(btn => {
                const btnMin = parseInt(btn.dataset.min);
                const btnMax = parseInt(btn.dataset.max);
                return sources.filter(source => {
                    const sourceGames = parseInt(source.gamesCount);
                    return sourceGames >= btnMin && sourceGames <= btnMax;
                }).length;
            }));
            
            // Calculate and set the width percentage
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            progressBar.style.width = `${percentage}%`;
        }
    });
}

// Search functionality
let searchTerm = '';
document.getElementById('search').addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase();
    currentPage = 1; // Reset to first page when searching
    displaySources();
});

// Update filterSources function to include search
function filterSources() {
    return sources.filter(source => {
        // Check if source matches the search term
        const searchMatch = !searchTerm || 
            source.title.toLowerCase().includes(searchTerm) ||
            source.description.toLowerCase().includes(searchTerm) ||
            source.url.toLowerCase().includes(searchTerm);
            
        // Check if source matches the selected status
        const statusMatch = !activeStatus || source.status.includes(activeStatus);
            
        // Check if source is within the selected games range
        const gamesCount = parseInt(source.gamesCount);
        const gamesMatch = !activeGamesRange || 
            (gamesCount >= activeGamesRange.min && gamesCount <= activeGamesRange.max);

        return searchMatch && statusMatch && gamesMatch;
    });
}

// Replace the sort button functionality with dropdown logic
const sortDropdownBtn = document.getElementById('sort-dropdown-btn');
const sortDropdown = document.getElementById('sort-dropdown');
const currentSortText = document.getElementById('current-sort');

// Toggle dropdown
sortDropdownBtn.addEventListener('click', () => {
    sortDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!sortDropdownBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
        sortDropdown.classList.add('hidden');
    }
});

// Handle sort options
document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', () => {
        const sortType = option.dataset.sort;
        currentSortText.textContent = option.textContent.trim();
        sortDropdown.classList.add('hidden');

        switch (sortType) {
            case 'high-to-low':
                sortGamesFilters(false);
                break;
            case 'low-to-high':
                sortGamesFilters(true);
                break;
            case 'most-sources':
                sortBySourceCount();
                break;
            case 'most-popular':
                sortByPopularity();
                break;
        }
    });
});

// Add function to sort by source count
function sortBySourceCount() {
    const container = document.querySelector('.games-filter-btn').parentNode;
    const buttons = Array.from(container.querySelectorAll('.games-filter-btn'));
    
    buttons.sort((a, b) => {
        const aCount = parseInt(a.querySelector('.text-white\\/40').textContent);
        const bCount = parseInt(b.querySelector('.text-white\\/40').textContent);
        return bCount - aCount;
    });
    
    buttons.forEach(button => button.remove());
    buttons.forEach(button => container.appendChild(button));
}

// Add function to sort by popularity
function sortByPopularity() {
    const stats = JSON.parse(localStorage.getItem('sourceStats') || '{}');
    const container = document.querySelector('.games-filter-btn').parentNode;
    const buttons = Array.from(container.querySelectorAll('.games-filter-btn'));
    
    buttons.sort((a, b) => {
        const aUrl = sources.find(s => s.gamesCount === a.dataset.min)?.url || '';
        const bUrl = sources.find(s => s.gamesCount === b.dataset.min)?.url || '';
        
        const aStats = stats[aUrl] || { installs: 0, copies: 0 };
        const bStats = stats[bUrl] || { installs: 0, copies: 0 };
        
        const aPopularity = aStats.installs + aStats.copies;
        const bPopularity = bStats.installs + bStats.copies;
        
        return bPopularity - aPopularity;
    });
    
    buttons.forEach(button => button.remove());
    buttons.forEach(button => container.appendChild(button));
}

// Add this helper function to format the date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const t = i18n.t.bind(i18n);
    
    if (diffDays === 0) {
        return t('common.date.today');
    } else if (diffDays === 1) {
        return t('common.date.yesterday');
    } else if (diffDays < 30) {
        return t('common.date.daysAgo', { days: diffDays });
    } else {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(i18n.getCurrentLocale(), options);
    }
}

// Initialize collapsible filter sections with smooth animations
function initCollapsibleFilters() {
    // Close all sections first
    document.querySelectorAll('.filter-section').forEach(section => {
        const button = section.querySelector('button[data-section]');
        const content = section.querySelector('.filter-content');
        
        // Close all sections by default
        content.style.maxHeight = '0';
        content.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        button.removeAttribute('data-expanded');
    });
    
    // Open only the Source Status section by default
    const statusSection = document.querySelector('.filter-section button[data-section="status"]')?.closest('.filter-section');
    if (statusSection) {
        const button = statusSection.querySelector('button[data-section]');
        const content = statusSection.querySelector('.filter-content');
        const chevron = button.querySelector('i.fa-chevron-down');
        
        // Calculate the height for the status section
        content.style.display = 'flex';
        const height = content.scrollHeight + 'px';
        content.style.maxHeight = '0';
        // Force reflow to enable transition
        content.offsetHeight;
        content.style.maxHeight = height;
        
        // Update ARIA and data state
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('data-expanded', 'true');
        
        // Set initial chevron rotation
        if (chevron) {
            chevron.style.transform = 'rotate(180deg)';
        }
    }

    // Add click handlers for all filter section toggles
    document.querySelectorAll('.filter-section button[data-section]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const section = button.closest('.filter-section');
            const content = section.querySelector('.filter-content');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Update ARIA and data state
            button.setAttribute('aria-expanded', !isExpanded);
            const chevron = button.querySelector('i.fa-chevron-down');
            
            if (!isExpanded) {
                // Opening the section
                if (content.style.display === 'none' || !content.style.display) {
                    content.style.display = 'flex';
                    // Force reflow to enable transition
                    content.offsetHeight;
                }
                // Set max-height to the actual height
                const height = content.scrollHeight + 'px';
                content.style.maxHeight = height;
                content.style.opacity = '1';
                button.setAttribute('data-expanded', 'true');
                // Rotate chevron
                if (chevron) {
                    chevron.style.transform = 'rotate(180deg)';
                }
                
                // Close other open sections if needed (optional)
                // document.querySelectorAll('.filter-section button[data-section]').forEach(btn => {
                //     if (btn !== button && btn.getAttribute('aria-expanded') === 'true') {
                //         const otherContent = btn.nextElementSibling;
                //         btn.setAttribute('aria-expanded', 'false');
                //         btn.removeAttribute('data-expanded');
                //         otherContent.style.maxHeight = '0';
                //     }
                // });
            } else {
                // Closing the section
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                button.setAttribute('data-expanded', 'false');
                // Reset chevron rotation
                const chevron = button.querySelector('i.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
                
                // After transition ends, hide the content
                const onTransitionEnd = () => {
                    if (content.style.maxHeight === '0px') {
                        content.style.display = 'none';
                    }
                    content.removeEventListener('transitionend', onTransitionEnd);
                };
                
                content.addEventListener('transitionend', onTransitionEnd, { once: true });
            }
        });
        
        // Handle keyboard navigation
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Handle window resize to update max-height if needed
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.filter-section button[aria-expanded="true"]').forEach(button => {
                const content = button.nextElementSibling;
                if (content && content.style.display !== 'none') {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }, 100);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchSources();
    sortGamesFilters(false); // Default to High to Low
    initCollapsibleFilters();
});

// Show modal
aboutBtn.addEventListener('click', () => {
    aboutModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Hide modal
closeAboutBtn.addEventListener('click', () => {
    aboutModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside
aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        closeAboutBtn.click();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !aboutModal.classList.contains('hidden')) {
        aboutModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// Add this function to handle the installation
function installSource(sourceUrl) {
    const cards = document.querySelectorAll('.source-card');
    const card = Array.from(cards).find(card => card.dataset.url === sourceUrl);
    const button = card?.querySelector('.install-btn');
    
    if (button) {
        // Check if this is a new installation
        const isNewInstall = !getCookie(`install_${sourceUrl.replace(/[^a-zA-Z0-9]/g, '_')}`);
        
        // Start loading animation
        animateInstallButton(button, 'loading');
        
        const encodedUrl = encodeURIComponent(sourceUrl);
        const hydraProtocolUrl = `hydralauncher://install-source?urls=${encodedUrl}`;
        
        window.location.href = hydraProtocolUrl;
        
        // Only track if it's a new installation
        if (isNewInstall) {
            trackSourceUsage(sourceUrl, 'install');
        }
        
        // Set a 10-second timer for the loading animation
        setTimeout(() => {
            animateInstallButton(button, 'success');
        }, 10000); // 10 seconds
    }
}

// Show suggest modal
suggestBtn.addEventListener('click', () => {
    suggestModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

// Hide suggest modal
closeSuggestBtn.addEventListener('click', () => {
    suggestModal.classList.add('hidden');
    document.body.style.overflow = '';
});

// Close suggest modal when clicking outside
suggestModal.addEventListener('click', (e) => {
    if (e.target === suggestModal) {
        suggestModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// Update the escape key handler to handle both modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!aboutModal.classList.contains('hidden')) {
            aboutModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
        if (!suggestModal.classList.contains('hidden')) {
            suggestModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
});

// Add this function to handle cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Modify the trackSourceUsage function to handle Firebase failures
async function trackSourceUsage(sourceUrl, action) {
    try {
        const sourceId = sourceUrl.replace(/[^a-zA-Z0-9]/g, '_');
        const actionId = `${action}_${sourceId}`;
        
        // Check if this action was already performed recently
        if (getCookie(actionId)) {
            return true;
        }

        // Create a local copy of the stats in case Firebase fails
        let newStats = { installs: 0, copies: 0, activity: [], recentActivity: 0 };
        
        // Try to get current stats from Firebase
        try {
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Firebase request timed out')), 3000)
            );
            
            const statsRef = ref(db, `sources/${sourceId}/stats`);
            const firestorePromise = get(statsRef);
            
            // Race between the Firebase request and the timeout
            const snapshot = await Promise.race([firestorePromise, timeoutPromise]);
            const currentStats = snapshot.val() || { installs: 0, copies: 0, activity: [] };
            
            // Get current timestamp
            const now = Date.now();
            
            // Clean up old activity (older than 24 hours)
            const activity = Array.isArray(currentStats.activity) ? currentStats.activity : [];
            const recentActivity = activity.filter(timestamp => 
                now - timestamp < ACTIVITY_WINDOW
            );
            
            // Add new activity timestamp
            recentActivity.push(now);

            // Create new stats object
            newStats = {
                installs: parseInt(currentStats.installs || 0) + (action === 'install' ? 1 : 0),
                copies: parseInt(currentStats.copies || 0) + (action === 'copy' ? 1 : 0),
                activity: recentActivity,
                recentActivity: recentActivity.length,
                lastUpdated: now
            };
            
            // Try to update database, but continue if it fails
            await Promise.race([
                update(statsRef, newStats),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Update timed out')), 3000))
            ]);
            
            // Also update the localStorage cache when successful
            try {
                const cachedStats = localStorage.getItem('sourceStats');
                if (cachedStats) {
                    const allStats = JSON.parse(cachedStats);
                    if (!allStats[sourceId]) {
                        allStats[sourceId] = {};
                    }
                    allStats[sourceId].stats = newStats;
                    localStorage.setItem('sourceStats', JSON.stringify(allStats));
                    localStorage.setItem('statsLastUpdated', now.toString());
                }
            } catch (e) {
                // Ignore storage errors
            }
        } catch (error) {
            // If Firebase fails, just use local data and continue
            console.log('Firebase update failed, continuing with local data');
            
            // Update local stats that will be shown in the UI
            const sourceObj = sources.find(s => s.url === sourceUrl);
            if (sourceObj && sourceObj.stats) {
                newStats = {
                    installs: parseInt(sourceObj.stats.installs || 0) + (action === 'install' ? 1 : 0),
                    copies: parseInt(sourceObj.stats.copies || 0) + (action === 'copy' ? 1 : 0),
                    activity: [],
                    recentActivity: 1, // Show at least 1 for UI feedback
                    lastUpdated: Date.now()
                };
                
                // Try to update the local cache as fallback
                try {
                    const cachedStats = localStorage.getItem('sourceStats');
                    if (cachedStats) {
                        const allStats = JSON.parse(cachedStats);
                        if (!allStats[sourceId]) {
                            allStats[sourceId] = {};
                        }
                        allStats[sourceId].stats = newStats;
                        localStorage.setItem('sourceStats', JSON.stringify(allStats));
                        localStorage.setItem('statsLastUpdated', Date.now().toString());
                    }
                } catch (e) {
                    // Ignore storage errors
                }
            }
        }

        // Set cookie to prevent rapid repeated actions
        setCookie(actionId, 'true', action === 'install' ? 0.003472222 : 0.000347222);

        // Update UI with the stats
        updateSourceStats(sourceUrl, newStats);
        
        // Update the source object in our sources array
        const sourceIndex = sources.findIndex(s => s.url === sourceUrl);
        if (sourceIndex !== -1) {
            sources[sourceIndex].stats = newStats;
        }
        
        return true;
    } catch (error) {
        // Handle error silently
        return false;
    }
}

// Update the stats display function
function updateSourceStats(sourceUrl, stats = null) {
    const cards = document.querySelectorAll('.source-card');
    const card = Array.from(cards).find(card => card.dataset.url === sourceUrl);
    
    if (card) {
        const statsContainer = card.querySelector('.source-stats');
        if (statsContainer) {
            const installs = parseInt(stats?.installs || 0);
            const copies = parseInt(stats?.copies || 0);
            const recentActivity = parseInt(stats?.recentActivity || 0);

            statsContainer.innerHTML = `
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-fire text-[10px] ${recentActivity > 0 ? 'text-red-500' : ''}"></i>
                    ${recentActivity}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-download text-[10px]"></i>
                    ${installs}
                </span>
                <span class="flex items-center gap-1.5">
                    <i class="fas fa-copy text-[10px]"></i>
                    ${copies}
                </span>
            `;
        }
        
        // Update data attributes for sorting
        card.dataset.copies = stats?.copies || 0;
        card.dataset.installs = stats?.installs || 0;
        card.dataset.activity = stats?.recentActivity || 0;
    }
}

// Add this function to handle button animations
function animateInstallButton(button, state) {
    const originalHTML = button.innerHTML;
    
    switch(state) {
        case 'loading':
            button.disabled = true;
            button.innerHTML = `
                <div class="flex items-center gap-1.5">
                <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span>Installing...</span>
                </div>
            `;
            break;
            
        case 'success':
            button.innerHTML = `
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-check text-[10px]"></i>
                    Installed
                </div>
            `;
            // Reset button after 2 seconds
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalHTML;
            }, 2000);
            break;
            
        case 'rate-limited':
            button.innerHTML = `
                <div class="flex items-center gap-1.5 text-amber-400">
                    <i class="fas fa-clock text-[10px]"></i>
                    Please wait
                </div>
            `;
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalHTML;
            }, 2000);
            break;
            
        default:
            button.disabled = false;
            button.innerHTML = originalHTML;
    }
}

// Add this function to handle page changes
function changePage(newPage) {
    if (newPage < 1) return;
    
    const filteredSources = filterSources();
    const totalPages = Math.ceil(filteredSources.length / getCardsPerPage());
    
    if (newPage > totalPages) return;
    
    currentPage = newPage;
    displaySources(filteredSources);
    
    // Scroll to top smoothly when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update the showCookieConsent function
function showCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    
    // Check if user has already made a cookie choice
    if (!getCookie('cookie-consent')) {
        // Make sure the element is visible before animating
        cookieConsent.style.display = 'block';
        
        // Show the consent banner with animation
        setTimeout(() => {
            cookieConsent.classList.remove('translate-y-full');
        }, 500); // Show after preloader starts fading
    } else {
        // If cookies choice is already made, hide the banner completely
        cookieConsent.style.display = 'none';
    }
}

// Update the accept button event listener
document.getElementById('accept-cookies').addEventListener('click', () => {
    const cookieConsent = document.getElementById('cookie-consent');
    
    // Add the slide-down animation
    cookieConsent.classList.add('translate-y-full');
    
    // Remove the element after animation completes
    cookieConsent.addEventListener('transitionend', () => {
        cookieConsent.style.display = 'none';
    }, { once: true }); // Use once: true to ensure the listener is removed after execution
    
    // Set cookie to remember user's choice (for 1 year)
    setCookie('cookie-consent', 'accepted', 365);
}); 


async function testFirebase() {
    try {
        const testRef = ref(db, 'test');
        await set(testRef, {
            timestamp: Date.now(),
            message: 'Firebase connection successful'
        });
    } catch (error) {
        // Handle error silently
    }
}

// Add this function to update all stats displays
function updateAllSourceStats() {
    sources.forEach(source => {
        if (source.stats) {
            updateSourceStats(source.url, source.stats);
        }
    });
}

// Add this function to clean up old activity data
async function cleanupOldActivity(sourceId) {
    try {
        const statsRef = ref(db, `sources/${sourceId}/stats`);
        const snapshot = await get(statsRef);
        const stats = snapshot.val();
        
        if (stats && stats.activity) {
            // Keep only timestamps from last 24 hours
            const recentActivity = stats.activity.filter(timestamp => 
                Date.now() - timestamp < ACTIVITY_WINDOW
            );
            
            // Update the activity array if it changed
            if (recentActivity.length !== stats.activity.length) {
                await update(statsRef, {
                    activity: recentActivity
                });
            }
        }
    } catch (error) {
        // Handle error silently
    }
}

// Modal functionality
function initializeModals() {
    // Suggest Modal
    const suggestModal = document.getElementById('suggest-modal');
    const suggestBtn = document.getElementById('suggest-btn');
    const closeSuggestBtn = document.getElementById('close-suggest');

    if (suggestBtn) {
        suggestBtn.addEventListener('click', () => {
            suggestModal.classList.remove('hidden');
        });
    }

    if (closeSuggestBtn) {
        closeSuggestBtn.addEventListener('click', () => {
            suggestModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside
    if (suggestModal) {
        suggestModal.addEventListener('click', (e) => {
            if (e.target === suggestModal) {
                suggestModal.classList.add('hidden');
            }
        });
    }
}

// Add this function to handle responsive placeholder text
function updateSearchPlaceholder() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        const updatePlaceholder = () => {
            const isMobile = window.innerWidth < 640;
            const key = isMobile ? 'header.searchMobile' : 'header.search';
            searchInput.placeholder = i18n.t(key);
        };
        
        // Initial update
        updatePlaceholder();
        
        // Update on resize
        window.addEventListener('resize', updatePlaceholder);
        
        // Update when language changes
        document.addEventListener('languageChanged', updatePlaceholder);
    }
}

// Add a function to periodically clean up old activity
function startActivityCleanup() {
    setInterval(() => {
        sources.forEach(source => {
            const sourceId = source.url.replace(/[^a-zA-Z0-9]/g, '_');
            cleanupOldActivity(sourceId);
        });
    }, 60 * 60 * 1000); // Run every hour
}

// Also update the displaySources function to refresh cards when language changes
// Function to update rating display on a source card
async function updateSourceCardRating(sourceTitle) {
    // If we already have the source in our array, use that
    const source = sources.find(s => s.title === sourceTitle);
    if (source && source.rating) {
        const ratingData = {
            avg: parseFloat(source.rating.avg || 0),
            total: parseInt(source.rating.total || 0)
        };
        updateCardRatingForTitle(sourceTitle, ratingData);
        return true;
    }
    
    // If not, try to update all ratings at once
    return updateAllSourceRatings();
}

// Update ratings for all sources at once with optimized batch fetching
async function updateAllSourceRatings() {
    if (!sources || sources.length === 0) return false;
    
    // Client-side cache for ratings (5 minutes TTL)
    const RATINGS_CACHE_KEY = 'hydra_ratings_cache';
    const RATINGS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
    
    // Get cached ratings if they exist and are fresh
    const getCachedRatings = () => {
        try {
            const cached = localStorage.getItem(RATINGS_CACHE_KEY);
            if (!cached) return null;
            
            const { timestamp, data } = JSON.parse(cached);
            if (Date.now() - timestamp < RATINGS_CACHE_TTL) {
                return data;
            }
        } catch (e) {
            console.error('Error reading from cache:', e);
        }
        return null;
    };
    
    // Save ratings to cache
    const cacheRatings = (data) => {
        try {
            localStorage.setItem(RATINGS_CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: data
            }));
        } catch (e) {
            console.error('Error saving to cache:', e);
        }
    };
    
    // Check cache first
    const cachedRatings = getCachedRatings();
    if (cachedRatings) {
        console.log('Using cached ratings data');
        sources.forEach(source => {
            const rating = cachedRatings[source.title] || { avg: 0, total: 0 };
            source.rating = {
                avg: parseFloat(rating.avg) || 0,
                total: parseInt(rating.total) || 0
            };
            updateCardRatingForTitle(source.title, source.rating);
        });
        return true;
    }
    
    // If no cache, fetch from API
    console.log('Fetching fresh ratings data...');
    
    // Get all unique source titles
    const sourceTitles = [...new Set(sources.map(s => s.title))];
    if (sourceTitles.length === 0) return false;
    
    try {
        // Make a single batch request for all sources
        const batchUrl = `https://libraryratingsdb.zxcsixx.workers.dev/api/ratings/batch`;
        console.log('Making batch API request to:', batchUrl);
        
        const response = await fetch(batchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sources: sourceTitles,
                fields: ['avg', 'total']
            })
        });
        
        console.log('Batch response status:', response.status);
        
        if (!response.ok) {
            console.error('Failed to fetch batch ratings:', response.status, response.statusText);
            return false;
        }
        
        const ratingsData = await response.json();
        console.log('Received batch ratings data for', Object.keys(ratingsData).length, 'sources');
        
        // Cache the response
        cacheRatings(ratingsData);
        
        // Update sources with the new ratings
        sources.forEach(source => {
            const rating = ratingsData[source.title] || { avg: 0, total: 0 };
            source.rating = {
                avg: parseFloat(rating.avg) || 0,
                total: parseInt(rating.total) || 0
            };
            updateCardRatingForTitle(source.title, source.rating);
        });
        
        return true;
    } catch (error) {
        console.error('Error in updateAllSourceRatings:', error);
        return false;
    }
}

// Helper to update card rating display by title
function updateCardRatingForTitle(sourceTitle, ratingData) {
    const cards = document.querySelectorAll('.source-card');
    cards.forEach(card => {
        if (card.dataset.name === sourceTitle) {
            updateCardRatingDisplay(card, ratingData);
        }
    });
}

// Helper function to update the rating display on a single card
function updateCardRatingDisplay(card, ratingData) {
    console.log('Updating card rating display for:', card.dataset.name, 'with data:', JSON.stringify(ratingData, null, 2));
    
    const starsActive = card.querySelector('[data-rating-stars-active]');
    const avgEl = card.querySelector('[data-rating-avg]');
    const totalEl = card.querySelector('[data-rating-total]');
    const commentEl = card.querySelector('[data-rating-comment]');
    
    console.log('Found elements:', { 
        starsActive: !!starsActive, 
        avgEl: !!avgEl, 
        totalEl: !!totalEl, 
        commentEl: !!commentEl 
    });
    
    if (starsActive && avgEl && totalEl) {
        if (ratingData && (typeof ratingData.avg === 'number' || ratingData.avg === 0)) {
            const starPercentage = (ratingData.avg / 5) * 100;
            const roundedPercentage = Math.round(starPercentage / 10) * 10;
            
            console.log(`Setting rating: avg=${ratingData.avg}, total=${ratingData.total}, starPercentage=${starPercentage}%, rounded=${roundedPercentage}%`);
            
            starsActive.style.width = `${roundedPercentage}%`;
            avgEl.textContent = ratingData.avg > 0 ? ratingData.avg.toFixed(1) : '–';
            totalEl.textContent = ratingData.total > 0 ? `(${ratingData.total})` : '';
            
            if (commentEl) {
                commentEl.style.display = ratingData.total > 0 ? 'inline-block' : 'none';
                console.log(`Comment icon display set to: ${commentEl.style.display}`);
            }
        } else {
            // Default state when no ratings exist
            console.log('No valid rating data, setting default state');
            starsActive.style.width = '0%';
            avgEl.textContent = '–';
            totalEl.textContent = '';
            if (commentEl) {
                commentEl.style.display = 'none';
            }
        }
    } else {
        console.error('Missing required rating elements on card:', { 
            starsActive: !!starsActive, 
            avgEl: !!avgEl, 
            totalEl: !!totalEl 
        });
    }
}

// Make the rating update function available globally
window.updateSourceCardRating = updateSourceCardRating;

document.addEventListener('languageChanged', () => {
    displaySources(); // This will recreate all cards with the new language
});