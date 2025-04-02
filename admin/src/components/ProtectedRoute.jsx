import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // 检查本地存储中的 token

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // 未登录则重定向
  }

  return children; // 已登录则渲染子组件（如主页）
};

export default ProtectedRoute;