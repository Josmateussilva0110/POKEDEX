import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

function Input({ type, text, name, placeholder, handleOnChange, value, multiple }) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type

  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {text}
      </label>

      <div className="relative">
        <input
          type={inputType}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          {...(multiple ? { multiple } : {})}
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-red-600
                     placeholder-gray-400 text-gray-900 transition duration-200"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute inset-y-0 right-3 flex items-center 
                        transition duration-200
                        ${showPassword ? "text-red-600" : "text-gray-500 hover:text-red-500"}`}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
