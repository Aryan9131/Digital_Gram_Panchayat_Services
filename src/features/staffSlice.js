import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPendingApplications, approveApplication } from "../services/firestore";

const initialState = {
  pendingApplications: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

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
      });
  },
});

export default staffSlice.reducer;
