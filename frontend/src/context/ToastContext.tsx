import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
export type Feedback = { type: "success" | "error"; message: string } | null

interface ToastProps {
    feedback: Feedback
    showSuccess: (message: string) => void
    showError: (message: string) => void
    clear: () => void
}

const ToastContext = createContext<ToastProps | undefined>(undefined)

export function ToastProvider({ children, duration = 4000 }: { children: ReactNode; duration?: number }) {
    const [feedback, setFeedback] = useState<Feedback>(null)

    const showSuccess = (message: string) => setFeedback({ type: "success", message })
    const showError = (message: string) => setFeedback({ type: "error", message })
    const clear = () => setFeedback(null)

    useEffect(() => {
        if (!feedback) return

        const timer = setTimeout(clear, duration)
        return () => clearTimeout(timer)

    }, [feedback, duration])

    return (
        <ToastContext.Provider value={{ feedback, showSuccess, showError, clear }}>
            {children}
        </ToastContext.Provider>
    )

}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error("useToast deve ser usado dentro de um ToastProvider")
    return context
}