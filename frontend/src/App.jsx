import { Routes, Route } from 'react-router-dom'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Auth/Home'
import FlashMessage from './components/layout/Message'
import Profile from './components/pages/Auth/Profile'
import Login from './components/pages/Auth/Login'

function App() {
  return (
    <>
      <FlashMessage/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </>
  )
}

export default App
