import { createContext, useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import requestData from "../utils/requestApi"

const Context = createContext()

export function UserProvider({ children }) {
  const [sessionExpired, setSessionExpired] = useState(false)
  const [user, setUser] = useState(null)
  const { authenticated, contextUser, register, login, logout, updateUser, localLogout } = useAuth()

  // Verifica a sessão no mount
  useEffect(() => {
    async function fetchSession() {
      const response = await requestData("/user/session", "GET", {}, true)
      if (!response.success) {
        setSessionExpired(true)
        localLogout() // aqui já garante authenticated = false
        setUser(null)
      }
    }
    fetchSession()
  }, [localLogout])

  // Atualiza usuário quando contextUser mudar
  useEffect(() => {
    if (contextUser) {
      async function fetchUser() {
        const response = await requestData(`/user/${contextUser.id}`, "GET", {}, true)
        console.log("user response: ", response)
        if (response.success) {
          setUser(response.data.user)
        }
      }
      fetchUser()
    } else {
      setUser(null)
    }
  }, [contextUser])

  // Ouve evento de sessão expirada
  useEffect(() => {
    function handleExpired() {
      setSessionExpired(true)
      localLogout() // authenticated = false
      setUser(null)
    }

    window.addEventListener("SESSION_EXPIRED", handleExpired)
    return () => window.removeEventListener("SESSION_EXPIRED", handleExpired)
  }, [localLogout])

  return (
    <Context.Provider
      value={{
        authenticated, // controla login/logout
        user,          // dados do usuário
        register,
        login,
        logout,
        updateUser,
        sessionExpired, // só para exibir mensagem, não para Navbar
        setSessionExpired,
        localLogout
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context }
