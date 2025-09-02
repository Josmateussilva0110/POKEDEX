function Input({ type, text, name, placeholder, handleOnChange, value, multiple }) {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {text}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? { multiple } : {})}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-red-600
                   placeholder-gray-400 text-gray-900 transition duration-200"
      />
    </div>
  )
}

export default Input
