import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './pages/login'
import InventoryManagement from './pages/inventoryManagement'
import {SnackbarProvider} from 'notistack'
import CustomerPage from './pages/userManagement'
import SalesPage from './pages/sales'
import ReportsPage from './pages/reports'
import AuthGuard from './middleware/authGuard'

function App() {

  return (
      <SnackbarProvider
        maxSnack={3} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/login' 
            element={
              <AuthGuard type="public">
                <LoginPage/>
              </AuthGuard>
            }/>
            <Route path='/inventoryManagement' 
            element={
              <AuthGuard type="protected">
                <InventoryManagement/>
              </AuthGuard>
            }/>
            <Route path='/customerManagement' 
            element={
              <AuthGuard type="protected">
                <CustomerPage/>
              </AuthGuard>
            }/>
            <Route path='/sales' 
            element={
              <AuthGuard type="protected">
                <SalesPage/>
              </AuthGuard>
            }/>
            <Route path='/reports' 
            element={
              <AuthGuard type="protected">
                <ReportsPage/>
              </AuthGuard>
            }/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
  )

}

export default App
