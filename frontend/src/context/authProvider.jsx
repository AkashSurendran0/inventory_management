import {  useState, useEffect } from "react"
import { verifyUser } from "../services/authService"
import { AuthContext } from "./authContext"


export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)

  const checkAuth = async () => {
    try {
      await verifyUser()
      setIsAuth(true)
    } catch {
      setIsAuth(false)
    }
  }

  useEffect(() => {
    const alterAuth = () => {
        checkAuth()
    }
    
    alterAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
