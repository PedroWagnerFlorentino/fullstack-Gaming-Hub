import "./index.css"
import "./App.css"
import { useState, useMemo } from "react"
import type { ReactElement } from "react"
import Topbar from "./components/Layout/Topbar"
import Sidebar from "./components/Layout/Sidebar"
import LibraryPage from "./pages/LibraryPage"
import Settings from "./pages/Settings"



function App() {
  const [search, setSearch] = useState("")
  const [folders, setFolders] = useState<string[]>([])
  const [sent, setSent] = useState(false)
  const [activePage, setActivePage] = useState("library")
  const [totalGamesSidebar, setTotalGamesSidebar] = useState<number | undefined>(undefined)

  const PAGES = useMemo<Record<string, ReactElement>>(() => ({
    library: <LibraryPage search={search} folders={folders} sent={sent} onTotalGamesChange={setTotalGamesSidebar} />,
    settings: <Settings setFolders={setFolders} setSent={setSent} />
  }), [search, folders, sent, totalGamesSidebar])

  
  return (
    <div className="app">
      <Topbar
        search={search}
        setSearch={setSearch}
      />

      <div className="app__body">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          gameCount={totalGamesSidebar}
        />

        <main className="app__content">
          {PAGES[activePage] ?? PAGES["library"]}

        </main>
      </div>
    </div>
  )
}

export default App
