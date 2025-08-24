import Input from "../../form/Input"
import { useState, useContext } from "react"
import { Context } from "../../../context/UserContext"

function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  async function submitForm(e) {
    console.log('user: ',user)
    e.preventDefault()
    login(user)
  }


  return (
    <form onSubmit={submitForm}>
      <Input text="Seu Email" type="text" name="email" placeholder="Digite seu Email" handleOnChange={handleChange}/>
      <Input text="Sua Senha" type="password" name="password" placeholder="Digite sua Senha" handleOnChange={handleChange}/>
      <input type="submit" value="Login"/>
    </form>
  )
}

export default Login
