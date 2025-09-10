import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import requestData from '../utils/requestApi'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()

  const [authenticated, setAuthenticated] = useState(false)
  const [contextUser, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verifica a sessão ao carregar
    async function checkSession() {
      const response = await requestData('/user/session', 'GET', {}, true)
      console.log('response da sessão: ', response)
      if (response.success) {
        setAuthenticated(true)
        setUser(response.data.user)
      } else {
        setAuthenticated(false)
        setUser(null)
      }
      setLoading(false)
    }

    checkSession()
  }, [])

  async function login(credentials) {
    const response = await requestData('/user/login', 'POST', credentials, true)
    if (response.success) {
      setAuthenticated(true)
      setUser(response.data.user)
      setFlashMessage(response.data.message, 'success')
      navigate('/')
    } else {
      setFlashMessage(response.message, 'error')
    }
  }

  async function register(userData) {
    const response = await requestData('/user/register', 'POST', userData, true)
    if (response.success) {
      setAuthenticated(true)
      setUser(response.data.user)
      setFlashMessage(response.data.message, 'success')
      navigate('/')
    } else {
      setFlashMessage(response.message, 'error')
    }
  }

  async function logout() {
    const response = await requestData('/user/logout', 'POST', {}, true)
    if (response.success) {
      setAuthenticated(false)
      setUser(null)
      setFlashMessage(response.data.message, 'success')
      navigate('/')
    } else {
      setFlashMessage(response.message, 'error')
    }
  }

  async function updateUser(user_id, userData) {
    const formData = new FormData()
    Object.keys(userData).forEach((key) => {
      if (key === 'photo' && userData.photo instanceof File) {
        formData.append('photo', userData.photo)
      } else {
        formData.append(key, userData[key])
      }
    })

    const response = await requestData(`/user/${user_id}`, 'PATCH', formData, true)
    if (response.success) {
      setUser(response.data.user)
      setFlashMessage(response.data.message, 'success')
    } else {
      setFlashMessage(response.message, 'error')
    }

    return response
  }

  return { authenticated, contextUser, loading, login, register, logout, updateUser }
}
