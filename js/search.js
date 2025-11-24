// Search page functionality
import { i18n } from '../i18n/index.js';

class GameSearchEngine {
    constructor() {
        this.games = [];
        this.sources = [];
        this.isLoading = false;
        this.currentPage = 1;
        this.gamesPerPage = 12;
        this.searchResults = [];
        this.lastFetchTime = null;
        this.fetchInterval = 10 * 60 * 1000; // 10 minutes
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        
        // Ensure search results are hidden initially
        this.hideSearchResults();
        
        // Load sources first for the filter
        await this.loadSources();
        
        // Then load games data
        await this.loadGamesData();
        
        // Set up auto-refresh every 10 minutes
        setInterval(() => {
            if (!this.isLoading) {
                this.loadGamesData();
            }
        }, this.fetchInterval);
        
        // Ensure search results are hidden initially
        this.hideSearchResults();
        
        // Display recently added games
        this.showRecentAdditions();
        
        // Initialize countdown timer
        this.initCountdownTimer();
    }
    
    initCountdownTimer() {
        // Show the countdown box
        const countdownBox = document.getElementById('update-countdown');
        if (countdownBox) {
            countdownBox.classList.remove('loading-hidden');
            countdownBox.classList.add('content-visible');
        }
        
        // Start the countdown
        this.updateCountdown();
        
        // Update every second
        setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
    
    getNextUpdateTime() {
        const now = new Date();
        const currentMinutes = now.getUTCMinutes();
        const currentSeconds = now.getUTCSeconds();
        
        // Updates happen at 09 and 39 minutes past each hour
        let nextUpdateMinutes;
        
        if (currentMinutes < 9) {
            nextUpdateMinutes = 9;
        } else if (currentMinutes < 39) {
            nextUpdateMinutes = 39;
        } else {
            // Next update is at 09 minutes of the next hour
            nextUpdateMinutes = 9;
            now.setUTCHours(now.getUTCHours() + 1);
        }
        
        // Create the next update time
        const nextUpdate = new Date(now);
        nextUpdate.setUTCMinutes(nextUpdateMinutes);
        nextUpdate.setUTCSeconds(0);
        nextUpdate.setUTCMilliseconds(0);
        
        return nextUpdate;
    }
    
    updateCountdown() {
        const nextUpdate = this.getNextUpdateTime();
        const now = new Date();
        const timeDiff = nextUpdate.getTime() - now.getTime();
        
        if (timeDiff <= 0) {
            // Update should happen now, reset for next cycle
            this.updateCountdown();
            return;
        }
        
        // Calculate hours, minutes, seconds
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // Format the countdown display
        const countdownText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update the display
        const countdownTimer = document.getElementById('countdown-timer');
        const nextUpdateTime = document.getElementById('next-update-time');
        
        if (countdownTimer) {
            countdownTimer.textContent = countdownText;
        }
        
        if (nextUpdateTime) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC',
                timeZoneName: 'short'
            };
            nextUpdateTime.textContent = `${nextUpdate.toLocaleString('en-US', options)}`;
        }
    }

    async loadSources() {
        try {
            const response = await fetch('/data/resources.json');
            const data = await response.json();
            this.sources = data.sources || [];
            console.log(`Loaded ${this.sources.length} sources`);
        } catch (error) {
            console.error('Error loading sources:', error);
            this.sources = [];
        }
    }

    async loadGamesData() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.updateLoadingState(true);
        
        try {
            // Use the worker API endpoint with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
            
            const response = await fetch('https://api.hydralibrary.live/games', {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            // Check if we got games data (new API structure has 'games' array at root)
            if (result.games || result.success) {
                let rawGames = result.games || result.data || [];
                
                // Normalize game data
                this.games = rawGames.map(game => ({
                    ...game,
                    addedDate: game.addedDate || game.uploadDate,
                    size: game.size || game.fileSize
                }));

                this.lastUpdated = result.lastProcessed || result.lastUpdated || Date.now();
                this.lastFetchTime = Date.now();
                
                // Log detailed information
                const cacheInfo = result.cached ? 
                    `cached (${Math.floor(result.cacheAge / 60)}m old)` : 
                    'fresh data';
                
                console.log(`Loaded ${result.totalGames || this.games.length} games from ${result.sourcesCount || result.sourcesProcessed || 'unknown'} sources (${cacheInfo})`);
                
                this.updateStats(result);
                this.hideError();
                this.hideSearchResults(); // Ensure search results are hidden initially
                
                // Show recent additions after games are loaded
                this.showRecentAdditions();
            } else {
                throw new Error(result.error || 'Failed to fetch games data');
            }
            
        } catch (error) {
            console.error('Error loading games data:', error);
            
            if (error.name === 'AbortError') {
                this.showError('Request timed out. The server might be processing data. Please try again in a few minutes.');
            } else {
                this.showError(`Failed to load games data: ${error.message}. Please try again later.`);
            }
        } finally {
            this.isLoading = false;
            this.updateLoadingState(false);
        }
    }

    updateLoadingState(isLoading) {
        const loadingElement = document.getElementById('loading-state');
        const searchResults = document.getElementById('search-results');
        
        if (isLoading) {
            loadingElement.classList.remove('hidden');
            searchResults.classList.add('hidden');
            this.hideAllContent();
            this.updateSearchInputState(false);
        } else {
            loadingElement.classList.add('hidden');
            searchResults.classList.remove('hidden');
            this.showAllContentWithAnimation();
            this.updateSearchInputState(true);
        }
    }
    
    hideAllContent() {
        const contentSections = [
            'hero-section',
            'search-section', 
            'stats-section',
            'recent-additions'
        ];
        
        contentSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('loading-hidden');
                section.classList.remove('content-visible');
                // Remove any existing animation classes
                section.classList.remove(
                    'animate-fade-in-up', 'animate-slide-in-left', 
                    'animate-slide-in-right', 'animate-scale-in',
                    'animate-delay-100', 'animate-delay-200', 'animate-delay-300',
                    'animate-delay-400', 'animate-delay-500', 'animate-delay-600',
                    'animate-delay-700'
                );
            }
        });
    }
    
    showAllContentWithAnimation() {
        const animations = [
            { id: 'hero-section', animation: 'animate-fade-in-up', delay: 'animate-delay-100' },
            { id: 'search-section', animation: 'animate-slide-in-left', delay: 'animate-delay-100' },
            { id: 'stats-section', animation: 'animate-scale-in', delay: 'animate-delay-100' },
            { id: 'recent-additions', animation: 'animate-slide-in-right', delay: 'animate-delay-100' }
        ];
        
        animations.forEach(({ id, animation, delay }) => {
            const section = document.getElementById(id);
            if (section) {
                // Small delay to ensure smooth transition
                setTimeout(() => {
                    section.classList.remove('loading-hidden');
                    section.classList.add('content-visible', animation, delay);
                });
            }
        });
    }
    
    updateSearchInputState(enabled) {
        const searchInput = document.getElementById('game-search');
        const sourceFilter = document.getElementById('source-filter');
        const sortFilter = document.getElementById('sort-filter');
        
        if (enabled && this.games.length > 0) {
            searchInput.disabled = false;
            searchInput.placeholder = 'Search for games...';
            sourceFilter.disabled = false;
            sortFilter.disabled = false;
            searchInput.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            searchInput.disabled = true;
            searchInput.placeholder = 'Loading games...';
            sourceFilter.disabled = true;
            sortFilter.disabled = true;
            searchInput.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    updateProgress(percentage) {
        // This method can be used for future progress indication
        console.log(`Loading progress: ${percentage}%`);
    }



    setupEventListeners() {
        const searchInput = document.getElementById('game-search');
        const sourceFilter = document.getElementById('source-filter');
        const sortFilter = document.getElementById('sort-filter');

        // Search input with debouncing (1 second delay, minimum 3 characters)
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            // If query is empty, immediately show recent additions
            if (query === '') {
                this.searchResults = [];
                this.hideSearchResults();
                this.showRecentAdditions();
                return;
            }
            
            // Only search if query has more than 3 characters after 1 second delay
            searchTimeout = setTimeout(() => {
                if (query.length >= 3) {
                    this.performSearch(query);
                }
            }, 300);
        });

        // Filters
        sourceFilter.addEventListener('change', () => this.applyFilters());
        sortFilter.addEventListener('change', () => this.applyFilters());

        // Enter key for search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();
                
                // Only search if query has at least 3 characters
                if (query.length >= 3) {
                    this.performSearch(query);
                } else if (query === '') {
                    this.searchResults = [];
                    this.hideSearchResults();
                    this.showRecentAdditions();
                }
            }
        });
        
        // Event delegation for copy source buttons (works with dynamically added content)
        const resultsGrid = document.getElementById('results-grid');
        const recentGrid = document.getElementById('recent-grid');
        
        [resultsGrid, recentGrid].forEach(container => {
            if (container) {
                container.addEventListener('click', (e) => {
                    const copyButton = e.target.closest('.copy-source-button');
                    if (copyButton) {
                        const sourceName = copyButton.getAttribute('data-source');
                        if (sourceName) {
                            copySourceUrlWithFeedback(copyButton, sourceName);
                        }
                    }
                });
            }
        });
        
        // Initially disable search until games are loaded
        this.updateSearchInputState(false);
    }

    setupAutoRefresh() {
        // Refresh data every 10 minutes
        setInterval(() => {
            if (!this.isLoading) {
                this.loadGamesData();
            }
        }, this.fetchInterval);
    }

    async performSearch(query) {
        // Don't allow search if games are not loaded yet (need games for recently added)
        if (this.isLoading) {
            return;
        }
        
        if (query.trim() === '') {
            this.searchResults = [];
            this.hideSearchResults();
            this.showRecentAdditions();
            return;
        }

        // Show loading state
        this.showSearchLoading();
        this.hideRecentAdditions();
        
        try {
            // Make API request to search endpoint
            const response = await fetch(`https://api.hydralibrary.live/games?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            // Hide loading
            this.hideSearchLoading();
            
            // Normalize the search results similar to how we normalize games
            let rawResults = result.games || [];
            this.searchResults = rawResults.map(game => ({
                ...game,
                addedDate: game.addedDate || game.uploadDate,
                size: game.size || game.fileSize
            }));
            
            this.currentPage = 1;
            this.applyFilters();
            
        } catch (error) {
            console.error('Search error:', error);
            this.hideSearchLoading();
            this.searchResults = [];
            this.displaySearchResults();
        }
    }
    
    showSearchLoading() {
        const searchResults = document.getElementById('search-results');
        const noResults = document.getElementById('no-results');
        const resultsGrid = document.getElementById('results-grid');
        
        searchResults.classList.remove('hidden');
        noResults.classList.add('hidden');
        
        // Show loading spinner in results grid
        resultsGrid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-20">
                <div class="relative mb-6">
                    <div class="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500/30 border-t-emerald-500"></div>
                    <div class="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div class="text-center">
                    <div class="text-white text-xl font-semibold mb-2">Searching Games...</div>
                    <div class="text-white/70 text-base">Please wait while we find matching games</div>
                </div>
            </div>
        `;
    }
    
    hideSearchLoading() {
        // Loading will be replaced by actual results or "no results" message
        // This is just a placeholder method for consistency
    }

    searchGames(query) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        const queryLower = query.toLowerCase();
        
        return this.games.filter(game => {
            const titleLower = game.title.toLowerCase();
            const descriptionLower = (game.description || '').toLowerCase();
            const tagsLower = (game.tags ? game.tags.join(' ') : '').toLowerCase();
            
            // Check if all search terms are found
            return searchTerms.every(term => 
                titleLower.includes(term) || 
                descriptionLower.includes(term) || 
                tagsLower.includes(term)
            );
        }).map(game => {
            const titleLower = game.title.toLowerCase();
            const relevanceScore = this.calculateRelevanceScore(game, queryLower, searchTerms);
            
            return {
                ...game,
                relevanceScore
            };
        }).sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
    
    calculateRelevanceScore(game, queryLower, searchTerms) {
        const titleLower = game.title.toLowerCase();
        const descriptionLower = (game.description || '').toLowerCase();
        const tagsLower = (game.tags ? game.tags.join(' ') : '').toLowerCase();
        
        let score = 0;
        
        // Exact title match (highest priority)
        if (titleLower === queryLower) {
            score += 1000;
        }
        // Title starts with query
        else if (titleLower.startsWith(queryLower)) {
            score += 800;
        }
        // Title contains full query
        else if (titleLower.includes(queryLower)) {
            score += 600;
        }
        
        // Word boundary matches in title (higher priority)
        searchTerms.forEach(term => {
            const wordBoundaryRegex = new RegExp(`\\b${this.escapeRegex(term)}\\b`, 'i');
            if (wordBoundaryRegex.test(game.title)) {
                score += 400;
            } else if (titleLower.includes(term)) {
                score += 200;
            }
        });
        
        // Description matches (medium priority)
        searchTerms.forEach(term => {
            if (descriptionLower.includes(term)) {
                score += 50;
            }
        });
        
        // Tag matches (lower priority)
        searchTerms.forEach(term => {
            if (tagsLower.includes(term)) {
                score += 30;
            }
        });
        
        // Bonus for newer games (upload date)
        if (game.uploadDate) {
            const uploadDate = new Date(game.uploadDate);
            const daysSinceUpload = (Date.now() - uploadDate.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSinceUpload < 30) {
                score += 20; // Bonus for games uploaded in last 30 days
            }
        }
        
        return score;
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    applyFilters() {
        // Don't apply filters if games are not loaded yet
        if (this.isLoading) {
            return;
        }
        
        const sourceFilter = document.getElementById('source-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;
        const searchInput = document.getElementById('game-search');
        const query = searchInput ? searchInput.value.trim() : '';

        // Start with search results if they exist (from API search), otherwise use all games
        let filteredResults;
        if (this.searchResults && this.searchResults.length > 0) {
            filteredResults = [...this.searchResults];
        } else if (query === '') {
            // No search active, use all games if filter is applied
            filteredResults = [...this.games];
        } else {
            // Search returned no results
            filteredResults = [];
        }

        // Apply source filter
        if (sourceFilter) {
            filteredResults = filteredResults.filter(game => game.source === sourceFilter);
        }

        // Apply sorting
        switch (sortFilter) {
            case 'name':
                filteredResults.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'date':
                filteredResults.sort((a, b) => {
                    const dateA = new Date(a.uploadDate || a.addedDate || 0);
                    const dateB = new Date(b.uploadDate || b.addedDate || 0);
                    return dateB - dateA;
                });
                break;
            case 'relevance':
            default:
                // For non-search results, sort by date instead of relevance
                if (query === '') {
                    filteredResults.sort((a, b) => {
                        const dateA = new Date(a.uploadDate || a.addedDate || 0);
                        const dateB = new Date(b.uploadDate || b.addedDate || 0);
                        return dateB - dateA;
                    });
                } else {
                    // API search results are already sorted by relevance
                    filteredResults.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
                }
                break;
        }

        this.searchResults = filteredResults;
        this.currentPage = 1;
        
        // Only display if search or filters are active
        if (query !== '' || sourceFilter) {
             this.displaySearchResults();
             document.getElementById('search-results').classList.remove('hidden');
             this.hideRecentAdditions();
        } else {
             // If clearing search and no filters
             this.hideSearchResults();
             this.showRecentAdditions();
        }
    }

    displaySearchResults() {
        const resultsContainer = document.getElementById('search-results');
        const resultsGrid = document.getElementById('results-grid');
        const resultsCount = document.getElementById('results-count');
        const noResults = document.getElementById('no-results');

        if (this.searchResults.length === 0) {
            resultsContainer.classList.add('hidden');
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        resultsContainer.classList.remove('hidden');

        // Update results count
        resultsCount.textContent = `${this.searchResults.length} games found`;

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.gamesPerPage;
        const endIndex = startIndex + this.gamesPerPage;
        const pageResults = this.searchResults.slice(startIndex, endIndex);

        // Render results
        resultsGrid.innerHTML = pageResults.map(game => this.createGameCard(game)).join('');

        // Update pagination
        this.updatePagination();
    }

    createGameCard(game) {
        const truncatedDescription = game.description && game.description.length > 120 
            ? game.description.substring(0, 120) + '...' 
            : (game.description || '');

        return `
            <div class="card-hover glass-effect rounded-2xl p-0 group relative overflow-hidden">
                <!-- Enhanced gradient border effect with animation -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl"></div>
                
                
                <!-- Content with improved padding structure -->
                <div class="relative z-10 p-6">
                    <!-- Enhanced Header with larger title -->
                    <div class="flex items-start justify-between mb-5">
                        <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2 flex-1 pr-3" title="${this.escapeHtml(game.title)}">
                            ${this.escapeHtml(game.title)}
                        </h3>
                        <div class="relative ml-2">
                            <span class="text-xs px-2 py-1 bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 text-emerald-400 rounded-full border border-emerald-500/40 font-medium shrink-0 shadow-sm shadow-emerald-500/10">
                                ${this.escapeHtml(game.source)}
                            </span>
                            <div class="absolute inset-0 bg-emerald-500/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                    
                    <!-- Enhanced Description with better contrast -->
                    ${game.description ? `
                        <p class="text-white/80 text-sm mb-5 line-clamp-3 leading-relaxed">
                            ${this.escapeHtml(truncatedDescription)}
                        </p>
                    ` : '<div class="mb-5"></div>'}
                    
                    <!-- Enhanced Metadata with icons -->
                    <div class="flex items-center justify-between text-xs text-white/60 mb-5 bg-white/5 rounded-lg p-2.5">
                        ${game.size ? `
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <i class="fas fa-hdd text-emerald-400"></i>
                                </div>
                                <span class="font-medium">${this.escapeHtml(game.size)}</span>
                            </div>
                        ` : '<div></div>'}
                        ${game.addedDate ? `
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <i class="fas fa-calendar text-emerald-400"></i>
                                </div>
                                <span class="font-medium">${this.formatDate(game.addedDate)}</span>
                            </div>
                        ` : '<div></div>'}
                    </div>
                    
                    <!-- Enhanced Tags with better styling -->
                    ${game.tags && game.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-2 mb-6">
                            ${game.tags.slice(0, 3).map(tag => `
                                <span class="text-xs px-3 py-1.5 bg-gradient-to-r from-white/10 to-white/5 text-white/80 rounded-full border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                                    ${this.escapeHtml(tag)}
                                </span>
                            `).join('')}
                            ${game.tags.length > 3 ? `
                                <span class="text-xs text-white/60 px-3 py-1.5 flex items-center">
                                    <i class="fas fa-plus text-emerald-400 mr-1.5"></i>
                                    ${game.tags.length - 3} more
                                </span>
                            ` : ''}
                        </div>
                    ` : '<div class="mb-6"></div>'}
                    
                    <!-- Enhanced Actions with better buttons -->
                    <div class="flex gap-3 mt-auto">
                        ${game.downloadUrl ? `
                            <a href="${this.escapeHtml(game.downloadUrl)}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="flex-1 bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 hover:from-emerald-500/40 hover:to-emerald-400/30 
                                      text-emerald-400 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 
                                      flex items-center justify-center gap-2.5 border border-emerald-500/40 hover:border-emerald-500/60
                                      hover:shadow-lg hover:shadow-emerald-500/30 group-hover:translate-y-0 translate-y-1">
                                <i class="fas fa-download"></i>
                                <span>Download</span>
                            </a>
                        ` : ''}
                        <button data-source="${this.escapeHtml(game.source)}"
                                class="copy-source-button copy-button px-4 py-3.5 glass-effect hover:bg-white/20 text-white/70 hover:text-white
                                       rounded-xl text-sm transition-all duration-300 border border-white/10 hover:border-white/30
                                       hover:shadow-lg hover:shadow-black/20 group/btn group-hover:translate-y-0 translate-y-1"
                                title="Copy source URL">
                            <i class="fas fa-copy group-hover/btn:scale-110 transition-transform duration-200"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Enhanced hover glow effect -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none blur-sm"></div>
            </div>
        `;
    }

    updatePagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.searchResults.length / this.gamesPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `
                <button onclick="gameSearch.goToPage(${this.currentPage - 1})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                    <i class="fas fa-chevron-left group-hover:scale-110 transition-transform duration-200"></i>
                </button>
            `;
        }

        // First page if not in range
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `
                <button onclick="gameSearch.goToPage(1)" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium">
                    1
                </button>
            `;
            if (startPage > 2) {
                paginationHTML += `<span class="px-2 text-white/50">...</span>`;
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === this.currentPage;
            paginationHTML += `
                <button onclick="gameSearch.goToPage(${i})" 
                        class="px-4 py-3 ${isActive 
                            ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20' 
                            : 'glass-effect hover:bg-white/20 text-white/70 hover:text-white border border-white/10 hover:border-white/20'} 
                               rounded-xl transition-all duration-300 font-medium min-w-[48px]">
                    ${i}
                </button>
            `;
        }
        
        // Last page if not in range
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="px-2 text-white/50">...</span>`;
            }
            paginationHTML += `
                <button onclick="gameSearch.goToPage(${totalPages})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 font-medium">
                    ${totalPages}
                </button>
            `;
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `
                <button onclick="gameSearch.goToPage(${this.currentPage + 1})" 
                        class="px-4 py-3 glass-effect hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 group">
                    <i class="fas fa-chevron-right group-hover:scale-110 transition-transform duration-200"></i>
                </button>
            `;
        }

        pagination.innerHTML = `
            <div class="flex items-center justify-center gap-3 flex-wrap">
                ${paginationHTML}
            </div>
            <div class="text-center mt-4 text-white/60 text-sm">
                Page ${this.currentPage} of ${totalPages} • ${this.searchResults.length} games total
            </div>
        `;
    }

    goToPage(page) {
        this.currentPage = page;
        this.displaySearchResults();
        
        // Scroll to top of results
        document.getElementById('search-results').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    showRecentAdditions() {
        const recentContainer = document.getElementById('recent-additions');
        const recentGrid = document.getElementById('recent-grid');
        
        // Get recent games (last 30 days or latest 12 games)
        const recentGames = this.games
            .filter(game => {
                if (!game.addedDate) return false;
                const gameDate = new Date(game.addedDate);
                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                return gameDate > thirtyDaysAgo;
            })
            .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
            .slice(0, 12);

        if (recentGames.length === 0) {
            recentContainer.classList.add('hidden');
            return;
        }

        recentContainer.classList.remove('hidden');
        
        // Add staggered animation to cards
        const cards = recentGames.map((game, index) => {
            const card = this.createGameCard(game);
            return `<div class="animate-fade-in-up" style="animation-delay: ${index * 100}ms">${card}</div>`;
        }).join('');
        
        recentGrid.innerHTML = cards;
        
        // Update the section header with count
        const headerElement = recentContainer.querySelector('h2');
        if (headerElement) {
            headerElement.innerHTML = `
                <i class="fas fa-clock text-emerald-400 mr-3"></i>
                Recently Added Games
                <span class="ml-3 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                    ${recentGames.length} games
                </span>
            `;
        }
    }

    hideRecentAdditions() {
        document.getElementById('recent-additions').classList.add('hidden');
    }

    hideSearchResults() {
        document.getElementById('search-results').classList.add('hidden');
        document.getElementById('no-results').classList.add('hidden');
    }



    populateSourceFilter() {
        const sourceFilter = document.getElementById('source-filter');
        if (!sourceFilter) return;
        
        // Get unique sources from games data
        const uniqueSources = [...new Set(this.games.map(game => game.source).filter(Boolean))];
        
        // Clear existing options except "All Sources"
        sourceFilter.innerHTML = '<option value="">All Sources</option>';
        
        // Add source options to hidden select
        uniqueSources.sort().forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = source;
            sourceFilter.appendChild(option);
        });
        
        // Also populate the custom dropdown menu
        const customDropdownMenu = sourceFilter.parentElement.querySelector('.custom-dropdown-menu');
        if (customDropdownMenu) {
            // Clear existing options except "All Sources"
            customDropdownMenu.innerHTML = `
                <div class="custom-dropdown-option px-3 py-2 text-white/90 cursor-pointer transition-all duration-200 border-b border-white/5" data-value="">
                    <i class="fas fa-globe text-emerald-400/70 mr-3"></i>All Sources
                </div>
            `;
            
            // Add source options to custom dropdown
            uniqueSources.sort().forEach(source => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'custom-dropdown-option px-3 py-2 text-white/90 cursor-pointer transition-all duration-200 border-b border-white/5';
                optionDiv.setAttribute('data-value', source);
                optionDiv.innerHTML = `<i class="fas fa-server text-emerald-400/70 mr-3"></i>${source}`;
                customDropdownMenu.appendChild(optionDiv);
            });
            
            // Re-attach event listeners for new options
            const newOptions = customDropdownMenu.querySelectorAll('.custom-dropdown-option');
            newOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const value = this.dataset.value;
                    const text = this.textContent.trim();
                    
                    // Update hidden select
                    sourceFilter.value = value;
                    
                    // Update trigger text
                    const triggerText = sourceFilter.parentElement.querySelector('.dropdown-text');
                    if (triggerText) {
                        triggerText.textContent = text;
                    }
                    
                    // Update selected state
                    newOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Close menu
                    customDropdownMenu.classList.add('hidden');
                    
                    // Trigger change event
                    sourceFilter.dispatchEvent(new Event('change'));
                });
            });
        }
    }

    updateStats(apiResult = null) {
        const totalGamesElement = document.getElementById('total-games');
        const totalSourcesElement = document.getElementById('total-sources');
        const lastUpdatedElement = document.getElementById('last-updated');
        
        if (totalGamesElement) {
            const totalGames = apiResult?.totalGames || this.games.length;
            totalGamesElement.textContent = totalGames.toLocaleString();
        }
        
        if (totalSourcesElement) {
            const sourcesProcessed = apiResult?.sourcesCount || apiResult?.sourcesProcessed || this.sources.length;
            totalSourcesElement.textContent = sourcesProcessed.toLocaleString();
        }
        
        if (lastUpdatedElement && this.lastUpdated) {
            const lastUpdated = new Date(this.lastUpdated);
            const cacheStatus = apiResult?.cached ? ' (cached)' : '';
            lastUpdatedElement.textContent = this.formatDate(lastUpdated) + cacheStatus;
        }
        
        this.populateSourceFilter();
    }

    showError(message) {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
        console.error(message);
    }

    hideError() {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }



    // Utility functions
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        if (!dateString) return 'Unknown';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch (error) {
            return 'Unknown';
        }
    }
}

