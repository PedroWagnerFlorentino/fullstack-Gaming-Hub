import type { Emulator } from "../types/Games"
import { useState, useEffect } from "react"
import { getEmulators, postEmulator, deleteEmulator } from "../services/gameServices"
import { useToast } from "../context/ToastContext";
import "./componentsStyle/EmulatorManager.css"

function EmulatorManager() {

    const { clear, showError, showSuccess } = useToast()

    const [emulators, setEmulators] = useState<Emulator[]>([])
    const [input, setInput] = useState("")
    const [platform, setPlatform] = useState("")
    const [executablePath, setExecutablePath] = useState("")
    const [loading, setLoading] = useState(false)

    const buscarEmuladores = async () => {
        clear()
        try {
            setLoading(true)
            const dadosJson = await getEmulators()
            setEmulators(dadosJson)
        }
        catch (error) {
            showError(`Houve um erro ao buscar os emuladores! Erro detalhado: ${error}`)
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
            clear()
            try {
                await postEmulator(platform, executablePath)
                await buscarEmuladores()
                showSuccess(`Emulador cadastrado com sucesso para a plataforma ${platform}`)
                setPlatform("")
                setExecutablePath("")
                setInput("")
            }
            catch (error) {
                showError(`Houve um erro ao registrar o emulador! Erro detalhado: ${error}`)
            }
            finally {
                setLoading(false)
            }
        }
        registrarEmulador()
    }, [loading])

    return (
        <div className="emulator-manager">
            <section className="emulator-manager__form">
                <div className="emulator-manager__field">
                    <label className="emulator-manager__label" htmlFor="emulator-platform">Plataforma</label>
                    <select
                        id="emulator-platform"
                        className="emulator-manager__select"
                        value={platform}
                        onChange={(event) => setPlatform(event.target.value)}>

                        <option value="" disabled>Selecione uma plataforma</option>
                        <option value="PlayStation2">Play Station 2</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="Nintendo 3DS">Nintendo 3DS</option>
                        <option value="Nintendo DS">Nintendo DS</option>
                    </select>
                </div>

                <div className="emulator-manager__field">
                    <label className="emulator-manager__label" htmlFor="emulator-path">Executável</label>
                    <input
                        id="emulator-path"
                        className="emulator-manager__input"
                        type="text"
                        value={input ?? ""}
                        placeholder="Informe o caminho do emulador"
                        onChange={(event) => {
                            setInput(event.target.value);
                        }}
                    />
                </div>

                <button
                    className="emulator-manager__submit"
                    onClick={() => {
                        setExecutablePath(input)
                        setLoading(true)
                    }}
                    disabled={loading || !input.trim()}
                >Registrar Emulador</button>

            </section>
            <section className="emulator-manager__list">
                {emulators.length === 0 && (
                    <p className="emulator-manager__empty">Nenhum emulador cadastrado ainda.</p>
                )}
                {emulators.map(({ id, platform, emulator_path }) => (
                    <div className="emulator-manager__item" key={platform}>
                        <span className="emulator-manager__platform">{platform}</span>
                        <span className="emulator-manager__badge">{emulator_path}</span>
                        <button className="emulator-manager__delete" onClick={
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