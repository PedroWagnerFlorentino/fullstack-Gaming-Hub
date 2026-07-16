import "./index.css"
import "./App.css"
import { useState, useMemo } from "react"
import type { ReactElement } from "react"
import Topbar from "./components/Layout/Topbar"
import Sidebar from "./components/Layout/Sidebar"
import LibraryPage from "./pages/LibraryPage"
import Settings from "./pages/Settings"
import Toast from "./components/Toast"



function App() {
  const [search, setSearch] = useState("")
  const [activePage, setActivePage] = useState("library")

  const PAGES = useMemo<Record<string, ReactElement>>(() => ({
    library: <LibraryPage search={search} />,
    settings: <Settings />
  }), [search])

  return (
    <div className="app">
      <Toast/>

      <Topbar
        search={search}
        setSearch={setSearch}
      />

      <div className="app__body">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        <main className="app__content">
          {PAGES[activePage] ?? PAGES["library"]}

        </main>
      </div>
    </div>
  )
}

export default App
