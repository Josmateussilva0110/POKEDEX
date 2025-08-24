import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import requestData from '../utils/requestApi'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()

  // Inicializa baseado no token existente
  const [authenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      return true
    }
    return false
  })
  const [loading, setLoading] = useState(true)

  // Só para garantir que o loading seja desligado após a primeira renderização
  useEffect(() => {
    setLoading(false)
  }, [])

  async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    api.defaults.headers.Authorization = `Bearer ${data.token}`
    navigate('/')
  }

  async function register(user) {
      const response = await requestData('/user/register', 'POST', user)
      if (response.success) {
        await authUser(response.data)
        setFlashMessage(response.data.message, 'success')
      } else {
        setFlashMessage(response.message, 'error')
      }
  }

  async function login(user) {
      const response = await requestData('/user/login', 'POST', user)
      if (response.success) {
        await authUser(response.data)
        setFlashMessage(response.data.message, 'success')
      } else {
        setFlashMessage(response.message, 'error')
      }
  }

  function logout() {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')
    setFlashMessage('Logout realizado com sucesso', 'success')
  }

  return { authenticated, loading, register, login, logout }
}
