import { useCatImage } from '../hooks/useCatImage'

export const Otro = () => {
  const { imgUrl } = useCatImage({ fact: 'cat' })
  return (
    <>
      {imgUrl && <img src={imgUrl} />}
    </>
  )
}