// Global functions
window.copyToClipboard = async function(text) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Show success notification with enhanced design
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: '📋 Download Link Copied!',
                html: `<div style="color: #10b981; font-weight: 500; margin-top: 8px;">
                         Download link successfully copied to clipboard
                         <br><small style="color: #9ca3af; margin-top: 4px; display: block;">Ready to paste anywhere</small>
                       </div>`,
                timer: 2500,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                color: '#fff',
                customClass: {
                    popup: 'copy-download-popup',
                    title: 'copy-download-title',
                    htmlContainer: 'copy-download-content'
                },
                didOpen: () => {
                    const popup = Swal.getPopup();
                    if (popup) {
                        popup.style.border = '1px solid #10b981';
                        popup.style.boxShadow = '0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)';
                        popup.style.borderRadius = '16px';
                        popup.style.width = '350px';
                        popup.style.maxWidth = '90vw';
                    }
                }
            });
        }
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
    }
};

// Enhanced copy function with visual feedback
window.copySourceUrlWithFeedback = async function(buttonElement, sourceName) {
    // Add loading state
    const icon = buttonElement.querySelector('i');
    const originalClass = icon.className;
    icon.className = 'fas fa-spinner fa-spin';
    buttonElement.disabled = true;
    
    try {
        await copySourceUrl(sourceName);
        
        // Success animation
        icon.className = 'fas fa-check';
        buttonElement.classList.add('copy-success');
        buttonElement.style.borderColor = '#10b981';
        buttonElement.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        
        // Reset after animation
        setTimeout(() => {
            icon.className = originalClass;
            buttonElement.classList.remove('copy-success');
            buttonElement.style.borderColor = '';
            buttonElement.style.backgroundColor = '';
            buttonElement.disabled = false;
        }, 1500);
        
    } catch (error) {
        // Error animation
        icon.className = 'fas fa-times';
        buttonElement.classList.add('copy-error');
        buttonElement.style.borderColor = '#ef4444';
        buttonElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        
        // Reset after animation
        setTimeout(() => {
            icon.className = originalClass;
            buttonElement.classList.remove('copy-error');
            buttonElement.style.borderColor = '';
            buttonElement.style.backgroundColor = '';
            buttonElement.disabled = false;
        }, 1500);
    }
};

