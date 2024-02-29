import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App () {
  const [count, setCount] = useState(0)
  const [creatingGame, setCreatingGame] = useState(false)
  const [joiningGame, setJoiningGame] = useState(false)

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <h1>Welcome to Wyrmspan</h1>
      {!creatingGame && !joiningGame ? (
        <div>
          <button type='button' onClick={() => setCreatingGame(true)}>
            Create a game
          </button>
          <span> or </span>
          <button type='button' onClick={() => setJoiningGame(true)}>
            Join a game
          </button>
        </div>
      ) : (
        <div>
          <a
            onClick={() => {
              setCreatingGame(false)
              setJoiningGame(false)
            }}
          >
            back
          </a>
        </div>
      )}
      {creatingGame && (
        <div>
          <h2>Game Lobby</h2>
        </div>
      )}
      {joiningGame && (
        <div>
          <h2>Join game</h2>
        </div>
      )}
    </>
  )
}

export default App
