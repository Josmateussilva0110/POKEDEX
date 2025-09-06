import { useEffect, useState, useContext } from "react"
import Input from "../../form/Input"
import Image from "../../form/Image"
import requestData from "../../../utils/requestApi"
import useFlashMessage from "../../../hooks/useFlashMessage"
import ImageUpload from "../../form/ImageUpload"
import { Context } from "../../../context/UserContext"

function Profile() {
  const [activeTab, setActiveTab] = useState("edit") // aba inicial
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(() => {
    const storedToken = localStorage.getItem('token')
    return storedToken ? JSON.parse(storedToken) : null
  })

  const [user_id] = useState(() => {
  const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const { setFlashMessage } = useFlashMessage()
  const { updateUser } = useContext(Context)

  useEffect(() => {
    async function fetchUser() {
      const response = await requestData(`/user/${user_id.id}`, 'GET', null, token)
      if (response.success) {
        setUser(response.data.user)
      }
      else {
        setFlashMessage(response.message, 'error')
      }
    }
    fetchUser()
  }, [])

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  function onFileChange(event) {
    const file = event.target.files[0]
    setPreview(file)
    setUser(prev => {
      const updated = { ...prev, [event.target.name]: file }
      return updated
    })
  }

  async function submitForm(event) {
    event.preventDefault()
    let msgType = 'success'
    
    const response = await updateUser(user_id.id, user, token)

    if (response.success) {
      setFlashMessage(response.data.message, msgType)
    } else {
      msgType = 'error'
      setFlashMessage(response.message, msgType)
    }
  } 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>

      {/* Botões das abas */}
      <div className="flex gap-4 border-b mb-4">
        <button
          className={`pb-2 ${activeTab === "edit" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          Editar Dados
        </button>
        <button
          className={`pb-2 ${activeTab === "favorites" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          Pokémons Favoritos
        </button>
      </div>

      {/* Conteúdo das abas */}
      <div>
        {activeTab === "edit" && (
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

            {/* Título */}
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
              Editar
            </h2>

            {/* Imagem centralizada */}
            {(user.photo || preview) && (
              <div className="flex justify-center mb-6">
                <Image
                  src={
                    preview
                      ? URL.createObjectURL(preview)
                      : `${import.meta.env.VITE_API_URL}/images/users/${user.photo}`
                  }
                  alt={user.name}
                  size={100}
                />
              </div>
            )}

            {/* Form */}
            <form onSubmit={submitForm} className="space-y-5">
              <Input
                text="Seu Nome"
                type="text"
                name="name"
                placeholder="Digite seu Nome"
                handleOnChange={handleChange}
                value={user.name || ''}
              />
              <Input
                text="Seu Email"
                type="text"
                name="email"
                placeholder="Digite seu Email"
                handleOnChange={handleChange}
                value={user.email || ''}
              />

              <ImageUpload onFileChange={onFileChange} />

              {/* Botão */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-xl shadow-md 
                       hover:bg-red-700 focus:outline-none focus:ring-2
                       transform transition duration-300 hover:scale-105"
              >
                Editar
              </button>
            </form>
          </div>
        )}

        {activeTab === "favorites" && (
          <div>
            <h2 className="text-xl mb-2">Pokémons Favoritos</h2>
            <ul className="list-disc pl-5">
              <li>Pikachu</li>
              <li>Charizard</li>
              <li>Bulbasaur</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
