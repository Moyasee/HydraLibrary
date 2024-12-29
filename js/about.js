import { db } from '../firebase.js';
import { ref, get } from 'firebase/database';

async function loadStatistics() {
    try {
        // Load sources data
        const response = await fetch('../data/resources.json');
        const data = await response.json();
        const sources = data.sources;

        // Update sources count
        document.getElementById('sourcesCount').textContent = sources.length;

        // Calculate total games
        const totalGames = sources.reduce((sum, source) => sum + parseInt(source.gamesCount), 0);
        document.getElementById('gamesCount').textContent = totalGames.toLocaleString();

        // Get installation and copy statistics from Firebase
        const statsRef = ref(db, 'sources');
        const snapshot = await get(statsRef);
        const stats = snapshot.val();

        if (stats) {
            const totalActions = Object.values(stats).reduce((sum, sourceStats) => {
                const stats = sourceStats.stats || { installs: 0, copies: 0 };
                return sum + stats.installs + stats.copies;
            }, 0);
            document.getElementById('actionsCount').textContent = totalActions.toLocaleString();
        }

        // Add fade-in animation to statistics
        document.querySelectorAll('.text-2xl').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        });

    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', loadStatistics); 