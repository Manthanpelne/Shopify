
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchAllProducts, fetchAllProductsById } from "./productListAPI"
import { fetchAllProductsByFilters, fetchAllCategories, fetchAllBrands } from "./productListAPI"

const initialState = {
  products: [],
  status: "idle",
  totalItems:0,
  brand:[],
  category:[],
 selectedProduct:null
}


export const fetchAllProductsAsync =  createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchAllProductsByIdAsync =  createAsyncThunk(
  "product/fetchAllProductsById",
  async (id) => {
    const response = await fetchAllProductsById(id)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchAllProductsByFiltersAsync =  createAsyncThunk(
  "product/fetchAllProductsByFilters",
  async ({filter,sort,pagination}) => {
    const response = await fetchAllProductsByFilters(filter,sort,pagination)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchAllBrandsAsync =  createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchAllBrands()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchAllCategoriesAsync =  createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchAllCategories()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment : (state) => {
      state.value += 1
    },
  },
    extraReducers:(builder)=>{
      builder
      .addCase(fetchAllProductsAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.products = action.payload
      })
      .addCase(fetchAllProductsByFiltersAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.products = action.payload.products
        state.totalItems = action.payload.totalItems
      })
      .addCase(fetchAllBrandsAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.brand = action.payload
    
      })
      .addCase(fetchAllCategoriesAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.category = action.payload
      })
      .addCase(fetchAllProductsByIdAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(fetchAllProductsByIdAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.selectedProduct = action.payload
      })
    }
  })

  export const selectAllProducts = (state) => state.product.products
  export const selectTotalItems = (state) => state.product.totalItems
  export const selectAllCategory = (state) => state.product.category
  export const selectAllBrands = (state) => state.product.brand
  export const selectProductById = (state) => state.product.selectedProduct

export const {increment } = productSlice.actions


export default productSlice.reducer;


