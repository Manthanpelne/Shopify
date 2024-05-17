export const fetchLoggedInUserOrders = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-pink-xi.vercel.app/orders/own/",{
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     console.log(data)
     resolve({data})
}
    )
  }


  export const fetchLoggedInUser = () => {
    return new Promise(async(resolve) =>{
      try {
        const response = await fetch("https://shopify-pink-xi.vercel.app/user/own",{
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



  export const updateUser = (update) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-pink-xi.vercel.app/user/"+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"},
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     resolve({data})
}
    )
  }