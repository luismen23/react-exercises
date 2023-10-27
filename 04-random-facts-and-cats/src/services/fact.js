const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  const { fact } = data
  return (fact)
}

// IMPORTANTE
// Es buena practica no pasar estados de react por props cuando voy a
// extraer la logica de un servicio. Siempre mantener separado react de la logic

// si me paro con el cursor encima de la funcion donde salen los 3 punticos ...
// dandole ctrl + punto(.) puedo convertirla en una funcion async await
