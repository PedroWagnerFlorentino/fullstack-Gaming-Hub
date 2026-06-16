import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"

interface FolderInputProps {
    setFolder: Dispatch<SetStateAction<string[]>>  // tipo correto do setter
    setSent: Dispatch<SetStateAction<boolean>>
}

function FolderInput({ setFolder, setSent }: FolderInputProps) {
    const [input, setInput] = useState("")

    return (
        <div>
            <input
                type="text"
                placeholder="Informe o caminho dos jogos aqui..."
                onChange={(event) => {
                    setInput(event.target.value);
                    setSent(false)
                }}
            />
            <button
                onClick={() => {
                    setFolder(prev => [...prev, input])
                    setSent(true)
                }}
            >Eviar pasta</button>
        </div>
    )
}

export default FolderInput