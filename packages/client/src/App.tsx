import { useEffect } from 'react'
import PSignIn from './pages/PSignIn/PSignIn'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <PSignIn />
    </div>
  )
}

export default App
