import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApplication, fetchApplication, fetchUserApplications, fetchUserProfile , updateProfile } from "../services/fireStore";
import { fetchAllServices } from "../services/fireStore";
import { UserApplications } from "../components/UserApplications";
const initialState = {
  services: [],
  searchQuery: "",
  currentApplication:null,
  currentApplicationId:null,
  userDetails: null,
  userApplications:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Fetch User Profile
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const userProfile = await fetchUserProfile(userId); // Fetch data from Firestore
  return userProfile;
});
// Async thunk for fetching all users
export const getAllServices = createAsyncThunk(`admin/getAllServices`, async () => {
  const services = await fetchAllServices(); // Fetch all users from Firestore
  return services;
});

// Create Application
export const createNewApplication = createAsyncThunk("user/createNewApplication", async (applicationData, applicants) => {
  const application = await createApplication(applicationData, applicants); // Fetch data from Firestore
  return application;
});

export const getApplication = createAsyncThunk('user/getApplication',async (applicationId)=>{
     const application = await fetchApplication(applicationId);
     return application;
})

export const getUserApplications = createAsyncThunk('user/getUserApplicatons',async (userId)=>{
  const applications = await fetchUserApplications(userId);
  return applications;
})

export const updateUserProfile =createAsyncThunk('user/updateUserProfile',async ({userId, updates})=>{
  console.log(" updateUserProfile called with : "+JSON.stringify(updates))
   await updateProfile(userId, updates);
  return {_id:userId, ...updates};
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUser: (state) => {
      state.userDetails = null;
    },
    setCurrentApplication :(state, action)=>{
      state.currentApplication=action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
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
      })
      .addCase(getAllServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentApplicationId=action.payload._id
      })
      .addCase(createNewApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentApplication = action.payload;
      })
      .addCase(getApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userApplications = action.payload;
      })
      .addCase(getUserApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log('updated user --> '+JSON.stringify(action.payload));
        state.status = "succeeded";
        state.userDetails = action.payload;
      });
  },
});

export const { clearUser, setUser,setCurrentApplication, setSearchQuery } = userSlice.actions;
export default userSlice.reducer;
