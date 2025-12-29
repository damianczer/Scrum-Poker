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
| ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react) | `19.1.0` | Modern UI Framework |
| ![Sass](https://img.shields.io/badge/Sass-1.87.0-CC6699?style=flat-square&logo=sass) | `1.87.0` | CSS preprocessor |
| ![Firebase](https://img.shields.io/badge/Firebase-11.6.1-FFCA28?style=flat-square&logo=firebase) | `11.6.1` | Real-time database |
| ![Webpack](https://img.shields.io/badge/Webpack-5.99.7-8DD6F9?style=flat-square&logo=webpack) | `5.99.7` | Module bundler |
| ![js-cookie](https://img.shields.io/badge/js--cookie-3.0.5-F7DF1E?style=flat-square&logo=javascript) | `3.0.5` | User preferences management |

Estimate tasks easily with a beautiful, real-time React Application powered by Firebase for Agile teams using Planning Poker methodology.

<img width="1256" height="893" alt="Estimation Session" src="https://github.com/user-attachments/assets/d8dd3d3f-134d-4eab-a1db-830c27680d57" />

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
- Multi-language Support - English & Polish translations.
- Persistent Settings - Preferences saved in cookies.
- Desktop-optimized UI with limited mobile support.
- 100% Real-time - all actions synchronized instantly across all participants.
- Optimized for production (efficiency, safety, accessibility).

## 📁 Project Architecture

```
Scrum-Poker/
├── application/
│   ├── public/
│   │   └── index.html                  # HTML entry point
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CardSelection.jsx       # Card voting component
│   │   │   ├── Content.jsx             # Main content wrapper
│   │   │   ├── Footer.jsx              # Footer with settings
│   │   │   ├── Header.jsx              # Application header
│   │   │   ├── Modal.jsx               # Modal dialogs
│   │   │   └── UserList.jsx            # Live participants list
│   │   │
│   │   ├── constants/                  # Application constants
│   │   ├── hooks/                      # Custom React hooks
│   │   ├── services/                   # Firebase services
│   │   │
│   │   ├── styles/
│   │   │   ├── _body.scss              # Body styles
│   │   │   ├── _cardSelection.scss     # Card selection styles
│   │   │   ├── _content.scss           # Content area styles
│   │   │   ├── _footer.scss            # Footer styles
│   │   │   ├── _global.scss            # Global styles & variables
│   │   │   ├── _header.scss            # Header styles
│   │   │   ├── _modal.scss             # Modal styles
│   │   │   └── _userList.scss          # User list styles
│   │   │
│   │   ├── translations/
│   │   │   ├── cardSelection.js        # Card selection translations
│   │   │   ├── content.js              # Content translations
│   │   │   ├── footer.js               # Footer translations
│   │   │   └── header.js               # Header translations
│   │   │
│   │   ├── types/                      # Type definitions
│   │   ├── utils/                      # Utility functions
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

