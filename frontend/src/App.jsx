import { Routes, Route } from 'react-router-dom'
import Register from './components/pages/Auth/register'
import Home from './components/pages/Auth/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
