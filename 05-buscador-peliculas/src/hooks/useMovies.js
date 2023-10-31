import { useCallback, useMemo, useRef, useState } from 'react'
// import withResults from '../mocks/with-results.json'
// import withoutResults from '../mocks/no-results.json'
import { searchMovies } from '../services/movies'

// useMemo sirve memorizar un valor, calculos o funciones(para funciones tenemos el useCallback), para no tener que volverlos a calcular y no se rendericen sin sentido. Dependiendo de una lista de dependencias. O sea que si y solo si se volvera a renderizar si cambia una de las dependencias que uno le coloque

export function useMovies ({search, sort}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search) // para que no busque dos veces lo mismo

  // El useCallback es lo mismo que el useMemo solo que para funciones, o sea no es necesario pasar el callback

  const getMovies = useCallback(async ({search}) => { // aqui no hace falta colocarle dependencia porque depende del valor que le estamos pasando por parametros, en este caso el search, y asi evitamos que se renderice cada vez que el search cambie
    if (search == previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search 
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])
  // EL useMemo lo utilizare para eviar este calculo y para mejorar rendimiento
  // el sort lo que hace es comparar entre a y b
  // el localcompare compara de forma local o sea con acentos y todo
  // const sortedMovies = sort
  //   ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //   : movies

  // IMPORTANTE:
  // el array de dependencias al final funciona como el del useEffect
  // que esta funcion con useMemo solo se va a volver a renderizar cuando 
  // sort o movies cambie.
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies]) 

  return {movies: sortedMovies, getMovies, loading, error}
}
