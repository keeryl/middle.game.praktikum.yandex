import { renderToString } from 'react-dom/server'
import { App } from './src/components/App/index'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

export async function render(uri: string, repository) {  
  const initialState = store.getState()
  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  return [initialState, renderResult]
};
