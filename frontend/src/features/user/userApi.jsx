export const fetchLoggedInUserOrders = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-eight-steel.vercel.app/orders/own/",{
      headers:{"content-type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Access-Control-Allow-Credentials":"true"
    }
     })
     const data = await response.json()
     console.log(data)
     resolve({data})
}
    )
  }


  export const fetchLoggedInUser = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-eight-steel.vercel.app/user/own",{
      headers:{"content-type":"application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Access-Control-Allow-Credentials":"true"
    }
     })
     const data = await response.json()
     //console.log(data)
     resolve({data})
}
    )
  }



  export const updateUser = (update) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-eight-steel.vercel.app/user/"+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
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