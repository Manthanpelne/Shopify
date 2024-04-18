export const createOrder = (order) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/orders",{
    method:"POST",
    body:JSON.stringify(order),
    headers:{"content-type":"application/json"}
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
     const response = await fetch("http://localhost:8080/orders?"+queryString)
     const data = await response.json()
     console.log(data)
     const totalOrders = data.items
     resolve({data:{orders:data,totalOrders:+totalOrders}})
}
    )
}


export const updateOrder = (order) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/orders/"+order.id,{
    method:"PATCH",
    body:JSON.stringify(order),
    headers:{"content-type":"application/json"}
   })
   const data = await response.json()
   resolve({data})
}
  )
}