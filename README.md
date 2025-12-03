# AI Task Planner with Focus Music

A beautiful mobile-first web app that helps you break down overwhelming tasks into small, manageable steps with an AI helper, and keeps you focused with ambient background music.

## Features

### 🤖 AI-Powered Task Breakdown
- Input any big, overwhelming task
- Get intelligent step-by-step plans tailored to your task type
- Supports various task categories: projects, learning, writing, organizing, planning, fitness, and more

### ✏️ Interactive Plan Editor
- Review AI-generated "Plan A" suggestions
- Edit, add, or remove steps before accepting
- Customize plans to match your workflow

### ✅ Today's Checklist
- Track all your daily tasks in one place
- Check off completed items with satisfying animations
- Progress tracking with visual indicators
- Edit or delete tasks on the fly
- Persistent storage (tasks saved in localStorage)

### 🎵 Focus Music Player
- Subtle mini music tab at the bottom
- Multiple ambient focus tracks (Lo-fi, Classical, Ambient, Nature)
- Volume control and track selection
- Smart music suggestions based on task type
- Continuous playback while you work

## Tech Stack

- **React 18** - UI framework
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with animations
- **localStorage** - Task persistence

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

The app runs on `http://localhost:3000` by default.

## How It Works

1. **Describe Your Task**: Tell the AI about something that's overwhelming you
2. **Review Plan A**: Get an intelligent breakdown of steps tailored to your task
3. **Customize**: Edit, add, or remove steps as needed
4. **Accept & Start**: Add the plan to your today's checklist
5. **Work Through It**: Check off items as you complete them
6. **Stay Focused**: Play ambient music to maintain concentration

## Project Structure

```
src/
├── components/
│   ├── TaskInput.jsx       # Input form for new tasks
│   ├── PlanDisplay.jsx     # AI plan viewer and editor
│   ├── TodayChecklist.jsx  # Daily task list
│   └── MusicPlayer.jsx     # Focus music player
├── aiHelper.js             # AI task breakdown logic
├── App.jsx                 # Main app component
├── App.css                 # App-level styles
├── index.css               # Global styles
└── main.jsx                # Entry point
```

## AI Task Categories

The AI helper recognizes and provides specialized steps for:

- **Project Tasks**: Building, creating, developing
- **Learning Tasks**: Studying, mastering new skills
- **Writing Tasks**: Articles, reports, essays
- **Organization**: Cleaning, sorting, arranging
- **Planning**: Scheduling, coordinating events
- **Fitness**: Exercise routines, health goals
- **General**: Fallback for any other task type

## Mobile-First Design

Built with mobile users in mind:
- Responsive layouts that adapt to any screen size
- Touch-friendly interface elements
- Optimized for portrait mobile screens
- Smooth animations and transitions
- Accessible on desktop too!

## License

MIT

## Author

Built with Claude Code
