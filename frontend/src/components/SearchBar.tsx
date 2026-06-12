interface SearchBarProps {
    setSearch: (value: string) => void
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