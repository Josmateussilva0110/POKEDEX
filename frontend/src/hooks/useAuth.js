import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import requestData from '../utils/requestApi'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()

  // Estado inicial com proteção contra JSON inválido
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const parsedToken = JSON.parse(token)
        if (parsedToken) {
          api.defaults.headers.Authorization = `Bearer ${parsedToken}`
          return true
        }
      }
      return false
    } catch {
      return false
    }
  })

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const [loading, setLoading] = useState(true)

  // Desliga o loading após a primeira renderização
  useEffect(() => {
    setLoading(false)
  }, [])

  // 🔑 Login/registro bem-sucedido
  async function authUser(data) {
    setAuthenticated(true)

    // Aqui garantimos que "data.user" existe
    const userData = data.user || { id: data.userId, name: data.name }

    setUser(userData)
    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('user', JSON.stringify(userData))

    api.defaults.headers.Authorization = `Bearer ${data.token}`
    navigate('/')
  }

  // 📌 Registrar
  async function register(user) {
    const response = await requestData('/user/register', 'POST', user)
    if (response.success) {
      await authUser(response.data)
      setFlashMessage(response.data.message, 'success')
    } else {
      setFlashMessage(response.message, 'error')
    }
  }

  // 📌 Login
  async function login(user) {
    const response = await requestData('/user/login', 'POST', user)
    if (response.success) {
      await authUser(response.data)
      setFlashMessage(response.data.message, 'success')
    } else {
      setFlashMessage(response.message, 'error')
    }
  }

  // 📌 Logout
  function logout() {
    setAuthenticated(false)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    api.defaults.headers.Authorization = undefined
    navigate('/')
    setFlashMessage('Logout realizado com sucesso', 'success')
  }

  // 📌 Atualizar usuário
  async function updateUser(user_id, userData, token) {
    const formData = new FormData()

    Object.keys(userData).forEach((key) => {
      if (key === "photo") {
        if (userData.photo instanceof File) {
          formData.append("photo", userData.photo)
        }
      } else {
        formData.append(key, userData[key])
      }
    })

    const response = await requestData(`/user/${user_id}`, 'PATCH', formData, token)

    if (response.success) {
      console.log('updated: ',response)
      // 🔥 Atualiza o contexto e localStorage com o usuário atualizado
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response
  }

  return { authenticated, user, loading, register, login, logout, updateUser }
}
