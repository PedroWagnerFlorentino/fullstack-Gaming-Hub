import Header from "./components/Header"
import Library from "./pages/Library"
import SearchBar from "./components/SearchBar"
import FolderInput from "./components/FolderInput"

import { useState } from "react"

function App() {

    const [search, setSearch] = useState("")
    const [folders, setFolders] = useState<string[]>([])
    const [sent, setSent] = useState(false)



    return (
        <>
            <div>
                <Header
                    title="Gaming Hub"
                />
            </div>


            <div>
                <FolderInput setFolder={setFolders} setSent={setSent} ></FolderInput>
            </div>


            <div>
                <SearchBar setSearch={setSearch}></SearchBar>
            </div>

            <div>
                <h1>All Games</h1>
                <Library
                    gameSection="all"
                    search={search}
                    folders={folders}
                    sent={sent}>            
                </Library>

                <h1>PS2 Games </h1>
                <Library
                    gameSection="Playstation2"
                    search={search}
                    folders={folders}
                    sent={sent}>
                </Library>

                <h1>Switch Games</h1>
                <Library
                    gameSection="Nintendo Switch"
                    search={search}
                    folders={folders}
                    sent={sent}>
                </Library>
            </div>
        </>
    );
}

export default App;