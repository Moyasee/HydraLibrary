import { db } from '../firebase.js';
import { ref, update, get, set } from 'firebase/database';

document.body.classList.add('preloading');

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = preloader.querySelector('.loading-progress');
    let progress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Add final animation
            progressBar.style.width = '100%';
            setTimeout(() => {
                // Fade out preloader
                preloader.style.transition = 'opacity 0.5s ease-out';
                preloader.style.opacity = '0';
                
                // Remove preloader and restore scrolling
                setTimeout(() => {
                    preloader.remove();
                    document.body.classList.remove('preloading');
                }, 500);
            }, 500);
        } else {
            progressBar.style.width = `${progress}%`;
        }
    }, 100);
}

// Update your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Initialize preloader
    initPreloader();
    
    // Show cookie consent after preloader
    showCookieConsent();
    
    // Add event listener for accept button
    const acceptButton = document.getElementById('accept-cookies');
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            const cookieConsent = document.getElementById('cookie-consent');
            cookieConsent.classList.add('translate-y-full');
            cookieConsent.addEventListener('transitionend', () => {
                cookieConsent.style.display = 'none';
            }, { once: true });
            setCookie('cookie-consent', 'accepted', 365);
        });
    }
    
    // Initialize sorting functionality
    initializeSorting();
    
    // Fetch sources after preloader animation starts
    setTimeout(() => {
        fetchSources();
    }, 300);
    
    // Initialize modals
    initializeModals();
});

// Add this new function to handle sort options
function initializeSorting() {
    // Handle sort option clicks
    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', () => {
            // Remove active state from all options
            document.querySelectorAll('.sort-option').forEach(btn => {
                btn.classList.remove('bg-white/10', 'text-white');
                btn.classList.add('text-white/70');
            });
            
            // Add active state to clicked option
            option.classList.remove('text-white/70');
            option.classList.add('bg-white/10', 'text-white');
            
            // Store the current sort type and update display
            const sortType = option.dataset.sort;
            localStorage.setItem('currentSort', sortType);
            displaySources();
        });
    });

    // Apply saved sort on page load
    const savedSort = localStorage.getItem('currentSort');
    if (savedSort) {
        const savedOption = document.querySelector(`.sort-option[data-sort="${savedSort}"]`);
        if (savedOption) {
            savedOption.classList.remove('text-white/70');
            savedOption.classList.add('bg-white/10', 'text-white');
        }
    }
}

let sources = [];
let activeStatuses = new Set();
let activeGamesRange = null; // Will store {min: number, max: number} or null
let currentPage = 1;
const CARDS_PER_PAGE = {
    mobile: 4,     // 1 column × 4 rows
    tablet: 6,     // 2 columns × 3 rows
    desktop: 9,    // 3 columns × 3 rows
    wide: 12       // 4 columns × 3 rows
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

async function fetchSources() {
    try {
        const response = await fetch('data/resources.json');
        const data = await response.json();
        sources = data.sources;
        
        console.log('Sources loaded:', sources); // Debug log
        
        // Fetch stats for all sources from Firebase
        await loadSourceStats();
        
        console.log('Sources after loading stats:', sources); // Debug log
        
        displaySources(sources);
        updateFilterCounts();
    } catch (error) {
        console.error('Error loading sources:', error);
    }
}

// Modify the loadSourceStats function to properly handle activity
async function loadSourceStats() {
    try {
        const statsRef = ref(db, 'sources');
        const snapshot = await get(statsRef);
        const stats = snapshot.val();
        
        console.log('Raw Firebase stats:', stats); // Debug log
        
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
                
                console.log(`Source ${source.title} activity:`, {
                    activity,
                    recentActivity,
                    now,
                    window: ACTIVITY_WINDOW
                });
                
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
        }
    } catch (error) {
        console.error('Error loading stats from Firebase:', error);
    }
}

