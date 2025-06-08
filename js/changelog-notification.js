// Changelog notification system
// This module handles showing/hiding the notification badge on changelog buttons

class ChangelogNotification {
    constructor() {
        this.storageKey = 'hydra-changelog-last-seen';
        this.currentVersion = this.getCurrentVersion();
        this.init();
    }

    // Get current version/timestamp - you can update this when posting new changelog
    getCurrentVersion() {
        // Update this timestamp each time you post a new changelog
        // Format: YYYY-MM-DD-HH-MM (year-month-day-hour-minute)
        return '2025-05-16-18-30'; // Update this when you post new changelog
    }

    // Check if user has seen the latest changelog
    hasSeenLatest() {
        const lastSeen = localStorage.getItem(this.storageKey);
        return lastSeen === this.currentVersion;
    }

    // Mark changelog as seen
    markAsSeen() {
        localStorage.setItem(this.storageKey, this.currentVersion);
        this.hideNotifications();
    }

    // Show notification badges
    showNotifications() {
        const changelogButtons = document.querySelectorAll('a[href*="changelog"]');
        changelogButtons.forEach(button => {
            // Remove existing badge if any
            const existingBadge = button.querySelector('.changelog-notification');
            if (existingBadge) {
                existingBadge.remove();
            }

            // Create notification badge
            const badge = document.createElement('span');
            badge.className = 'changelog-notification absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse';
            badge.innerHTML = '!';
            badge.style.fontSize = '10px';
            badge.style.lineHeight = '1';
            
            // Add badge to button
            button.style.position = 'relative';
            button.appendChild(badge);
        });
    }

    // Hide notification badges
    hideNotifications() {
        const badges = document.querySelectorAll('.changelog-notification');
        badges.forEach(badge => badge.remove());
    }

    // Add click handlers to changelog buttons
    addClickHandlers() {
        const changelogButtons = document.querySelectorAll('a[href*="changelog"]');
        changelogButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.markAsSeen();
            });
        });
    }

    // Initialize the notification system
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setup();
            });
        } else {
            this.setup();
        }
    }

    setup() {
        // Add click handlers
        this.addClickHandlers();
        
        // Show notifications if user hasn't seen latest
        if (!this.hasSeenLatest()) {
            this.showNotifications();
        }
    }

    // Method to manually update version (for when you post new changelog)
    updateVersion(newVersion) {
        this.currentVersion = newVersion;
        if (!this.hasSeenLatest()) {
            this.showNotifications();
        }
    }
}

// Create and export instance
const changelogNotification = new ChangelogNotification();
export default changelogNotification;

// Also make it available globally for easy access
window.changelogNotification = changelogNotification;