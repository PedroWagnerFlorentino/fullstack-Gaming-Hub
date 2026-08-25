import { createPortal } from "react-dom"
import { useEffect } from "react"
import type { Game } from "../types/Games"
import "./componentsStyle/GameDetailModel.css"


interface GameDetailsModalProps {
    game: Game | null
    onClose: () => void
    onPlay: (game: Game) => void
}

function GameDetailsModal({ game, onClose, onPlay }: GameDetailsModalProps) {

    useEffect(() => {
        if (!game) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [game, onClose])

    if (!game) return;

    return createPortal(<div className="game-modal-overlay" onClick={onClose}>
            <div className="game-modal" onClick={(e) => e.stopPropagation()}>

                <button className="game-modal__close" onClick={onClose}>✕</button>

                <div className="game-modal__body">

                    {/* ── COLUNA ESQUERDA: capa + ações ── */}
                    <div className="game-modal__left">
                        <div className="game-modal__cover-box">
                            {game.cover ? (
                                <img src={game.cover} alt={`Capa de ${game.title}`} />
                            ) : (
                                <span className="game-modal__cover-fallback">🎮</span>
                            )}
                        </div>

                        <div className="game-modal__actions">
                            <button
                                className="game-modal__play-btn"
                                onClick={() => onPlay(game)}
                            >
                                ▶ Jogar Agora
                            </button>
                        </div>
                    </div>

                    {/* ── COLUNA DIREITA: info + trailer ── */}
                    <div className="game-modal__right">

                        <div className="game-modal__info-box">
                            <h1 className="game-modal__title">{game.title}</h1>
                            <p className="game-modal__meta">
                                <span>{game.platform ?? game.emulator}</span>
                            </p>

                            {/* Espaço reservado — Fase 3 preenche com descrição/gênero via IGDB */}
                            <p className="game-modal__placeholder-text">
                                Descrição e tempo de jogo aparecerão aqui em breve.
                            </p>
                        </div>

                        <div className="game-modal__trailer-box">
                            {/* Espaço reservado — Fase 1 completa entra o iframe do trailer aqui */}
                            <span className="game-modal__placeholder-text">
                                Trailer aparecerá aqui em breve.
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </div>,
        document.body   
    )
}

export default GameDetailsModal
