// Utility function to fetch the latest resources
export async function fetchLatestResources() {
    const timestamp = new Date().getTime();
    const response = await fetch(`./data/resources.json?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch resources');
    }
    
    return response.json();
} 