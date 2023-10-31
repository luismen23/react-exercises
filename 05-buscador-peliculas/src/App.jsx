import './App.css'
import { useCallback, useRef, useState } from 'react'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


// useRef = hook que te permite crear una referencia mutable que persiste durante todo el ciclo de vida de tu componente(su valor no se reinicia), siendo util para guardar cualquier valor que puedas mutar, como un identificador, elemento del dom, contador, etc, y que cada vez que cambia no vuelve a renderizar el componente.

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading} = useMovies({ search, sort })
  const inputRef = useRef()
 
  // puedo crear un debounce para que vaya esperando la respuesta del getMovies y se renderice lo que es.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies( {search} )
    }, 500) 
    , [getMovies]
  )
  
  // - ESTAS DOS MANERAS SERIAN LAS FORMAS NO CONTROLADA(sin react) DE RECUPERAR MI ELEMENTO DEL DOM -

  // ** Asi recupero el valor del input con el useRef() de React **
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const value = inputRef.current.value // recupero siempre desde current mi valor que esta vez esta en el input
  //   console.log(value)
  // }

  // ** Asi recupero el valor del input usando solo JS, sin necesidad del useRef(), es mucho mejor en cuanto a rapidez **
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
    const { query } = Object.fromEntries(new window.FormData(event.target)) // Y la mejor forma es usando el object.fromentries porque me regresa todos los elementos en un objeto, en caso de que tenga varios inputs.
    // const query = fields.get('query') // tengo que colocar el nombre en el elemento que quiero recuperar en este caso el input le coloco el nombre de "query" (esto se usa sin el object.fromEntries)
    console.log(query)
  }

  // Para ordenar por orden alfabetico, y usar useMemo en useMovies.js
  const handleSort = () => {
    setSort(!sort)
  }

  // - ESTA SERIA MI FORMA CONTROLADA(con react) PARA RECUPERAR MIS ELEMENTOS DEL DOM (SE HACE GRACIAS AL ESTADO) -

  // const [query, setQuery] = useState('')

  const handleChange = (event) => {
    const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return // prevalidacion que me permite la forma controlada
    updateSearch(newQuery)
    // getMovies({ search: newQuery })
    debounceGetMovies(newQuery)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} onChange={handleChange} value={search} name='query' ref={inputRef} type="text" placeholder='Avengers, Star Wars, The Matrix' />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando ...</p> : null}
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
