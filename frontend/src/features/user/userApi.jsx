import toast from "react-hot-toast"

export const fetchLoggedInUserOrders = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-ten-pi.vercel.app/orders/own/",{
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
        const response = await fetch("https://shopify-ten-pi.vercel.app/user/own",{
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
     const response = await fetch("https://shopify-ten-pi.vercel.app/user/"+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"},
      credentials: "include",
    withCredentials:true
     })
     if(response.ok){
      const data = await response.json()
      resolve({data})
      toast.success("Updated successfully")
    }else{
      toast.error("Something went wrong, Retry again!")
    }
 }
   )
  }