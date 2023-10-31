import { useEffect, useRef, useState } from "react"

// custom hook para validar formulario
export function useSearch() {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    
    // Usamos este useRef para saber si el usuario ha usado o no por primera vez el input y valide el form a partir de que se use el input
    const isFirstInput = useRef(true)
    
    useEffect(() => {
        // este if, verifica si el usuario no ha utilizado el input, cuando search es igual a '' es true, entonces se ejecuta el return y no se realizan las siguientes validaciones. Luego cuando cambia, si.
        if (isFirstInput.current) {
            isFirstInput.current = search == ''
            return // el return sin nada retorna undefined
        }

        // ejemplos sencillos de como validar el formulario
        if (search == '') {
            setError('No se puede buscar una pelicula sin nombre')
            return
        }
    
        if (search.match(/^\d+$/)) {
            setError('No se puede buscar una pelicula con un numero')
            return
        }
    
        if (search.length < 3) {
            setError('La busqueda debe tener al menos 3 caracteres')
            return
        }
    
        setError(null)
    }, [search])
  
    return { search, updateSearch, error}
  }