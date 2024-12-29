import { db } from '../firebase.js';
import { ref, get } from 'firebase/database';

async function loadStatistics() {
    try {
        // Get sources count from resources.json
        const response = await fetch('./data/resources.json');
        const data = await response.json();
        const sourcesCount = data.sources.length;
        document.getElementById('sourcesCount').textContent = sourcesCount;

        // Get stats from Firebase
        const statsRef = ref(db, 'sources');
        const snapshot = await get(statsRef);
        const stats = snapshot.val();

        if (stats) {
            let totalGames = 0;
            let totalActions = 0;

            // Calculate totals from all sources
            Object.values(stats).forEach(source => {
                if (source.stats) {
                    // Add installs and copies to total actions
                    totalActions += (source.stats.installs || 0) + (source.stats.copies || 0);
                }
            });

            // Update games count from sources data
            data.sources.forEach(source => {
                totalGames += source.gamesCount || 0;
            });

            // Update the UI
            document.getElementById('gamesCount').textContent = totalGames.toLocaleString();
            document.getElementById('actionsCount').textContent = totalActions.toLocaleString();
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
        // Set fallback values if there's an error
        document.getElementById('sourcesCount').textContent = '0';
        document.getElementById('gamesCount').textContent = '0';
        document.getElementById('actionsCount').textContent = '0';
    }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
}); 