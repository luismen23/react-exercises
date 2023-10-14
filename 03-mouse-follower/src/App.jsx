import { useState,  useEffect } from "react"

// Por que se ejecuta dos veces el efecto solo al entrar en la pagina?
// Lo hace el React.StrictMode en main.jsx, y lo hace para asegurarse de que esta funcionando bien el componente y el efecto. Y este no funciona en produccion, solo lo veremos en desarrollo.

const FollowMouse = () => {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({x:0 ,y:0})

  // efecto de pointer move
  useEffect(() => {

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({x: clientX, y: clientY})
    }
    // tenemos que limpiar el efecto (suscripciones, eventos), porque si no este if no me sirve para cuando enable no sea true, por eso hay que utilizar el return del useEffect, para limpiar el efecto
    if (enable) {
      window.addEventListener ('pointermove', handleMove) 
    }

    // esto se ejecuta cuando el componente app deja de renderizarese, y cuando mi dependecia se ejecuta, y lo que hace es limpiar los efectos(suscripciones, eventos).
    // puedo chequear en la consola con getEventListener(window), para ver si no estoy limpiando bien mis efectos
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }

  }, [enable])
  // efecto para esconder el cursor
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)
  
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])
  
  
  const handleClick = () => {
    setEnable(!enable)
  }

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={handleClick}>
        {enable ? 'Desactivate' : 'Activate'} Mouse Follower
      </button>
    </main>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App