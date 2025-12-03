import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function TestApp() {
  return (
    <div style={{
      padding: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'red',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>TEST - If you see this, React is working!</h1>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
)
