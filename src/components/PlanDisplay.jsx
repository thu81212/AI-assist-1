import { useState } from 'react'
import { CheckCircle2, ArrowLeft, Edit3, X, Plus, Trash2 } from 'lucide-react'
import { getMotivationalMessage } from '../aiHelper'
import './PlanDisplay.css'

function PlanDisplay({ result, onAccept, onBack }) {
  const [steps, setSteps] = useState(result.steps)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editText, setEditText] = useState('')

  const handleStartEdit = (index) => {
    setEditingIndex(index)
    setEditText(steps[index])
  }

  const handleSaveEdit = (index) => {
    if (editText.trim()) {
      const newSteps = [...steps]
      newSteps[index] = editText.trim()
      setSteps(newSteps)
    }
    setEditingIndex(null)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditText('')
  }

  const handleDeleteStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const handleAddStep = () => {
    setSteps([...steps, 'New step'])
    setEditingIndex(steps.length)
    setEditText('New step')
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div className="plan-display fade-in">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="plan-header">
        <div className="plan-badge">Plan A</div>
        <h2 className="plan-title">Your Action Plan</h2>
        <p className="plan-subtitle">{getMotivationalMessage(result.category)}</p>
      </div>

      <div className="plan-meta">
        <div className="meta-card">
          <span className="meta-label">Task</span>
          <span className="meta-value">{result.originalTask}</span>
        </div>
        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-label">Category</span>
            <span className="meta-value capitalize">{result.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Est. Time</span>
            <span className="meta-value">{result.estimatedTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Difficulty</span>
            <span
              className="meta-value difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(result.difficulty) }}
            >
              {result.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="steps-section">
        <div className="steps-header">
          <h3 className="steps-title">Steps to Complete</h3>
          <button className="add-step-btn" onClick={handleAddStep}>
            <Plus size={16} />
            <span>Add Step</span>
          </button>
        </div>

        <div className="steps-list">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-number">{index + 1}</div>

              {editingIndex === index ? (
                <div className="step-edit">
                  <textarea
                    className="step-edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    autoFocus
                  />
                  <div className="step-edit-actions">
                    <button
                      className="edit-action-btn save"
                      onClick={() => handleSaveEdit(index)}
                    >
                      Save
                    </button>
                    <button
                      className="edit-action-btn cancel"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="step-content">
                    <p className="step-text">{step}</p>
                  </div>
                  <div className="step-actions">
                    <button
                      className="step-action-btn"
                      onClick={() => handleStartEdit(index)}
                      title="Edit step"
                    >
                      <Edit3 size={16} />
                    </button>
                    {steps.length > 1 && (
                      <button
                        className="step-action-btn delete"
                        onClick={() => handleDeleteStep(index)}
                        title="Delete step"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="plan-actions">
        <button className="accept-btn" onClick={() => onAccept(steps)}>
          <CheckCircle2 size={20} />
          <span>Accept Plan & Start Today</span>
        </button>
        <p className="plan-hint">
          You can edit any step before accepting, or add new ones
        </p>
      </div>
    </div>
  )
}

export default PlanDisplay
