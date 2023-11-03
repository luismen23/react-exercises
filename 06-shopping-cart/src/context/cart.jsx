/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState } from "../reducers/cartReducer";

export const CartContext = createContext()

// useReducer= es bueno utilizarlo cuando tengo varios estados en mi app

function useCartReducer () {
    const [state, dispatch] = useReducer( cartReducer, cartInitialState )
    
    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({ type: 'CLEAR_CART'})

    return { state, addToCart, removeFromCart, clearCart }
}

export function CartProvider ({ children }) {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()


    // ---- Todo esto lo modificamos con el useReducer de arriba ----
    // const [cart, setCart] = useState([])
    // const addToCart = product => {
    //     // Check if the produc is already in the cart
    //     const productInCartIndex = cart.findIndex(item => item.id == product.id)

    //     if (productInCartIndex >= 0) {
    //         //una forma seria usando structuredClone
    //         const newCart = structuredClone(cart)
    //         newCart[productInCartIndex].quantity += 1
    //         return setCart(newCart)
    //     }

    //     // pero si el producto no esta en el carrito
    //     setCart(prevState => ([
    //         ...prevState, 
    //         {
    //             ...product,
    //             quantity: 1
    //         }
    //     ]))
    // }

    // const removeFromCart = product => {
    //     setCart(prevState => prevState.filter(item => item.id != product.id))
    // }

    // const clearCart = () => {
    //     setCart([])
    // }
    // -------------------------------------------------------------------
    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}
