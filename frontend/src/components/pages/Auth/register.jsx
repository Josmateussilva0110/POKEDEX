import Input from "../../form/Input"
import { useState, useContext } from "react"
import { Context } from "../../../context/UserContext"

function Register() {
  const [user, setUser] = useState({})
  const {register} = useContext(Context)

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  async function submitForm(e) {
    console.log('user: ',user)
    e.preventDefault()
    register(user)
  }


  return (
    <form onSubmit={submitForm}>
      <Input text="Seu Nome" type="text" name="name" placeholder="Digite seu Nome" handleOnChange={handleChange}/>
      <Input text="Seu Email" type="text" name="email" placeholder="Digite seu Email" handleOnChange={handleChange}/>
      <Input text="Sua Senha" type="password" name="password" placeholder="Digite sua Senha" handleOnChange={handleChange}/>
      <Input text="Confirmar Senha" type="password" name="confirm_password" placeholder="Confirmar Senha" handleOnChange={handleChange}/>
      <input type="submit" value="Cadastrar"/>
    </form>
  )
}

export default Register
