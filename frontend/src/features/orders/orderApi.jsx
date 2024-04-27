export const createOrder = (order) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("https://shopify-eight-steel.vercel.app/orders",{
    method:"POST",
    mode:"no-cors",
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
     const response = await fetch("https://shopify-eight-steel.vercel.app/orders/?"+queryString)
     const data = await response.json()
     console.log(data)
     const totalOrders = response.headers.get('X-Total-Count');
     resolve({data:{orders:data,totalOrders:+totalOrders}})
}
    )
}


export const updateOrder = (order) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("https://shopify-eight-steel.vercel.app/orders/"+order.id,{
    method:"PATCH",
    mode:"no-cors",
    body:JSON.stringify(order),
    headers:{"content-type":"application/json"}
   })
   const data = await response.json()
   resolve({data})
}
  )
}