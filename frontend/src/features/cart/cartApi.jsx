import toast from "react-hot-toast"

export const addToCart = (item) => {
  return new Promise(async(resolve) =>{
    try {
      const response = await fetch("https://shopify-seven-dun.vercel.app/cart",{
       method:"POST",
       body:JSON.stringify(item),
       headers:{"content-type":"application/json"},
       credentials: "include",
       withCredentials:true
      })
      if(response.ok){
        const data = await response.json()
        console.log("data:", data)
        resolve({data})
        //window.location.href = "http://localhost:5173/cart"
        toast.success("Item successfully added to cart")
      }else{
        const error = await response.text()
        console.log(error)
       toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  })
}

export const fetchItemsByUserId = () => {
  return new Promise(async(resolve) =>{
    try {  
      const response = await fetch("https://shopify-seven-dun.vercel.app/cart",{
        credentials: "include",
    withCredentials:true
      })
      const data = await response.json()
          resolve({data})
      } catch (error) {
        console.log(error)
      }
})
}


export const updateCart = (update) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("https://shopify-seven-dun.vercel.app/cart/"+update.id,{
    method:"PATCH",
    body:JSON.stringify(update),
    headers:{"content-type":"application/json"},
    credentials: "include",
    withCredentials:true
   })
   const data = await response.json()
   resolve({data})
   toast.success("Cart updated successfully")
}
  )
}

export const deleteItemFromCart = (itemId) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("https://shopify-seven-dun.vercel.app/cart/"+itemId,{
    method:"DELETE",
    headers:{"content-type":"application/json"},
    credentials: "include",
    withCredentials:true
   })
   if(response.ok){
     const data = await response.json()
     resolve({data:{id:itemId}})
   }else{
    toast.error("Something went wrong")
   }
}
  )
}

export const  resetCart = async() => {
  return new Promise(async (resolve) => {
  const response = await fetchItemsByUserId()
  const items = response.data
  for(let item of items){
    await deleteItemFromCart(item.id)
  }
  resolve({status:"success"})
})
}