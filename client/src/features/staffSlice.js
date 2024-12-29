import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPendingApplications, approveApplication ,fetchAllServicesByDepartment, fetchService } from "../services/fireStore";

const initialState = {
  services:[],
  pendingApplications: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getAllServicesByDepartment = createAsyncThunk(`staff/getAllServices`, async (department) => {
  console.log('getAllServicesByDepartment called --> '+department)
  const services = await fetchAllServicesByDepartment(department); // Fetch all users from Firestore
  return services;
});
export const fetchOneService= createAsyncThunk('staff/fetch-service', async ({serviceId})=>{
  console.log('fetchOneService thunk called --> '+JSON.stringify(serviceId))
   const service  = await fetchService(serviceId);
  return service;
})

// Async thunk for fetching pending applications
export const getPendingApplications = createAsyncThunk("staff/getPendingApplications", async () => {
  const applications = await fetchPendingApplications(); // Fetch pending applications from Firestore
  return applications;
});

// Async thunk for approving an application
export const approveApp = createAsyncThunk("staff/approveApp", async (applicationId) => {
  await approveApplication(applicationId); // Approve the application in Firestore
  return applicationId; // Return approved application ID
});

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPendingApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPendingApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pendingApplications = action.payload;
      })
      .addCase(getPendingApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(approveApp.fulfilled, (state, action) => {
        state.pendingApplications = state.pendingApplications.filter(
          (app) => app.id !== action.payload
        ); // Remove approved application
      })
       .addCase(getAllServicesByDepartment.fulfilled, (state, action) => {
        console.log('getAllServicesByDepartment fulfilled --> '+ JSON.stringify(action.payload))
        state.status = "succeeded";
        state.services = action.payload;
        });
  },
});

export default staffSlice.reducer;
