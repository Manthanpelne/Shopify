
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchCount } from "./authApi"

const initialState = {
  value: 0,
  status: "idle",
}


export const IncrementAsync =  createAsyncThunk(
  async amount => {
    const response = await fetchCount(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment : (state) => {
      state.value += 1
    },
  },
    extraReducers:(builder)=>{
      builder
      .addCase(IncrementAsyncncrementAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(IncrementAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.value = action.payload
      })
    }
  })


export const {increment } = counterSlice.actions


export default counterSlice.reducer;


