import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { App } from './components/App'
import { ErrorBoundary } from './components/ErrorBoudary'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  </ErrorBoundary>
)