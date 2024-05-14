import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  createUser,
  signOut,
  checkAuth,
  resetPasswordRequest,
  resetPasswordApi,
} from "./authApi";
import { updateUser } from "../user/userApi";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await checkAuth();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error) {
    //console.log(error)
    return error;
  }
});

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email) => {
    try {
      const response = await resetPasswordRequest(email);
      // The value we return becomes the `fulfilled` action payload
      console.log(response)
      return response.data;
    } catch (error) {
      //console.log(error)
      return error;
    }
  }
);

export const resetPasswordApiAsync = createAsyncThunk(
  "user/resetPasswordApi",
  async (data) => {
    try {
      const response = await resetPasswordApi(data);
      // The value we return becomes the `fulfilled` action payload
      console.log(response)
      return response.data;
    } catch (error) {
      //console.log(error)
      return error;
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordApiAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(resetPasswordApiAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
  }
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selecMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
