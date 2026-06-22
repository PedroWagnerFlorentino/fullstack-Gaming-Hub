import "./StatsRow.css"

interface StatRowProps {
    totalGames?: number
    totalPlatforms?: number
}

function StatRow({ totalGames, totalPlatforms }: StatRowProps) {

    const isLoading = totalGames === undefined && totalPlatforms === undefined

    return (
        <div className="stats-row">
            <div className="stats-row__card">
                <span className="stats-row__value">
                    {isLoading ? "—" : totalGames}
                </span>
                <span className="stats-row__lable">Jogos</span>
            </div>
            <div className="stats-row__card">
                <span className="stats-row__value">
                    {isLoading ? "—" : totalPlatforms}
                </span>
                <span className="stats-row__lable">Plataformas</span>
            </div>
        </div>
    )
}

export default StatRow