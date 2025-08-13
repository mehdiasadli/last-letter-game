# 🎮 Last Letter - The Ultimate Word Game

A modern, feature-rich word game built with React, TypeScript, and Mantine UI. Challenge your vocabulary and compete with friends in this exciting multiplayer word game where every letter counts!

![Last Letter Game](https://img.shields.io/badge/Last%20Letter-Word%20Game-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
![Mantine](https://img.shields.io/badge/Mantine-8.2.4-339AF0?style=flat-square&logo=mantine)

## 🌟 Features

### 🎯 Core Gameplay

- **Word Chain Game**: Players take turns saying words that start with the last letter of the previous word
- **Multiple Word Packs**: Countries, US States, Chemical Elements, Zodiac Signs, and more
- **Multi-language Support**: English, Russian, and Azerbaijani word packs
- **Timer System**: Configurable countdown timer with urgency sounds
- **Player Elimination**: Players are eliminated when they can't find a word in time

### 🎨 Customization

- **Theme Support**: Light, Dark, and Auto (system preference) themes
- **Color Schemes**: 14 different primary color options
- **Font Selection**: 10 popular Google Fonts for headings and body text
- **Font Sizes**: 5 size options (xs, sm, md, lg, xl) for both headings and body
- **Border Radius**: Customizable UI element roundness
- **Spacing**: Adjustable gaps between UI elements

### 🎵 Audio & Visual Effects

- **Sound Effects**: Timer tick sounds with urgency levels
- **Error Sounds**: Audio feedback for invalid word submissions
- **Animations**: Smooth Framer Motion animations throughout the app
- **Visual Feedback**: Red pulse animation for used words
- **Celebration Effects**: Confetti animations for successful submissions

### 🏆 Game Modes & Endings

- **Single Winner**: Last player standing wins
- **Multiple Winners**: All remaining players win when word list is exhausted
- **No Winner**: All players eliminated scenario
- **Progress Tracking**: Visual progress bar showing game completion

### 🔧 Advanced Features

- **Fuzzy Search**: Intelligent word validation using Fuse.js
- **Word Aliases**: Support for alternative word forms and spellings
- **Manual Leave**: Players can voluntarily leave the game
- **Game Statistics**: Comprehensive end-game statistics and word lists
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/last-letter.git
   cd last-letter/game
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 How to Play

### Basic Rules

1. **Select a Word Pack**: Choose from various categories like Countries, US States, etc.
2. **Add Players**: Enter player names and select a host
3. **Configure Game**: Set timer duration and other game settings
4. **Start Playing**: The first player gets a random letter to start with
5. **Word Chain**: Each player must say a word that starts with the last letter of the previous word
6. **Timer Pressure**: Find a word before the timer runs out!
7. **Elimination**: Players are eliminated when they can't find a word in time
8. **Victory**: The last player standing wins!

### Game End Conditions

- **Single Winner**: One player remains and finds a word
- **Multiple Winners**: All remaining players win when no words are left
- **No Winner**: All players are eliminated

## 🛠️ Technology Stack

### Frontend

- **React 19.1.1**: Modern React with hooks and functional components
- **TypeScript 5.8.3**: Type-safe development
- **Mantine UI 8.2.4**: Beautiful, accessible UI components
- **Framer Motion**: Smooth animations and transitions
- **React Router DOM**: Client-side routing
- **Zustand**: Lightweight state management
- **Zod**: Schema validation

### Audio & Effects

- **Web Audio API**: Dynamic sound generation
- **Fuse.js**: Fuzzy search for word validation
- **Sonner**: Toast notifications

### Development Tools

- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking

## 📁 Project Structure

```
game/
├── src/
│   ├── app/                 # App configuration and providers
│   ├── components/          # Reusable UI components
│   ├── data/               # Word packs and game data
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and helpers
│   ├── pages/              # Page components
│   ├── stores/             # Zustand state stores
│   └── main.tsx           # App entry point
├── public/                # Static assets
├── index.html             # HTML template
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Adding New Word Packs

1. Create a new file in `src/data/packs/`
2. Use the `createPack` function with your words
3. Export and add to the packs index
4. Include multiple languages if desired

### Customizing Themes

- Modify `src/stores/app-preferences.store.ts` for new options
- Update `src/app/theme-provider.tsx` for theme logic
- Add new fonts to `index.html` Google Fonts link

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mantine UI**: For the beautiful component library
- **Google Fonts**: For the typography options
- **Fuse.js**: For fuzzy search capabilities
- **Framer Motion**: For smooth animations

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/last-letter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/last-letter/discussions)
- **Email**: support@last-letter-game.com

## 🔗 Links

- **Live Demo**: [https://last-letter-game.com](https://last-letter-game.com)
- **Documentation**: [https://docs.last-letter-game.com](https://docs.last-letter-game.com)
- **API Reference**: [https://api.last-letter-game.com](https://api.last-letter-game.com)

---

Made with ❤️ by the Last Letter Team
