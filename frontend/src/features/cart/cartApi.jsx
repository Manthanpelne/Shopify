export const fetchCount = (amount = 1) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:4500")
     const data = await response.json()
     resolve({data})
}
    )
  }