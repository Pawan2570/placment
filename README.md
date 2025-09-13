# Placement Day Planner 🎯

A modern React application for tracking your placement day study plans with timers, progress tracking, and notifications.

## Features ✨

- **📅 Day-based Planning**: Separate study plans for Day 1 and Day 2
- **⏱️ Smart Timers**: Built-in timers for each subject with pause/reset functionality
- **📊 Progress Tracking**: Visual progress bars and completion tracking
- **🔔 Notifications**: Browser notifications and sound alerts when sessions complete
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **💾 Data Persistence**: All progress is saved locally in your browser
- **📈 CSV Export**: Export your progress data for tracking and sharing
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations

## Study Plan 📚

### Day 1
- **Math/Aptitude** (90 min): Number systems, LCM/HCF, divisibility rules
- **HTML Basics** (90 min): Document structure, headings, formatting
- **Java Core** (90 min): Hello World, variables, data types, I/O
- **Typing Practice** (60 min): Home row drills, accuracy focus
- **Communication** (40 min): Self-introduction practice and reading

### Day 2
- **Math Practice** (90 min): Percentages, ratios, time & work
- **HTML Practice** (90 min): Multi-section pages, forms, responsive design
- **Java Practice** (90 min): Scanner practice, conditionals, small programs
- **Typing Speed** (60 min): Speed tests, accuracy drills
- **Communication** (40 min): Mock interviews, LinkedIn posts

## Getting Started 🚀

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git
   git clone <repository-url>
   cd placement-day-planner
   
   # Or simply download and extract the files
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## How to Use 📖

1. **Select a Day**: Choose between Day 1 or Day 2 at the top
2. **Start Studying**: Click "Start" on any subject to begin the timer
3. **Track Progress**: Watch your daily progress bar fill up as you complete subjects
4. **Get Notifications**: Allow browser notifications for session completion alerts
5. **Export Data**: Use "Export progress CSV" to download your study data
6. **Reset if Needed**: Use "Reset day" to start over or "Mark all done" to complete everything

## Features in Detail 🔧

### Timer System
- **Auto-next**: Automatically start the next subject when one completes
- **Sound Alerts**: Audio notification when a session finishes
- **Pause/Resume**: Full control over your study sessions
- **Reset**: Start over any subject at any time

### Progress Tracking
- **Visual Progress**: Real-time progress bars for each day
- **Completion Status**: Clear indicators for completed, running, and planned subjects
- **Data Persistence**: All progress saved automatically in your browser

### Study Materials
- **Topic Lists**: Detailed study topics for each subject
- **Self-Introduction**: Editable template for communication practice
- **Time Management**: Pre-planned time allocations for optimal study

## Browser Compatibility 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Notifications and audio features require modern browsers with permission.

## Data Storage 💾

All your progress is stored locally in your browser's localStorage. This means:
- ✅ Your data stays private
- ✅ No internet required after initial load
- ✅ Data persists between sessions
- ⚠️ Clearing browser data will remove your progress

## Customization 🎨

You can easily customize the study plan by editing `src/data/studyPlan.js`:

```javascript
export const DEFAULT_PLAN = {
  "Day 1": [
    {
      id: "your-subject",
      title: "Your Subject Name",
      minutes: 60,
      topics: ["Topic 1", "Topic 2", "Topic 3"]
    }
    // ... more subjects
  ]
};
```

## Troubleshooting 🔧

### Notifications not working?
- Make sure you've allowed notifications when prompted
- Check your browser's notification settings
- Try refreshing the page and allowing notifications again

### Audio not playing?
- Ensure your browser supports Web Audio API
- Check your system volume and browser audio settings
- Try refreshing the page

### Data not saving?
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading
- Ensure you're not in private/incognito mode

## Contributing 🤝

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the UI/UX
- Adding new study plans

## License 📄

This project is open source and available under the MIT License.

## Author 👨‍💻

Created by **Pawan** for placement preparation and study planning.

---

**Happy Studying! 🎓**

*Good luck with your placement preparation!*
