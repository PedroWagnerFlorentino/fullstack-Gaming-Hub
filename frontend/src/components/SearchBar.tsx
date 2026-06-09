interface SearchBarProps {
    setSearch: Function
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