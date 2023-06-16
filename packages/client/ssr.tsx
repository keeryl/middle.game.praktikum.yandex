import { renderToString } from 'react-dom/server'
import { App } from './src/components/App/index'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { createStore } from './src/store/store'

const store = createStore()

export async function render(url: string) {  
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  const initialState = store.getState()

  return [appHtml, initialState];
};
