import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './pages/login'
import InventoryManagement from './pages/inventoryManagement'
import {SnackbarProvider} from 'notistack'
import CustomerPage from './pages/userManagement'
import SalesPage from './pages/sales'

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
            <Route path='/inventoryManagement' element={<InventoryManagement/>}/>
            <Route path='/customerManagement' element={<CustomerPage/>}/>
            <Route path='/sales' element={<SalesPage/>}/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
  )

}

export default App
