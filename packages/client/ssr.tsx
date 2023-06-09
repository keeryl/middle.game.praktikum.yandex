import { renderToString } from 'react-dom/server'

export function render() {
  return renderToString(
    <div>Я ЗАГЛУШКА !!!!</div>
  )
}