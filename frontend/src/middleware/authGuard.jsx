import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const AuthGuard = ({ children, type }) => {
  const {isAuth}=useAuth()

  if (isAuth === null) return <div>Loading...</div>

  // 🔐 Protected Route
  if (type === "protected" && !isAuth) {
    return <Navigate to="/login" replace />
  }

  // 🚫 Public Route (Login)
  if (type === "public" && isAuth) {
    return <Navigate to="/inventoryManagement" replace />
  }

  return children
}

export default AuthGuard
