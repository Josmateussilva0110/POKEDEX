import { Routes, Route } from 'react-router-dom'
import Register from './components/pages/Auth/Register'
import FlashMessage from './components/layout/Message'
import Profile from './components/pages/Auth/Profile'
import Home from './components/pages/Auth/home'
import Login from './components/pages/Auth/Login'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/NavBar'
import Container from './components/layout/Container'
import PokemonDetail from './components/pages/Auth/PokemonDetail'
import Teste from './components/pages/Auth/Test'

function App() {
  return (
    <>
      <Navbar/>
      <Container>
        <FlashMessage/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pokemon/detail/:pokemon_id" element={<PokemonDetail />} />
          <Route path="/test" element={<Teste />} />
        </Routes>
      </Container>
      <Footer/>
    </>
  )
}

export default App
