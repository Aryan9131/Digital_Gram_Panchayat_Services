import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPendingApplications ,fetchAllServicesByDepartment, fetchService, fetchAllServiceApplications, updateCurrentApplication } from "../services/fireStore";

const initialState = {
  services:[],
  pendingApplications: [],
  currentService:null,
  currentServiceAllAplications : [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getAllServicesByDepartment = createAsyncThunk(`staff/getAllServicesByDepartment`, async (department) => {
  const services = await fetchAllServicesByDepartment(department); // Fetch all users from Firestore
  return services;
});
export const fetchOneService= createAsyncThunk('staff/fetch-service', async ({serviceId})=>{
   const service  = await fetchService(serviceId);
  return service;
})

// Async thunk for approving an application
export const updateApplication = createAsyncThunk("staff/updateApplication", async ({applicationId, status, reason}) => {
  await updateCurrentApplication({applicationId, status, reason}); // Approve the application in Firestore
  return {_id:applicationId, updates:updates}; // Return approved application ID
});
export const getServiceApplications = createAsyncThunk("staff/getServiceApplications", async (serviceId) => {
  const applications = await fetchAllServiceApplications(serviceId); // Fetch pending applications from Firestore
  return applications;
});
const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.currentServiceAllAplications = state.currentServiceAllAplications.map(
           (app)=>{
                 if(app._id==action.payload._id){
                   app.status=action.payload.updates.status,
                   app.reason=action.payload.updates.reason
                 }else{
                  return app;
                 }
           }
        ); // Remove approved application
      })
       .addCase(getAllServicesByDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
        })
        .addCase(getServiceApplications.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentServiceAllAplications = action.payload;
          })
          .addCase(fetchOneService.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentService = action.payload;
          })
  },
});

export default staffSlice.reducer;
