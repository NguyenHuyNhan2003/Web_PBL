export const getTotalPage = () => {
  return fetch('/data/view/').then((res) => {
    return res.json()
  })
}

export const getPRoduct = () => {
  return fetch('https://dummyjson.com/products').then((res) => {
    return res.json()
  })
}

export const getReacts = () => {
  return fetch('/data/react/').then((res) => {
    return res.json()
  })
}
