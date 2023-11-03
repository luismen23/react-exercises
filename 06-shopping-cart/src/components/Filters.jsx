/* eslint-disable react/prop-types */
import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

// PROP DRILLING = pasar props desde un elemento padre por varios elementos hijos, hasta llegar al destino. por ejemplo aqui estamos pasando el changeFilters desde mi function App.jsx luego va al Header.jsx y llega hasta aqui para poder actualizar el valor

// useId() = para dar un identificador unico, sirver en server side renderin tambn. pero no sirve para usarlo como key en algo que se esta iterando, porque se crea uno nuevo a cada rato

export function Filters () {
    // Aqui ocurre un error muy comun que es que tenemos en este estado local el minPrice y el el global el setFilters, y esto es mala practica. se arregla simplemente eliminando el estado local y fiarnos del global(useContext)
    const { filters, setFilters } = useFilters() // estado global
    // const [minPrice, setMinPrice] = useState(0) // estado local
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        // setMinPrice(event.target.value)
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }
    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Price</label>
                <input type="range" id={minPriceFilterId} min='0' max='1000' onChange={handleChangeMinPrice} value={filters.minPrice}/>
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Category</label>
                <select name="" id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Phones</option>
                </select>
            </div>
        </section>
    )
}