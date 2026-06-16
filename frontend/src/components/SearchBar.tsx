import type { Dispatch, SetStateAction } from "react"


interface SearchBarProps {
    setSearch: Dispatch<SetStateAction<string>>
};


function SearchBar({ setSearch }: SearchBarProps) {
    return (
        <input
            placeholder="Pesquise o jogo aqui..."
            onChange={(event) => {
                setSearch(event.target.value)
            }}
        />
    )
}

export default SearchBar;