import "./componentsStyle/Toasts.css"
import { useToast } from "../context/ToastContext"
import { useEffect, useState } from "react"

// O EXIT_DURATION precisa bater com a duração do @keyframes toast-exit no Toast.css
const EXIT_DURATION = 300


function Toast() {
    const { feedback } = useToast()
    const [displayed, setDisplayed] = useState(feedback)
    const [isLeaving, setLeaving] = useState(false)

    useEffect(() => {
        if (feedback) {
            setDisplayed(feedback)
            setLeaving(false)
            return
        }

        if (displayed) {
            setLeaving(true)
            const timer = setTimeout(() => { setDisplayed(null), EXIT_DURATION })
            return () => clearTimeout(timer)
        }



    }, [feedback])

    if (!displayed) return null

    return (
        <div className={`toast toast--${displayed.type}${isLeaving ? " toast--leaving" : ""}`}>
            {displayed.message}
        </div>
    )
}

export default Toast