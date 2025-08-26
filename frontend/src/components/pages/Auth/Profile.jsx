import { useState } from "react"

function Profile() {
  const [activeTab, setActiveTab] = useState("edit") // aba inicial

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
          <div>
            <h2 className="text-xl mb-2">Editar Dados</h2>
            <form className="flex flex-col gap-2">
              <input type="text" placeholder="Nome" className="border p-2 rounded" />
              <input type="email" placeholder="Email" className="border p-2 rounded" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
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
