import { useState, useMemo } from 'react'
import './App.css'
import PaletteView from './components/PaletteView'

function App() {
  const [text, setText] = useState("")
  const [stage, setStage] = useState("text")

  const changeStage = () => setStage(stage === "text" ? "palette" : "text");

  return (
    <div style={{ minHeight: "100vh" }}>
      <header>
        <h1>Text-to-Palette Analyzer</h1>
      </header>

      <main className="container">
        {stage === "text" ? (
          <div className="input-group">
            <textarea
              placeholder='Input text here'
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: 3 }}>
              <PaletteView text={text} />
            </div>
          </div>
        )}

        <button disabled={text.length === 0} onClick={changeStage}>
          {stage === "text" ? "Generate Palette" : "Go Back"}
        </button>
      </main>

      <footer>

      </footer>
    </div>
  )
}

export default App