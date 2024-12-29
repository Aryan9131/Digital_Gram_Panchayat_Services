import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllServices, createStaffAccount, createNewService, updateService, fetchService } from "../services/fireStore";

const initialState = {
  services: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk for fetching all users
export const getAllServices = createAsyncThunk(`admin/getAllServices`, async (adminId) => {
  console.log('getServices called --> '+adminId)
  const services = await fetchAllServices(adminId); // Fetch all users from Firestore
  return services;
});

// Async thunk for creating a new staff account
export const createStaff = createAsyncThunk("admin/createStaff", async (staffData) => {
  const staff = await createStaffAccount(staffData); // Create a new staff account in Firestore
  return staff;
});

export const createService = createAsyncThunk('admin/create-service', async ({serviceData})=>{
   console.log('createService thunk called --> '+JSON.stringify(serviceData))
   const service = await createNewService(serviceData);
   return service;
})
export const updateCurrentService= createAsyncThunk('admin/update-service', async ({serviceId, serviceData})=>{
  console.log('updateCurrentService thunk called --> '+JSON.stringify(serviceData))
  await updateService(serviceId, serviceData);
  return {_id : serviceId, data : serviceData};
})

export const fetchOneService= createAsyncThunk('admin/fetch-service', async ({serviceId})=>{
  console.log('fetchOneService thunk called --> '+JSON.stringify(serviceId))
   const service  = await fetchService(serviceId);
  return service;
})

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        console.log('getAllServices fulfilled --> '+ JSON.stringify(action.payload))
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add the new staff member to the list
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload); // Add the new service to the list
      })
      .addCase(updateCurrentService.fulfilled, (state, action) => {
        console.log("update service fullflled -----> "+JSON.stringify(action.payload)); // Add the new service to the list
        state.services = state.services.map((service)=>{
            if(service._id==action.payload._id){
              return action.payload.data;
            }else{
              return service
            }
        })
      })
      .addCase(fetchOneService.fulfilled, (state, action) => {
        console.log("fetchOneService service fullflled -----> "+JSON.stringify(action.payload)); // Add the new service to the list
        return action.payload
      })
  },
});
export default adminSlice.reducer;
