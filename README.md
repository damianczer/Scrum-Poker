# Scrum Poker

![GitHub stars](https://img.shields.io/github/stars/damianczer/scrum-poker?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/damianczer/scrum-poker?style=social)
![GitHub issues](https://img.shields.io/github/issues/damianczer/scrum-poker?style=flat-square)

> **Estimate tasks easily with a beautiful, real-time React Application powered by Firebase!**

## 🛠️ Technologies Used

- ⚛️ **React.js** - [react.dev](https://react.dev/)
- 🎨 **Sass** - [sass-lang.com](https://sass-lang.com/documentation/syntax/)
- 🔥 **Firebase Realtime Database** - [firebase.google.com](https://firebase.google.com/)
- 📦 **Webpack** - [webpack.js.org](https://webpack.js.org/)
- 🍪 **js-cookie** - User preferences management

## ✨ Features

### 🎯 Core Functionality
- 🔒 **Anonymous Sessions** - No registration required, just enter your name
- 🆔 **Unique Session IDs** - Create or join sessions with shareable links
- 🃏 **Hidden Voting** - Votes are concealed until reveal
- 👥 **Live Participants** - See who's in the session and who voted
- 📊 **Smart Calculations** - Automatic average and individual estimates
- ⚡ **Real-time Sync** - Powered by Firebase Realtime Database

### 🎨 Personalization
- 🌈 **Theme Selection** - Choose from 5 color themes:
  - 💚 Green
  - 💙 Blue
  - 🩵 Turquoise
  - 🩶 Grey
  - 🧡 Orange
- 🌐 **Multi-language Support** - English & Polish
- 🍪 **Persistent Settings** - Preferences saved in cookies

### 🖥️ Technical Highlights
- 📱 Desktop-optimized (limited mobile support)
- 🔄 Real-time UI updates across all connected clients
- 💾 Cookie-based user preferences (theme, language)
- 🚀 Built as SPA (Single-Page Application)
- ⚙️ Optimized production builds with Webpack

## 🔥 How It Works

### Real-time Collaboration
The application uses **Firebase Realtime Database** to synchronize all actions instantly across all participants:
- When someone joins → everyone sees it
- When someone votes → vote count updates live
- When cards are revealed → results appear simultaneously for all users

### Cookie Management
User preferences are stored locally using cookies:
```javascript
{
  "color": "blue",     // Selected theme
  "language": "en"     // Selected language
}
```
These settings persist across sessions (365 days) for a personalized experience.

## 📸 Preview

Main View:

<img width="645" height="916" alt="image" src="https://github.com/user-attachments/assets/6b30422e-9438-4c41-b349-5b40841037d1" />

Manu:

<img width="647" height="918" alt="image" src="https://github.com/user-attachments/assets/19592fdc-ca69-4648-8e99-ad29e5602345" />

Estimation Session:

![image](https://github.com/user-attachments/assets/d8dd3d3f-134d-4eab-a1db-830c27680d57)

## 🚦 Quick Start

### 1. Prerequisites

- [Node.js & npm](https://nodejs.org/en) (v14 or higher)

### 2. Installation

```bash
git clone https://github.com/damianczer/scrum-poker.git
cd scrum-poker/application
npm install
```

### 3. Development Server

```bash
npm start
```

- The app runs on [http://localhost:3000/](http://localhost:3000/)
- Hot reload enabled for development
- If port 3000 is busy, you'll see a message in the console

### 4. Production Build

```bash
npm run build
```

- Generates optimized files in `dist/` folder
- Minified & compressed for maximum performance
- Ready to deploy to any static hosting

## 📝 Usage Guide

### Starting a Session

1. **Enter your username** on the login screen
2. **Create a new session** or **join existing** with a session ID
3. Share the session link with your team

### Estimation Flow

1. **Discuss the task** with your team
2. **Select a card** with your estimate (votes are hidden)
3. **Wait** for everyone to vote (live counter shows progress)
4. **Reveal cards** when ready
5. **View results**: individual estimates + calculated average
6. **Reset** for the next task

### Customization

- Click the **⚙️ Settings icon** in the footer
- **Change theme** from 5 available colors
- **Switch language** between English and Polish
- Settings are automatically saved

## 🌍 Live Demo

Try it here: **[https://www.damianczerwinski.pl/scrum-poker/](https://www.damianczerwinski.pl/scrum-poker/)**

## 🗂️ Project Structure

```
scrum-poker/
├── application/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── styles/         # Sass stylesheets
│   │   ├── translations/   # i18n files
│   │   └── index.js        # Entry point
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── webpack.config.js   # Webpack configuration
│   └── package.json        # Dependencies
└── README.md
```

## 🔧 Configuration

### Firebase Setup

To use your own Firebase instance:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Realtime Database**
3. Add your config to the application
4. Update security rules for anonymous access

## 💡 Support & Feedback

- 🐛 Found a bug? [Open an issue](https://github.com/damianczer/scrum-poker/issues)
- 💬 Have a feature request? [Start a discussion](https://github.com/damianczer/scrum-poker/discussions)
- 🤝 Want to contribute? Pull requests are welcome!

## 📄 License

MIT License - feel free to use this project for your team!

## 🙏 Acknowledgments

- Built with ❤️ for Agile teams
- Inspired by Planning Poker methodology
- Powered by modern web technologies

> _"In Scrum we trust, in estimates we discuss!"_ 🎉

**Star ⭐ this repo if you find it useful!**

