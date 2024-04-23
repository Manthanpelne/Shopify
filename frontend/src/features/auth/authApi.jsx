export const createUser = (userData) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/auth/signup",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{"content-type":"application/json"}
     })
     const data = await response.json()
     resolve({data})
}
    )
  }


  export const checkUser = (loginInfo) => {
    return new Promise(async(resolve,reject) =>{
 try {
   const response = await fetch("http://localhost:8080/auth/login",{
    method:"POST",
    body:JSON.stringify(loginInfo),
    headers:{"content-type":"application/json"}
   })
   if(response.ok){
     const data = await response.json()
      resolve({data:data.token})
   }else{
    const error = await response.json()
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