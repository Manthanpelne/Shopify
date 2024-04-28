export const createOrder = (order) => {
  return new Promise(async(resolve) =>{
   const response = await fetch("https://shopify-eight-steel.vercel.app/orders",{
    method:"POST",
    body:JSON.stringify(order),
    headers:{"content-type":"application/json",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Access-Control-Allow-Credentials":"true"
  }
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
     const response = await fetch("https://shopify-eight-steel.vercel.app/orders/?"+queryString,{
      headers:{"content-type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Access-Control-Allow-Credentials":"true"
    }
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
   const response = await fetch("https://shopify-eight-steel.vercel.app/orders/"+order.id,{
    method:"PATCH",
    body:JSON.stringify(order),
    headers:{"content-type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Access-Control-Allow-Credentials":"true"
    }
   })
   const data = await response.json()
   resolve({data})
}
  )
}