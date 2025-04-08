import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const isLogin = localStorage.getItem('token')
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />
}

export default AuthRoute