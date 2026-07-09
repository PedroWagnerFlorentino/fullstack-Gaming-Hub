import { useGames } from "../context/GamesContext";
import { useState } from "react"
import { useFeedback } from "../hooks/useFeedback"

function FolderInput() {
    const [input, setInput] = useState("")
    const { scanning, scanFolders } = useGames()

    const { feedback, showSuccess, showError, clear } = useFeedback()

    const handleScan = async () => {
        clear()
        try {
            const { count } = await scanFolders([input])
            showSuccess(`${count} Jogo(s) encontrados`)
            setInput("")
        } catch (error) {
            showError(`Erro ao buscar os jogos!\nErro detalhado: ${error}`)
        }
    }

    return (
        <div>
            <input
                type="text"
                value={input}
                placeholder="Informe o caminho dos jogos aqui..."
                onChange={(event) => {
                    setInput(event.target.value);
                }}
            />
            <button
                disabled={scanning || !input.trim()}
                onClick={handleScan}
            >Eviar pasta</button>

            {feedback && (
                <div className={`toast toast--${feedback.type}`}>
                    {feedback.message}
                </div>
            )}
        </div>
    )
}

export default FolderInput