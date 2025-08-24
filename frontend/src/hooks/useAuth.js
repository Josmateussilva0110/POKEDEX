import requestData from '../utils/requestApi'
import { useState, useEffect } from 'react'


export default function useAuth() {
  try {
    const [authenticated, setAuthenticated] = useState(false)
    //const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        setAuthenticated(true)
      }
    }, [])

    async function register(user) {
      try {
        const response = await requestData('/user/register', 'POST', user)
        if (response.success) {
          await authUser(response.data)
          setFlashMessage('Usuário registrado com sucesso', 'success')
        } else {
          setFlashMessage(response.message || 'Erro ao registrar', 'error')
        }
      } catch (err) {
        console.error("Erro no register:", err)
      }
    }

    async function authUser(data) {
      setAuthenticated(true)
      localStorage.setItem('token', JSON.stringify(data.token))
    }

    function logout() {
      setAuthenticated(false)
      localStorage.removeItem('token')
      api.defaults.headers.Authorization = undefined
      setFlashMessage('Logout realizado com sucesso', 'success')
    }

    return { authenticated, register, logout }
  } catch (err) {
    console.error("Erro no useAuth:", err)
    return { authenticated: false, register: () => {}, logout: () => {} }
  }
}
