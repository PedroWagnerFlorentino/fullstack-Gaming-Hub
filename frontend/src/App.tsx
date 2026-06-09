import Header from "./components/Header"
import Library from "./pages/Library"
import SearchBar from "./components/SearchBar"

import { useState } from "react"

function App() {

    const [count, setCount] = useState(0)
    const [search, setSearch] = useState("")


    return (
        <>  
            <div>
                <Header
                    title="Gaming Hub"
                    count={count}
                />

                <button onClick={() => setCount(count + 1)}> + </button>
            </div>

            <div>
                <SearchBar setSearch={setSearch}></SearchBar>
            </div>

            <div>
                <h1>All Games</h1>
                <Library gameSection="all" search={search}></Library>

                <h1>PS2 Games </h1>
                <Library gameSection="ps2" search={search}></Library>
                
                <h1>Switch Games</h1>
                <Library gameSection="switch" search={search}></Library>
            </div>
        </>
    );
}

export default App;