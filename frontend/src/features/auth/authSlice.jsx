
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkUser, createUser, signOut } from "./authApi"
import { updateUser } from "../user/userApi"

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error:null
}


export const createUserAsync =  createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const checkUserAsync =  createAsyncThunk(
  "user/checkUser",
  async (loginInfo, {rejectWithValue}) => {
try {
  const response = await checkUser(loginInfo)
  // The value we return becomes the `fulfilled` action payload
  return response.data
} catch (error) {
  console.log(error)
 return rejectWithValue(error)
}
}
)


export const signOutAsync =  createAsyncThunk(
  "user/signOut",
  async (loginInfo) => {
    const response = await signOut(loginInfo)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment : (state) => {
      state.value += 1
    },
  },
    extraReducers:(builder)=>{
      builder
      .addCase(createUserAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(createUserAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.loggedInUserToken = action.payload
      })
      .addCase(checkUserAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(checkUserAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.loggedInUserToken = action.payload
      })
      .addCase(checkUserAsync.rejected, (state,action)=>{
        state.status = "idle";
        state.error = action.payload
      })
      .addCase(signOutAsync.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(signOutAsync.fulfilled, (state,action)=>{
        state.status = "idle";
        state.loggedInUserToken = null
      })
    }
  })


export const selectLoggedInUser = (state) => state.auth.loggedInUserToken
export const selectError = (state) => state.auth.error;

export const {increment } = counterSlice.actions


export default counterSlice.reducer;


