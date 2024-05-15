import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { clearSelectedProduct, createProductAsync, fetchAllProductsByIdAsync, selectAllBrands, selectAllCategory, selectProductById, updateProductAsync } from '../../product/productListSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Modal from '../../../pages/modal'



export const ProductForm=()=>{
    const brand = useSelector(selectAllBrands)
    const category = useSelector(selectAllCategory)
    const selectedProduct = useSelector(selectProductById)
    console.log(selectedProduct)

    const [openModal, setOpenModal] = useState(null)


    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
      } = useForm();
      const dispatch = useDispatch()
      const params = useParams()



      const handleDelete = ()=>{
        const product = {...selectedProduct[0]}
        product.deleted = true
        dispatch(updateProductAsync(product))
        toast.success("Item deleted successfully")
      }

      useEffect(()=>{
        if(params.id){
          dispatch(fetchAllProductsByIdAsync(params.id))
        }else{
          dispatch(clearSelectedProduct())
        }
      },[params.id, dispatch])

      useEffect(()=>{
        if(selectedProduct && params.id){
          setValue("title", selectedProduct[0].title);
          setValue("description",selectedProduct[0].description);
          setValue("price", selectedProduct[0].price);
          setValue("discountPercentage",selectedProduct[0].discountPercentage);
          setValue("stock", selectedProduct[0].stock);
          setValue("brand", selectedProduct[0].brand);
          setValue("image1", selectedProduct[0].images[0]);
          setValue("image2", selectedProduct[0].images[1]);
          setValue("image3",selectedProduct[0].images[2]);
          setValue("image4",selectedProduct[0].images[3]);
          setValue("thumbnail",selectedProduct[0].thumbnail);
          setValue("category",selectedProduct[0].category);
        }
      },[selectedProduct,params.id,setValue])

    return (
      <>
        <form
           noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const product = {...data}
          product.images = [product.image1, product.image2, product.image3, product.image4]
          product.rating = 0
          delete product["image1"]
          delete product["image2"]
          delete product["image3"]
          product.price = +product.price
          product.rating = +product.rating
          product.discountPercentage = +product.discountPercentage
          product.stock = +product.stock
          //console.log(product)

          if(params.id){
            product.id = params.id
            product.rating = selectedProduct.rating || 0
            dispatch(updateProductAsync(product))
            toast.success("Item updated successfully")
            //alert.success("Product updated successully")
            reset()
          }else{
          dispatch(createProductAsync(product))
          //alert.success("Product created successfully")
          reset()
          }
        })}
         className="lg:w-3/5 m-auto">
          <div className="space-y-12 bg-white px-10 mt-5">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-center font-semibold leading-7 text-gray-900">ADD PRODUCT</h2>
            
              <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Product Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("title")}
                      
                        id="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter Title"
                      />
                    </div>
                  </div>
                </div>
    
                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register("description")}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the product.</p>
                </div>

                <div className="col-span-3">
                  <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                    Brand
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                  <select  {...register("brand",{
                    required:"brand is required"
                  })} className="border border-gray-300" id="brand">
                  <option value="">--choose brand--</option>
                    {brand.map((brands)=><option value={brands.value}>{brands.label}</option>)}
                  </select>
                  </div>
                </div>

                <div className="col-span-2 pl-20">
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                  <select  {...register("category",{
                    required:"category is required"
                  })} className="border border-gray-300" id="category">
                    <option value="">--choose category--</option>
                    {category.map((cat)=><option value={cat.value}>{cat.label}</option>)}
                  </select>
                  </div>
                </div>

    
                {/* <div className="col-span-full">
                  <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div> */}
    
              </div>
            </div>
    
            <div className="border-b border-gray-900/10 pb-12 md:flex justify-around">
                <div>
                <div className="sm:col-span-2">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                      <input
                        type="number"
                        {...register("price",{
                            min:1,
                            max:100000
                        })}
                        id="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 py-6">
                  <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                    Discount
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                      <input
                        type="number"
                        {...register("discountPercentage",{
                            min:0
                        })}
                        id="number"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter Discount%"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-4">
                  <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                    Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                      <input
                        type="number"
                        {...register("stock",{
                            min:0
                        })}
                        id="stock"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter stock"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-4 py-6">
                  <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                      <input
                        type="text"
                        {...register("thumbnail")}
                        id="thumbnail"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter thumbnail link"
                      />
                    </div>
                  </div>
                </div>
                </div>
                <div>
                <div className="sm:col-span-4">
                  <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                    Image 1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                      <input
                        type="text"
                        {...register("image1")}
                        id="image1"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter Image 1 link"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4 py-6">
                  <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                    Image 2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                      <input
                        type="text"
                        {...register("image2")}
                        id="image2"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter image 2 link"
                      />
                    </div>
                  </div>
                </div>
    
                <div className="sm:col-span-4 ">
                  <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                 Image 3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("image3")}
                        id="image3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter image 3 link"
                      />
                    </div>
                  </div>
                </div>
    
                <div className="sm:col-span-4 py-6">
                  <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                 Image 4
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("image4")}
                        id="image4"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter image 4 link"
                      />
                    </div>
                  </div>
                </div>
    
                </div>
            
            </div>
    
          </div>
    
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to="/admin-productsPage"><button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button></Link>
            {selectedProduct && <button onClick={(e)=>{e.preventDefault(); setOpenModal(true)}} type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Delete
            </button>}

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        {selectedProduct && (
         <Modal
         title="Delete Item"
         message="Are you sure you want to delete this item permanently?"
         danger="Delete"
         cancelOption="Cancel"
         cancelAction = {()=>setOpenModal(null)}
         dangerAction={handleDelete}
         showModal={openModal}
       />
        )}
      </>
      )
}