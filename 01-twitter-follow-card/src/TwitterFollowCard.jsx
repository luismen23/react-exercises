import React, { useState } from 'react'

export const TwitterFollowCard = ({userName, name, initialIsFollowing, children}) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonIsFollowing = isFollowing ? 'boton is-following' : 'boton'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    //  puedo pasar por las props la palabra reservada "children" que lo que hace es pasarme todo lo que este dentro de las etiquetas donde coloque el children, por ejemplo aqui si lo utilizo me pasara todo lo que este dentro de las etiquetas de TwitterFollowCard en App.jsx
  return (
    <div className='followCard'>
        <div className='left'>
            <img className='image' src={`https://unavatar.io/${userName}`} alt="midu" />
            <div className='name'>
                <strong>{name}</strong>
                <span>@{userName}</span>
            </div>
        </div> 

        <aside>
            <button className={buttonIsFollowing} onClick={handleClick}>
                <span className='seguir'>{text}</span>
                <span className='dejarSeguir'>Dejar de Seguir</span>
            </button>
        </aside>
    </div>
  )
}
