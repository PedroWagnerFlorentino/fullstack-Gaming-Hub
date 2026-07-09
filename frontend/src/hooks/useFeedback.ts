import { useEffect, useState } from "react"
type Feedback = { type: "success" | "error"; message: string } | null

export function useFeedback(duration = 4000) {
    const [feedback, setFeedback] = useState<Feedback>(null)

    const showSuccess = (message: string) => setFeedback({ type: "success", message })
    const showError = (message: string) => setFeedback({ type: "error", message })
    const clear = () => setFeedback(null)

    useEffect(() => {
        if (!feedback) return

        const timer = setTimeout(clear, duration)
        return clearTimeout(timer)

    }, [feedback, duration])

    return { feedback, showSuccess, showError, clear }
}   