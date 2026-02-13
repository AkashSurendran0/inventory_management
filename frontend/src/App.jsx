import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './pages/login'
import {SnackbarProvider} from 'notistack'

function App() {

  return (
      <SnackbarProvider
        maxSnack={3} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
  )

}

export default App
