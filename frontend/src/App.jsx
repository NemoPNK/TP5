import { useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <div>
          <h1>Vos taches :</h1>
        </div>
      </header>

      <main>

      </main>
    </>
  )
}

export default App
