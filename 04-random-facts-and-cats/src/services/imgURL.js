
export const getImgURL = async (threeFirstWords) => {

  const res = await fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red`)
  console.log(res)
  const { url } = res
  return url
}
