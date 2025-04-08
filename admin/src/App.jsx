import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes'
import AuthRoute from './components/AuthRoute'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={routes[0].element} />
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Layout />}>
            {routes[1].children.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App