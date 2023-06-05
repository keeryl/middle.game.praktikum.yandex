import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { App } from './components/App'
import { ErrorBoundary } from './components/ErrorBoudary'
import { Provider } from 'react-redux'
import { store } from './store/store'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <ErrorBoundary>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </ErrorBoundary>
// )

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)