import { useState } from "react"

function ImageUpload({ onFileChange }) {
  const [fileName, setFileName] = useState("")

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name) // salva o nome do arquivo
      onFileChange(e) // chama a função do pai
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed 
                   border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 
                   transition duration-300"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V4m0 0l-4 4m4-4l4 4M17 8h4m-2-2v12a2 2 0 01-2 2H7a2 2 0 01-2-2v-4"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Clique para enviar</span> ou arraste a imagem
          </p>
          <p className="text-xs text-gray-400">PNG, JPG ou JPEG</p>
        </div>
        <input
          id="file-upload"
          type="file"
          name="photo"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {/* Nome do arquivo exibido */}
      {fileName && (
        <p className="mt-2 text-sm text-gray-600 truncate w-full text-center">
          📂 {fileName}
        </p>
      )}
    </div>
  )
}

export default ImageUpload
