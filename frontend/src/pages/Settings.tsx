import "./Settings.css"
import FolderInput from "../components/FolderInput"
import type { Dispatch, SetStateAction } from "react"

const EMULATORS = [ //lista temporatia até o mapeamento dos emuladores
    { platform: "Nintendo Switch", emulator: "Yuzu" },
    { platform: "PlayStation 2", emulator: "PCSX2" },
    { platform: "Nintendo 64", emulator: "Project64" },
    { platform: "Game Boy Advance", emulator: "mGBA" },
]

interface SettingsProps {
    setFolders: Dispatch<SetStateAction<string[]>>
    setSent: Dispatch<SetStateAction<boolean>>
}

function Settings({ setFolders, setSent }: SettingsProps) {
    return (
        <div className="settings">
            <h1 className="settings__title">Configurações</h1>

            <section className="settings__section">
                <div className="settings__section-header">
                    <h2>Biblioteca de ROMs</h2>
                </div>
                <div className="settings__card">
                    <div className="settings__folder-input">
                        <FolderInput
                            setFolder={setFolders}
                            setSent={setSent}
                        />
                    </div>
                </div>
            </section>

            <section className="settings__section">
                <div className="settings__section-header">
                    <h2>Emuladores</h2>
                </div>
                <div className="settings__emulator-list">
                    {EMULATORS.map(({ platform, emulator }) => (
                        <div className="settings__emulator-item" key={platform}>
                            <span className="settings__emulator-platform">{platform}</span>
                            <span className="settings__emulator-badge">{emulator}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="settings__section">
                <div className="settings__section-header"><h2>Sobre</h2></div>
                <div className="settings__about-grid">
                    <div className="settings__about-item">
                        <span className="settings__about-label">Aplicação</span>
                        <span className="settings__about-value">Gaming Hub</span>
                    </div>
                    <div className="settings__about-item">
                        <span className="settings__about-label">Versão</span>
                        <span className="settings__about-value">0.4.1</span>
                    </div>
                    <div className="settings__about-item">
                        <span className="settings__about-label">Autor</span>
                        <span className="settings__about-value">Pedro</span>
                    </div>
                    <div className="settings__about-item">
                        <span className="settings__about-label">Repositório</span>
                        <span className="settings__about-value">
                            <a href="https://github.com/PedroWagnerFlorentino/fullstack-Gaming-Hub" target="_blank">GitHub →</a>
                        </span>
                    </div>
                    <div className="settings__about-item settings__about-item--wide">
                        <span className="settings__about-label">Stack</span>
                        <div className="settings__stack-tags">
                            {["React", "TypeScript", "Vite", "FastAPI", "SQLite", "Electron (em breve)"].map(t => (
                                <span className="settings__stack-tag" key={t}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Settings