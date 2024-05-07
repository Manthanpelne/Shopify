export const fetchLoggedInUserOrders = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://blue-aware-gazelle.cyclic.app/orders/own/")
     const data = await response.json()
     console.log(data)
     resolve({data})
}
    )
  }


  export const fetchLoggedInUser = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://blue-aware-gazelle.cyclic.app/user/own")
     const data = await response.json()
     //console.log(data)
     resolve({data})
}
    )
  }



  export const updateUser = (update) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://blue-aware-gazelle.cyclic.app/user/"+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"}
     })
     const data = await response.json()
     resolve({data})
}
    )
  }