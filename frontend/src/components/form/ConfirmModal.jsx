import { Dialog } from "@headlessui/react"

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmação", 
  message = "Tem certeza desta ação?" 
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Conteúdo central */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-lg">
          
          {/* Título e descrição dinâmicos */}
          <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            {message}
          </Dialog.Description>

          {/* Botões */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-gray-800 hover:bg-red-800"
              onClick={onClose}
            >
              Não
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-gray-800 hover:bg-green-800"
              onClick={onConfirm}
            >
              Sim
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
