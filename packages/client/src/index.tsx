import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './components/App'
import { ErrorBoundary } from './components/ErrorBoudary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
