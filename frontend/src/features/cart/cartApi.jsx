export const addToCart = (item) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/cart",{
    method:"POST",
    body:JSON.stringify(item),
    headers:{"content-type":"application/json"}
   })
   const data = await response.json()
   resolve({data})
}
  )
}

export const fetchItemsByUserId = () => {
  return new Promise(async(resolve) =>{
    try {  
      const response = await fetch("http://localhost:8080/cart")
      if(response.ok){
       const data = await response.json()
        resolve({data})
     }else{
      const error = await response.text()
      reject({error})
      console.log(error)
     }
    } catch (error) {
     console.log(error)
    }
  })
}


export const updateCart = (update) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/cart/"+update.id,{
    method:"PATCH",
    body:JSON.stringify(update),
    headers:{"content-type":"application/json"}
   })
   const data = await response.json()
   resolve({data})
}
  )
}

export const deleteItemFromCart = (itemId) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/cart/"+itemId,{
    method:"DELETE",
    headers:{"content-type":"application/json"}
   })
   const data = await response.json()
   resolve({data:{id:itemId}})
}
  )
}

export const  resetCart = async() => {
  const response = await fetchItemsByUserId()
  const items = response.data
  for(let item of items){
    await deleteItemFromCart(item.id)
  }
  resolve({status:"success"})
}