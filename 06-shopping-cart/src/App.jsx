import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import { Footer } from './components/Footer' 
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/cart'
import { CartProvider } from './context/cart'

// El useContext() nos permite en vez de pasar props de la manera del Drop Drilling, puedes tener todos esos valores en un espacio al que se puede recurrir directamente(algo totalmente separado de nuestro arbol de elementos  ) sin necesidad de pasarse entre padres e hijos


// El useReducer() es un hook que nos permite manejar el estado de una manera escalable porque se basa en que recibe en una funcion el estado actual y la accion que tiene que hacer y a partir de ahi lo que devuelve es un nuevo estado. Esto esta totalmente separado del componente, del provider, del custom hook de todo. 


function App() {
  const {filterProducts} = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts}/>
      <Footer/>
    </CartProvider>
  )
}

export default App
