
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUserOrders , fetchLoggedInUser} from "./userApi"
import { updateUser } from "./userApi"

const initialState = {
  status: "idle",
  userInfo: null //detailed user info
}


export const fetchLoggedInUserOrdersAsync =  createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const updateUserAsync =  createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)


export const fetchLoggedInUserAsync =  createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment : (state) => {
      state.value += 1
    },
  },
    extraReducers:(builder)=>{
      builder
      .addCase(fetchLoggedInUserOrdersAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.userInfo.orders = action.payload
      })
      .addCase(updateUserAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(updateUserAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.userInfo = action.payload
      })
      .addCase(fetchLoggedInUserAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.userInfo = action.payload
      })
    }
  })

export const selectUserOrders = (state) => state.user.userInfo.orders
export const selectUserInfo = (state) => state.user.userInfo

export const {increment } = userSlice.actions


export default userSlice.reducer;


