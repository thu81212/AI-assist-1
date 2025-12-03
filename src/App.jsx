import { useState, useEffect } from 'react'
import { Sparkles, Calendar, Music2 } from 'lucide-react'
import { breakDownTask, getMotivationalMessage, suggestMusicForTask } from './aiHelper'
import TaskInput from './components/TaskInput'
import PlanDisplay from './components/PlanDisplay'
import TodayChecklist from './components/TodayChecklist'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

function App() {
  const [view, setView] = useState('input') // 'input', 'plan', 'checklist'
  const [currentTask, setCurrentTask] = useState('')
  const [planResult, setPlanResult] = useState(null)
  const [todayTasks, setTodayTasks] = useState(() => {
    const saved = localStorage.getItem('todayTasks')
    return saved ? JSON.parse(saved) : []
  })
  const [showMusic, setShowMusic] = useState(false)

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('todayTasks', JSON.stringify(todayTasks))
  }, [todayTasks])

  // Handle task breakdown
  const handleBreakdown = (taskDescription) => {
    setCurrentTask(taskDescription)
    const result = breakDownTask(taskDescription)

    if (result.success) {
      setPlanResult(result)
      setView('plan')
    }
  }

  // Accept and add plan to today's checklist
  const handleAcceptPlan = (steps) => {
    const newTasks = steps.map((step, index) => ({
      id: Date.now() + index,
      text: step,
      completed: false,
      category: planResult.category,
      originalTask: planResult.originalTask,
      addedAt: new Date().toISOString()
    }))

    setTodayTasks([...todayTasks, ...newTasks])
    setView('checklist')
  }

  // Toggle task completion
  const handleToggleTask = (id) => {
    setTodayTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Delete task
  const handleDeleteTask = (id) => {
    setTodayTasks(tasks => tasks.filter(task => task.id !== id))
  }

  // Edit task
  const handleEditTask = (id, newText) => {
    setTodayTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTodayTasks(tasks => tasks.filter(task => !task.completed))
  }

  // Get today's date
  const getTodayDate = () => {
    const today = new Date()
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <Sparkles className="header-icon" size={24} />
            <h1 className="header-title">AI Task Planner</h1>
          </div>
          <div className="header-date">
            <Calendar size={16} />
            <span>{getTodayDate()}</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="app-nav">
        <button
          className={`nav-btn ${view === 'input' ? 'active' : ''}`}
          onClick={() => setView('input')}
        >
          <Sparkles size={20} />
          New Task
        </button>
        <button
          className={`nav-btn ${view === 'checklist' ? 'active' : ''}`}
          onClick={() => setView('checklist')}
        >
          <Calendar size={20} />
          Today ({todayTasks.filter(t => !t.completed).length})
        </button>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {view === 'input' && (
          <TaskInput onSubmit={handleBreakdown} />
        )}

        {view === 'plan' && planResult && (
          <PlanDisplay
            result={planResult}
            onAccept={handleAcceptPlan}
            onBack={() => setView('input')}
          />
        )}

        {view === 'checklist' && (
          <TodayChecklist
            tasks={todayTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onClearCompleted={handleClearCompleted}
            onNewTask={() => setView('input')}
          />
        )}
      </main>

      {/* Music Player Tab */}
      <div className={`music-tab ${showMusic ? 'expanded' : ''}`}>
        {!showMusic ? (
          <button
            className="music-toggle"
            onClick={() => setShowMusic(true)}
          >
            <Music2 size={20} />
            <span>Focus Music</span>
          </button>
        ) : (
          <MusicPlayer
            suggestion={planResult ? suggestMusicForTask(planResult.category) : null}
            onClose={() => setShowMusic(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App
