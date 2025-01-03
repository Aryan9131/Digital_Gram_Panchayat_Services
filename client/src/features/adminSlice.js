import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllAdminServices, createStaffAccount, createNewService, updateService, fetchService,deleteServiceAndUpdateApplications } from "../services/fireStore";

const initialState = {
  services: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk for fetching all users
export const getAllAdminServices = createAsyncThunk(`admin/getAllAdminServices`, async (adminId) => {
  const services = await fetchAllAdminServices(adminId); // Fetch all users from Firestore
  return services;
});

// Async thunk for creating a new staff account
export const createStaff = createAsyncThunk("admin/createStaff", async (staffData) => {
  const staff = await createStaffAccount(staffData); // Create a new staff account in Firestore
  return staff;
});

export const createService = createAsyncThunk('admin/create-service', async ({serviceData})=>{
   const service = await createNewService(serviceData);
   return service;
})
export const updateCurrentService= createAsyncThunk('admin/update-service', async ({serviceId, serviceData})=>{
  await updateService(serviceId, serviceData);
  return {_id : serviceId, data : serviceData};
})

export const deleteService = createAsyncThunk('admin/delete-service', async ({serviceId})=>{
   await deleteServiceAndUpdateApplications(serviceId);
   return;
})

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdminServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAdminServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(getAllAdminServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add the new staff member to the list
      })
      .addCase(createService.fulfilled, (state, action) => {
         console.log("service created !")
      })
      .addCase(updateCurrentService.fulfilled, (state, action) => {
        state.services = state.services.map((service)=>{
            if(service._id==action.payload._id){
              return action.payload.data;
            }else{
              return service
            }
        })
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        console.log("service deleteService !")
     })
  },
});
export default adminSlice.reducer;
