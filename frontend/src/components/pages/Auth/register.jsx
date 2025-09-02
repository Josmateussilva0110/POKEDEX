import Input from "../../form/Input"
import { useState, useContext } from "react"
import { Context } from "../../../context/UserContext"

function Register() {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  async function submitForm(e) {
    e.preventDefault()
    register(user)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        
        {/* Título */}
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Criar Conta
        </h2>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-5">
          <Input
            text="Seu Nome"
            type="text"
            name="name"
            placeholder="Digite seu Nome"
            handleOnChange={handleChange}
          />
          <Input
            text="Seu Email"
            type="text"
            name="email"
            placeholder="Digite seu Email"
            handleOnChange={handleChange}
          />
          <Input
            text="Sua Senha"
            type="password"
            name="password"
            placeholder="Digite sua Senha"
            handleOnChange={handleChange}
          />
          <Input
            text="Confirmar Senha"
            type="password"
            name="confirm_password"
            placeholder="Confirmar Senha"
            handleOnChange={handleChange}
          />

          {/* Botão */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-xl shadow-md 
                       hover:bg-red-700 focus:outline-none focus:ring-2
                       transform transition duration-300 hover:scale-105"
          >
            Cadastrar
          </button>
        </form>

        {/* Link de Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <a href="/login" className="text-red-600 hover:underline font-medium">
            Entrar
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
