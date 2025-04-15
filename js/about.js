import { db } from '../firebase.js';
import { ref, get } from 'firebase/database';
import { i18n } from '../i18n/index.js';
import connectionManager from '../firebase-connection.js';

async function loadStatistics() {
    try {
        // Get sources data from resources.json
        const response = await fetch('./data/resources.json');
        const data = await response.json();
        const sources = data.sources;
        
        // Update sources count
        document.getElementById('sourcesCount').textContent = sources.length;

        // Calculate total games from resources.json
        const totalGames = sources.reduce((sum, source) => {
            return sum + (parseInt(source.gamesCount) || 0);
        }, 0);
        document.getElementById('gamesCount').textContent = totalGames.toLocaleString();

        // Try to get Firebase stats with a timeout
        try {
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Firebase request timed out')), 5000)
            );
            
            const statsRef = ref(db, 'sources');
            const firestorePromise = get(statsRef);
            
            // Race between the Firebase request and the timeout
            const snapshot = await Promise.race([firestorePromise, timeoutPromise]);
            const stats = snapshot.val();

            if (stats) {
                // Calculate total actions (installs + copies) from Firebase
                const totalActions = Object.values(stats).reduce((sum, sourceData) => {
                    const sourceStats = sourceData.stats || {};
                    return sum + (sourceStats.installs || 0) + (sourceStats.copies || 0);
                }, 0);
                
                document.getElementById('actionsCount').textContent = totalActions.toLocaleString();
            } else {
                // If no stats available, set to 0
                document.getElementById('actionsCount').textContent = '0';
            }
        } catch (error) {
            console.log('Firebase stats unavailable - connection limit reached or timeout');
            // Just show a default value for actions if Firebase fails
            document.getElementById('actionsCount').textContent = '0';
        }

        // Add animation to the numbers
        const statElements = document.querySelectorAll('.text-2xl');
        statElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-fade-in');
            }, index * 100);
        });

    } catch (error) {
        console.error('Error loading statistics:', error);
        // Set fallback values if there's an error
        document.getElementById('sourcesCount').textContent = '0';
        document.getElementById('gamesCount').textContent = '0';
        document.getElementById('actionsCount').textContent = '0';
    }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the connection manager
    await connectionManager.initialize();
    
    loadStatistics();

    // Update initial translations
    i18n.updatePageContent();

    // Add language switcher functionality
    const languageSwitcher = document.getElementById('language-switcher');
    const languageDropdown = document.getElementById('language-dropdown');

    // Toggle dropdown
    languageSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('hidden');
    });

    // Handle language selection
    document.querySelectorAll('[data-lang]').forEach(button => {
        button.addEventListener('click', () => {
            const locale = button.dataset.lang;
            i18n.setLocale(locale);
            languageDropdown.classList.add('hidden');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.add('hidden');
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
    
    // Set initial language switcher text
    updateLanguageSwitcherText();
}); 