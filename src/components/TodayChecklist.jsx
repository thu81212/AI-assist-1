import { useState } from 'react'
import { CheckCircle2, Circle, Edit3, Trash2, Plus, Trophy, Sparkles } from 'lucide-react'
import './TodayChecklist.css'

function TodayChecklist({ tasks, onToggle, onDelete, onEdit, onClearCompleted, onNewTask }) {
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const handleStartEdit = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      onEdit(id, editText.trim())
    }
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSaveEdit(id)
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  return (
    <div className="today-checklist fade-in">
      {/* Header with Progress */}
      <div className="checklist-header">
        <div className="header-top">
          <h2 className="checklist-title">Today's Tasks</h2>
          {completedCount === totalCount && totalCount > 0 && (
            <div className="celebration-badge">
              <Trophy size={16} />
              <span>All Done!</span>
            </div>
          )}
        </div>

        {totalCount > 0 && (
          <div className="progress-section">
            <div className="progress-stats">
              <span className="progress-text">
                {completedCount} of {totalCount} completed
              </span>
              <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {totalCount === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Sparkles size={48} />
          </div>
          <h3 className="empty-title">Ready for a productive day?</h3>
          <p className="empty-subtitle">
            Break down your overwhelming tasks into small steps and start checking them off!
          </p>
          <button className="empty-action-btn" onClick={onNewTask}>
            <Plus size={20} />
            <span>Create Your First Plan</span>
          </button>
        </div>
      )}

      {/* Tasks List */}
      {totalCount > 0 && (
        <div className="tasks-container">
          <div className="tasks-list">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? 'completed' : ''}`}
              >
                <button
                  className="task-checkbox"
                  onClick={() => onToggle(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 size={24} className="checkbox-icon checked" />
                  ) : (
                    <Circle size={24} className="checkbox-icon" />
                  )}
                </button>

                {editingId === task.id ? (
                  <div className="task-edit">
                    <textarea
                      className="task-edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, task.id)}
                      rows={2}
                      autoFocus
                    />
                    <div className="task-edit-actions">
                      <button
                        className="edit-btn save"
                        onClick={() => handleSaveEdit(task.id)}
                      >
                        Save
                      </button>
                      <button
                        className="edit-btn cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="task-content">
                      <p className="task-text">{task.text}</p>
                      {task.category && (
                        <span className="task-category">{task.category}</span>
                      )}
                    </div>

                    <div className="task-actions">
                      <button
                        className="task-action-btn"
                        onClick={() => handleStartEdit(task)}
                        title="Edit task"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        className="task-action-btn delete"
                        onClick={() => onDelete(task.id)}
                        title="Delete task"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="checklist-actions">
            <button className="action-btn primary" onClick={onNewTask}>
              <Plus size={20} />
              <span>Add New Task Plan</span>
            </button>

            {completedCount > 0 && (
              <button className="action-btn secondary" onClick={onClearCompleted}>
                <Trash2 size={20} />
                <span>Clear Completed ({completedCount})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TodayChecklist
