import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { Context as UserContext } from "./UserContext"
import SessionExpired from "../components/pages/Auth/SessionExpired"

function PrivateRoute() {
  const { sessionExpired, authenticated, loading } = useContext(UserContext)

  console.log('s: ', sessionExpired)
  console.log('a: ', authenticated)

  if (loading) {
    return <p>Carregando sessão...</p>
  }

  if (sessionExpired || !authenticated) {
    return <SessionExpired />
  }

  return <Outlet />
}

export default PrivateRoute
