import { useState } from 'react'
import confetti from 'canvas-confetti'
import Square from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameStorage } from './logic/storage'

function App () {
  // no debo envolver mis estados en condicionales o funciones, mejor se las coloco dentro del estado.
  // aqui chequeo si se guardo algo en el localstorage para comenzar desde donde termino, si no, se comienza de cero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un emapate
  const [winner, setWinner] = useState(null)

  // resetear el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    // tambien tengo que resetear lo que me queda en el local storage
    resetGameStorage()
  }

  const updateBoard = (index) => {
    // con esto evito que se actualice cada vez que clickeo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardar la partida // en el localstorage se guarda es un string. no puedo pasar un array
    saveGameStorage({
      board: newBoard,
      turn: newTurn
    })

    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      // la actualizacion de los estados es asincrona, si yo coloco un alert para ver
      // quien gano, este no va a espera que se refleje en la pagina y saldra el alert primero
      // esto por la asincronia
      confetti()
      setWinner(newWinner)
      // chequeo si hay empate
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Restart Game</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <section>
        <WinnerModal winner={winner} resetGame={resetGame} />
      </section>
    </main>
  )
}

export default App
