export const createUser = (userData) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-eight-steel.vercel.app/auth/signup",{
      method:"POST",
      body:JSON.stringify(userData),
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


  export const loginUser = (loginInfo) => {
    return new Promise(async(resolve,reject) =>{
 try {
   const response = await fetch("https://shopify-eight-steel.vercel.app/auth/login",{
    method:"POST",
    body:JSON.stringify(loginInfo),
    headers:{"content-type":"application/json",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Access-Control-Allow-Credentials":"true"
  }
   })
   if(response.ok){
     const data = await response.json()
      resolve({data})
   }else{
    const error = await response.text()
    reject({error})
   }
}
 catch (error) {
  reject({error})
 }
  })
}




export const checkAuth = () => {
  return new Promise(async(resolve,reject) =>{
try {
 const response = await fetch("https://shopify-eight-steel.vercel.app/auth/check",{
  headers:{"content-type":"application/json",
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  "Access-Control-Allow-Credentials":"true"
}
 });
 if(response.ok){
   const data = await response.json()
    resolve({data})
 }else{
  const error = await response.text()
  reject({error})
  
 }
}
catch (error) {
reject({error})

}
})
}




  export const signOut = (userId) => {
    return new Promise(async(resolve) =>{
     resolve({data:"success"})
}
    )
  }