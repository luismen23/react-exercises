import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/fact'

export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  // cuando vayamos a escribir el useEffect que sea asi y poniendo primero el array vacio
  // "useEffect(() => {}, [])"

  // para recuperar la cita al cargar la pag
  // fetch(CAT_ENDPOINT_RANDOM_FACT)
  //   .then(res => res.json())
  //   .then(data => {
  //     const { fact } = data
  //     setFact(fact)
  //   })
  useEffect(() => {
    refreshFact()
  }, [])

  return { fact, refreshFact }
}
