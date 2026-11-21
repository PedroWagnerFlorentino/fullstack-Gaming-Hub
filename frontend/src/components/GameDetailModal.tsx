import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import type { Game } from "../types/Games"
import "./componentsStyle/GameDetailModel.css"
import { getTrailer } from "../services/gameServices"

type TrailerStatus = "loading" | "ready" | "none" | "error"
interface GameDetailsModalProps {
    game: Game | null
    onClose: () => void
    onPlay: (game: Game) => void
}

function GameDetailsModal({ game, onClose, onPlay }: GameDetailsModalProps) {

    const [videoId, setVideoId] = useState<string | null>(null)
    const [trailerStatus, setTrailerStatus] = useState<TrailerStatus>("loading")
    const [expanded, setExpanded] = useState(false)
    const isLongSummary = (game?.summary?.length ?? 0) > 300

    useEffect(() => {
        if (!game) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [game, onClose])

    useEffect(() => {
        if (!game) return;
        setExpanded(prev => !prev)
        let canceled = false;
        setTrailerStatus("loading")
        getTrailer(game.id)
            .then((id) => {
                if (canceled) return;
                setVideoId(id)
                setTrailerStatus(id ? "ready" : "none")
            })
            .catch(() => {
                if (!canceled) {
                    setTrailerStatus("error")
                }
            })
        return () => { canceled = true }

    }, [game?.id])

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

                        {game.genres && <p className="game-modal__genres">{game.genres}</p>
                        }
                        {game.summary &&
                            <>
                                <p className={`game-modal__summary${expanded ? " game-modal__summary--expanded" : ""}`}>
                                    {game.summary}
                                </p>

                                {isLongSummary && (
                                    <button
                                        className="game-modal__summary-toggle"
                                        onClick={() => setExpanded(prev => !prev)}
                                    >
                                        {expanded ? "Ler menos" : "Ler mais"}
                                    </button>
                                )}
                            </>
                        }

                    </div>

                    <div className="game-modal__trailer-box">
                        {trailerStatus === "loading" && (
                            <span className="game-modal__placeholder-text">Carregando trailer...</span>
                        )}
                        {trailerStatus === "none" && (
                            <span className="game-modal__placeholder-text">Trailer indisponível para este jogo.</span>
                        )}
                        {trailerStatus === "error" && (
                            <span className="game-modal__placeholder-text">Não foi possível carregar o trailer.</span>
                        )}
                        {trailerStatus === "ready" && videoId && (
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                                title={`Trailer de ${game.title}`}
                                allow="encrypted-media; picture-in-picture; fullscreen"
                                allowFullScreen
                            />
                        )}
                    </div>

                </div>

            </div>
        </div>
    </div>,
        document.body
    )
}

export default GameDetailsModal
