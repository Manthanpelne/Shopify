export const fetchLoggedInUserOrders = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/orders/own/")
     const data = await response.json()
     console.log(data)
     resolve({data})
}
    )
  }


  export const fetchLoggedInUser = () => {
    return new Promise(async(resolve) =>{
      try {
        const response = await fetch("http://localhost:8080/user/own")
        if(response.ok){
         const data = await response.json()
          resolve({data})
       }else{
        const error = await response.text()
        reject({error})
        console.log(error)
       }
      } catch (error) {
        reject({error})
        console.log(error)
      }
})
  }



  export const updateUser = (update) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/user/"+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"}
     })
     const data = await response.json()
     resolve({data})
}
    )
  }