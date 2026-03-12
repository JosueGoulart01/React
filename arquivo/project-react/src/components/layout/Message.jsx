// Message.jsx
import { useEffect, useState } from "react"

function Message({ type = "info", msg }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (msg) {
            setIsVisible(true)
            
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 4000) // 4 segundos
            
            return () => clearTimeout(timer)
        }
    }, [msg])

    if (!isVisible || !msg) return null

    const styles = {
        success: "bg-green-100 border-green-500 text-green-700",
        error: "bg-red-100 border-red-500 text-red-700",
        warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
        info: "bg-blue-100 border-blue-500 text-blue-700",
    }

    return (
        <div className={`w-full p-4 mb-8 border-l-8 rounded-md shadow-sm ${styles[type]}`}>
            <p className="font-medium text-center">{msg}</p>
        </div>
    )
}

export default Message