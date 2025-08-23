import { Routes, Route, Link } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Register from './components/pages/Auth/register'
import Home from './components/pages/Auth/home'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserProvider>
  )
}

export default App