// Add this function back for risk alerts
function showRiskAlert(callback) {
    // Add blur to the main content
    document.querySelector('main').classList.add('blur-sm', 'transition-all', 'duration-200');
    
    const alertModal = document.createElement('div');
    alertModal.className = 'fixed inset-0 flex items-center justify-center z-50 animate-fade-in p-4';
    alertModal.innerHTML = `
        <div class="fixed inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div class="relative bg-[#111] rounded-xl overflow-hidden animate-scale-in max-w-md w-full">
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
            <div class="relative p-6">
                <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 
                              flex items-center justify-center shrink-0">
                        <i class="fas fa-exclamation-triangle text-red-500"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium text-white mb-2">Warning</h3>
                        <p class="text-white/70 text-sm">
                            This source is marked as "Use At Your Own Risk". It may contain untested or potentially harmful content. 
                            Are you sure you want to proceed?
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center justify-end gap-3 mt-6">
                    <button class="cancel-btn px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button class="proceed-btn px-4 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 text-red-400 hover:text-red-300
                                 rounded-lg transition-colors">
                        Proceed Anyway
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

function createSourceCard(source) {
    const isRisky = source.status.includes('Use At Your Own Risk');
    
    const card = document.createElement('div');
    card.className = 'source-card animate-fade-in';
    card.dataset.url = source.url;
    card.dataset.name = source.title;
    card.dataset.copies = source.stats?.copies || 0;
    card.dataset.installs = source.stats?.installs || 0;
    card.dataset.activity = source.stats?.recentActivity || 0;
    
    const stats = source.stats || { installs: 0, copies: 0, recentActivity: 0 };
    const recentActivity = parseInt(stats.recentActivity || 0);

    // Debug log
    console.log('Creating card for source:', source.title, 'with stats:', stats);

    const statusHTML = source.status.map(status => {
        const className = status.toLowerCase().replace(/\s+/g, '-');
        const bgColor = {
            'trusted': 'bg-emerald-500',
            'safe-for-use': 'bg-blue-500',
            'use-at-your-own-risk': 'bg-red-500',
            'new': 'bg-amber-500'
        }[className];

        return `
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/20 border border-white/10 text-xs backdrop-blur-sm">
                <span class="w-1.5 h-1.5 rounded-full ${bgColor}"></span>
                ${status}
            </span>
        `;
    }).join('');

    card.innerHTML = `
        <div class="group relative h-full flex flex-col rounded-xl border ${isRisky ? 'border-red-500/20' : 'border-white/5'} 
                    overflow-hidden backdrop-blur-sm 
                    hover:shadow-lg hover:shadow-${isRisky ? 'red' : 'emerald'}-500/10 
                    transition-all duration-300">
            <!-- Full card background -->
            <div class="absolute inset-0 bg-gradient-to-b from-[#111]/80 to-[#111]/40"></div>
            
            <!-- Card Header -->
            <div class="p-4 relative flex-1">
                <!-- Glowing background effect -->
                <div class="absolute inset-0 bg-gradient-to-r 
                           ${isRisky 
                               ? 'from-red-500/5 via-transparent to-red-500/5' 
                               : 'from-emerald-500/5 via-transparent to-emerald-500/5'} 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                
                <!-- Content -->
                <div class="relative">
                    <div class="flex items-start justify-between gap-2 mb-3">
                        <div class="flex flex-wrap gap-1">
                            ${statusHTML}
                        </div>
                        <div class="flex items-center gap-1.5 text-white/40 text-xs shrink-0 
                                  bg-black/30 px-2.5 py-1 rounded-full border border-white/5
                                  ${isRisky ? 'group-hover:border-red-500/20' : 'group-hover:border-emerald-500/20'}
                                  transition-colors duration-300">
                            <i class="fas fa-gamepad ${isRisky ? 'text-red-500/50' : 'text-emerald-500/50'} text-[10px]"></i>
                            <span>${source.gamesCount} games</span>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                        <div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                            ${isRisky 
                                ? 'bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20' 
                                : 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20'
                            } border group-hover:scale-110 transition-transform duration-300">
                            <i class="fas ${isRisky ? 'fa-triangle-exclamation text-red-500/70' : 'fa-book-open text-emerald-500/70'} text-lg"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-medium text-white group-hover:text-${isRisky ? 'red' : 'emerald'}-400 
                                       transition-colors duration-300 mb-1.5 truncate">
                                ${source.title}
                            </h3>
                            <p class="text-white/60 text-xs leading-relaxed line-clamp-2 mb-2">${source.description}</p>
                            <div class="flex items-center gap-2 text-white/40 text-xs">
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-calendar-alt text-[10px]"></i>
                                    Added ${formatDate(source.addedDate)}
                                </span>
                                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                                <div class="source-stats flex items-center gap-3">
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-fire text-[10px] ${recentActivity > 0 ? 'text-red-500' : ''}"></i>
                                        ${recentActivity}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-download text-[10px]"></i>
                                        ${stats.installs || 0}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i class="fas fa-copy text-[10px]"></i>
                                        ${stats.copies || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card Footer -->
            <div class="relative border-t ${isRisky ? 'border-red-500/10' : 'border-white/5'} 
                        p-3 bg-black/30">
                <div class="flex gap-2">
                    <button class="install-btn flex-1 ${isRisky 
                        ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20' 
                        : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                    } border rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 
                       flex items-center justify-center gap-2 min-h-[36px] disabled:opacity-50 
                       disabled:cursor-not-allowed hover:scale-[1.02]">
                        <i class="fas fa-download text-[10px]"></i>
                        Install On Hydra
                    </button>
                    <button class="copy-btn shrink-0 bg-white/5 hover:bg-white/10 text-white/70 
                                 border border-white/10 rounded-lg px-4 py-2 text-xs transition-all duration-200 
                                 flex items-center justify-center gap-2 hover:scale-[1.02]" 
                            data-url="${source.url}">
                        <i class="fas fa-copy text-[10px]"></i>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for install and copy buttons
    const installBtn = card.querySelector('.install-btn');
    const copyBtn = card.querySelector('.copy-btn');

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

            if (isRisky) {
                showRiskAlert((shouldInstall) => {
                    if (shouldInstall) {
                        proceedWithInstall();
                    }
                });
            } else {
                proceedWithInstall();
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const proceedWithCopy = async () => {
                const success = await trackSourceUsage(source.url, 'copy');
                if (success) {
                    navigator.clipboard.writeText(source.url);
                    copyBtn.innerHTML = '<i class="fas fa-check text-[10px]"></i> Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy text-[10px]"></i> Copy URL';
                    }, 2000);
                }
            };

            if (isRisky) {
                showRiskAlert((shouldCopy) => {
                    if (shouldCopy) {
                        proceedWithCopy();
                    }
                });
            } else {
                proceedWithCopy();
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
        console.error('Failed to copy:', err);
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
        const newLayout = getLayoutType();
        const layoutChanged = currentLayout !== newLayout;
        
        // Only reorganize if layout actually changed
        if (layoutChanged) {
            const filteredSources = filterSources();
            const newCardsPerPage = getCardsPerPage();
            const totalPages = Math.ceil(filteredSources.length / newCardsPerPage);
            
            // If changing from 4 to 3 columns, adjust pagination
            if (currentLayout === 'wide' && newLayout === 'desktop') {
                // Calculate new page based on current visible items
                const firstVisibleItem = (currentPage - 1) * CARDS_PER_PAGE.wide;
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
    return [...sourcesToSort].sort((a, b) => {
        switch(sortType) {
            case 'hot':
                const aActivity = a.stats?.recentActivity || 0;
                const bActivity = b.stats?.recentActivity || 0;
                return bActivity - aActivity;
                
            case 'most-copies':
                const aCopies = a.stats?.copies || 0;
                const bCopies = b.stats?.copies || 0;
                return bCopies - aCopies;
                
            case 'most-installs':
                const aInstalls = a.stats?.installs || 0;
                const bInstalls = b.stats?.installs || 0;
                return bInstalls - aInstalls;
                
            case 'name-asc':
                return a.title.localeCompare(b.title);
                
            case 'name-desc':
                return b.title.localeCompare(a.title);
                
            default:
                return 0;
        }
    });
}

// Update the displaySources function
function displaySources(sourcesToDisplay = null) {
    const container = document.getElementById('sources-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Get filtered sources if not provided
    let filteredSources = sourcesToDisplay || filterSources();
    
    // Apply current sort if any
    const currentSortType = localStorage.getItem('currentSort');
    if (currentSortType) {
        filteredSources = sortSources(filteredSources, currentSortType);
    }
    
    // Debug log to check stats
    console.log('Displaying sources with stats:', filteredSources);
    
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
    
    updatePagination(filteredSources.length, cardsPerPage);
}

function getCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 1536) return CARDS_PER_PAGE.wide;      // 2xl breakpoint: 4 columns
    if (width >= 1024) return CARDS_PER_PAGE.desktop;   // lg breakpoint: 3 columns
    if (width >= 640) return CARDS_PER_PAGE.tablet;     // sm breakpoint: 2 columns
    return CARDS_PER_PAGE.mobile;                       // mobile: 1 column
}

// Add this function to update pagination
function updatePagination(totalItems, itemsPerPage) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Don't show pagination if there's only one page
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = `
        <div class="flex items-center justify-center gap-2">
            <button onclick="changePage(${currentPage - 1})" 
                    class="pagination-btn w-9 h-9 flex items-center justify-center rounded-lg
                           bg-black/20 border border-white/5 text-white/70 hover:text-white
                           hover:bg-black/40 transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left text-xs"></i>
            </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <button onclick="changePage(${i})" 
                        class="pagination-btn w-9 h-9 flex items-center justify-center rounded-lg
                               text-sm font-medium transition-colors
                               ${i === currentPage 
                                   ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                   : 'bg-black/20 border-white/5 text-white/70 hover:text-white hover:bg-black/40'} 
                               border">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `
                <span class="w-9 h-9 flex items-center justify-center text-white/40">...</span>
            `;
        }
    }

    paginationHTML += `
            <button onclick="changePage(${currentPage + 1})" 
                    class="pagination-btn w-9 h-9 flex items-center justify-center rounded-lg
                           bg-black/20 border border-white/5 text-white/70 hover:text-white
                           hover:bg-black/40 transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right text-xs"></i>
            </button>
        </div>
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
        const buttonDiv = button.querySelector('div');
        
        if (activeStatuses.has(status)) {
            activeStatuses.delete(status);
            buttonDiv.classList.remove('border-emerald-500/20', 'bg-black/40');
            buttonDiv.classList.add('border-white/5', 'bg-black/20');
        } else {
            activeStatuses.add(status);
            buttonDiv.classList.remove('border-white/5', 'bg-black/20');
            buttonDiv.classList.add('border-emerald-500/20', 'bg-black/40');
        }
        
        currentPage = 1; // Reset to first page when filtering
        displaySources();
        updateFilterCounts(); // Add this new function to update the counts
    });
});

