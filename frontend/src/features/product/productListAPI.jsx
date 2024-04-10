export const fetchAllProducts = () => {
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/product")
     const data = await response.json()
     resolve({data})
}
    )
  }

  export const fetchAllProductsByFilters = (filter,sort,pagination) => {

    //ex:filter for {"category":["smartphone","laptops",...]}
    let queryString =  ""
    //filter
    for(let key in filter){
      const categoryValue = filter[key]
      if(categoryValue.length){
        const lastCategoryValue = categoryValue[categoryValue.length-1]
        queryString += `${key}=${lastCategoryValue}&`
        console.log(queryString)
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
    //console.log(queryString)
    return new Promise(async(resolve) =>{
     const response = await fetch("http://localhost:8080/product?"+queryString)
     const data = await response.json()
     const totalItems = data.items
     resolve({data:{products:data,totalItems:+totalItems}})
}
    )
  }