import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import bus from '../../utils/bus'

function FlashMessage() {
  const [flashMessage, setFlashMessage] = useState(null)

  useEffect(() => {
    const handleFlash = (payload) => {
      const { message, type } = payload
      setFlashMessage({ message, type })
      setTimeout(() => setFlashMessage(null), 3000)
    }

    bus.on('flash', handleFlash)
    return () => bus.off('flash', handleFlash)
  }, [])

  const typeStyles = {
    success: {
      bg: "bg-green-500 border-green-600 text-white",
      icon: <CheckCircle className="w-5 h-5 text-white" />
    },
    error: {
      bg: "bg-red-500 border-red-600 text-white",
      icon: <XCircle className="w-5 h-5 text-white" />
    },
  }

  return (
    <div className="fixed top-5 right-5 z-50">
      <AnimatePresence>
        {flashMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-lg border ${typeStyles[flashMessage.type]?.bg || "bg-gray-700 text-white border-gray-600"}`}
          >
            {typeStyles[flashMessage.type]?.icon}
            <span>{flashMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FlashMessage
