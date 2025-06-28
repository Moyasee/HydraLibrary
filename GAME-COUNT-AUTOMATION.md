# Automatic Game Count Checking System

This system automatically checks and updates the game counts for all sources in `public/data/resources.json` every 24 hours using Cloudflare Pages Functions.

## How It Works

1. **Scheduled Function**: Runs every day at midnight UTC using Cloudflare Cron Triggers
2. **Source Checking**: Fetches each source URL and counts the games in the JSON response
3. **GitHub Integration**: Updates the `resources.json` file directly in your GitHub repository
4. **Automatic Deployment**: Cloudflare Pages automatically redeploys when the file is updated

## Setup Instructions

### 1. Configure Environment Variables in Cloudflare Pages

In your Cloudflare Pages dashboard, go to Settings > Environment Variables and add:

```
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=HydraLibrary
```

### 2. Create GitHub Personal Access Token

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "HydraLibrary Auto Update"
4. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `public_repo` (Access public repositories)
5. Copy the token and add it to Cloudflare Pages environment variables

### 3. Enable Cron Triggers

The system uses Cloudflare's Cron Triggers as defined in `wrangler.toml`:
- Schedule: `0 0 * * *` (every day at midnight UTC)
- You can modify this schedule in the `wrangler.toml` file if needed

### 4. Deploy

Once you push these changes to your repository, Cloudflare Pages will automatically:
1. Deploy the new functions
2. Set up the cron trigger
3. Start running the automated checks

## API Endpoints

### Manual Trigger
```
POST /api/update-game-counts-github
```
Manually trigger a game count update.

### Scheduled Trigger
```
POST /scheduled/update-counts
```
This is called automatically by the cron trigger.

## Game Count Detection

The system tries to detect game counts from various JSON structures:
- Direct array: `[{game1}, {game2}, ...]`
- Games property: `{"games": [{game1}, {game2}, ...]}`
- Data property: `{"data": [{game1}, {game2}, ...]}`
- Items property: `{"items": [{game1}, {game2}, ...]}`
- Any array property in the root object

## Error Handling

- **Network timeouts**: 10-second timeout per source
- **Failed requests**: Keeps original count if source is unreachable
- **Invalid JSON**: Logs error and keeps original count
- **GitHub API errors**: Returns detailed error message

## Monitoring

You can monitor the system through:
1. **Cloudflare Pages Functions logs**: Check the Functions tab in your Pages dashboard
2. **GitHub commit history**: Each update creates a commit with the message "Auto-update game counts (X sources updated)"
3. **Manual testing**: Call the API endpoint manually to test functionality

## Customization

### Change Schedule
Modify the cron expression in `wrangler.toml`:
```toml
crons = ["0 */6 * * *"]  # Every 6 hours
crons = ["0 0 * * 1"]   # Every Monday at midnight
```

### Modify Detection Logic
Edit the game counting logic in `functions/api/update-game-counts-github.js` to handle different JSON structures.

### Add Notifications
You can extend the system to send notifications (Discord, Slack, email) when updates are completed or errors occur.

## Troubleshooting

### Common Issues

1. **"GitHub token not configured"**
   - Ensure `GITHUB_TOKEN` environment variable is set in Cloudflare Pages

2. **"Failed to fetch file from GitHub"**
   - Check that `GITHUB_OWNER` and `GITHUB_REPO` are correct
   - Verify the GitHub token has proper permissions

3. **"Failed to update GitHub file"**
   - The file might have been modified elsewhere, causing a conflict
   - Check GitHub API rate limits

4. **Cron trigger not working**
   - Verify the `wrangler.toml` file is properly configured
   - Check Cloudflare Pages Functions logs for errors

### Testing

To test the system manually:
```bash
curl -X POST https://your-site.pages.dev/api/update-game-counts-github
```

## Security Notes

- The GitHub token should have minimal required permissions
- Environment variables are securely stored in Cloudflare
- API endpoints include basic error handling to prevent information leakage
- Consider implementing rate limiting for manual triggers if needed