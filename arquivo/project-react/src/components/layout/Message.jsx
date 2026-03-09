import { useEffect, useState } from "react"

function Message({ type = "info", msg }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Se a mensagem for vazia ou nula, esconde o componente
        if (!msg) {
            setVisible(false)
            return
        }

        // Se houver mensagem, mostra e inicia o cronômetro
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000) // 5 segundos é o tempo ideal para leitura

        // Limpeza do timer caso o componente seja desmontado ou a msg mude
        return () => clearTimeout(timer)
    }, [msg])

    if (!visible) return null

    const styles = {
        success: "bg-green-100 border-green-500 text-green-700",
        error: "bg-red-100 border-red-500 text-red-700",
        warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
        info: "bg-blue-100 border-blue-500 text-blue-700",
    }

    return (
        <div className={`w-full p-4 mb-8 border border-l-8 rounded-md shadow-sm ${styles[type]}`}>
            <p className="font-medium text-center">{msg}</p>
        </div>
    )
}

export default Message