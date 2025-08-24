import { Routes, Route } from 'react-router-dom'
import Register from './components/pages/Auth/register'
import Home from './components/pages/Auth/Home'
import FlashMessage from './components/layout/Message'

function App() {
  return (
    <>
      <FlashMessage/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </>
  )
}

export default App
