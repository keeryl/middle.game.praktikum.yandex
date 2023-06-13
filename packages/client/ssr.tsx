import { renderToString } from 'react-dom/server'
import { App } from './src/components/App/index'
import { StaticRouter } from 'react-router-dom/server'
import { matchPath } from 'react-router-dom'
import { createStore } from './src/store/store'
import { Provider } from 'react-redux'
import { routes } from './src/routes'
import { UserApi } from './src/api/UserApi/index'


export async function render(uri, repository) {
  const [pathname] = uri.split('?')
  const store = createStore(new UserApi(repository))
  const currentRoute = routes.find(route => matchPath(pathname, route))
  const { loader } = currentRoute
  if (loader) {
    await loader(store.dispatch)
  }
  
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

