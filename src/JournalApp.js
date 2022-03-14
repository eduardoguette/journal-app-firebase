import { AppRouter } from './routers/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'

function JournalApp() {
  return (
    <Provider store={store}>
      <div className='min-h-screen'>
        <AppRouter />
      </div>
    </Provider>
  )
}

export default JournalApp
