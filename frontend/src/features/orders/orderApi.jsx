import toast from "react-hot-toast"

export const createOrder = (order) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/orders",{
    method:"POST",
    body:JSON.stringify(order),
    headers:{"content-type":"application/json"},
    credentials: "include",
    withCredentials:true
   })
   const data = await response.json()
   resolve({data})
}
  )
}

export const fetchAllOrders = (sort,pagination) => {
  let queryString = ""

  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }
    for(let key in pagination){
      queryString+=`${key}=${pagination[key]}&`
    }
    //console.log(queryString)
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/orders/?"+queryString,{
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     console.log(data)
     const totalOrders = response.headers.get('X-Total-Count');
     resolve({data:{orders:data,totalOrders:+totalOrders}})
}
    )
}


export const updateOrder = (order) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/orders/"+order.id,{
    method:"PATCH",
    body:JSON.stringify(order),
    headers:{"content-type":"application/json"},
    credentials: "include",
    withCredentials:true
   })
   if(response.ok){
     const data = await response.json()
     resolve({data})
     toast.success("Order updated successfully")
   }else{
    toast.error("Something went wrong")
   }
}
  )
}