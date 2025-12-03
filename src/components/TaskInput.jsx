import { useState } from 'react'
import { Sparkles, Zap, Clock, Target } from 'lucide-react'
import './TaskInput.css'

function TaskInput({ onSubmit }) {
  const [task, setTask] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const exampleTasks = [
    'Learn React and build a portfolio website',
    'Write a blog post about productivity',
    'Organize my home office',
    'Plan a healthy meal prep for the week',
    'Start a daily exercise routine'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (task.trim().length < 5) return

    setIsLoading(true)

    // Simulate AI thinking time for better UX
    setTimeout(() => {
      onSubmit(task)
      setTask('')
      setIsLoading(false)
    }, 800)
  }

  const handleExampleClick = (example) => {
    setTask(example)
  }

  return (
    <div className="task-input fade-in">
      <div className="task-input-hero">
        <div className="hero-icon">
          <Sparkles size={32} />
        </div>
        <h2 className="hero-title">What's overwhelming you?</h2>
        <p className="hero-subtitle">
          Tell me about your big task, and I'll break it down into small, manageable steps.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <textarea
            className="task-textarea"
            placeholder="Example: Learn to play guitar and perform my first song..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={task.trim().length < 5 || isLoading}
        >
          {isLoading ? (
            <>
              <div className="spinner" />
              <span>Creating your plan...</span>
            </>
          ) : (
            <>
              <Zap size={20} />
              <span>Break It Down</span>
            </>
          )}
        </button>
      </form>

      <div className="features-grid">
        <div className="feature-card">
          <Target className="feature-icon" size={20} />
          <span>Smart Planning</span>
        </div>
        <div className="feature-card">
          <Clock className="feature-icon" size={20} />
          <span>Time Estimates</span>
        </div>
        <div className="feature-card">
          <Sparkles className="feature-icon" size={20} />
          <span>AI-Powered</span>
        </div>
      </div>

      <div className="examples-section">
        <h3 className="examples-title">Need inspiration? Try these:</h3>
        <div className="examples-list">
          {exampleTasks.map((example, index) => (
            <button
              key={index}
              className="example-btn"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskInput
