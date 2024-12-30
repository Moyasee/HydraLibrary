# Source Directory Manager

A modern web application for managing and displaying source directories with advanced filtering, sorting, and tracking capabilities.

## Features

- 📱 Responsive layout with grid and list views
- 🔍 Advanced filtering and search functionality
- 📊 Source usage statistics tracking
- 🔄 Real-time sorting options
- 🎯 Firebase integration for analytics
- 🍪 Cookie consent management
- 📱 Mobile-friendly interface

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Backend Integration**: Firebase
- **Analytics**: Custom tracking system

## Project Structure

```
├── .github/workflows     # CI/CD configuration
├── css/                 # Stylesheet files
├── js/                  # JavaScript modules
├── public/             # Static assets
│   └── data/          # JSON data files
└── src/               # Source files
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Update `firebase.js` with your credentials
4. Start development server:
   ```bash
   npm run dev
   ```

## Key Components

### Source Management
- Source card creation and display
- Pagination system
- Multiple view layouts (grid/list)

### Sorting Features
- Sort by source count
- Sort by popularity
- Custom sort implementations

### Analytics
- Source usage tracking
- Installation statistics
- Activity cleanup routines

### User Interface
- Preloader initialization
- Modal management
- Cookie consent handling
- Responsive search functionality

## Build and Deployment

The project uses GitHub Actions for automated deployment. See `.github/workflows/deploy.yml` for the configuration.

```bash
npm run build
```

## Data Structure

Sources are managed through `resources.json`, containing:
- Source metadata
- Usage statistics
- Installation data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Add License Information]

---

For more information, visit the about page or contact the repository maintainers.
