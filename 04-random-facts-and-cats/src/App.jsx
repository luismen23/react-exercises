import './App.css'
import { Otro } from './components/Otro'
import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imgUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>

      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imgUrl && <img src={imgUrl} alt={`Ramdon cat with 3 first words of the fact: "${fact}"`} />}

      {/* <Otro /> */}
    </main>
  )
}
