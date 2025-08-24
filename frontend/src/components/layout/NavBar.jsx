import { Link } from 'react-router-dom'
import { useContext } from 'react'
import styles from './styles/NavBar.module.css'
import { Context } from '../../context/UserContext'

function Navbar() {
  const { authenticated, logout, loading } = useContext(Context)

  if (loading) return null // evita renderizar navbar até o estado ser conhecido

  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <ul>
        {authenticated ? (
          <>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
