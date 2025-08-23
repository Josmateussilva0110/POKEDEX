import { createContext, useState } from "react"

const Context = createContext()

export function UserProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)

  const register = () => setAuthenticated(true)

  return (
    <Context.Provider value={{ register }}>
      {children}
    </Context.Provider>
  )
}

export { Context }
