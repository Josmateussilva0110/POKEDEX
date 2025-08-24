// context/UserContext.jsx
import { createContext } from "react"
import useAuth from "../hooks/useAuth"

const Context = createContext()

export function UserProvider({ children }) {
  const { authenticated, register, login, logout } = useAuth()

  return (
    <Context.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </Context.Provider>
  )
}

export { Context }
