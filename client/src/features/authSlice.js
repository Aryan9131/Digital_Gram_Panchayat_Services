import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, logOut } from "../services/auth";
import { fetchUser } from "./userSlice"; // Import fetchUser from userSlice
import { clearUser } from "./userSlice";
const initialState = {
  token: null,
  userId: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch }) => {
    const userCredential = await signIn(email, password); // Sign in and get minimal user info
    const { _id: userId } = userCredential;
    
    // save token to localStorage
     localStorage.setItem("userToken", userCredential.token);

    // Fetch detailed user profile
    dispatch(fetchUser(userId)); // Trigger userSlice action

    return { token: userCredential.token, userId };
  }
);

// Sign Up
export const registerUser = createAsyncThunk("auth/registerUser", async ({ email, password, userData }) => {
  const userCredential = await signUp(email, password, userData);
  return { token: userCredential.token, userId: userCredential.uid };
});

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
  await logOut();
  localStorage.removeItem('userToken');
  dispatch(clearUser()); // Clear userSlice state
  window.location.reload()
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuth:(state, action)=>{
      const {token, userId} =action.payload;
      state.token=token;
      state.userId=userId;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.userId = null;
      });
  },
});

export default authSlice.reducer;
export const {setUserAuth} = authSlice.actions;