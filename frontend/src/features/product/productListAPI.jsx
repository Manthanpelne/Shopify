export const fetchAllProducts = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/product",{
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     resolve({data})
}
    )
  }


  export const fetchAllProductsById = (id) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/product/"+id,{
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     resolve({data})
}
    )
  }


  
  export const createProduct = (product) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/product/",{
      method:"POST",
      body:JSON.stringify(product),
      headers:{"content-type":"application/json"},
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     resolve({data})
}
    )
  }



  export const updateProduct = (update) => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/product/"+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"},
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     resolve({data})
  }
    )
  }



  export const fetchAllProductsByFilters = (filter,sort,pagination,admin) => {

    //ex:filter for {"category":["smartphone","laptops",...]}
    let queryString =  ""
    //filter
    for(let key in filter){
      const categoryValue = filter[key]
      if(categoryValue.length){
        const lastCategoryValue = categoryValue[categoryValue.length-1]
        queryString += `${key}=${lastCategoryValue}&`
      }
    }
    //sort
    for(let key in sort){
      queryString += `${key}=${sort[key]}&`
    }
    //pagination
    for(let key in pagination){
      queryString+=`${key}=${pagination[key]}&`
    }
    if(admin){
      queryString += `admin=true`
    }
    //console.log(queryString)
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/product?"+queryString,{
      credentials: "include",
    withCredentials:true
     })
     const data = await response.json()
     //console.log(data)
     const totalItems = response.headers.get('X-Total-Count');
     resolve({data:{products:data,totalItems:+totalItems}})
}
    )
  }

//fetch using category
export const fetchAllCategories = () => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/category",{
    credentials: "include",
    withCredentials:true
   })
   const data = await response.json()
   resolve({data})
}
  )
}

//fetch using category
export const fetchAllBrands = () => {
  return new Promise(async(resolve) =>{
   const response = await fetch("http://localhost:8080/brand",{
    credentials: "include",
    withCredentials:true
   })
   const data = await response.json()
   resolve({data})
}
  )
}