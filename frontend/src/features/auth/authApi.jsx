export const createUser = (userData) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("https://shopify-server-six.vercel.app/auth/signup",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{"content-type":"application/json"}
     })
     const data = await response.json()
     resolve({data})
}
    )
  }


  export const loginUser = (loginInfo) => {
    return new Promise(async(resolve,reject) =>{
 try {
   const response = await fetch("https://shopify-server-six.vercel.app/auth/login",{
    method:"POST",
    body:JSON.stringify(loginInfo),
    headers:{"content-type":"application/json"}
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
 const response = await fetch("https://shopify-server-six.vercel.app/auth/check");
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