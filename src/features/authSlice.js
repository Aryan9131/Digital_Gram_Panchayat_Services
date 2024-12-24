import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, logOut } from "../services/auth";

const initialState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunks for Firebase calls
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
  const userCredential = await signIn(email, password);
  return userCredential.user; // Return Firebase user
});

export const registerUser = createAsyncThunk("auth/registerUser", async ({ email, password }) => {
  const userCredential = await signUp(email, password);
  return userCredential.user;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await logOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
