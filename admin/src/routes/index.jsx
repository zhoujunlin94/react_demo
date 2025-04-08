import { Navigate } from 'react-router-dom'
import Login from '../pages/login/index.jsx'
import User from '../pages/user/index.jsx'
import Index from '../pages/index/index.jsx'

const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    children: [
      { path: 'index', element: <Index /> },
      { path: 'user', element: <User /> },
      { path: '/', element: <Navigate to="/index" /> }
    ]
  }
]

export default routes