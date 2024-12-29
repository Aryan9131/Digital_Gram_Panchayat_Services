import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../services/fireStore";

const initialState = {
  userDetails: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Fetch User Profile
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const userProfile = await fetchUserProfile(userId); // Fetch data from Firestore
  return userProfile;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser:(state, action)=>{
        console.log('setUser called --> '+JSON.stringify(action.payload));
        state.userDetails=action.payload;
      },
    clearUser: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload; // Store user profile
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUser,setUser } = userSlice.actions;
export default userSlice.reducer;
