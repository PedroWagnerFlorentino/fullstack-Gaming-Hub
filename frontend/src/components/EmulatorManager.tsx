import type { Emulator } from "../types/Games"
import { useState, useEffect } from "react"
import { getEmulators, postEmulator, deleteEmulator } from "../services/gameServices"


function EmulatorManager() {

    const [emulators, setEmulators] = useState<Emulator[]>([])
    const [input, setInput] = useState("")
    const [platform, setPlatform] = useState("")
    const [executablePath, setExecutablePath] = useState("")
    const [loading, setLoading] = useState(false)

    const buscarEmuladores = async () => {
        try {
            setLoading(true)
            const dadosJson = await getEmulators()
            setEmulators(dadosJson)
        }
        catch (error) {
            console.log(`Houve um erro ao buscar os emuladores: ${error}`)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        buscarEmuladores()
    }, [])

    useEffect(() => {
        if (!loading || !executablePath || !platform) return
        const registrarEmulador = async () => {
            try {
                await postEmulator(platform, executablePath)
                await buscarEmuladores()
                setPlatform("")
                setExecutablePath("")
                setInput("")
            }
            catch (error) {
                console.log(`Houve um erro ao registrar o emulador: ${error}`)
            }
            finally {
                setLoading(false)
            }
        }
        registrarEmulador()
    }, [loading])

    return (
        <div>
            <section>
                <label htmlFor="">Escolha uma plataforma</label>
                <select
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value)}>

                    <option value="" disabled>Selecione uma plataforma</option>
                    <option value="PlayStation2">Play Station 2</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="Nintendo 3DS">Nintendo 3DS</option>
                    <option value="Nintendo DS">Nintendo DS</option>
                </select>

                <input
                    type="text"
                    value={input ?? ""}
                    placeholder="Informe o caminho do emulador"
                    onChange={(event) => {
                        setInput(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        setExecutablePath(input)
                        setLoading(true)
                    }}
                    disabled={loading || !input.trim()}
                >Registrar Emulador</button>

            </section>
            <section>
                {emulators.map(({ id, platform, emulator_path }) => (
                    <div className="settings__emulator-item" key={platform}>
                        <span className="settings__emulator-platform">{platform}</span>
                        <span className="settings__emulator-badge">{emulator_path}</span>
                        <button onClick={
                            async () => {
                                await deleteEmulator(id)
                                await buscarEmuladores()
                            }
                        }>
                            <span>🗑️</span>
                        </button>
                    </div>
                ))}
            </section>
        </div >
    )


}

export default EmulatorManager