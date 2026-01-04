<div align="center">

# Scrum Poker

*Real-time agile estimation tool*

[![GitHub stars](https://img.shields.io/github/stars/damianczer/Scrum-Poker?style=for-the-badge&color=gold)](https://github.com/damianczer/Scrum-Poker/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/damianczer/Scrum-Poker?style=for-the-badge&color=blue)](https://github.com/damianczer/Scrum-Poker/watchers)
[![GitHub issues](https://img.shields.io/github/issues/damianczer/Scrum-Poker?style=for-the-badge&color=red)](https://github.com/damianczer/Scrum-Poker/issues)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://www.damianczerwinski.pl/scrum-poker/)

| Technology | Version | Purpose |
|------------|---------|---------|
| ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript) | `ES6+` | Programming language |
| ![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react) | `19.2.3` | Modern UI Framework |
| ![Sass](https://img.shields.io/badge/Sass-1.97.1-CC6699?style=flat-square&logo=sass) | `1.97.1` | CSS preprocessor |
| ![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=flat-square&logo=firebase) | `12.7.0` | Real-time database |
| ![Webpack](https://img.shields.io/badge/Webpack-5.104.1-8DD6F9?style=flat-square&logo=webpack) | `5.104.1` | Module bundler |
| ![js-cookie](https://img.shields.io/badge/js--cookie-3.0.5-F7DF1E?style=flat-square&logo=javascript) | `3.0.5` | User preferences management |

Estimate tasks easily with a beautiful, real-time React Application powered by Firebase for Agile teams using Planning Poker methodology.

<img width="1903" height="900" alt="image" src="https://github.com/user-attachments/assets/4431745c-7841-4b3b-b8ee-3dfebd54a7d9" />

<img width="1896" height="902" alt="image" src="https://github.com/user-attachments/assets/741c6b0e-cc1a-421f-8f4c-c12606ea63f3" />

</div>

<br>

**Key Features & Capabilities:**

- Anonymous Sessions - No registration required, just enter your name.
- Unique Session IDs - Create or join sessions with shareable links.
- Hidden Voting - Votes are concealed until reveal.
- Live Participants - See who's in the session and who voted in real-time.
- Smart Calculations - Automatic average and individual estimates.
- Real-time Sync - Powered by Firebase Realtime Database.
- Theme Selection - Choose from 5 color themes (Green, Blue, Turquoise, Grey, Orange).
- Dark/Light Mode - Toggle between dark and light themes.
- Multi-language Support - English & Polish translations.
- Persistent Settings - Preferences saved in cookies.
- PWA Support - Installable as Progressive Web App with offline caching.
- WCAG Accessibility - Screen reader support, keyboard navigation, focus management.
- Responsive Design - Optimized for desktop and mobile devices.
- 100% Real-time - all actions synchronized instantly across all participants.

## 📁 Project Architecture

```
Scrum-Poker/
├── application/
│   ├── public/
│   │   ├── assets/                     # Static assets (icons, images)
│   │   ├── index.html                  # HTML entry point
│   │   ├── manifest.json               # PWA manifest
│   │   └── sw.js                       # Service Worker
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                 # Reusable UI components
│   │   │   │   ├── Button.jsx          # Button component
│   │   │   │   ├── ErrorBoundary.jsx   # Error boundary wrapper
│   │   │   │   ├── FormInput.jsx       # Form input component
│   │   │   │   └── SessionForm.jsx     # Session form wrapper
│   │   │   │
│   │   │   ├── BackgroundIcons.jsx     # Background poker icons
│   │   │   ├── CardSelection.jsx       # Card voting component
│   │   │   ├── Content.jsx             # Main content controller
│   │   │   ├── CreateSessionForm.jsx   # Create session form
│   │   │   ├── Footer.jsx              # Footer with settings
│   │   │   ├── GameView.jsx            # Game view wrapper
│   │   │   ├── Header.jsx              # Application header
│   │   │   ├── HelpModal.jsx           # Help modal
│   │   │   ├── JoinSessionForm.jsx     # Join session form
│   │   │   ├── LegalModal.jsx          # Legal/privacy modal
│   │   │   ├── LobbyView.jsx           # Lobby view wrapper
│   │   │   ├── Modal.jsx               # Modal dialogs
│   │   │   ├── SessionActions.jsx      # Session action buttons
│   │   │   ├── SessionTimer.jsx        # Session timer component
│   │   │   ├── ShareModal.jsx          # Share session modal
│   │   │   ├── UserList.jsx            # Live participants list
│   │   │   └── UsernameForm.jsx        # Username input form
│   │   │
│   │   ├── constants/
│   │   │   ├── config.js               # Application configuration
│   │   │   └── constants.js            # Application constants
│   │   │
│   │   ├── context/
│   │   │   └── AppContext.jsx          # React context provider
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.js          # Debounce hook
│   │   │   ├── useFocusTrap.js         # Focus trap hook (accessibility)
│   │   │   ├── useSession.js           # Session management hook
│   │   │   ├── useSettings.js          # Settings management hook
│   │   │   └── useUrlSession.js        # URL session params hook
│   │   │
│   │   ├── services/
│   │   │   ├── firebaseService.js      # Firebase database operations
│   │   │   └── index.js                # Services export
│   │   │
│   │   ├── styles/
│   │   │   ├── _backgroundIcons.scss   # Background icons styles
│   │   │   ├── _body.scss              # Body styles
│   │   │   ├── _cardSelection.scss     # Card selection styles
│   │   │   ├── _content.scss           # Content area styles
│   │   │   ├── _errorBoundary.scss     # Error boundary styles
│   │   │   ├── _footer.scss            # Footer styles
│   │   │   ├── _global.scss            # Global styles & variables
│   │   │   ├── _header.scss            # Header styles
│   │   │   ├── _helpModal.scss         # Help modal styles
│   │   │   ├── _legalModal.scss        # Legal modal styles
│   │   │   ├── _modal.scss             # Modal styles
│   │   │   ├── _shareModal.scss        # Share modal styles
│   │   │   ├── _userList.scss          # User list styles
│   │   │   └── _variables.scss         # SCSS variables
│   │   │
│   │   ├── translations/
│   │   │   ├── en.json                 # English translations
│   │   │   └── pl.json                 # Polish translations
│   │   │
│   │   ├── utils/
│   │   │   ├── cardUtils.js            # Card utility functions
│   │   │   ├── i18n.js                 # Internationalization utility
│   │   │   ├── icons.js                # FontAwesome icons
│   │   │   ├── logger.js               # Logging utility
│   │   │   ├── serviceWorker.js        # Service Worker registration
│   │   │   └── validation.js           # Validation functions
│   │   │
│   │   ├── App.jsx                     # Root component
│   │   ├── App.scss                    # Main application styles
│   │   ├── firebaseConfig.js           # Firebase configuration
│   │   └── index.js                    # React DOM rendering entry point
│   │
│   ├── package.json                    # Dependencies & scripts
│   └── webpack.config.js               # Webpack build configuration
│
├── LICENSE                             # MIT License
└── README.md                           # Project documentation
```

## ⚒️ Installation & Setup

### Prerequisites

```bash
- Node.js 14.0.0 or higher
- npm 6.0.0 or higher (or yarn/pnpm equivalent)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account (for your own instance)
```

### Quick Start

```bash
# 1️⃣ Clone the repository
git clone https://github.com/damianczer/Scrum-Poker.git

# 2️⃣ Navigate to project directory
cd Scrum-Poker/application

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start development server
npm start

# 🎉 Application will open at http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Production files will be in the 'dist' folder
# Deploy the entire dist folder to your web hosting
```

### Additional Commands

```bash
# Run production build
npm run deploy
```

## 📜 License

```
Copyright © 2025 Damian Czerwiński

This project is copyrighted and proprietary software.
All rights reserved.

Unauthorized copying, modification, distribution, or use of this software,
via any medium, is strictly prohibited without explicit written permission
from the copyright holder.

For licensing inquiries or permission requests:
📧 Email: kontakt@damianczerwinski.pl
🌐 Web: https://www.damianczerwinski.pl
```

<br>

<div align="center">
  
**Made with ❤️ and ☕ by Damian Czerwiński**

*Building beautiful, functional web experiences one component at a time*

</div>

