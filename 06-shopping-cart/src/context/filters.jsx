/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// 1. Crear el contexto 
// Este es el que tenemos que consumir
export const FiltersContext = createContext()

// 2. Crear el provider, para proveer el contexto
// Este es el que nos provee de acceso al contexto
export function FiltersProvider ({ children }) {
    // esto vendria siendo como un estado global
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    })

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}  
        >
            {children}
        </FiltersContext.Provider>

    )
}

// el useContext lo podemos usar cuando un estado cambia muy poco, como un inicio de sesion.
// 