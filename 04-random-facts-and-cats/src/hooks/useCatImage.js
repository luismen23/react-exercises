import { useState, useEffect } from 'react'
import { getImgURL } from '../services/imgURL'

// es mejor pasar los params en forma de objetos, porque mientras mas hayan mas facil sera manejarlos
export function useCatImage ({ fact }) {
  const [imgUrl, setImgUrl] = useState()

  // para recuperar la img cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return 

    // fact.split(' ').slice(0, 3).join(' ') tambien puedo usar esta forma, es la misma, el split me separa la cadena de texto donde hayan espacios, luego recorto con el slice desde la posicion 0 a la 3 y por ultimo convierto en string con el join.
    const threeFirstWords = fact.split(' ', 3).join(' ')

    getImgURL(threeFirstWords).then(newImg => setImgUrl(newImg))
    console.log(imgUrl)
  }, [fact])

  return { imgUrl: `${imgUrl}` }
}

// esto seria un custom hook, el objetivo es extraer la logica de mi codigo tambien
// y asi simplificarlo mas. Lo bueno de estos es que puedo colocar cualquier hook
// real de react.
// Siempre tienen que empezar con la palabra use