window.copySourceUrl = async function(sourceName) {
    try {
        // Find the source URL based on the source name
        // Try exact match first, then partial match
        let source = window.gameSearch.sources.find(s => s.title === sourceName);
        
        // If no exact match, try to find a partial match
        if (!source) {
            source = window.gameSearch.sources.find(s => 
                s.title.toLowerCase().includes(sourceName.toLowerCase()) ||
                sourceName.toLowerCase().includes(s.title.toLowerCase())
            );
        }
        
        // If still no match, try removing common suffixes/prefixes
        if (!source) {
            const cleanSourceName = sourceName.replace(/\(RU\)|\[.*?\]/g, '').trim();
            source = window.gameSearch.sources.find(s => {
                const cleanTitle = s.title.replace(/\(RU\)|\[.*?\]/g, '').trim();
                return cleanTitle.toLowerCase() === cleanSourceName.toLowerCase();
            });
        }
        
        if (!source) {
            console.error('Source not found:', sourceName);
            console.log('Available sources:', window.gameSearch.sources.map(s => s.title));
            console.log('Searching for source name:', sourceName);
            
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: '❌ Source Not Found',
                    html: `<div style="color: #ef4444; font-weight: 500; margin-top: 8px;">
                             Could not find URL for source: <strong style="color: #fff;">${sourceName}</strong>
                             <br><small style="color: #9ca3af; margin-top: 4px; display: block;">Check console for available sources</small>
                           </div>`,
                    timer: 4000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true,
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    color: '#fff',
                    customClass: {
                        popup: 'copy-error-popup',
                        title: 'copy-error-title',
                        htmlContainer: 'copy-error-content'
                    },
                    didOpen: () => {
                        const popup = Swal.getPopup();
                        if (popup) {
                            popup.style.border = '1px solid #ef4444';
                            popup.style.boxShadow = '0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)';
                            popup.style.borderRadius = '16px';
                            popup.style.width = '350px';
                            popup.style.maxWidth = '90vw';
                        }
                    }
                });
            }
            return;
        }
        
        await navigator.clipboard.writeText(source.url);
        
        // Show success notification with enhanced design
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: '✨ Successfully Copied!',
                html: `<div style="color: #10b981; font-weight: 500; margin-top: 8px;">
                         Source URL for <strong style="color: #fff;">${source.title}</strong> copied to clipboard
                       </div>`,
                timer: 2500,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                color: '#fff',
                customClass: {
                    popup: 'copy-success-popup',
                    title: 'copy-success-title',
                    htmlContainer: 'copy-success-content'
                },
                didOpen: () => {
                    // Add custom styles for the popup
                    const popup = Swal.getPopup();
                    if (popup) {
                        popup.style.border = '1px solid #10b981';
                        popup.style.boxShadow = '0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)';
                        popup.style.borderRadius = '16px';
                        popup.style.width = '350px';
                        popup.style.maxWidth = '90vw';
                    }
                }
            });
        }
    } catch (error) {
        console.error('Failed to copy source URL to clipboard:', error);
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'error',
                title: '⚠️ Copy Failed',
                html: `<div style="color: #f59e0b; font-weight: 500; margin-top: 8px;">
                         Failed to copy to clipboard
                         <br><small style="color: #9ca3af; margin-top: 4px; display: block;">Please try again or copy manually</small>
                       </div>`,
                timer: 3000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                color: '#fff',
                customClass: {
                    popup: 'copy-fail-popup',
                    title: 'copy-fail-title',
                    htmlContainer: 'copy-fail-content'
                },
                didOpen: () => {
                    const popup = Swal.getPopup();
                    if (popup) {
                        popup.style.border = '1px solid #f59e0b';
                        popup.style.boxShadow = '0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)';
                        popup.style.borderRadius = '16px';
                        popup.style.width = '350px';
                        popup.style.maxWidth = '90vw';
                    }
                }
            });
        }
    }
};

// Initialize search engine
const gameSearch = new GameSearchEngine();
window.gameSearch = gameSearch;

// Export for module usage
export default GameSearchEngine;