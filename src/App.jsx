import { useEffect, useState } from 'react'
import './App.css'

import Lobby from './components/Lobby'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
  collection
} from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
import LobbyList from './components/LobbyList'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCB5vjPkp3WFsfTm7LOchEyvzC5zWaqeGU',
  authDomain: 'wyrmspan-clone.firebaseapp.com',
  projectId: 'wyrmspan-clone',
  storageBucket: 'wyrmspan-clone.appspot.com',
  messagingSenderId: '760928058819',
  appId: '1:760928058819:web:ea8b2b92e33e39e3dd9176'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const functions = getFunctions()

function App () {
  const [count, setCount] = useState(0)
  const [creatingGame, setCreatingGame] = useState(false)
  const [joiningGame, setJoiningGame] = useState(false)
  const [gameId, setGameId] = useState(null)
  // const [gameState, setGameState] = useState(null)
  const [gameState, setGameState] = useState({
    state: {},
    numPlayers: 1,
    gameStarted: false,
    players: ['Chase']
  })
  // const [openLobbies, setOpenLobbies] = useState(null)
  const [openLobbies, setOpenLobbies] = useState([
    { id: '51TKkE4bNBOjiIhfpeCU', numPlayers: 2 }
  ])

  useEffect(() => {
    if (gameId) {
      console.log('there was a game id')
      const unsubscribe = onSnapshot(doc(db, 'games', gameId), doc => {
        const source = doc.metadata.hasPendingWrites ? 'local' : 'server'
        console.log(source, ' data: ', doc.data())
        setGameState(doc.data())
      })

      return () => {
        unsubscribe()
      }
    }
  }, [gameId])

  const handleStartNewGame = async () => {
    setCreatingGame(true)
    const startGame = httpsCallable(functions, 'startGame')
    const res = await startGame()
    setGameId(res.data.id)
    console.log(res)
  }

  const handleStartJoinGame = async () => {
    setJoiningGame(true)

    const q = query(collection(db, 'games'), where('gameStarted', '==', false))
    const snapshot = await getDocs(q)

    const lobbies = []
    snapshot.forEach(doc => {
      lobbies.push({
        id: doc.id,
        ...doc.data()
      })
    })

    setOpenLobbies(lobbies)
  }

  const handleJoinGame = async gameId => {
    console.log('joining ', gameId)
    const tryJoinGame = httpsCallable(functions, 'tryJoinGame')
    const res = await tryJoinGame({ gameId, player: 'Justin' })
    setGameId(res.data.id)
    setJoiningGame(false)
  }

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
      {!creatingGame && !joiningGame && !gameId ? (
        <div>
          <button type='button' onClick={handleStartNewGame}>
            Create a game
          </button>
          <span> or </span>
          <button type='button' onClick={handleStartJoinGame}>
            Join a game
          </button>
        </div>
      ) : (
        <div>
          <a
            onClick={() => {
              setCreatingGame(false)
              setJoiningGame(false)
              setGameId(null)
            }}
          >
            back
          </a>
        </div>
      )}
      {(creatingGame || gameId) && <Lobby {...gameState} />}
      {joiningGame && (
        <LobbyList openLobbies={openLobbies} joinGameHandler={handleJoinGame} />
      )}
    </>
  )
}

export default App
