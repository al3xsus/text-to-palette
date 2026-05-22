import { useState } from 'react'
import './App.css'
import PaletteView from './components/PaletteView'
import Footer from './components/Footer'

function App() {
  const [text, setText] = useState("")
  const [stage, setStage] = useState<"text" | "palette">("text")

  const handleGenerate = () => setStage("palette");
  const handleBack = () => setStage("text");

  return (
    <div className="container" style={{ minHeight: "100vh", display: 'flex', flexDirection: 'column', maxWidth: "90vw" }}>
      <header>
        <h1>Text-to-Palette Analyzer</h1>
        <p>Transform your text into a meaningful color palette based on character distribution and entropy.</p>
      </header>

      <main style={{ flex: 1 }}>
        {stage === "text" ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <textarea
              placeholder='Paste your text here to analyze its color profile...'
              onChange={(e) => setText(e.target.value)}
              value={text}
              style={{ minHeight: '400px' }}
            />
            <button
              disabled={text.trim().length === 0}
              onClick={handleGenerate}
              style={{ alignSelf: 'center', fontSize: '1.2rem', padding: '0.8rem 2rem', backgroundColor: 'var(--accent)', color: 'white', border: 'none' }}
            >
              Generate Palette
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <button onClick={handleBack} style={{ alignSelf: 'flex-start' }}>
              ← Go Back
            </button>
            <PaletteView text={text} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
