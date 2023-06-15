import { renderToString } from 'react-dom/server'
import { App } from './src/components/App/index'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

export async function render(url: string) {  
    return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
};
