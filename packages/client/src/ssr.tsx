import { App } from './components/App'
import { renderToString } from 'react-dom/server'

export function render() {
  return renderToString(
    <App />
  )
}