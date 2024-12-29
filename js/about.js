import { db } from '../firebase.js';
import { ref, get } from 'firebase/database';

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

        // Get installation and copy statistics from Firebase
        const statsRef = ref(db, 'sources');
        const snapshot = await get(statsRef);
        const stats = snapshot.val();

        if (stats) {
            // Calculate total actions (installs + copies) from Firebase
            const totalActions = Object.values(stats).reduce((sum, sourceData) => {
                const sourceStats = sourceData.stats || {};
                return sum + (sourceStats.installs || 0) + (sourceStats.copies || 0);
            }, 0);
            
            document.getElementById('actionsCount').textContent = totalActions.toLocaleString();
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
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
}); 