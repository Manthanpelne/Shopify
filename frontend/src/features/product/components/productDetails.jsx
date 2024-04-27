import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { fetchAllProductsByIdAsync, selectProductById } from '../productListSlice'
import {useSelector, useDispatch} from "react-redux"
import { useParams } from 'react-router-dom'
import { addToCartAsync, selectItems } from '../../cart/cartSlice'
import {selectLoggedInUser} from "../../auth/authSlice"
import { discountedPrice } from '../../../app/constants'
import { selectUserInfo } from '../../user/userSlice'

// const pro = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//   ],
//   images: [
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   ],
//   sizes: [
//     { name: 'XXS', inStock: false },
//     { name: 'XS', inStock: true },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//     { name: '2XL', inStock: true },
//     { name: '3XL', inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton',
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }

const breadcrumbs = [
  { id: 1, name: 'Men', href: '#' },
  { id: 2, name: 'Clothing', href: '#' },
]

const colors = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]

const sizes = [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
]

// const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const ProductDetails=()=> {
  const dispatch = useDispatch()
  const params = useParams()
  const items = useSelector(selectItems)
// console.log(params.id)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[2])
  const user = useSelector(selectUserInfo)
  //console.log(user)
  const product = useSelector(selectProductById)
  //console.log(product)


  const handleCart=(e)=>{
    e.preventDefault()
   if(items.findIndex(item=>item.product.id===product[0].id)<0){
 const newItem = {product:product[0].id, quantity:1}
    dispatch(addToCartAsync(newItem))
    //alert.success("Item successfully added to Cart")
   }
  else{
   alert("already added to cart")
  }
  }

  console.log(params.id)
  useEffect(()=>{
    dispatch(fetchAllProductsByIdAsync(params.id))
  },[dispatch,params.id])



  return (
    <div className="bg-white">
      {/* {!user && <Navigate to="/login" replace={true}></Navigate> } */}
    <div className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {product && product.map((bread) => (
            <li key={bread.id}>
              <div className="flex items-center">
                <p>{bread.category}</p>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-400"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
                <p>{bread.brand}</p>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-400"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
                <a href={bread.href} className="mr-2 text-sm font-medium text-gray-900">
                  {bread.title}
                </a>
              </div>
            </li>
          ))}
          <li className="text-sm">
            {/* <a href={productduct.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
              {productduct.name}
            </a> */}
          </li>
        </ol>
      </nav>

      {/* Image gallery */}
      {product && product.map((item)=>(
        <div key={item.id} className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={item.images[1]}
              alt={item.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={item.images[2]}
              alt={item.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            src={item.images[3]}
            alt={item.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
      ))}

      {/* productduct info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        {product && product.map((item)=>(
           <h1 key={item.id} className='font-bold text-gray-800 md:text-2xl'>
            {item.title}
           </h1>
          ))}
        </div>


        {/* Options & price info*/}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <div className="flex gap-3">
          <p className="text-3xl tracking-tight text-gray-900">${product && product.map((item)=>(
            Math.round(item.price-item.price*item.discountPercentage/100)
          ))}</p> 
          <p className="text-l pt-2 tracking-tight text-red-700">{product && product.map((item)=>(
            -item.discountPercentage
          ))}%</p>
          </div>
          <p className="text-gray-700">$: <span className="line-through text-gray-500">{product && product.map((item)=>(item.price))}</span></p>

          
           <span className="block w-full h-px mt-3 bg-gray-400"></span>

          <form className="mt-3">
            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>

              <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                <div className="flex items-center space-x-3">
                  {colors.map((color) => (
                    <RadioGroup.Option
                      key={color.name}
                      value={color}
                      className={({ active, checked }) =>
                        classNames(
                          color.selectedClass,
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="sr-only">
                        {color.name}
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          color.class,
                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                        )}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Sizes */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Size guide
                </a>
              </div>

              <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {sizes.map((size) => (
                    <RadioGroup.Option
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={({ active }) =>
                        classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                            : 'cursor-not-allowed bg-gray-50 text-gray-400',
                          active ? 'ring-2 ring-indigo-500' : '',
                          'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-200 focus:outline-none sm:flex-1 sm:py-6'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                          {size.inStock ? (
                            <span
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked ? 'border-indigo-500' : 'border-transparent',
                                'pointer-events-none absolute -inset-px rounded-md'
                              )}
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <button
              type="submit"
              onClick={handleCart}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
          </form>
        </div>

        <div className="py-10 mt-8 lg:col-span-2 bg-gray-100 px-3 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          {product && product.map((item)=>(
            <div>

            <div className="">
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-600 pt-2">{item.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ut ex deserunt, non soluta reprehenderit eligendi, autem architecto hic laudantium consequatur dolor quasi.</p>
            </div>
          </div>
          ))}
        
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Details</h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa inventore eligendi nostrum est enim et quaerat corrupti eius odit asperiores, explicabo voluptate perferendis eveniet maxime tenetur esse. Voluptatibus, facere saepe.</p>
            </div>
          </div>

           {/* Reviews */}
           {product && product.map((item)=>(
           <div key={item.id} className="mt-6">
           <h3 className="pt-4">Reviews</h3>
           <div className="flex items-center pt-3">
             <div className="flex items-center">
               {[0, 1, 2, 3, 4].map((rating) => (
                 <StarIcon
                   key={rating}
                   className={classNames(
                     Math.floor(item.rating) > rating ? 'text-gray-900' : 'text-gray-400',
                     'h-5 w-5 flex-shrink-0'
                   )}
                   aria-hidden="true"
                 />
               ))}
             </div>
             <p className="sr-only">{item.rating} out of 5 stars</p>
             <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
               225 reviews
             </a>
           </div>
         </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
