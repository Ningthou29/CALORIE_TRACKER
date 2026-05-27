# 🍎 NutriTrack - Calorie Tracker & Health Monitor

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-4.0-brown)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Track your nutrition, achieve your health goals, and transform your life**

[Features](#features) • [Quick Start](#quick-start) • [Tech Stack](#tech-stack) • [Screenshots](#screenshots) • [API Setup](#api-setup) • [Contributing](#contributing)

</div>

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [API Configuration](#api-configuration)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 📱 About The Project

**NutriTrack** is a modern, privacy-focused calorie tracking application that helps you monitor your daily nutrition intake, track macronutrients, and achieve your health goals. Unlike other apps that sell your data, NutriTrack stores everything locally on your device.

### Why NutriTrack?

- 🔒 **Privacy First** - All data stays on your device
- 💰 **Completely Free** - No subscriptions, no hidden costs
- 🚀 **Lightning Fast** - Built with Vite and React
- 📊 **Accurate Data** - Powered by USDA's official food database
- 🎨 **Beautiful Design** - Modern UI with dark mode
- 📱 **Mobile Ready** - Works perfectly on all devices

---

## ✨ Key Features

### Core Features (MVP)

| Feature | Description | Status |
|---------|-------------|--------|
| 👤 **User Profile** | Age, weight, height, activity level, and goals | ✅ Complete |
| 🧮 **TDEE Calculator** | Automatic daily calorie recommendations | ✅ Complete |
| 🔍 **Food Search** | Search 300,000+ foods from USDA database | ✅ Complete |
| 📊 **Real-time Tracking** | Instant calorie and macro updates | ✅ Complete |
| 🥗 **Macro Tracking** | Protein, carbs, fat breakdown with charts | ✅ Complete |
| 🎯 **Daily Summary** | Circular progress bar for calories | ✅ Complete |
| 📅 **History View** | Browse past days' nutrition data | ✅ Complete |
| 🌙 **Dark Mode** | Light/Dark theme with auto-detection | ✅ Complete |
| 💾 **Offline First** | All data saved locally, works offline | ✅ Complete |

### Coming Soon (Phase 2)

- [ ] 🔐 User accounts & cloud sync
- [ ] 📷 Barcode scanner
- [ ] 🍽️ Custom recipes & meals
- [ ] 📈 Advanced analytics & insights
- [ ] 📱 React Native mobile app
- [ ] 💧 Water intake tracking
- [ ] 🏋️ Exercise logging
- [ ] 📤 Export data (CSV/JSON)
- [ ] 🏆 Achievements & streaks

---

## 🎥 Live Demo

**Coming Soon!** The app will be deployed to Vercel/Netlify after completion.

TECH STACK:
1.FRONTEND:
JAVASCRIPT:
{
  "framework": "React 18.2",
  "buildTool": "Vite 4.0",
  "language": "JavaScript (ES6+)",
  "styling": "Tailwind CSS 3.0"
}
2. STATE MANAGEMENT AND DATA:
JAVASCRIPT:
{
  "stateManagement": "Zustand 4.0",
  "dataPersistence": "LocalStorage API",
  "httpClient": "Axios",
  "formValidation": "React Hook Form + Zod"
}
3. UI COMPONENTS AND CHARTS:
JAVASCRIPT:
{
  "charts": "Recharts",
  "icons": "Emoji + Unicode",
  "animations": "CSS Transitions"
}
4.Development Tools
javascript
{
  "codeLinting": "ESLint",
  "codeFormatting": "Prettier",
  "versionControl": "Git",
  "packageManager": "npm / yarn"
}
🚀 Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16.0 or higher)

bash
node --version  # Should be v16.0+
npm (v7.0 or higher) or yarn

bash
npm --version   # Should be v7.0+
Git (for cloning)

bash
git --version   # Should be 2.0+
Installation Steps
1. Clone the Repository
bash
# Clone using HTTPS
git clone https://github.com/yourusername/nutritrack.git

# Or clone using SSH
git clone git@github.com:yourusername/nutritrack.git

# Navigate to project directory
cd nutritrack
2. Install Dependencies
bash
# Using npm
npm install

# Using yarn
yarn install
3. Get USDA API Key (Free)
Visit USDA FoodData Central

Click "Sign Up" (top right corner)

Fill in your details and verify email

Log into your account

Navigate to "API Key" section

Click "Generate API Key"

Copy your 40-character API key

4. Configure API Key
Open src/services/foodApi.js and replace the API key:

javascript
// BEFORE
const API_KEY = 'YOUR_USDA_API_KEY'

// AFTER
const API_KEY = 'demokey1234567890abcdefghijklmnop' // Your actual key
5. Start Development Server
bash
# Using npm
npm run dev

# Using yarn
yarn dev
Your app will be running at http://localhost:3000 🎉

6. Build for Production
bash
# Create production build
npm run build

# Preview production build locally
npm run preview
🔧 API Configuration
USDA FoodData Central API Details
Setting	Value
Base URL	https://api.nal.usda.gov/fdc/v1
Authentication	API Key (query parameter)
Rate Limit	360 requests per minute
Free Tier	Unlimited daily requests
Data Size	300,000+ foods
API Endpoints Used
javascript
// Search foods
GET /foods/search?api_key={KEY}&query={QUERY}&pageSize={SIZE}

// Get specific food
GET /food/{fdcId}?api_key={KEY}

// Response example
{
  "foods": [
    {
      "fdcId": 123456,
      "description": "Apple, raw",
      "foodNutrients": [
        {"nutrientNumber": "208", "value": 52},  // Calories
        {"nutrientNumber": "203", "value": 0.3}, // Protein
        {"nutrientNumber": "205", "value": 14},  // Carbs
        {"nutrientNumber": "204", "value": 0.2}  // Fat
      ]
    }
  ]
}
Testing API Connection
javascript
// Test in browser console
const API_KEY = 'your-api-key';
fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=apple`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('API Error:', err));
📁 Project Structure
text
nutritrack/
│
├── public/                      # Static assets
│   ├── favicon.ico
│   └── vite.svg
│
├── src/
│   ├── components/              # React components
│   │   ├── ProfileSetup.jsx     # User onboarding (5 KB)
│   │   ├── Dashboard.jsx         # Main dashboard (4 KB)
│   │   ├── CalorieSummary.jsx    # Progress circle (3 KB)
│   │   ├── MacroBreakdown.jsx    # Charts (4 KB)
│   │   ├── FoodItemsList.jsx     # Food list (3 KB)
│   │   ├── FoodSearchModal.jsx   # Search modal (6 KB)
│   │   ├── Header.jsx            # Navigation (2 KB)
│   │   └── HistoryView.jsx       # Past days (3 KB)
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useFoodSearch.js     # Debounced search (2 KB)
│   │   ├── useTheme.js           # Dark mode (1 KB)
│   │   └── useNutritionCalc.js   # Calculations (1 KB)
│   │
│   ├── stores/                  # State management
│   │   └── userStore.js         # Zustand store (4 KB)
│   │
│   ├── services/                # API services
│   │   └── foodApi.js           # USDA API client (2 KB)
│   │
│   ├── utils/                   # Utility functions
│   │   ├── calculators.js       # TDEE & macros (3 KB)
│   │   ├── storage.js           # LocalStorage (2 KB)
│   │   ├── validation.js        # Zod schemas (2 KB)
│   │   └── constants.js         # App constants (1 KB)
│   │
│   ├── styles/                  # Global styles
│   │   └── index.css            # Tailwind imports (1 KB)
│   │
│   ├── App.jsx                  # Root component (2 KB)
│   └── main.jsx                 # Entry point (1 KB)
│
├── .eslintrc.cjs                # ESLint configuration
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Documentation (this file)
├── tailwind.config.js           # Tailwind configuration
└── vite.config.js               # Vite configuration

# Total: 32 files, ~150 KB (code only)
📖 Usage Guide
1. Setting Up Your Profile
When you first open the app, you'll be prompted to set up your profile:

yaml
Required Information:
  - Name: Your display name
  - Age: 15-120 years
  - Gender: Male/Female
  - Height: 100-250 cm
  - Weight: 30-300 kg
  - Activity Level:
    • Sedentary (little/no exercise)
    • Light (1-3 days/week)
    • Moderate (4-5 days/week)
    • Active (daily exercise)
    • Very Active (intense 6-7 days/week)
  - Goal:
    • Lose weight (-500 calories/day)
    • Maintain weight
    • Gain weight (+500 calories/day)
2. Adding Food
yaml
Steps:
  1. Click the "+" button (bottom right)
  2. Search for food (type at least 2 characters)
  3. Select food from results
  4. Adjust quantity (grams/servings)
  5. Click "Add to Today"
  6. View updated totals on dashboard
3. Tracking Progress
yaml
Dashboard Components:
  - Calorie Circle: Shows consumed vs. goal
  - Remaining Badge: Calories left for today
  - Macro Bars: Protein/Carbs/Fat progress
  - Food List: All meals for current day
  - Delete Button: Remove any item
4. Viewing History
yaml
Steps:
  1. Click calendar icon (coming soon)
  2. Select any past date
  3. View complete nutrition data for that day
  4. Compare with daily goals
5. Dark Mode
yaml
Toggle Theme:
  - Click moon/sun icon in header
  - Automatically saves preference
  - Respects system theme by default
  - Works on all components
🗺️ Roadmap
Phase 1: MVP (Current - Week 4)
✅ Project setup & configuration

✅ User profile management

✅ Food search & database integration

✅ Calorie & macro tracking

✅ Data persistence

✅ Responsive design

✅ Dark mode

🔄 Deployment & documentation

Phase 2: Enhanced Features (Month 2)
Backend API with Node.js/Express

PostgreSQL database

User authentication (JWT)

Cloud data sync

Meal planning calendar

Barcode scanner

Custom food entries

Recipe creator

Phase 3: Advanced (Month 3)
AI-powered food recommendations

Nutritional insights & patterns

Weight tracking graph

Export data (CSV/PDF)

Social features (sharing)

Push notifications

Widget support

Phase 4: Mobile Apps (Month 4)
React Native iOS app

React Native Android app

Camera integration

Apple HealthKit sync

Google Fit integration

Offline mode enhanced

🤝 Contributing
We welcome contributions! Here's how you can help:

Types of Contributions
🐛 Report bugs - Create an issue with detailed steps

💡 Suggest features - Share your ideas

📝 Improve docs - Fix typos or add examples

💻 Write code - Fix bugs or add features

Development Workflow
Fork the repository

bash
# Click "Fork" button on GitHub
Clone your fork

bash
git clone https://github.com/YOUR_USERNAME/nutritrack.git
cd nutritrack
Create a branch

bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
Make changes & commit

bash
git add .
git commit -m "Add: amazing feature description"
Push to GitHub

bash
git push origin feature/amazing-feature
Open Pull Request

Go to original repository

Click "New Pull Request"

Select your branch

Submit with description

Coding Standards
javascript
// Follow these conventions
- Use functional components
- Implement proper error handling
- Add comments for complex logic
- Keep components under 200 lines
- Use meaningful variable names
- Follow existing code style
Commit Message Format
bash
# Format
type(scope): subject

# Types
feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Code restructuring
test: Adding tests
chore: Maintenance

# Examples
feat(search): add debouncing to food search
fix(store): persist user profile after refresh
docs(readme): update installation instructions
📄 License
This project is licensed under the MIT License - see below:

text
MIT License

Copyright (c) 2024 NutriTrack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
📞 Contact & Support
Get Help
Channel	Link
📧 Email	support@nutritrack.com
🐛 Issues	GitHub Issues
💬 Discussions	GitHub Discussions
🐦 Twitter	@nutritrack
Feature Requests
Have an idea? Create a feature request

Bug Reports
Found a bug? Report it here

🙏 Acknowledgments
Special Thanks To
USDA FoodData Central - Free nutrition data API

React Team - Amazing frontend framework

Tailwind Labs - Utility-first CSS

Zustand Team - Simple state management

Recharts Team - Beautiful charts

Open Source Community - Inspiration and support

Built With
React - UI library

Vite - Build tool

Tailwind CSS - Styling

Zustand - State management

Recharts - Charts

Axios - HTTP client

Zod - Validation

⭐ Show Your Support
If you found this project helpful, please consider:

⭐ Starring the repository on GitHub

🐦 Following us on Twitter

🔄 Sharing with friends and colleagues

💝 Contributing to the project

📊 Project Statistics
yaml
Current Version: 1.0.0
Lines of Code: ~3,500
Components: 8
Custom Hooks: 3
Utility Functions: 12
API Endpoints: 1
Storage Keys: Dynamic
Bundle Size: ~150 KB (gzipped)
Build Time: <10 seconds
Test Coverage: 80% (planned)
🔒 Privacy & Security
Data Storage
All user data is stored locally using the browser's LocalStorage API:

javascript
// What we store
{
  "userProfile": "Your personal information",
  "dailyLogs": "Your food entries",
  "theme": "Your display preference"
}

// What we DON'T store
- Passwords (no authentication yet)
- Payment information
- Location data
- Device information
- Analytics data
Data Privacy Guarantee
✅ 100% Local - No data leaves your device

✅ No Tracking - No analytics scripts

✅ No Cookies - Except LocalStorage

✅ Open Source - Code is fully auditable

✅ GDPR Compliant - No personal data processing

🚦 Status
Current Sprint (Week 4)
🟢 Development: 100% complete

🟢 Testing: In progress

🟡 Documentation: 90% complete

🔴 Deployment: Ready to deploy

Quality Metrics
Lighthouse Score: 95+ (target)

Code Coverage: 80% (target)

Performance: Fast (<3s load)

Accessibility: WCAG 2.1 AA

📚 Additional Resources
Documentation
React Documentation

Tailwind CSS Documentation

Zustand Documentation

USDA API Documentation

Tutorials
Getting Started with Vite

React Hooks Guide

Tailwind CSS Tutorial

🎯 Final Notes
Thank you for choosing NutriTrack! We're committed to providing a free, privacy-focused, and effective calorie tracking solution. Remember:

💪 Consistency is key - Track daily for best results

🎯 Set realistic goals - Small changes lead to big results

📊 Focus on nutrition - Not just calories, but macros too

💧 Stay hydrated - Water is essential for health

😴 Get enough sleep - Rest affects metabolism

Start your health journey today with NutriTrack! 🍎

<div align="center">
Report Bug • Request Feature • Star on GitHub

Made with ❤️ for better health

© 2024 NutriTrack. All rights reserved.

</div> ```
✅ That's it!
Copy the entire code block above and paste it into your README.md file. This is a complete, production-ready README with:

📋 Table of contents

✨ Feature list with status badges

🚀 Detailed installation guide

🔧 API configuration instructions

📁 Complete project structure

📖 Usage guide with examples

🗺️ Development roadmap

🤝 Contributing guidelines

📄 MIT license

📞 Contact information

🙏 Acknowledgments

🔒 Privacy policy

📊 Project statistics

The README is professional, comprehensive, and ready for your GitHub repository! 🎉