// Update the games count filter functionality
document.querySelectorAll('.games-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const min = parseInt(button.dataset.min);
        const max = parseInt(button.dataset.max);
        const buttonDiv = button.querySelector('div');
        
        document.querySelectorAll('.games-filter-btn').forEach(btn => {
            const btnDiv = btn.querySelector('div');
            btnDiv.classList.remove('border-emerald-500/20', 'bg-black/40');
            btnDiv.classList.add('border-white/5', 'bg-black/20');
        });

        if (activeGamesRange && activeGamesRange.min === min && activeGamesRange.max === max) {
            activeGamesRange = null;
        } else {
            activeGamesRange = { min, max };
            buttonDiv.classList.remove('border-white/5', 'bg-black/20');
            buttonDiv.classList.add('border-emerald-500/20', 'bg-black/40');
        }
        
        currentPage = 1; // Reset to first page when filtering
        displaySources();
        updateFilterCounts();
    });
});

// Add new function to update filter counts
function updateFilterCounts() {
    // Get currently filtered sources based on active filters
    const currentlyFiltered = sources.filter(source => {
        if (activeStatuses.size === 0) return true;
        return Array.from(activeStatuses).every(status => 
            source.status.includes(status)
        );
    });

    // Update status counts based on filtered sources
    const statusCounts = {
        'Trusted': 0,
        'Safe For Use': 0,
        'Use At Your Own Risk': 0,
        'New': 0
    };

    // Count how many sources would match if this status was also selected
    Object.keys(statusCounts).forEach(statusToCheck => {
        const count = currentlyFiltered.filter(source => 
            source.status.includes(statusToCheck)
        ).length;
        statusCounts[statusToCheck] = count;
    });

    // Update status filter counts in UI
    document.querySelectorAll('.status-filter-btn').forEach(button => {
        const status = button.dataset.status;
        const countSpan = button.querySelector('.text-white\\/40');
        if (countSpan) {
            countSpan.textContent = statusCounts[status] || 0;
        }

        // Update progress bar
        const progressBar = button.querySelector('.bg-emerald-500\\/50, .bg-blue-500\\/50, .bg-red-500\\/50, .bg-amber-500\\/50');
        if (progressBar) {
            const percentage = (statusCounts[status] / sources.length) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    });

    // Update games count filter counts
    document.querySelectorAll('.games-filter-btn').forEach(button => {
        const min = parseInt(button.dataset.min);
        const max = parseInt(button.dataset.max);
        const count = currentlyFiltered.filter(source => {
            const gamesCount = parseInt(source.gamesCount);
            return gamesCount >= min && gamesCount <= max;
        }).length;

        const countSpan = button.querySelector('.text-white\\/40');
        if (countSpan) {
            countSpan.textContent = count;
        }

        // Update progress bar
        const progressBar = button.querySelector('.bg-emerald-500\\/50');
        if (progressBar) {
            const percentage = (count / sources.length) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    });
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const container = document.getElementById('sources-container');
    container.innerHTML = '';

    const filteredSources = sources.filter(source => 
        (activeStatuses.size === 0 || source.status.some(status => activeStatuses.has(status))) &&
        (source.title.toLowerCase().includes(searchTerm) ||
         source.description.toLowerCase().includes(searchTerm) ||
         source.url.toLowerCase().includes(searchTerm))
    );

    filteredSources.forEach((source, index) => {
        const card = createSourceCard(source);
        card.style.setProperty('--i', index + 1);
        container.appendChild(card);
    });
});

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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchSources();
    sortGamesFilters(false); // Default to High to Low
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
        
        animateInstallButton(button, 'loading');
        
        const encodedUrl = encodeURIComponent(sourceUrl);
        const hydraProtocolUrl = `hydralauncher://install-source?urls=${encodedUrl}`;
        
        window.location.href = hydraProtocolUrl;
        
        // Only track if it's a new installation
        if (isNewInstall) {
            trackSourceUsage(sourceUrl, 'install');
        }
        
        setTimeout(() => {
            animateInstallButton(button, 'success');
        }, 1000);
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

// Add this function to sort the games count filters
function sortGamesFilters(ascending) {
    const container = document.querySelector('.games-filter-btn').parentNode;
    const buttons = Array.from(container.querySelectorAll('.games-filter-btn'));
    
    buttons.sort((a, b) => {
        const aMin = parseInt(a.dataset.min);
        const bMin = parseInt(b.dataset.min);
        return ascending ? aMin - bMin : bMin - aMin;
    });
    
    // Remove existing buttons
    buttons.forEach(button => button.remove());
    
    // Add sorted buttons back
    buttons.forEach(button => container.appendChild(button));
}

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

// Modify the trackSourceUsage function to track activity
async function trackSourceUsage(sourceUrl, action) {
    try {
        const sourceId = sourceUrl.replace(/[^a-zA-Z0-9]/g, '_');
        const actionId = `${action}_${sourceId}`;
        
        // Check if this action was already performed recently
        if (getCookie(actionId)) {
            return true;
        }

        const statsRef = ref(db, `sources/${sourceId}/stats`);
        const snapshot = await get(statsRef);
        const currentStats = snapshot.val() || { installs: 0, copies: 0, activity: [] };
        
        // Ensure activity is an array and add new timestamp
        const now = Date.now();
        const activity = Array.isArray(currentStats.activity) ? currentStats.activity : [];
        activity.push(now);
        
        // Keep only last 24 hours of activity
        const recentActivity = activity.filter(timestamp => 
            now - timestamp < ACTIVITY_WINDOW
        );

        // Create new stats object
        const newStats = {
            installs: parseInt(currentStats.installs || 0) + (action === 'install' ? 1 : 0),
            copies: parseInt(currentStats.copies || 0) + (action === 'copy' ? 1 : 0),
            activity: recentActivity,
            lastUpdated: now
        };

        // Update database
        await update(statsRef, newStats);

        // Set cookie to prevent rapid repeated actions
        setCookie(actionId, 'true', action === 'install' ? 0.003472222 : 0.000347222);

        // Update UI and local data with recentActivity count
        newStats.recentActivity = recentActivity.length;
        updateSourceStats(sourceUrl, newStats);
        
        // Update the source object in our sources array
        const sourceIndex = sources.findIndex(s => s.url === sourceUrl);
        if (sourceIndex !== -1) {
            sources[sourceIndex].stats = newStats;
        }
        
        return true;
    } catch (error) {
        console.error('Error tracking source usage:', error);
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
                <span class="flex items-center gap-1">
                    <i class="fas fa-fire text-[10px] ${recentActivity > 0 ? 'text-red-500' : ''}"></i>
                    ${recentActivity}
                </span>
                <span class="flex items-center gap-1">
                    <i class="fas fa-download text-[10px]"></i>
                    ${installs}
                </span>
                <span class="flex items-center gap-1">
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
                <div class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            `;
            break;
            
        case 'success':
            button.innerHTML = `
                <div class="flex items-center gap-1.5">
                    <i class="fas fa-check text-[10px]"></i>
                    Installed
                </div>
            `;
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

// Add this function to filter sources (was missing)
function filterSources() {
    return sources.filter(source => {
        // Check if source has ALL selected statuses
        const statusMatch = activeStatuses.size === 0 || 
            Array.from(activeStatuses).every(status => 
                source.status.includes(status)
            );
            
        // Check if source is within the selected games range
        const gamesCount = parseInt(source.gamesCount);
        const gamesMatch = !activeGamesRange || 
            (gamesCount >= activeGamesRange.min && gamesCount <= activeGamesRange.max);

        return statusMatch && gamesMatch;
    });
}

// Update the showCookieConsent function
function showCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    
    // Check if user has already accepted cookies
    if (!getCookie('cookie-consent')) {
        // Make sure the element is visible before animating
        cookieConsent.style.display = 'block';
        
        // Show the consent banner with animation
        setTimeout(() => {
            cookieConsent.classList.remove('translate-y-full');
        }, 500); // Show after preloader starts fading
    } else {
        // If cookies are already accepted, hide the banner completely
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
        console.log('Firebase connection test successful');
    } catch (error) {
        console.error('Firebase connection test failed:', error);
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
        console.error('Error cleaning up old activity:', error);
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